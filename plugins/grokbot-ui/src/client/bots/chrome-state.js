/**
 * Chrome state shared by the header decorations.
 *
 * The `← Bot` breadcrumb in the conversation header needs two facts that only
 * the sidebar knows: whether a bot's chat list is open, and which Session the
 * main column is showing. Both are published here by the sidebar/room owners
 * through the plugin registry, so the header never has to guess.
 *
 * Deliberately tiny: `{ botId, botName, sessionId, roomId, section, open }`, published with a
 * stable snapshot so `useSyncExternalStore` does not loop.
 */
export const EMPTY_CHROME = Object.freeze({ botId: null, botName: null, sessionId: null, roomId: null, section: 'assistants', open: false })

export function createChromeStore() {
  let state = EMPTY_CHROME
  const listeners = new Set()

  const same = (a, b) =>
    a.botId === b.botId &&
    a.botName === b.botName &&
    a.sessionId === b.sessionId &&
    a.roomId === b.roomId &&
    a.section === b.section &&
    a.open === b.open

  return {
    getState: () => state,
    subscribe(listener) {
      listeners.add(listener)
      return () => listeners.delete(listener)
    },
    set(next) {
      const merged = { ...EMPTY_CHROME, ...next }
      if (same(state, merged)) return
      state = Object.freeze(merged)
      for (const listener of Array.from(listeners)) {
        try {
          listener()
        } catch {
          /* ignore */
        }
      }
    },
  }
}
