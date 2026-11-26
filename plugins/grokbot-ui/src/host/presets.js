/**
 * Lifecycle of one live agent preset per bot.
 *
 * The preset registry's `register()` is async and returns an async disposer.
 * Operations are serialized per bot so a rapid save/delete sequence cannot
 * register two presets with the same id or dispose one that is still being
 * registered. A failure for one bot is logged and never breaks the plugin.
 */
import { buildPresetDefinition, presetIdFor } from './preset-tools.js'

/**
 * Serialize async work per key (a promise chain that swallows failures).
 * @param {Map<string, Promise<void>>} tails
 * @param {string} key
 * @param {() => Promise<T>} work
 * @returns {Promise<T>}
 * @template T
 */
function serialize(tails, key, work) {
  const previous = tails.get(key) ?? Promise.resolve()
  const run = previous.then(work)
  const guard = run.then(
    () => undefined,
    () => undefined,
  )
  tails.set(key, guard)
  guard.then(() => {
    if (tails.get(key) === guard) tails.delete(key)
  })
  return run
}

/**
 * Create the preset manager.
 *
 * @param {{ctx: any, log: {info: Function, warn: Function, error: Function}}} options
 * @returns {{
 *   syncAll: (bots: object[]) => Promise<void>,
 *   register: (bot: object, order?: number) => Promise<{ok: boolean, error?: string}>,
 *   remove: (botId: string) => Promise<void>,
 *   disposeAll: () => Promise<void>,
 *   status: () => {registered: string[], failed: {id: string, error: string}[]},
 * }}
 */
export function createPresetManager({ ctx, log, getBots }) {
  /** botId -> dispose promise returned by agentPresets.register */
  const disposers = new Map()
  /** botId -> last registration failure for that preset */
  const failures = new Map()
  /** botId -> serialization tail */
  const tails = new Map()
  let disposed = false

  const registry = () => {
    try {
      return typeof ctx.get === 'function' ? ctx.get('agentPresets') : ctx.agentPresets
    } catch {
      return undefined
    }
  }

  /**
   * Dispose one bot's preset, awaiting registry teardown.
   * @param {string} botId
   */
  async function disposeOne(botId) {
    const dispose = disposers.get(botId)
    disposers.delete(botId)
    if (!dispose) return
    try {
      await dispose()
    } catch (error) {
      log.warn(`[grokbot-ui] failed to dispose preset for bot "${botId}"`, error)
    }
  }

  /**
   * (Re)register one bot's preset. Resolves with a status object instead of
   * throwing so a single broken bot cannot fail an HTTP request.
   * @param {object} bot
   * @param {number} [order]
   * @returns {Promise<{ok: boolean, error?: string}>}
   */
  function register(bot, order = 100) {
    return serialize(tails, bot.id, async () => {
      const presetId = presetIdFor(bot.id)
      const fail = (error) => {
        failures.set(bot.id, { id: presetId, error: String(error) })
        return { ok: false, error: String(error) }
      }
      const presets = registry()
      if (!presets || typeof presets.register !== 'function') {
        log.warn('[grokbot-ui] agentPresets service unavailable; preset not registered')
        return fail('agent preset service is unavailable')
      }
      await disposeOne(bot.id)
      if (disposed) return fail('plugin is shutting down')
      let definition
      try {
        const allBots = typeof getBots === 'function' ? getBots() : [bot]
        definition = buildPresetDefinition(bot, order, allBots)
      } catch (error) {
        log.warn(`[grokbot-ui] could not build preset for bot "${bot.id}"`, error)
        return fail(error?.message ?? 'invalid bot')
      }
      try {
        const dispose = await presets.register(definition)
        if (typeof dispose === 'function') {
          disposers.set(bot.id, dispose)
          failures.delete(bot.id)
        } else {
          log.warn(`[grokbot-ui] preset registry returned no disposer for "${definition.id}"`)
          return fail('preset registry returned no disposer')
        }
        log.info(`[grokbot-ui] agent preset "${definition.id}" registered`)
        return { ok: true }
      } catch (error) {
        // Registration rejects only for composition-level mistakes (duplicate
        // id, bad rows); report but keep the bot and the rest of the app alive.
        log.warn(`[grokbot-ui] failed to register agent preset "${presetId}"`, error)
        return fail(error?.message ?? 'preset registration failed')
      }
    })
  }

  /**
   * Remove one bot's preset.
   * @param {string} botId
   * @returns {Promise<void>}
   */
  function remove(botId) {
    return serialize(tails, botId, async () => {
      await disposeOne(botId)
      failures.delete(botId)
    })
  }

  /**
   * Reconcile the registry with the stored bots: register/refresh every stored
   * bot in order and dispose presets for bots that no longer exist.
   * @param {object[]} bots
   * @returns {Promise<void>}
   */
  async function syncAll(bots) {
    const list = Array.isArray(bots) ? bots : []
    for (const [index, bot] of list.entries()) {
      try {
        await register(bot, 100 + index)
      } catch (error) {
        log.warn(`[grokbot-ui] preset sync failed for bot "${bot?.id}"`, error)
      }
    }
    const wanted = new Set(list.map((bot) => bot.id))
    for (const botId of [...disposers.keys()]) {
      if (!wanted.has(botId)) await remove(botId)
    }
  }

  /** Dispose every preset owned by this plugin instance. */
  async function disposeAll() {
    disposed = true
    const ids = [...disposers.keys()]
    await Promise.all(ids.map((botId) => remove(botId)))
  }

  /**
   * Live preset state for the health endpoint: registered preset ids plus the
   * last failure per bot. Read from the manager itself, not from the bot store.
   * @returns {{registered: string[], failed: {id: string, error: string}[]}}
   */
  function status() {
    const registered = [...disposers.keys()].map((botId) => presetIdFor(botId)).sort()
    const failed = [...failures.values()]
      .map((entry) => ({ id: entry.id, error: entry.error }))
      .sort((a, b) => a.id.localeCompare(b.id))
    return { registered, failed }
  }

  return { syncAll, register, remove, disposeAll, status }
}
