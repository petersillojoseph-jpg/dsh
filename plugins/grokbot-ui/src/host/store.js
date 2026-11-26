/**
 * Local bot/room store for Grokbot UI.
 *
 * One JSON document at `data/bots.json`, loaded once into memory and rewritten
 * atomically (temp file + rename) after every mutation. The file is the only
 * source of truth; there is no database and no network involved.
 *
 * Shape (see SPEC.md):
 *   { version: 2, bots: Bot[], rooms: Room[] }
 */
import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { cleanText, oneLine, slugify } from './util.js'
import {
  BOT_AVATAR_VALUE_MAX_LENGTH,
  DEFAULT_NEW_BOT_AVATAR_SET,
  LEGACY_SHAPE_TO_KEY,
  SHIPPED_SHAPE_KEYS,
  isBotAvatarValue,
  legacyColorValue,
  migrateLegacyAvatar,
  normalizeHexColor,
  parseBotAvatarValue,
  resolveBotAvatarSet,
  shapeAvatarValue,
} from '../client/shared/avatar/model.js'

export const STORE_VERSION = 2

/** Hard input bounds. Requests larger than these are rejected or clipped. */
export const LIMITS = {
  name: 48,
  tagline: 140,
  instructions: 8000,
  roomName: 60,
  message: 4000,
  reply: 4000,
  avatarValue: BOT_AVATAR_VALUE_MAX_LENGTH,
  summary: 2400,
  transcript: 200,
}

/** An error carrying the HTTP status the route wrapper should answer with. */
export class HttpError extends Error {
  /**
   * @param {number} status HTTP status code
   * @param {string} message safe, user-facing message
   */
  constructor(status, message) {
    super(message)
    this.name = 'HttpError'
    this.status = status
  }
}

/**
 * Normalize one avatar set (`organic` | `rakazo`).
 *
 * `strict` drafts reject an unknown non-empty value with 400; tolerant stored
 * rows drop it instead so the client can derive a default.
 *
 * @param {unknown} raw
 * @param {boolean} strict
 * @returns {'organic'|'rakazo'|undefined}
 */
export function normalizeAvatarSet(raw, strict = false) {
  if (raw === undefined || raw === null) return undefined
  if (typeof raw !== 'string') {
    if (strict) throw new HttpError(400, '`avatarSet` must be a string')
    return undefined
  }
  const value = raw.trim().toLowerCase()
  if (!value) return undefined
  if (value === 'organic' || value === 'rakazo') return value
  if (strict) {
    throw new HttpError(400, `unknown avatarSet "${raw.trim()}"; expected one of: organic, rakazo`)
  }
  return undefined
}

/**
 * Resolve the stored avatar value for a draft.
 *
 * Accepts the new value semantics (`#hex`, `#hex::shape_N`, `data:image/...`)
 * plus legacy `{ color, shape }` drafts from an older client. Oversized or
 * malformed image data is rejected; other unknown colours fall back to the
 * seeded palette instead of failing the save.
 *
 * @param {object} raw
 * @param {'organic'|'rakazo'} avatarSet
 * @returns {string}
 */
export function resolveAvatarValue(raw, avatarSet) {
  const requested = typeof raw.color === 'string' ? raw.color.trim() : ''
  if (requested.startsWith('data:')) {
    if (!isBotAvatarValue(requested)) {
      throw new HttpError(
        400,
        `avatar image is invalid or larger than ${BOT_AVATAR_VALUE_MAX_LENGTH} characters`,
      )
    }
    return requested
  }
  if (requested && isBotAvatarValue(requested)) {
    return parseBotAvatarValue(requested).kind === 'color'
      ? normalizeHexColor(requested)
      : requested
  }
  const color = legacyColorValue(requested)
  const shapeKey = LEGACY_SHAPE_TO_KEY[String(raw.shape || '').toLowerCase()]
  if (shapeKey && avatarSet !== 'rakazo') {
    return shapeAvatarValue(color, SHIPPED_SHAPE_KEYS.indexOf(shapeKey))
  }
  return color
}

