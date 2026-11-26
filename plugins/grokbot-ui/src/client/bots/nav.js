/**
 * Sidebar navigation store — pure, React-free, unit-testable.
 *
 * The Grokbot sidebar is the layout-owned `sidebar` slot occupant, so it is a
 * SIBLING of the main column and never unmounts while you move between chats.
 * That makes it the owner of one small piece of UI state: what the sidebar is
 * showing (which bot's chat list is expanded, which room is open in the main
 * column, the search query). The main column keeps its own state (the selected
 * Session) — this store deliberately does not mirror it.
 *
 * Shape:
 *
 *   {
 *     section: 'assistants' | 'rooms' | 'chats',
 *     botId: string | null,      // expanded bot in the assistants section
 *     roomId: string | null,     // room open in the main column
 *     sessionId: string | null,  // currently selected Session (derived + click echo)
 *     query: string,             // the one search field
 *   }
 *
 * `splitSessions()` maps the DSH Session list onto the sidebar's two buckets:
 * bot DMs (one per bot) and every other Session ("All chats"). It never drops a
 * row: a DM whose bot was deleted falls into `orphans` and still renders under a
 * "(deleted)" group.
 */

export const BOT_PRESET_PREFIX = 'grokbot-'

export const SECTIONS = Object.freeze(['assistants', 'rooms', 'chats'])

/** Source id the main column uses when it retains the visible Conversation. */
const MAIN_VIEW_SOURCE = 'mainView'

/** Initial navigation state. */
export function initialNavState() {
  return {
    section: 'assistants',
    botId: null,
    roomId: null,
    sessionId: null,
    query: '',
  }
}

function isSection(value) {
  return typeof value === 'string' && SECTIONS.includes(value)
}

function nullableString(value) {
  return typeof value === 'string' && value ? value : null
}

/** Clamp any partial patch onto a valid state (used by every action and by restore). */
export function normalizeNavState(raw) {
  const base = initialNavState()
  if (!raw || typeof raw !== 'object') return base
  return {
    section: isSection(raw.section) ? raw.section : base.section,
    botId: nullableString(raw.botId),
    roomId: nullableString(raw.roomId),
    sessionId: nullableString(raw.sessionId),
    query: typeof raw.query === 'string' ? raw.query : '',
  }
}

const hasWindow = () => typeof window !== 'undefined'

/**
 * @typedef {(state: object) => object} NavReducer
 */

const REDUCERS = {
  /** Show a section without changing the expanded bot/room. */
  'select-section': (state, { section }) =>
    isSection(section) ? { ...state, section, query: '' } : state,

  /**
   * Click a bot row.
   *
   * - a different bot always expands that bot's chat list;
   * - the already-expanded bot collapses its list (a second click), and the
   *   Session shown in the main column is NOT changed.
   */
  'toggle-bot': (state, { botId }) => {
    const id = nullableString(botId)
    if (!id) return state
    if (state.section === 'assistants' && state.botId === id) {
      return { ...state, botId: null }
    }
    return { ...state, section: 'assistants', botId: id }
  },

  /** Explicitly expand one bot (breadcrumb, "New chat with X"). */
  'open-bot': (state, { botId }) => {
    const id = nullableString(botId)
    if (!id) return state
    return { ...state, section: 'assistants', botId: id }
  },

  /** Collapse the inline chat list but keep the selection. */
  'collapse-bot': (state) =>
    state.section === 'assistants' && state.botId !== null ? { ...state, botId: null } : state,

  /** A Session row was activated: keep the owner's list open, mark the selection. */
  'select-session': (state, { sessionId }) => {
    const id = nullableString(sessionId)
    return { ...state, sessionId: id, roomId: null }
  },

  /**
   * The retention-derived selection changed (the user can also start chats from
   * the main column). The section is NOT forced: opening a chat from a bot list
   * must leave that list on screen while the main column swaps.
   */
  'sync-session': (state, { sessionId }) => {
    const id = nullableString(sessionId)
    return id === state.sessionId ? state : { ...state, sessionId: id, roomId: null }
  },

  /** Open a room in the main column (clears the room highlight only via `close-room`). */
  'open-room': (state, { roomId }) => {
    const id = nullableString(roomId)
    if (!id) return state
    return { ...state, roomId: id, section: 'rooms', botId: null }
  },

  'close-room': (state) => (state.roomId === null ? state : { ...state, roomId: null }),

  'set-query': (state, { query }) => {
    const next = typeof query === 'string' ? query : ''
    return next === state.query ? state : { ...state, query: next }
  },
}

