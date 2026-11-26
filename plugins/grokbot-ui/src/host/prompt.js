/**
 * Prompt construction for group-room replies and @mention routing.
 *
 * Pure functions: no I/O, no model calls, no mutation of the store.
 */
import { escapeRegExp } from './util.js'

/** Max characters of one transcript line fed back to the model. */
const MESSAGE_CLIP = 600
/**
 * Recent messages fed back verbatim; older history comes from the room's shared
 * brief (see summary.js), which keeps per-reply context small.
 */
const HISTORY_LIMIT = 12
/** Max total recent-transcript characters fed back to the model. */
const HISTORY_CHARS = 4000

/** Human label for one transcript speaker. */
function speakerOf(message, bots) {
  if (message.role === 'user') return 'User'
  if (message.role === 'system') return 'System'
  const bot = bots.find((item) => item.id === message.botId)
  return bot ? bot.name : 'Bot'
}

/**
 * Whether `text` mentions one bot by `@Name` or `@id` (case-insensitive,
 * Unicode-aware word boundary).
 * @param {string} text
 * @param {object} bot
 * @returns {boolean}
 */
export function mentionsBot(text, bot) {
  const names = [bot.name, bot.id].filter((value) => typeof value === 'string' && value.length > 0)
  for (const name of names) {
    const pattern = new RegExp(`@${escapeRegExp(name)}(?![\\p{L}\\p{N}_])`, 'iu')
    if (pattern.test(text)) return true
  }
  return false
}

/**
 * Pick which bots answer one message: @mentioned room bots if any are
 * mentioned, otherwise every available room bot.
 * @param {string} text
 * @param {object[]} bots room's available bots, in room order
 * @returns {object[]}
 */
export function selectRespondingBots(text, bots) {
  const mentioned = bots.filter((bot) => mentionsBot(text, bot))
  return mentioned.length > 0 ? mentioned : bots
}

/**
 * Bots a reply pings by @Name, excluding the speaker itself. Used to chain a
 * room conversation: if AJ replies "@Ken ...", Ken answers next.
 * @param {string} text
 * @param {object[]} bots room's available bots, in room order
 * @param {string} speakerId id of the bot that wrote `text`
 * @returns {object[]}
 */
export function mentionedBots(text, bots, speakerId) {
  return bots.filter((bot) => bot.id !== speakerId && mentionsBot(text, bot))
}

/**
 * Whether a reply asks the user a question / waits for approval. Bots write
 * `@user` for this; the room pauses until the user answers.
 * @param {string} text
 * @returns {boolean}
 */
export function mentionsUser(text) {
  return /@(?:user|you)(?![\p{L}\p{N}_])/iu.test(String(text ?? ''))
}

/**
 * Which bots should answer the user's new room message.
 *
 * - explicit @Name mentions win;
 * - otherwise, if the room was waiting on the user (`room.pending`), continue
 *   the paused handoff: the queued bots, or the bot that asked when none queued;
 * - otherwise every room bot answers (original group behaviour).
 *
 * @param {{room: object, bots: object[], text: string}} input
 * @returns {object[]}
 */
export function selectTurnResponders({ room, bots, text }) {
  const pool = Array.isArray(bots) ? bots : []
  const mentioned = pool.filter((bot) => mentionsBot(text, bot))
  if (mentioned.length > 0) return mentioned
  const pending = room && room.pending
  if (pending) {
    const queued = (Array.isArray(pending.botIds) ? pending.botIds : [])
      .map((id) => pool.find((bot) => bot.id === id))
      .filter(Boolean)
    if (queued.length > 0) return queued
    const asker = pool.find((bot) => bot.id === pending.botId)
    if (asker) return [asker]
  }
  return pool
}

/** Display label for a bot. Emoji are legacy data and never enter prompts. */
function botLabel(bot) {
  return bot.name
}

