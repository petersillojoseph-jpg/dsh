/**
 * Same-origin HTTP client for the Grokbot host half.
 *
 * Endpoints (see SPEC.md):
 *   GET  /grokbot/api/state
 *   POST /grokbot/api/bots            { bot }
 *   POST /grokbot/api/bots/delete     { id }
 *   POST /grokbot/api/rooms           { name, botIds }
 *   POST /grokbot/api/rooms/delete    { id }
 *   POST /grokbot/api/rooms/send      { roomId, text }
 *   POST /grokbot/api/notify          { kind, sessionName }
 *
 * Every parser here is defensive: the browser UI must keep working (with an
 * inline error) when the host returns 500s or malformed payloads.
 */
import { migrateLegacyAvatar } from '../shared/avatar/model.js'

const BASE = '/grokbot/api'

export class ApiError extends Error {
  /**
   * @param {string} message user-facing message
   * @param {number} status HTTP status (0 when the request never reached the host)
   * @param {unknown} payload parsed body when available
   */
  constructor(message, status, payload) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.payload = payload
  }
}

async function request(path, { method = 'GET', body } = {}) {
  let response
  try {
    const headers = { accept: 'application/json' }
    if (body !== undefined) headers['content-type'] = 'application/json'
    response = await fetch(BASE + path, {
      method,
      credentials: 'same-origin',
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
    })
  } catch (cause) {
    throw new ApiError('Cannot reach the local bot service. Is the Grokbot host running?', 0, cause)
  }

  let raw = ''
  try {
    raw = await response.text()
  } catch {
    raw = ''
  }

  let payload = null
  if (raw) {
    try {
      payload = JSON.parse(raw)
    } catch {
      payload = null
    }
  }

  if (!response.ok) {
    const serverMessage = payload && typeof payload.error === 'string' ? payload.error.trim() : ''
    const message = serverMessage || `Request failed (HTTP ${response.status}).`
    throw new ApiError(message, response.status, payload)
  }

  if (payload === null) {
    throw new ApiError('The local bot service returned an unexpected response.', response.status, raw)
  }

  return payload
}

export function slugify(value) {
  return String(value || '')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 48)
}

/**
 * Normalize one bot record onto the avatar value model.
 *
 * Old rows still carry `{ color: '<palette id>', shape, face }`; the model's
 * `migrateLegacyAvatar` converts them idempotently to
 * `{ color: '#hex' | '#hex::shape_N' | 'data:image/...', avatarSet }` so every
 * call site sees one shape. `emoji` is legacy data: kept for compatibility,
 * never rendered.
 *
 * @returns normalized bot or null when the record is unusable.
 */
export function normalizeBot(raw, index = 0) {
  if (!raw || typeof raw !== 'object') return null
  const name = typeof raw.name === 'string' && raw.name.trim() ? raw.name.trim() : 'Untitled bot'
  const id = typeof raw.id === 'string' && raw.id.trim()
    ? raw.id.trim()
    : slugify(name) || `bot-${index + 1}`
  const avatar = migrateLegacyAvatar(raw)
  return {
    id,
    name,
    color: avatar.color,
    avatarSet: avatar.avatarSet,
    emoji: typeof raw.emoji === 'string' ? raw.emoji : undefined,
    instructions: typeof raw.instructions === 'string' ? raw.instructions : '',
    tagline: typeof raw.tagline === 'string' ? raw.tagline : '',
    createdAt: Number.isFinite(raw.createdAt) ? raw.createdAt : 0,
  }
}

export function normalizeBots(list) {
  if (!Array.isArray(list)) return null
  const out = []
  for (let i = 0; i < list.length; i += 1) {
    const bot = normalizeBot(list[i], i)
    if (bot) out.push(bot)
  }
  return out
}

function normalizeMessage(raw, fallbackId) {
  if (!raw || typeof raw !== 'object') return null
  const role = raw.role === 'user' || raw.role === 'bot' || raw.role === 'system' ? raw.role : 'bot'
  const text = typeof raw.text === 'string' ? raw.text : ''
  if (!text && role !== 'system') return null
  return {
    id: typeof raw.id === 'string' && raw.id ? raw.id : fallbackId,
    role,
    botId: typeof raw.botId === 'string' ? raw.botId : undefined,
    text,
    ts: Number.isFinite(raw.ts) ? raw.ts : 0,
  }
}