/**
 * Apply one action.
 * @param {object} state current nav state
 * @param {{type: string, [key: string]: any}} action
 * @returns {object} next state (same reference when nothing changed)
 */
export function navReducer(state, action) {
  if (!action || typeof action !== 'object') return state
  const reducer = REDUCERS[action.type]
  if (!reducer) return state
  const current = normalizeNavState(state)
  const next = normalizeNavState(reducer(current, action))
  // Identity is the "nothing changed" signal every subscriber relies on.
  return sameState(current, next) ? state : next
}

/**
 * Create a tiny observable store.
 * @param {object} [initial] restored state (invalid input falls back to the first-run state)
 */
export function createNavStore(initial) {
  let state = normalizeNavState(initial)
  const listeners = new Set()

  const store = {
    getState() {
      return state
    },
    subscribe(listener) {
      if (typeof listener !== 'function') return () => {}
      listeners.add(listener)
      return () => listeners.delete(listener)
    },
    dispatch(action) {
      const next = navReducer(state, action)
      if (next === state) return state
      const previous = state
      state = next
      for (const listener of Array.from(listeners)) {
        try {
          listener(state, previous)
        } catch {
          /* a broken subscriber must not break navigation */
        }
      }
      return state
    },
    /** Replace the whole state (used once by the restore-from-sessionStorage effect). */
    replace(next) {
      const normalized = normalizeNavState(next)
      if (sameState(normalized, state)) return state
      state = normalized
      for (const listener of Array.from(listeners)) {
        try {
          listener(state)
        } catch {
          /* ignore */
        }
      }
      return state
    },
  }

  return store
}

function sameState(a, b) {
  return (
    a.section === b.section &&
    a.botId === b.botId &&
    a.roomId === b.roomId &&
    a.sessionId === b.sessionId &&
    a.query === b.query
  )
}

/* -------------------------------------------------------------------------- */
/* Session reading                                                            */
/* -------------------------------------------------------------------------- */

/** `grokbot-<id>` → `<id>`, else null. */
export function botIdForPreset(preset) {
  if (typeof preset !== 'string' || !preset.startsWith(BOT_PRESET_PREFIX)) return null
  const id = preset.slice(BOT_PRESET_PREFIX.length)
  return id ? id : null
}

/** The preset a Session was created with, from either projection carrier. */
export function presetForSession(sessionsState, sessionId) {
  if (!sessionsState || !sessionId) return undefined
  const projections = sessionsState.projectionsBySession || {}
  const projection = projections[sessionId]
  const fromProjection =
    projection && projection.values ? projection.values.agentPreset : undefined
  if (typeof fromProjection === 'string' && fromProjection) return fromProjection
  const summary = sessionsState.byId ? sessionsState.byId[sessionId] : undefined
  const fromSummary = summary && summary.projectionValues ? summary.projectionValues.agentPreset : undefined
  return typeof fromSummary === 'string' && fromSummary ? fromSummary : undefined
}

/** Every listed Session as a plain object with `id`, newest first. */
export function sessionRows(sessionsState) {
  if (!sessionsState || !Array.isArray(sessionsState.ids) || !sessionsState.byId) return []
  const rows = []
  for (const id of sessionsState.ids) {
    const summary = sessionsState.byId[id]
    if (!summary) continue
    rows.push({
      ...summary,
      id,
      agentPreset: presetForSession(sessionsState, id),
    })
  }
  return rows.sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0))
}

/**
 * Split the Session list into bot DMs and everything else.
 *
 * Blank Sessions are included (a freshly started "New chat with X" must show
 * highlighted under X), but their falsey titles are handled by the label helper.
 *
 * @param {object|null} sessionsState SessionListState (`useSessions` snapshot)
 * @param {string[]} botIds ids of the bots that still exist
 * @param {Map<string, object>|null} [statusMap] `useSessionStatus` snapshot (live runs)
 * @returns {{byBot: Map<string, any[]>, orphans: Map<string, any[]>, others: any[], all: any[], activity: Map<string, any>}}
 */
