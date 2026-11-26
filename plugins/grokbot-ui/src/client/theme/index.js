/**
 * Grokbot UI — theme installer.
 *
 * Applies the Rakazo product visual language on top of whichever shipped
 * palette the user prefers:
 *  - stacks per-mode token overrides (`{ light, dark }` pairs) through
 *    `ctx.theme.overrideTokens`, so system / light / dark all keep working and
 *    no theme preference is ever written, and
 *  - injects the global stylesheet (`grok.css`) once.
 *
 * The host client entry calls `installTheme(ctx)` from its `apply()`. The
 * entry must provide the `theme` service; every step is defensive so a theme
 * API mismatch can never take the app down.
 *
 * @module @local/grokbot-ui/theme
 */
import grokCss from './grok.css'
import { TOKEN_COUNT, TOKEN_OVERRIDES } from './tokens.js'

/** Override-layer source id (one layer per plugin). */
const OVERRIDE_SOURCE = '@local/grokbot-ui'
/** Diagnostics prefix. */
const LOG_PREFIX = '[grokbot-ui/theme]'

/**
 * Install the token override layer and the global stylesheet.
 * @param {object} ctx - client cordis context exposing `theme` and `effect`.
 * @returns {() => void} composite disposer (also owned by `ctx.effect`).
 */
export function installTheme(ctx) {
  if (!ctx || typeof ctx !== 'object') return () => {}

  /** @type {Array<() => void>} */
  const disposers = []

  // --- global stylesheet ----------------------------------------------------
  try {
    const disposeStyle = ctx.effect(() => {
      if (typeof document === 'undefined') return () => {}
      const style = document.createElement('style')
      style.dataset.grokbotTheme = 'rakazo'
      style.textContent = grokCss
      document.head.appendChild(style)
      return () => {
        style.remove()
      }
    }, `${LOG_PREFIX}: stylesheet`)
    if (typeof disposeStyle === 'function') disposers.push(disposeStyle)
  } catch (error) {
    console.warn(`${LOG_PREFIX} stylesheet injection skipped`, error)
  }

  // --- one-time repair of a stale theme preference -------------------------
  // Older experimental builds of this plugin registered and forced a custom
  // `grok` theme. That id is gone now, so a browser that persisted it would
  // fall back to the built-in default and ignore the user's system choice.
  try {
    const snapshot = typeof ctx.theme?.getTheme === 'function' ? ctx.theme.getTheme() : null
    const preference = snapshot && typeof snapshot.preference === 'string' ? snapshot.preference : ''
    const known = Array.isArray(snapshot?.themes) ? snapshot.themes.map((theme) => theme && theme.id) : []
    if (preference && !['system', 'light', 'dark'].includes(preference) && !known.includes(preference)) {
      ctx.theme.setTheme('system')
    }
  } catch (error) {
    console.warn(`${LOG_PREFIX} could not repair a stale theme preference`, error)
  }

  // --- per-mode token overrides --------------------------------------------
  if (!ctx.theme || typeof ctx.theme.overrideTokens !== 'function') {
    console.warn(`${LOG_PREFIX} the client is missing the theme service; stylesheet active, tokens not overridden`)
    return disposeComposite(disposers)
  }

  try {
    const disposeTokens = ctx.effect(() => {
      try {
        const dispose = ctx.theme.overrideTokens(OVERRIDE_SOURCE, TOKEN_OVERRIDES)
        return typeof dispose === 'function' ? dispose : () => {}
      } catch (error) {
        console.warn(`${LOG_PREFIX} token override layer skipped`, error)
        return () => {}
      }
    }, `${LOG_PREFIX}: ${TOKEN_COUNT} token roles`)
    if (typeof disposeTokens === 'function') disposers.push(disposeTokens)
  } catch (error) {
    console.warn(`${LOG_PREFIX} theme service unavailable`, error)
  }

  return disposeComposite(disposers)
}

/**
 * Combine disposers into one idempotent function.
 * @param {Array<() => void>} disposers - disposers to run in reverse order.
 * @returns {() => void} composite disposer.
 */
function disposeComposite(disposers) {
  let disposed = false
  return () => {
    if (disposed) return
    disposed = true
    for (let index = disposers.length - 1; index >= 0; index -= 1) {
      try {
        disposers[index]()
      } catch (error) {
        console.warn(`${LOG_PREFIX} disposer failed`, error)
      }
    }
  }
}

export default installTheme