export function normalizeRoom(raw, index = 0) {
  if (!raw || typeof raw !== 'object') return null
  const id = typeof raw.id === 'string' && raw.id.trim() ? raw.id.trim() : `room-${index + 1}`
  const name = typeof raw.name === 'string' && raw.name.trim() ? raw.name.trim() : 'Untitled room'
  const botIds = Array.isArray(raw.botIds)
    ? raw.botIds.filter((value) => typeof value === 'string' && value)
    : []
  const transcript = []
  if (Array.isArray(raw.transcript)) {
    for (let i = 0; i < raw.transcript.length; i += 1) {
      const message = normalizeMessage(raw.transcript[i], `${id}-msg-${i}`)
      if (message) transcript.push(message)
    }
  }
  const pending = (() => {
    if (!raw.pending || typeof raw.pending !== 'object' || typeof raw.pending.botId !== 'string' || !raw.pending.botId) return undefined
    return {
      botId: raw.pending.botId,
      botIds: Array.isArray(raw.pending.botIds)
        ? raw.pending.botIds.filter((value) => typeof value === 'string' && value)
        : [],
      question: typeof raw.pending.question === 'string' ? raw.pending.question : '',
      createdAt: Number.isFinite(raw.pending.createdAt) ? raw.pending.createdAt : 0,
    }
  })()
  return {
    id,
    name,
    botIds,
    transcript,
    createdAt: Number.isFinite(raw.createdAt) ? raw.createdAt : 0,
    ...(pending ? { pending } : {}),
  }
}

export function normalizeRooms(list) {
  if (!Array.isArray(list)) return null
  const out = []
  for (let i = 0; i < list.length; i += 1) {
    const room = normalizeRoom(list[i], i)
    if (room) out.push(room)
  }
  return out
}

export function normalizeState(payload) {
  const source = payload && typeof payload === 'object' ? payload : {}
  return {
    version: Number.isFinite(source.version) ? source.version : 1,
    bots: normalizeBots(source.bots) || [],
    rooms: normalizeRooms(source.rooms) || [],
    model: source.model && typeof source.model === 'object' ? source.model : null,
  }
}

export const api = {
  getState() {
    return request('/state')
  },
  /** @param {object} bot BotDraft; omit `id` to create. */
  saveBot(bot) {
    return request('/bots', { method: 'POST', body: { bot } })
  },
  deleteBot(id) {
    return request('/bots/delete', { method: 'POST', body: { id } })
  },
  createRoom(name, botIds) {
    return request('/rooms', { method: 'POST', body: { name, botIds } })
  },
  deleteRoom(id) {
    return request('/rooms/delete', { method: 'POST', body: { id } })
  },
  sendRoom(roomId, text, botIds) {
    const body = { roomId, text }
    if (Array.isArray(botIds) && botIds.length) body.botIds = botIds
    return request('/rooms/send', { method: 'POST', body })
  },
  notifyAgent(kind, sessionName) {
    return request('/notify', { method: 'POST', body: { kind, sessionName } })
  },
}

/** Which bots will answer a room message; mirrors the host's @mention rule. */
export function respondersFor(room, bots, text) {
  const byId = new Map(bots.map((bot) => [bot.id, bot]))
  const roomBots = (room && Array.isArray(room.botIds) ? room.botIds : [])
    .map((id) => byId.get(id))
    .filter(Boolean)
  if (!roomBots.length) return []
  const value = String(text || '')
  const mentioned = roomBots.filter((bot) => {
    const name = bot.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    return new RegExp(`@\\s*${name}\\b`, 'i').test(value)
  })
  if (mentioned.length) return mentioned
  // The room is paused on a bot's `@user` question; the user's answer resumes it.
  if (room && room.pending) {
    const queued = (Array.isArray(room.pending.botIds) ? room.pending.botIds : [])
      .map((id) => byId.get(id))
      .filter(Boolean)
    if (queued.length) return queued
    const asker = byId.get(room.pending.botId)
    if (asker) return [asker]
  }
  return roomBots
}