export function splitSessions(sessionsState, botIds, statusMap) {
  const known = new Set((Array.isArray(botIds) ? botIds : []).filter(Boolean))
  const rows = sessionRows(sessionsState)
  const byBot = new Map()
  const orphans = new Map()
  const others = []
  const activity = new Map()

  for (const row of rows) {
    const botId = botIdForPreset(row.agentPreset)
    if (botId === null) {
      others.push(row)
      continue
    }
    if (known.has(botId)) {
      const list = byBot.get(botId)
      if (list) list.push(row)
      else byBot.set(botId, [row])
    } else {
      const list = orphans.get(botId)
      if (list) list.push(row)
      else orphans.set(botId, [row])
    }
    // Per-bot activity: anything mid-run beats the rest, then the newest row.
    // The live status map is the authority (list rows lag behind a run start).
    const status = statusMap && typeof statusMap.get === 'function' ? statusMap.get(row.id) : undefined
    const running = status && typeof status.running === 'boolean' ? status.running : !!row.running
    const rank = running ? 2 : row.blank ? 0 : 1
    const best = activity.get(botId)
    if (!best || rank > best.rank || (rank === best.rank && (row.updatedAt || 0) > (best.row.updatedAt || 0))) {
      activity.set(botId, { rank, row, sessionId: row.id, updatedAt: row.updatedAt || 0 })
    }
  }

  // Newest first inside each group (rows already are).
  return { byBot, orphans, others, all: rows, activity }
}

/**
 * The latest chat for a bot.
 * @param {{byBot: Map<string, any[]>}} split result of `splitSessions`
 * @param {string} botId
 * @returns {any|null}
 */
export function latestChatFor(split, botId) {
  const list = split && split.byBot ? split.byBot.get(botId) : null
  if (!list || !list.length) return null
  return list.reduce((best, row) => ((row.updatedAt || 0) > (best.updatedAt || 0) ? row : best), list[0])
}

/** Whether the bot's latest chat is mid-run (status map wins over the list row). */
export function isChatRunning(sessionId, sessionsState, statusMap) {
  if (!sessionId) return false
  const status = statusMap && typeof statusMap.get === 'function' ? statusMap.get(sessionId) : undefined
  if (status && typeof status.running === 'boolean') return status.running
  const summary = sessionsState && sessionsState.byId ? sessionsState.byId[sessionId] : undefined
  return !!(summary && summary.running)
}

/**
 * Activity tone for a bot row: `waiting` > `error` > `working` > `idle`.
 * @param {{activity: Map<string, any>}} split
 * @param {Map<string, object>|null} statusMap `useSessionStatus` snapshot
 * @param {string} botId
 */
export function botTone(split, statusMap, botId) {
  const info = split && split.activity ? split.activity.get(botId) : null
  if (!info) return 'idle'
  const status = statusMap && typeof statusMap.get === 'function' ? statusMap.get(info.sessionId) : undefined
  if (status && status.pendingInteraction) return 'waiting'
  const running = status && typeof status.running === 'boolean' ? status.running : !!info.row.running
  return running ? 'working' : 'idle'
}

/**
 * The Session the main column is showing, from retention alone.
 *
 * The main column retains the visible Conversation under the `mainView` source,
 * so exactly one Session carries a positive count there while a chat is open.
 * @param {object|null} sessionsState
 * @param {(sessionId: string, selector: Function) => any} [useRetainInfo] standard prop
 * @returns {string|null}
 */
export function activeSessionFromRetention(rows, retainInfoFor) {
  if (!Array.isArray(rows) || typeof retainInfoFor !== 'function') return null
  for (const row of rows) {
    const info = retainInfoFor(row.id) // eslint-disable-line no-unused-vars
    if (!info) continue
    const counts = info.retainedBy || {}
    if ((counts[MAIN_VIEW_SOURCE] || 0) > 0) return row.id
  }
  return null
}

/**
 * React-free fallback used by the tests: scan a `{ [sessionId]: SessionRetainInfo }`
 * map for the Session the main column retains.
 */
