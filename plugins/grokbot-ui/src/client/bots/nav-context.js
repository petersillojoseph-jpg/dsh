/**
 * React binding for the sidebar navigation store (nav.js).
 *
 * One store instance lives in the plugin's shared `registry`, so the sidebar,
 * the header breadcrumb and the room layer all see the same navigation. The
 * store is a plain observable outside React (unit-testable); this module only
 * turns it into a hook.
 */
import React from 'react'
import { createNavStore } from './nav.js'

/** Subscribe to a nav store and re-render on every change. */
export function useNavState(store) {
  const subscribe = React.useCallback((listener) => store.subscribe(listener), [store])
  const getSnapshot = React.useCallback(() => store.getState(), [store])
  return React.useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
}

/** The store's actions, bound once. */
export function navActions(store) {
  return {
    selectSection: (section) => store.dispatch({ type: 'select-section', section }),
    toggleBot: (botId) => store.dispatch({ type: 'toggle-bot', botId }),
    openBot: (botId) => store.dispatch({ type: 'open-bot', botId }),
    collapseBot: () => store.dispatch({ type: 'collapse-bot' }),
    selectSession: (sessionId) => store.dispatch({ type: 'select-session', sessionId }),
    syncSession: (sessionId) => store.dispatch({ type: 'sync-session', sessionId }),
    openRoom: (roomId) => store.dispatch({ type: 'open-room', roomId }),
    closeRoom: () => store.dispatch({ type: 'close-room' }),
    setQuery: (query) => store.dispatch({ type: 'set-query', query }),
  }
}

/**
 * Create the plugin's navigation store.
 * @param {object} [initial] restored state; defaults to the first-run state
 */
export function createSidebarNav(initial) {
  return createNavStore(initial)
}