/**
 * Validate and normalize a bot draft.
 *
 * @param {unknown} raw `{ id?, name, color?, avatarSet?, shape?, instructions?, tagline? }`
 * @param {{existingBots?: object[], current?: object|null}} [options]
 *   `current` is the stored bot when this is an update.
 * @returns {object} a complete Bot record
 */
export function normalizeBotDraft(raw, options = {}) {
  const existingBots = Array.isArray(options.existingBots) ? options.existingBots : []
  const current = options.current ?? null
  if (raw === null || typeof raw !== 'object' || Array.isArray(raw)) {
    throw new HttpError(400, '`bot` must be an object')
  }

  const name = oneLine(cleanText(raw.name, LIMITS.name))
  if (!name) throw new HttpError(400, 'bot name is required')

  // Legacy `shape` drafts (old client) imply the organic set; new clients send
  // `avatarSet` explicitly. Face and emoji are gone from the avatar model.
  const avatarSet =
    normalizeAvatarSet(raw.avatarSet, true) ||
    (LEGACY_SHAPE_TO_KEY[String(raw.shape || '').toLowerCase()]
      ? 'organic'
      : DEFAULT_NEW_BOT_AVATAR_SET)
  const color = resolveAvatarValue(raw, avatarSet)
  const instructions = cleanText(raw.instructions, LIMITS.instructions)
  const tagline = oneLine(cleanText(raw.tagline, LIMITS.tagline))

  let id
  if (current) {
    id = current.id
    // An id rename is allowed only to a slug that is still free; otherwise the
    // stable id wins so existing sessions keep pointing at the right preset.
    const requested = slugify(raw.id)
    if (requested && requested !== current.id) {
      const taken = existingBots.some((bot) => bot.id === requested)
      if (taken) throw new HttpError(409, `a bot with id "${requested}" already exists`)
      id = requested
    }
  } else {
    const requested = slugify(raw.id)
    if (requested) {
      if (existingBots.some((bot) => bot.id === requested)) {
        throw new HttpError(409, `a bot with id "${requested}" already exists`)
      }
      id = requested
    } else {
      id = uniqueSlug(slugify(name) || 'bot', existingBots)
    }
  }

  const bot = { id, name }
  // Role is host-owned (drafts cannot set or clear it).
  if (current && current.role === 'summarizer') bot.role = 'summarizer'
  bot.color = color
  bot.avatarSet = avatarSet
  bot.instructions = instructions
  bot.tagline = tagline
  bot.createdAt = current ? Number(current.createdAt) || Date.now() : Date.now()
  return bot
}

/**
 * Append `-2`, `-3`, … until the slug is unique.
 * @param {string} base
 * @param {object[]} bots
 * @returns {string}
 */
export function uniqueSlug(base, bots) {
  const used = new Set(bots.map((bot) => bot.id))
  if (!used.has(base)) return base
  for (let i = 2; i < 1000; i += 1) {
    const candidate = `${base}-${i}`
    if (!used.has(candidate)) return candidate
  }
  return `${base}-${crypto.randomUUID().slice(0, 8)}`
}

/**
 * Validate and normalize a room draft.
 * @param {unknown} raw `{ name, botIds }`
 * @param {{bots?: object[]}} [options]
 * @returns {object} a complete Room record
 */