/** System prompt for one bot participating in a room. */
export function buildBotSystemPrompt(bot, room, bots) {
  const others = bots.filter((item) => item.id !== bot.id)
  const handles = others.map((item) => `@${item.name}`)
  const handleList = handles.length > 1 ? `${handles.slice(0, -1).join(', ')} or ${handles.at(-1)}` : handles[0] || ''
  const lines = [
    `You are ${botLabel(bot)}, a local AI bot created by the user and living inside their DSH Web GUI on this machine.`,
    bot.instructions
      ? bot.instructions
      : 'You are a friendly, curious bot who enjoys conversation and tinkering with code.',
    `You are chatting in the group room "${room.name}" with the user${
      others.length > 0 ? ` and the other bots ${others.map((item) => botLabel(item)).join(', ')}` : ''
    }.`,
    'Stay fully in character. Reply with 2-4 short sentences of plain conversational text. No markdown, no lists, no headings, no tool calls, and no stage directions.',
    others.length > 0
      ? `Bots can ping each other. To hand your part off to another bot, mention it by its handle in your reply, for example ${handleList}. That bot will then reply next and everyone in the room sees it. Only ping a bot when you actually need its part; when you are done and have something for the user, reply without pinging anyone.`
      : 'You may address the user by name when it fits naturally.',
    'The room has a shared brief maintained by the summarizer bot. Older messages are compacted into it; trust the brief for earlier decisions instead of asking anyone to repeat them.',
    'The room runs on its own: when you @mention another bot, that bot answers automatically and you can keep handing the work along until it is finished. Never tell the user to relay a message, to ping another bot, or to ask someone else to continue — do it yourself.',
    'If you genuinely need the user to decide or approve something before you can continue, mention @user in your reply (for example "Is this plan good to build? @user") and then stop. The room waits for the user; their answer resumes the workflow automatically. Do not use @user for anything else.',
    'Once a plan or scope has been approved, carry the remaining work through the other bots to completion without asking the user again. Only use @user again if a real blocker needs their decision.',
    `Write only ${bot.name}'s next message. Never write another bot's lines.`,
  ]
  return lines.filter(Boolean).join('\n\n')
}

/**
 * Clip one transcript line to a bounded, newline-collapsed form.
 * @param {string} text
 * @returns {string}
 */
function clipLine(text) {
  const flat = text.replace(/\r?\n+/g, ' ').trim()
  return flat.length > MESSAGE_CLIP ? `${flat.slice(0, MESSAGE_CLIP - 1)}…` : flat
}

/**
 * Format the room history (excluding the newest message) as bounded text.
 * @param {object} room
 * @param {object[]} bots
 * @returns {string}
 */
export function formatTranscript(room, bots) {
  const conversation = (Array.isArray(room.transcript) ? room.transcript : []).filter(
    (message) => message && message.role !== 'system' && typeof message.text === 'string' && message.text.trim(),
  )
  const history = conversation.slice(0, -1).slice(-HISTORY_LIMIT)
  const lines = []
  let budget = HISTORY_CHARS
  for (let index = history.length - 1; index >= 0; index -= 1) {
    const message = history[index]
    const line = `${speakerOf(message, bots)}: ${clipLine(message.text)}`
    if (line.length > budget) break
    budget -= line.length
    lines.unshift(line)
  }
  return lines.join('\n')
}

/**
 * User-role prompt for one bot's reply: bounded transcript + the message that
 * triggered this reply (from the user or from another bot that pinged it).
 * @param {{bot: object, room: object, bots: object[], latest?: object, latestText?: string}} input
 * @returns {string}
 */
export function buildRoomUserPrompt({ bot, room, bots, latest, latestText, resuming = false }) {
  const history = formatTranscript(room, bots)
  const message = latest || { role: 'user', text: latestText || '' }
  const speaker = speakerOf(message, bots)
  const parts = []
  parts.push(`Group room: ${room.name}`)
  const brief = room.summary && typeof room.summary.text === 'string' ? room.summary.text.trim() : ''
  parts.push(
    brief
      ? `Shared brief (maintained by the room summarizer; read this first):\n${brief}`
      : 'Shared brief: none yet — the room is still short, use the recent messages below.',
  )
  if (history) {
    parts.push(`Recent conversation:\n${history}`)
  }
  parts.push(
    speaker === 'User' || speaker === 'System'
      ? `Latest message from the user:\n${clipLine(message.text)}`
      : `Latest message from ${speaker}:\n${clipLine(message.text)}`,
  )
  if (resuming) {
    parts.push(
      'The user is answering the question the room was waiting on. Continue the workflow from here without asking the user to prompt the next bot.',
    )
  }
  parts.push(
    speaker === 'User'
      ? `Write ${bot.name}'s next reply now. 2-4 short sentences, in character, plain text only. Do not repeat the transcript or label the message.`
      : `${speaker} pinged you. Do your part of the work in character and reply now. 2-4 short sentences, plain text only. Do not repeat the transcript or label the message.`,
  )
  return parts.join('\n\n')
}

/**
 * Convert one model reply into safe transcript text: flat, bounded, and never
 * empty.
 * @param {string} text
 * @param {number} max
 * @returns {string}
 */
export function cleanReply(text, max) {
  const flat = String(text ?? '')
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, '')
    .replace(/\r\n?/g, '\n')
    .trim()
  if (!flat) return ''
  return flat.length > max ? `${flat.slice(0, max - 1)}…` : flat
}
