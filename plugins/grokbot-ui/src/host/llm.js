/**
 * One-shot local model calls for group-room replies.
 *
 * The room reply is a hand-built request (system prompt + user prompt), streamed
 * through the host's `ctx.llm` service. `BlockAssembler` from
 * `@deepseek-ai/dsh-llm` joins the raw stream chunks back into text; because a
 * bundle installed outside the DSH tree may not resolve `@deepseek-ai/*` through
 * Node directly, the import goes through `importDshPackage` and falls back to a
 * tiny text-delta collector that produces the same result for plain chat.
 */
import { importDshPackage, cleanText } from './util.js'

/** Friendly in-character replies when the model cannot answer. */
export const FRIENDLY = {
  noModel: "I can't reply right now — no default model is selected in DSH. Pick one in settings and ping me again.",
  error: 'My local model call failed just now. Give me a moment and try again.',
  aborted: 'I got interrupted before I could finish that thought — say that again?',
  empty: "I'm here, but I couldn't find the right words that time. Try rephrasing?",
}

/** Chat requests stay short: this bounds wall-clock cost per bot reply. */
const REPLY_MAX_TOKENS = 1024
/** Hard timeout for one room reply (ms). */
export const REPLY_TIMEOUT_MS = 150_000

/** Cached promise for the BlockAssembler constructor (or null). */
let assemblerCtorPromise = null

/**
 * Resolve `BlockAssembler` from the running DSH install.
 * @param {any} ctx cordis context
 * @returns {Promise<Function|null>}
 */
async function getAssemblerCtor(ctx) {
  if (assemblerCtorPromise === null) {
    assemblerCtorPromise = (async () => {
      try {
        const mod = await importDshPackage('@deepseek-ai/dsh-llm', ctx)
        return typeof mod?.BlockAssembler === 'function' ? mod.BlockAssembler : null
      } catch {
        return null
      }
    })()
  }
  return assemblerCtorPromise
}

/**
 * Collector backed by the official canonical assembler.
 * @param {Function} Ctor BlockAssembler constructor
 */
function officialCollector(Ctor) {
  const assembler = new Ctor()
  return {
    push(chunk) {
      try {
        assembler.push(chunk)
      } catch {
        /* a malformed chunk must not abort the whole reply */
      }
    },
    text() {
      try {
        return assembler
          .blocks()
          .filter((block) => block && block.type === 'text' && typeof block.text === 'string')
          .map((block) => block.text)
          .join('')
      } catch {
        return ''
      }
    },
    finish() {
      try {
        return assembler.finish
      } catch {
        return { kind: 'stop' }
      }
    },
  }
}

/**
 * Minimal fallback assembler: joins text deltas per block index and remembers
 * the terminal finish reason. Only used when the canonical assembler is not
 * reachable from the bundle.
 */
function fallbackCollector() {
  /** index -> accumulated text */
  const parts = new Map()
  let finish = { kind: 'stop' }
  return {
    push(chunk) {
      if (!chunk || typeof chunk !== 'object') return
      if (chunk.type === 'text-delta' && typeof chunk.text === 'string') {
        const index = Number.isInteger(chunk.index) ? chunk.index : 0
        parts.set(index, (parts.get(index) ?? '') + chunk.text)
      } else if (chunk.type === 'block-end' && chunk.block?.type === 'text' && typeof chunk.block.text === 'string') {
        const index = Number.isInteger(chunk.index) ? chunk.index : 0
        parts.set(index, chunk.block.text)
      } else if (chunk.type === 'finish' && chunk.reason) {
        finish = chunk.reason
      }
    },
    text() {
      return [...parts.entries()]
        .sort(([a], [b]) => a - b)
        .map(([, value]) => value)
        .join('')
    },
    finish() {
      return finish
    },
  }
}

/**
 * Create a chunk collector for one request.
 * @param {any} ctx cordis context
 */
export async function createChunkCollector(ctx) {
  const Ctor = await getAssemblerCtor(ctx)
  return Ctor ? officialCollector(Ctor) : fallbackCollector()
}

/**
 * Read the current default model selection defensively.
 * @param {any} ctx cordis context
 * @returns {{provider: string, model: string, reasoningEffort?: string}|null}
 */
export function currentModelSelection(ctx) {
  try {
    const service = typeof ctx.get === 'function' ? ctx.get('agentDefaultModel') : ctx.agentDefaultModel
    const selection = service?.currentSelection?.()
    if (!selection || typeof selection.provider !== 'string' || typeof selection.model !== 'string') return null
    if (!selection.provider || !selection.model) return null
    const result = { provider: selection.provider, model: selection.model }
    if (typeof selection.reasoningEffort === 'string' && selection.reasoningEffort) {
      result.reasoningEffort = selection.reasoningEffort
    }
    return result
  } catch {
    return null
  }
}

/**
 * Ask the local model for one bot reply.
 *
 * Never rejects: every failure becomes a friendly reply string so a room send
 * still produces a valid transcript.
 *
 * @param {{ctx: any, log: {warn: Function}, bot: object, system: string, prompt: string, signal?: AbortSignal}} input
 * @returns {Promise<{ok: boolean, text: string, error?: string}>}
 */
export async function generateBotReply({ ctx, log, bot, system, prompt, signal }) {
  const selection = currentModelSelection(ctx)
  if (!selection) {
    return { ok: false, error: 'no-default-model', text: FRIENDLY.noModel }
  }

  let llm
  try {
    llm = typeof ctx.get === 'function' ? ctx.get('llm') : ctx.llm
  } catch {
    llm = ctx.llm
  }
  if (!llm || typeof llm.stream !== 'function') {
    return { ok: false, error: 'llm-unavailable', text: FRIENDLY.error }
  }

  const collector = await createChunkCollector(ctx)
  const options = {
    provider: selection.provider,
    model: selection.model,
    system,
    messages: [{ role: 'user', content: [{ type: 'text', text: prompt }] }],
    maxTokens: REPLY_MAX_TOKENS,
    signal,
  }
  if (selection.reasoningEffort) options.reasoningEffort = selection.reasoningEffort

  try {
    for await (const chunk of llm.stream(options)) collector.push(chunk)
  } catch (error) {
    log?.warn?.(`[grokbot-ui] model call for bot "${bot?.id}" failed`, error)
    return { ok: false, error: error?.message ?? 'stream failed', text: FRIENDLY.error }
  }

  const finish = collector.finish?.() ?? { kind: 'stop' }
  if (finish && (finish.kind === 'error' || finish.kind === 'aborted')) {
    const text = finish.kind === 'aborted' ? FRIENDLY.aborted : FRIENDLY.error
    return { ok: false, error: finish.kind, text }
  }

  let text = ''
  try {
    text = collector.text()
  } catch {
    text = ''
  }
  text = cleanText(text, 4000)
  if (!text) return { ok: false, error: 'empty-reply', text: FRIENDLY.empty }
  return { ok: true, text }
}