export function normalizeRoomDraft(raw, options = {}) {
  const bots = Array.isArray(options.bots) ? options.bots : []
  if (raw === null || typeof raw !== 'object' || Array.isArray(raw)) {
    throw new HttpError(400, 'room body must be an object')
  }
  const requestedName = oneLine(cleanText(raw.name, LIMITS.roomName)) || 'New room'
  const known = new Set(bots.map((bot) => bot.id))
  const requestedIds = Array.isArray(raw.botIds) ? raw.botIds : []
  const botIds = []
  for (const value of requestedIds) {
    if (typeof value !== 'string') continue
    const id = slugify(value)
    if (!known.has(id) || botIds.includes(id)) continue
    botIds.push(id)
  }
  if (botIds.length === 0) throw new HttpError(400, 'choose at least one bot for the room')
  return {
    id: crypto.randomUUID(),
    name: requestedName,
    botIds,
    transcript: [],
    createdAt: Date.now(),
  }
}

/**
 * Validate and normalize a transcript message.
 * @param {{role?: unknown, botId?: unknown, text?: unknown}} raw
 * @returns {{id: string, role: string, botId?: string, text: string, ts: number}}
 */
export function normalizeMessage(raw) {
  if (raw === null || typeof raw !== 'object' || Array.isArray(raw)) {
    throw new HttpError(400, 'message must be an object')
  }
  const role = raw.role === 'bot' || raw.role === 'system' ? raw.role : 'user'
  const text = cleanText(raw.text, LIMITS.message)
  if (!text) throw new HttpError(400, 'message text is required')
  const message = {
    id: crypto.randomUUID(),
    role,
    text,
    ts: Date.now(),
  }
  if (role === 'bot') {
    const botId = slugify(raw.botId)
    if (!botId) throw new HttpError(400, 'bot message requires a botId')
    message.botId = botId
  }
  return message
}

/**
 * Normalize a raw message loaded from disk (tolerant: corrupt rows are dropped).
 * @param {unknown} raw
 * @returns {object|null}
 */
function normalizeStoredMessage(raw) {
  if (raw === null || typeof raw !== 'object' || Array.isArray(raw)) return null
  const role = raw.role === 'bot' || raw.role === 'system' ? raw.role : 'user'
  const text = cleanText(raw.text, LIMITS.message)
  if (!text) return null
  const message = {
    id: typeof raw.id === 'string' && raw.id ? raw.id : crypto.randomUUID(),
    role,
    text,
    ts: Number.isFinite(raw.ts) ? Number(raw.ts) : Date.now(),
  }
  if (role === 'bot') {
    const botId = slugify(raw.botId)
    if (!botId) return null
    message.botId = botId
  }
  return message
}

/**
 * Normalize a raw bot loaded from disk (tolerant: legacy avatar fields are
 * migrated, invalid/oversized avatar values fall back to a palette colour, bots
 * are kept).
 * @param {unknown} raw
 * @returns {object|null}
 */
function normalizeStoredBot(raw) {
  if (raw === null || typeof raw !== 'object' || Array.isArray(raw)) return null
  const id = slugify(raw.id)
  const name = oneLine(cleanText(raw.name, LIMITS.name))
  if (!id || !name) return null
  const storedSet = normalizeAvatarSet(raw.avatarSet, false)
  let color
  let avatarSet
  if (typeof raw.color === 'string' && isBotAvatarValue(raw.color)) {
    color = raw.color
    avatarSet = storedSet || 'organic'
  } else {
    // Legacy `{ color, shape, face }`: idempotent one-time migration. Face has
    // no equivalent in the new model and is discarded.
    const migrated = migrateLegacyAvatar({
      color: raw.color,
      shape: raw.shape,
      avatarSet: storedSet,
    })
    color = migrated.color
    avatarSet = migrated.avatarSet
  }
  const bot = { id, name }
  bot.color = color
  bot.avatarSet = avatarSet
  // The summarizer is a normal bot with a host-owned job; keep its role stable.
  if (raw.role === 'summarizer') bot.role = 'summarizer'
  bot.instructions = cleanText(raw.instructions, LIMITS.instructions)
  bot.tagline = oneLine(cleanText(raw.tagline, LIMITS.tagline))
  bot.createdAt = Number.isFinite(raw.createdAt) ? Number(raw.createdAt) : Date.now()
  return bot
}

