/**
 * Grokbot UI — browser entry.
 *
 * One plugin bundle owns:
 *  - the Rakazo product visual layer (theme token layer + global styles)
 *  - a small amount of app chrome (wordmark, background)
 *  - the Grokbot sidebar: it takes over the layout-owned `sidebar` slot, so the
 *    assistant directory stays on screen beside DSH's native Conversation
 *  - in-chat bot identity (avatar chip + `← Bot` breadcrumb for bot sessions)
 *
 * Every module owns its own cleanup through ctx.effect / the slot registry.
 */
import { installTheme } from './theme/index.js'
import { installChrome } from './decorations/index.js'
import { registerBots } from './bots/index.jsx'
import { installIdentity } from './identity/index.jsx'

export const inject = ['slots', 'theme', 'layout', 'uiWorkspace', 'sessions', 'shortcuts']

export function apply(ctx) {
  installTheme(ctx)
  installChrome(ctx)
  const bots = registerBots(ctx)
  try {
    installIdentity(ctx, bots ? bots.registry : null)
  } catch (error) {
    console.warn('[grokbot-ui] identity decorations skipped', error)
  }
}
