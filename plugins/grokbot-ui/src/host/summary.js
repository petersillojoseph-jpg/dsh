/**
 * Room shared memory: a dedicated summarizer bot keeps a compact brief of each
 * group room so every other bot can start from the brief + a short window of
 * recent messages instead of re-reading the whole transcript.
 *
 * Pure prompt builders plus one host helper (`ensureRoomSummary`) that uses the
 * same local model path as room replies. No new services, no network.
 */
import { LIMITS, normalizeMessage, uniqueSlug } from './store.js'
import { generateBotReply } from './llm.js'
import { cleanText } from './util.js'
import { cleanReply } from './prompt.js'

/** Messages kept verbatim for every bot; older ones are folded into the brief. */
export const RECENT_KEEP = 10
/** Minimum number of unsummarized older messages worth one summarizer call. */
export const SUMMARY_TRIGGER = 6
/** Wall-clock budget for one summarizer call. */
const SUMMARY_TIMEOUT_MS = 60_000
/** Characters of transcript fed to the summarizer per call. */
const SUMMARY_INPUT_CHARS = 9000
/** Characters of one transcript line fed to the summarizer. */
const SUMMARY_LINE_CHARS = 500

/** Default persona used when the summarizer bot row is missing (e.g. deleted). */
const DEFAULT_SUMMARIZER_INSTRUCTIONS =
  'You are the room summarizer. You do not join the conversation or take sides: you keep a short shared brief of each group room so the other bots remember what matters without re-reading everything.'

/** The bot that owns the room brief, if the user kept one. */
export function summarizerBotFor(bots) {
  const pool = Array.isArray(bots) ? bots : []
  return pool.find((bot) => bot && bot.role === 'summarizer') || null
}

/**
 * Seed the summarizer bot once per store (idempotent). The user can rename or
 * re-style it; deleting it only lasts until the next host start.
 * @param {import('./store.js').BotStore} store
 * @returns {object|null} the summarizer bot
 */
export function ensureSummarizerBot(store) {
  const existing = summarizerBotFor(store.state.bots)
  if (existing) return existing
  const id = uniqueSlug('memo', store.state.bots)
  const bot = {
    id,
    name: 'Memo',
    tagline: 'Room summarizer',
    color: '#94A3B8',
    avatarSet: 'rakazo',
    role: 'summarizer',
    instructions:
      'You are Memo, the room summarizer. You do not join the conversation or take sides: you keep a short shared brief of each group room so the other bots remember what matters without re-reading everything. A good brief states who is doing what, decisions already made, constraints and concrete details (plans, files, scores, links), open questions, and the next step. Never invent details, never add commentary, and never answer the user directly.',
    createdAt: Date.now(),
  }
  store.upsertBot(bot)
  return bot
}

/** Transcript entries that carry actual conversation (system summaries excluded). */
function usableMessages(transcript) {
  return (Array.isArray(transcript) ? transcript : []).filter(
    (message) => message && message.role !== 'system' && typeof message.text === 'string' && message.text.trim(),
  )
}

/**
 * Split a room transcript into the part already covered by the brief, the part
 * that still needs folding in, and the recent window bots read verbatim.
 *
 * @param {object} room
 * @returns {{messages: object[], pending: object[], recent: object[], previous: string, throughId: string}}
 */
export function splitRoomForSummary(room) {
  const messages = usableMessages(room && room.transcript)
  const cutoff = Math.max(0, messages.length - RECENT_KEEP)
  const older = messages.slice(0, cutoff)
  const recent = messages.slice(cutoff)
  const previous = room && room.summary && typeof room.summary.text === 'string' ? room.summary.text : ''
  let pending = older
  let throughId = ''
  if (room && room.summary && typeof room.summary.throughId === 'string' && room.summary.throughId) {
    const index = older.findIndex((message) => message.id === room.summary.throughId)
    if (index >= 0) {
      pending = older.slice(index + 1)
      throughId = room.summary.throughId
    }
  }
  if (pending.length > 0) throughId = pending[pending.length - 1].id
  return { messages, pending, recent, previous, throughId }
}

/** Human label for one transcript speaker. */
function speakerOf(message, bots) {
  if (message.role === 'user') return 'User'
  const bot = (Array.isArray(bots) ? bots : []).find((item) => item.id === message.botId)
  return bot ? bot.name : message.botId || 'Bot'
}