export function activeSessionFromRetainMap(rows, retainBySession) {
  if (!Array.isArray(rows) || !retainBySession) return null
  for (const row of rows) {
    const info = retainBySession[row.id]
    if (info && info.retainedBy && (info.retainedBy[MAIN_VIEW_SOURCE] || 0) > 0) return row.id
  }
  return null
}

/* -------------------------------------------------------------------------- */
/* Lookups used by the chrome                                                 */
/* -------------------------------------------------------------------------- */

/** Whether the main column shows a Conversation right now (not a global panel). */
export function conversationVisible(panelInfo) {
  return !panelInfo || panelInfo.activePanelId === null || panelInfo.activePanelId === undefined
}

/**
 * Which chrome the sidebar should advertise: a bot DM, a plain chat, a room,
 * or nothing (blank/new-session views).
 * @returns {{kind: 'bot'|'chat'|'room'|'none', botId?: string, title?: string}}
 */
export function headerContext(navState, sessionRow, bots) {
  const state = normalizeNavState(navState)
  if (state.roomId) return { kind: 'room', title: state.roomId }
  if (!sessionRow) return { kind: 'none' }
  const botId = botIdForPreset(sessionRow.agentPreset)
  if (botId) {
    const bot = (Array.isArray(bots) ? bots : []).find((candidate) => candidate && candidate.id === botId)
    return { kind: 'bot', botId, title: bot ? bot.name : botId, deleted: !bot }
  }
  return { kind: 'chat', title: sessionRow.displayTitle || sessionRow.title || 'Chat' }
}

/** Human label for a Session row. */
export function sessionLabel(row) {
  if (!row) return 'New chat'
  if (row.title && String(row.title).trim()) return String(row.title).trim()
  if (row.displayTitle && String(row.displayTitle).trim()) return String(row.displayTitle).trim()
  return row.blank ? 'New chat' : 'Untitled chat'
}

/** Short relative time for a row's meta line. */
export function relativeTime(timestamp, now = Date.now()) {
  const value = Number(timestamp)
  if (!Number.isFinite(value) || value <= 0) return ''
  const delta = Math.max(0, now - value)
  const minute = 60000
  const hour = 60 * minute
  const day = 24 * hour
  if (delta < minute) return 'now'
  if (delta < hour) return `${Math.floor(delta / minute)}m`
  if (delta < day) return `${Math.floor(delta / hour)}h`
  if (delta < 7 * day) return `${Math.floor(delta / day)}d`
  try {
    return new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric' }).format(new Date(value))
  } catch {
    return ''
  }
}

/** Workspace label for the one-line workspace row (falls back to a generic name). */
export function workspaceLabel(workspace) {
  if (!workspace || typeof workspace !== 'object') return { name: 'Workspace', detail: 'Choose a workspace' }
  const name =
    (typeof workspace.name === 'string' && workspace.name.trim()) ||
    (typeof workspace.label === 'string' && workspace.label.trim()) ||
    (typeof workspace.title === 'string' && workspace.title.trim()) ||
    basename(workspace.path) ||
    'Workspace'
  const path = typeof workspace.path === 'string' ? workspace.path : ''
  return { name, detail: path || 'Choose a workspace' }
}

function basename(value) {
  if (typeof value !== 'string' || !value) return ''
  const parts = value.replace(/[/\\]+$/, '').split(/[/\\]/)
  return parts[parts.length - 1] || ''
}

/* -------------------------------------------------------------------------- */
/* Persistence                                                                */
/* -------------------------------------------------------------------------- */

export const NAV_STORAGE_KEY = 'grokbot-ui:sidebar:v1'

/** Read the saved nav state from sessionStorage (never throws). */
export function restoreNavState(storage) {
  try {
    const target = storage || (hasWindow() ? window.sessionStorage : null)
    if (!target) return null
    const raw = target.getItem(NAV_STORAGE_KEY)
    if (!raw) return null
    return normalizeNavState(JSON.parse(raw))
  } catch {
    return null
  }
}

/** Persist the nav state (never throws). */
export function persistNavState(state, storage) {
  try {
    const target = storage || (hasWindow() ? window.sessionStorage : null)
    if (!target) return false
    target.setItem(NAV_STORAGE_KEY, JSON.stringify(normalizeNavState(state)))
    return true
  } catch {
    return false
  }
}