/**
 * Normalize one stored room approval gate: the bot (and queued bots) waiting
 * for the user's answer after pinging `@user`.
 * @param {unknown} raw
 * @returns {{botId: string, botIds: string[], question: string, createdAt: number}|null}
 */
function normalizeStoredPending(raw) {
  if (raw === null || typeof raw !== 'object' || Array.isArray(raw)) return null
  const botId = slugify(raw.botId)
  if (!botId) return null
  const botIds = []
  for (const value of Array.isArray(raw.botIds) ? raw.botIds : []) {
    const id = slugify(value)
    if (id && id !== botId && !botIds.includes(id)) botIds.push(id)
  }
  const question = cleanText(raw.question, LIMITS.message)
  return {
    botId,
    botIds,
    question,
    createdAt: Number.isFinite(raw.createdAt) ? Number(raw.createdAt) : Date.now(),
  }
}

/**
 * Normalize one room's stored shared brief (produced by the summarizer bot).
 * @param {unknown} raw
 * @returns {{text: string, throughId: string, updatedAt: number}|null}
 */
function normalizeStoredSummary(raw) {
  if (raw === null || typeof raw !== 'object' || Array.isArray(raw)) return null
  const text = cleanText(raw.text, LIMITS.summary)
  const throughId = typeof raw.throughId === 'string' ? raw.throughId.trim() : ''
  if (!text || !throughId) return null
  return {
    text,
    throughId,
    updatedAt: Number.isFinite(raw.updatedAt) ? Number(raw.updatedAt) : Date.now(),
  }
}

/**
 * Coerce an arbitrary parsed document into a valid store state.
 * @param {unknown} parsed
 * @returns {{version: number, bots: object[], rooms: object[]}}
 */
export function normalizeStore(parsed) {
  const source = parsed !== null && typeof parsed === 'object' ? parsed : {}
  const bots = []
  const seenBots = new Set()
  for (const raw of Array.isArray(source.bots) ? source.bots : []) {
    const bot = normalizeStoredBot(raw)
    if (!bot || seenBots.has(bot.id)) continue
    seenBots.add(bot.id)
    bots.push(bot)
  }
  const rooms = []
  const seenRooms = new Set()
  for (const raw of Array.isArray(source.rooms) ? source.rooms : []) {
    if (raw === null || typeof raw !== 'object' || Array.isArray(raw)) continue
    const id = typeof raw.id === 'string' && raw.id ? raw.id : crypto.randomUUID()
    if (seenRooms.has(id)) continue
    seenRooms.add(id)
    const botIds = []
    for (const value of Array.isArray(raw.botIds) ? raw.botIds : []) {
      const botId = slugify(value)
      if (!seenBots.has(botId) || botIds.includes(botId)) continue
      botIds.push(botId)
    }
    const transcript = []
    for (const item of Array.isArray(raw.transcript) ? raw.transcript : []) {
      const message = normalizeStoredMessage(item)
      if (message) transcript.push(message)
    }
    const room = {
      id,
      name: oneLine(cleanText(raw.name, LIMITS.roomName)) || 'Room',
      botIds,
      transcript: transcript.slice(-LIMITS.transcript),
      createdAt: Number.isFinite(raw.createdAt) ? Number(raw.createdAt) : Date.now(),
    }
    const summary = normalizeStoredSummary(raw.summary)
    if (summary) room.summary = summary
    const pending = normalizeStoredPending(raw.pending)
    if (pending) room.pending = pending
    rooms.push(room)
  }
  return { version: STORE_VERSION, bots, rooms }
}

/**
 * Canonical projection of a parsed document, used to decide whether a load
 * normalized anything (legacy colors, dropped bad avatar fields, trimmed ids,
 * extra keys) and the file therefore needs one rewrite.
 * @param {unknown} parsed
 * @returns {object}
 */
