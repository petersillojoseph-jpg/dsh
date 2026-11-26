/**
 * Shared plugin state behind `registerBots`.
 *
 * One registry object is created per `apply()` and handed to every registered
 * surface (sidebar, header chrome, room layer, overlay dialogs) so they all
 * read the same bot list, the same navigation store and the same store-backed
 * dialogs. React state lives here exactly once; components subscribe through
 * `useSyncExternalStore`, so the cached snapshots stay referentially stable
 * and re-renders only happen on a real change.
 *
 * Nothing in here talks to the network: `BotsRoot` owns loading and mutations
 * through `api.js` and publishes the results here.
 */
import React from 'react'
import { createSidebarNav } from './nav-context.js'
import { normalizeNavState, restoreNavState, persistNavState } from './nav.js'

/** Store shape for the bot/room data. */
function createDataStore() {
  let state = { status: 'idle', bots: [], rooms: [], model: null, error: null, revision: 0 }
  const listeners = new Set()
  const publish = (next) => {
    const merged = { ...state, ...next }
    if (merged.revision === state.revision) merged.revision = state.revision + 1
    state = merged
    for (const listener of Array.from(listeners)) {
      try {
        listener()
      } catch {
        /* ignore subscriber failures */
      }
    }
  }
  return {
    getState: () => state,
    subscribe(listener) {
      listeners.add(listener)
      return () => listeners.delete(listener)
    },
    set(patch) {
      publish(patch)
    },
    updateRoom(room) {
      if (!room || !room.id) return
      publish({ rooms: state.rooms.map((candidate) => (candidate.id === room.id ? room : candidate)) })
    },
  }
}

/** Store shape for the dialog stack. */
function createDialogStore() {
  let state = {
    botDialog: null, // { mode: 'create' | 'edit', botId }
    roomDialog: null, // { botIds: string[] }
    studio: null, // { botId }
    confirm: null, // { kind: 'bot'|'room', id }
    detail: null, // { botId }
    settingsNotice: false, // the footer Settings affordance (see SettingsNotice.jsx)
    busy: false,
  }
  const listeners = new Set()
  const publish = (next) => {
    state = next
    for (const listener of Array.from(listeners)) {
      try {
        listener()
      } catch {
        /* ignore subscriber failures */
      }
    }
  }
  return {
    getState: () => state,
    subscribe(listener) {
      listeners.add(listener)
      return () => listeners.delete(listener)
    },
    dispatch(action) {
      if (!action || typeof action.type !== 'string') return
      switch (action.type) {
        case 'edit-bot':
          publish({ ...state, studio: null, confirm: null, detail: null, botDialog: { mode: action.botId ? 'edit' : 'create', botId: action.botId || null } })
          break
        case 'create-room':
          publish({ ...state, roomDialog: { botIds: Array.isArray(action.botIds) ? action.botIds : [] } })
          break
        case 'avatar-studio':
          publish({ ...state, botDialog: null, confirm: null, studio: { botId: action.botId } })
          break
        case 'confirm-delete-bot':
          publish({ ...state, confirm: { kind: 'bot', id: action.botId } })
          break
        case 'confirm-delete-room':
          publish({ ...state, confirm: { kind: 'room', id: action.roomId } })
          break
        case 'close-bot-dialog':
          publish({ ...state, botDialog: null })
          break
        case 'close-room-dialog':
          publish({ ...state, roomDialog: null })
          break
        case 'close-studio':
          publish({ ...state, studio: null })
          break
        case 'close-confirm':
          publish({ ...state, confirm: null })
          break
        case 'open-settings':
          publish({ ...state, settingsNotice: true })
          break
        case 'close-settings':
          publish({ ...state, settingsNotice: false })
          break
        case 'busy':
          publish({ ...state, busy: !!action.busy })
          break
        case 'close-all':
          publish({ botDialog: null, roomDialog: null, studio: null, confirm: null, detail: null, settingsNotice: false, busy: state.busy })
          break
        default:
          break
      }
    },
  }
}

/** Store shape for the room reply lifecycle (so the sidebar can show "replying"). */
function createBusyStore() {
  let state = { roomId: null, busy: false }
  const listeners = new Set()
  return {
    getState: () => state,
    subscribe(listener) {
      listeners.add(listener)
      return () => listeners.delete(listener)
    },
    set(next) {
      const merged = { ...state, ...next }
      if (merged.roomId === state.roomId && merged.busy === state.busy) return
      state = merged
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

/** Store shape for toasts. */
function createToastStore() {
  let state = { toasts: [] }
  let seq = 0
  const listeners = new Set()
  const publish = () => {
    for (const listener of Array.from(listeners)) {
      try {
        listener()
      } catch {
        /* ignore */
      }
    }
  }
  return {
    getState: () => state,
    subscribe(listener) {
      listeners.add(listener)
      return () => listeners.delete(listener)
    },
    push(message, tone = 'info', ttl) {
      if (!message) return null
      const id = ++seq
      state = { toasts: [...state.toasts.slice(-2), { id, message, tone }] }
      publish()
      window.setTimeout(
        () => {
          state = { toasts: state.toasts.filter((toast) => toast.id !== id) }
          publish()
        },
        typeof ttl === 'number' ? ttl : tone === 'error' ? 6000 : 3600,
      )
      return id
    },
    dismiss(id) {
      state = { toasts: state.toasts.filter((toast) => toast.id !== id) }
      publish()
    },
  }
}

/**
 * Register a stable selector hook over one of these stores.
 * @param {{getState: Function, subscribe: Function}} store
 */
function hookFor(store) {
  return function useStore(selector) {
    const subscribe = React.useCallback((listener) => store.subscribe(listener), [store])
    const getSnapshot = React.useCallback(() => store.getState(), [store])
    const snapshot = React.useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
    return typeof selector === 'function' ? selector(snapshot) : snapshot
  }
}

/**
 * Build the plugin registry.
 * @param {object} ctx client cordis context
 */
export function createRegistry(ctx) {
  const nav = createSidebarNav(restoreNavState() || null)
  const botsStore = createDataStore()
  const dialogs = createDialogStore()
  const busy = createBusyStore()
  const toastStore = createToastStore()

  // Persist the navigation (survives a reload of the page, not of the app).
  let lastSaved = null
  nav.subscribe((state) => {
    try {
      const serialized = JSON.stringify(state)
      if (serialized === lastSaved) return
      lastSaved = serialized
      persistNavState(normalizeNavState(state))
    } catch {
      /* persistence is best effort */
    }
  })

  const registry = {
    ctx,
    nav,
    botsStore,
    dialogs,
    busy,
    toastStore,
    useNav: null,
    useBots: null,
    useDialogs: null,
    useBusy: null,
    useBusyWatch: null,
    useToasts: null,
    bots: {
      updateRoom: (room) => botsStore.updateRoom(room),
    },
    toast: (message, tone) => toastStore.push(message, tone),
    reload: () => {},
    notify: () => {},
  }

  registry.useNav = hookFor(nav)
  registry.useBots = hookFor(botsStore)
  registry.useDialogs = hookFor(dialogs)
  registry.useBusy = hookFor(busy)
  registry.useToasts = hookFor(toastStore)

  return registry
}