/** Clip one transcript line for the summarizer input. */
function clipLine(text) {
  const flat = String(text ?? '').replace(/\r?\n+/g, ' ').trim()
  return flat.length > SUMMARY_LINE_CHARS ? `${flat.slice(0, SUMMARY_LINE_CHARS - 1)}…` : flat
}

/** System prompt for one summarizer call. */
export function buildSummarySystemPrompt(bot, room) {
  const name = bot && bot.name ? bot.name : 'the room summarizer'
  const persona =
    bot && typeof bot.instructions === 'string' && bot.instructions.trim()
      ? bot.instructions.trim()
      : DEFAULT_SUMMARIZER_INSTRUCTIONS
  return [
    `You are ${name}, the shared-memory summarizer for the group room "${room && room.name ? room.name : 'Room'}".`,
    persona,
    'You never answer the user or the other bots; you only maintain their shared brief. Reply with the updated brief only: plain text, no headings, no lists, under 160 words. Include names and owners, decisions already made, constraints, concrete details (plans, files, scores, links), open questions, and the next step. Drop greetings, repetition and settled small talk. Never invent details.',
  ].join('\n\n')
}

/** User prompt for one summarizer call: previous brief + messages to fold in. */
export function buildSummaryUserPrompt({ room, bots, previous, messages }) {
  const lines = []
  let budget = SUMMARY_INPUT_CHARS
  for (let index = messages.length - 1; index >= 0; index -= 1) {
    const line = `${speakerOf(messages[index], bots)}: ${clipLine(messages[index].text)}`
    if (line.length > budget) break
    budget -= line.length + 1
    lines.unshift(line)
  }
  return [
    `Previous shared brief:\n${previous ? previous : '(none yet)'}`,
    `New messages to fold in:\n${lines.join('\n') || '(none)'}`,
    'Write the updated shared brief now.',
  ].join('\n\n')
}

/**
 * Fold older room messages into the shared brief when enough have accumulated.
 * Appends a visible system line so the user can see the summarizer working, and
 * persists `room.summary` for the next prompts.
 *
 * @param {{store: object, ctx: any, log: object, roomId: string, bots?: object[]}} input
 * @returns {Promise<string>} the current brief ('' when none yet)
 */
export async function ensureRoomSummary({ store, ctx, log, roomId, bots }) {
  const room = store.findRoom(roomId)
  if (!room) return ''
  const split = splitRoomForSummary(room)
  if (split.pending.length < SUMMARY_TRIGGER) return room.summary?.text ?? ''

  const summarizer =
    summarizerBotFor(bots) || summarizerBotFor(store.state.bots) || { id: 'memo', name: 'Memo' }
  const system = buildSummarySystemPrompt(summarizer, room)
  const prompt = buildSummaryUserPrompt({
    room,
    bots: Array.isArray(bots) && bots.length ? bots : store.state.bots,
    previous: split.previous,
    messages: split.pending,
  })

  let signal
  try {
    signal = AbortSignal.timeout(SUMMARY_TIMEOUT_MS)
  } catch {
    signal = undefined
  }
  const result = await generateBotReply({
    ctx,
    log,
    bot: summarizer,
    system,
    prompt,
    signal,
  })
  if (!result || !result.ok) {
    log?.warn?.(`[grokbot-ui] room brief update for "${roomId}" failed: ${result?.error ?? 'unknown'}`)
    return room.summary?.text ?? ''
  }

  const text = cleanReply(result.text, LIMITS.summary)
  if (!text) return room.summary?.text ?? ''

  const throughId = split.throughId || (split.pending[split.pending.length - 1] || {}).id
  const saved = store.updateRoomSummary(roomId, { text, throughId, updatedAt: Date.now() })
  if (!saved) return room.summary?.text ?? ''

  try {
    const label = summarizer && summarizer.name ? summarizer.name : 'the summarizer'
    store.appendMessage(
      roomId,
      normalizeMessage({
        role: 'system',
        text: `Shared brief from ${label} for the other bots: ${text}`,
      }),
    )
  } catch {
    /* the brief itself is saved; a missing transcript line is not fatal */
  }
  return text
}

/** Exported for tests/inspection: bounded text the summarizer is allowed to store. */
export function sanitizeSummaryText(text) {
  return cleanText(text, LIMITS.summary)
}