function canonicalDocument(parsed) {
  const source = parsed !== null && typeof parsed === 'object' ? parsed : {}
  const projectBot = (raw) => {
    if (raw === null || typeof raw !== 'object' || Array.isArray(raw)) return raw
    return {
      id: raw.id,
      name: raw.name,
      color: raw.color,
      avatarSet: raw.avatarSet,
      role: raw.role,
      instructions: raw.instructions,
      tagline: raw.tagline,
      createdAt: raw.createdAt,
    }
  }
  return {
    version: source.version,
    bots: (Array.isArray(source.bots) ? source.bots : []).map(projectBot),
    rooms: Array.isArray(source.rooms) ? source.rooms : [],
  }
}

/**
 * Normalize a document and report whether normalization changed it.
 * @param {unknown} parsed
 * @returns {{state: {version: number, bots: object[], rooms: object[]}, changed: boolean}}
 */
export function normalizeStoreDocument(parsed) {
  const state = normalizeStore(parsed)
  let changed = true
  try {
    changed = JSON.stringify(canonicalDocument(parsed)) !== JSON.stringify(state)
  } catch {
    /* unrepresentable input: rewrite it */
  }
  return { state, changed }
}

/** Empty store state. */
export function emptyStore() {
  return { version: STORE_VERSION, bots: [], rooms: [] }
}

/**
 * The bot/room store. Load once, then mutate synchronously; each mutation
 * writes the whole document atomically.
 */
export class BotStore {
  /** @param {string} file absolute JSON path */
  constructor(file) {
    this.file = file
    this.state = emptyStore()
  }

  /** Load from disk, repairing missing/corrupt files rather than throwing. */
  load() {
    try {
      fs.mkdirSync(path.dirname(this.file), { recursive: true })
    } catch {
      /* directory creation errors surface on save */
    }
    try {
      const parsed = JSON.parse(fs.readFileSync(this.file, 'utf8'))
      const { state, changed } = normalizeStoreDocument(parsed)
      this.state = state
      // Persist the normalized document exactly once (legacy avatar migration,
      // dropped invalid fields, extra keys). Unchanged files stay as-is, and the
      // exact pre-migration bytes are preserved once before the rewrite.
      if (changed) {
        this.backup()
        this.save()
      }
      return this.state
    } catch (error) {
      if (error && error.code === 'ENOENT') {
        this.state = emptyStore()
        this.save()
        return this.state
      }
      // Unreadable or corrupt: keep the bytes for debugging, start clean.
      try {
        fs.renameSync(this.file, `${this.file}.corrupt-${Date.now()}.json`)
      } catch {
        /* best effort */
      }
      this.state = emptyStore()
      this.save()
      return this.state
    }
  }

  /** Deep, detached copy of the whole state. */
  snapshot() {
    return JSON.parse(JSON.stringify(this.state))
  }

  /**
   * Copy the current file to `data/bots.backup-<timestamp>.json` before a
   * normalization rewrite (legacy avatar migration). Best effort: a failed
   * backup never blocks the store from loading.
   * @returns {string|null} the backup path when written
   */
  backup() {
    const dir = path.dirname(this.file)
    const base = path.basename(this.file, '.json')
    const target = path.join(dir, `${base}.backup-${Date.now()}.json`)
    try {
      fs.copyFileSync(this.file, target)
      return target
    } catch {
      return null
    }
  }

  /** Atomically persist the current state. */
  save() {
    const dir = path.dirname(this.file)
    fs.mkdirSync(dir, { recursive: true })
    const temp = path.join(dir, `.${path.basename(this.file)}.${process.pid}.${Date.now()}.tmp`)
    const body = `${JSON.stringify(this.state, null, 2)}\n`
    fs.writeFileSync(temp, body, 'utf8')
    fs.renameSync(temp, this.file)
  }

  /** @param {string} id @returns {object|undefined} */
  findBot(id) {
    return this.state.bots.find((bot) => bot.id === id)
  }

  /** @param {string} id @returns {object|undefined} */
  findRoom(id) {
    return this.state.rooms.find((room) => room.id === id)
  }

  /**
   * Insert or replace one bot.
   * @param {object} bot normalized Bot
   * @returns {object} the stored bot
   */
  upsertBot(bot) {
    const index = this.state.bots.findIndex((item) => item.id === bot.id)
    if (index === -1) this.state.bots.push(bot)
    else this.state.bots[index] = bot
    this.save()
    return bot
  }

  /**
   * Delete one bot and detach it from every room (transcripts are preserved so
   * history stays readable).
   * @param {string} id
   * @returns {boolean} whether a bot was removed
   */
  deleteBot(id) {
    const before = this.state.bots.length
    this.state.bots = this.state.bots.filter((bot) => bot.id !== id)
    if (this.state.bots.length === before) return false
    for (const room of this.state.rooms) {
      if (room.botIds.includes(id)) room.botIds = room.botIds.filter((botId) => botId !== id)
    }
    this.save()
    return true
  }

  /**
   * Add one room.
   * @param {object} room normalized Room
   * @returns {object}
   */
  addRoom(room) {
    this.state.rooms.push(room)
    this.save()
    return room
  }

  /**
   * Delete one room.
   * @param {string} id
   * @returns {boolean}
   */
  deleteRoom(id) {
    const before = this.state.rooms.length
    this.state.rooms = this.state.rooms.filter((room) => room.id !== id)
    if (this.state.rooms.length === before) return false
    this.save()
    return true
  }

  /**
   * Append one message to a room transcript, trimming old rows at the cap.
   * @param {string} roomId
   * @param {object} message normalized message
   * @returns {object|null} the stored message, or null when the room is gone
   */
  appendMessage(roomId, message) {
    const room = this.findRoom(roomId)
    if (!room) return null
    room.transcript.push(message)
    if (room.transcript.length > LIMITS.transcript) {
      room.transcript.splice(0, room.transcript.length - LIMITS.transcript)
    }
    this.save()
    return message
  }

  /**
   * Replace one room's shared brief (summarizer output) and persist.
   * @param {string} roomId
   * @param {{text: string, throughId: string, updatedAt?: number}} summary
   * @returns {object|null} the stored summary
   */
  updateRoomSummary(roomId, summary) {
    const room = this.findRoom(roomId)
    if (!room) return null
    const text = cleanText(summary?.text, LIMITS.summary)
    const throughId = typeof summary?.throughId === 'string' ? summary.throughId.trim() : ''
    if (!text || !throughId) return null
    room.summary = {
      text,
      throughId,
      updatedAt: Number.isFinite(summary.updatedAt) ? Number(summary.updatedAt) : Date.now(),
    }
    this.save()
    return room.summary
  }

  /**
   * Set or clear one room's approval gate (a bot that pinged `@user`).
   * @param {string} roomId
   * @param {{botId: string, botIds?: string[], question?: string, createdAt?: number}|null} pending
   * @returns {object|null} the stored pending gate
   */
  setRoomPending(roomId, pending) {
    const room = this.findRoom(roomId)
    if (!room) return null
    if (!pending) {
      if (room.pending) {
        delete room.pending
        this.save()
      }
      return null
    }
    const botId = slugify(pending.botId)
    if (!botId) return null
    const botIds = []
    for (const value of Array.isArray(pending.botIds) ? pending.botIds : []) {
      const id = slugify(value)
      if (id && id !== botId && !botIds.includes(id)) botIds.push(id)
    }
    room.pending = {
      botId,
      botIds,
      question: cleanText(pending.question, LIMITS.message),
      createdAt: Number.isFinite(pending.createdAt) ? Number(pending.createdAt) : Date.now(),
    }
    this.save()
    return room.pending
  }
}
