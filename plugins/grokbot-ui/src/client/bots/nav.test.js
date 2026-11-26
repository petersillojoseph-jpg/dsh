import test from 'node:test'
import assert from 'node:assert/strict'
import {
  activeSessionFromRetainMap,
  botIdForPreset,
  botTone,
  createNavStore,
  initialNavState,
  isChatRunning,
  latestChatFor,
  navReducer,
  normalizeNavState,
  persistNavState,
  relativeTime,
  restoreNavState,
  sessionLabel,
  splitSessions,
  workspaceLabel,
  NAV_STORAGE_KEY,
} from './nav.js'

/** Minimal SessionListState like `useSessions((state) => state)` returns. */
function listState(rows) {
  const ids = rows.map((row) => row.id)
  const byId = {}
  const projectionsBySession = {}
  for (const row of rows) {
    byId[row.id] = {
      id: row.id,
      title: row.title,
      displayTitle: row.displayTitle || row.title || row.id,
      running: !!row.running,
      blank: !!row.blank,
      updatedAt: row.updatedAt,
      retainedBy: row.retainedBy || {},
      cwd: row.cwd,
      projectionValues: {},
    }
    projectionsBySession[row.id] = { values: { agentPreset: row.preset }, state: 'ready', error: null }
  }
  return { ids, byId, phase: 'ready', projectionsBySession }
}

test('preset parsing only accepts grokbot-<id>', () => {
  assert.equal(botIdForPreset('grokbot-aj'), 'aj')
  assert.equal(botIdForPreset('grokbot-'), null)
  assert.equal(botIdForPreset('codex'), null)
  assert.equal(botIdForPreset(undefined), null)
})

test('splitSessions puts bot DMs under their bot, deleted bots in orphans, rest in others', () => {
  const state = listState([
    { id: 's1', title: 'AJ plan', preset: 'grokbot-aj', updatedAt: 30 },
    { id: 's2', title: 'AJ older', preset: 'grokbot-aj', updatedAt: 10 },
    { id: 's3', title: 'Ken plan', preset: 'grokbot-ken', updatedAt: 20 },
    { id: 's4', title: 'Plain', preset: undefined, updatedAt: 40 },
    { id: 's5', title: 'Gone', preset: 'grokbot-ghost', updatedAt: 5 },
    { id: 's6', title: 'Blank DM', preset: 'grokbot-ken', blank: true, updatedAt: 50 },
  ])
  const split = splitSessions(state, ['aj', 'ken'])

  assert.deepEqual(split.byBot.get('aj').map((row) => row.id), ['s1', 's2'])
  assert.deepEqual(split.byBot.get('ken').map((row) => row.id), ['s6', 's3'])
  assert.deepEqual(split.others.map((row) => row.id), ['s4'])
  assert.deepEqual(Array.from(split.orphans.keys()), ['ghost'])
  assert.deepEqual(split.orphans.get('ghost').map((row) => row.id), ['s5'])
  // Nothing is dropped: every listed Session lands in exactly one bucket.
  assert.equal(split.all.length, 6)
  assert.equal(split.byBot.get('aj').length + split.byBot.get('ken').length + split.others.length + split.orphans.get('ghost').length, 6)
})

test('splitSessions tolerates a missing list and missing projections', () => {
  const empty = splitSessions(null, ['aj'])
  assert.equal(empty.all.length, 0)
  assert.equal(empty.byBot.size, 0)

  const summaryOnly = {
    ids: ['x'],
    byId: { x: { id: 'x', displayTitle: 'X', blank: false, updatedAt: 1, running: false, retainedBy: {}, projectionValues: { agentPreset: 'grokbot-aj' } } },
    phase: 'ready',
    projectionsBySession: {},
  }
  const split = splitSessions(summaryOnly, ['aj'])
  assert.deepEqual(split.byBot.get('aj').map((row) => row.id), ['x'])
})

test('latestChatFor returns the most recently updated chat', () => {
  const state = listState([
    { id: 'a', preset: 'grokbot-aj', updatedAt: 1 },
    { id: 'b', preset: 'grokbot-aj', updatedAt: 9 },
    { id: 'c', preset: 'grokbot-aj', updatedAt: 5 },
  ])
  const split = splitSessions(state, ['aj'])
  assert.equal(latestChatFor(split, 'aj').id, 'b')
  assert.equal(latestChatFor(split, 'nobody'), null)
  assert.equal(latestChatFor(null, 'aj'), null)
})

test('isChatRunning and botTone prefer the live status map', () => {
  const state = listState([
    { id: 'a', preset: 'grokbot-aj', updatedAt: 1 },
    { id: 'b', preset: 'grokbot-ken', updatedAt: 2, running: true },
    { id: 'c', preset: 'grokbot-willow', updatedAt: 3 },
  ])
  const split = splitSessions(state, ['aj', 'ken', 'willow'])
  const statuses = new Map([
    ['a', { running: true, pendingInteraction: undefined }],
    ['c', { running: true, pendingInteraction: { key: 'k', kind: 'approval' } }],
  ])
  // With live statuses the newest *running* chat is the bot's headline chat.
  const liveSplit = splitSessions(state, ['aj', 'ken', 'willow'], statuses)
  assert.equal(liveSplit.activity.get('aj').sessionId, 'a')
  assert.equal(isChatRunning('a', state, statuses), true)
  assert.equal(isChatRunning('b', state, statuses), true) // list fallback
  assert.equal(isChatRunning('missing', state, statuses), false)
  assert.equal(botTone(liveSplit, statuses, 'aj'), 'working')
  assert.equal(botTone(split, statuses, 'aj'), 'working', 'bot id keys the lookup, not the session id')
  assert.equal(botTone(split, null, 'ken'), 'working', 'list running flag is the fallback without a status map')
  assert.equal(botTone(split, statuses, 'willow'), 'waiting')
  assert.equal(botTone(split, null, 'aj'), 'idle')
  assert.equal(botTone(split, new Map([['b', { running: false }]]), 'b'), 'idle', 'an explicit false in the status map beats the list flag')
  assert.equal(botTone(split, null, 'nobody'), 'idle')
})

test('retention decides which Session the main column shows', () => {
  const rows = [{ id: 'a' }, { id: 'b' }, { id: 'c' }]
  const map = { a: { retainedBy: {} }, b: { retainedBy: { mainView: 1 } }, c: { retainedBy: { mainView: 0 } } }
  assert.equal(activeSessionFromRetainMap(rows, map), 'b')
  assert.equal(activeSessionFromRetainMap(rows, {}), null)
  assert.equal(activeSessionFromRetainMap(null, map), null)
})

test('navReducer: toggling a bot expands it, a second click collapses without touching the session', () => {
  let state = initialNavState()
  state = navReducer(state, { type: 'select-session', sessionId: 's1' })
  state = navReducer(state, { type: 'toggle-bot', botId: 'aj' })
  assert.equal(state.botId, 'aj')
  assert.equal(state.section, 'assistants')
  assert.equal(state.sessionId, 's1')

  const collapsed = navReducer(state, { type: 'toggle-bot', botId: 'aj' })
  assert.equal(collapsed.botId, null)
  assert.equal(collapsed.sessionId, 's1', 'collapsing a list never changes the open chat')

  const other = navReducer(state, { type: 'toggle-bot', botId: 'ken' })
  assert.equal(other.botId, 'ken', 'a different bot always expands that bot')
  assert.equal(other.sessionId, 's1')
})

test('navReducer: selecting a chat keeps the owner list open, sections clear the query', () => {
  let state = navReducer(initialNavState(), { type: 'open-bot', botId: 'aj' })
  state = navReducer(state, { type: 'set-query', query: 'plan' })
  state = navReducer(state, { type: 'select-session', sessionId: 's9' })
  assert.equal(state.botId, 'aj')
  assert.equal(state.sessionId, 's9')
  assert.equal(state.query, 'plan')

  const rooms = navReducer(state, { type: 'select-section', section: 'rooms' })
  assert.equal(rooms.section, 'rooms')
  assert.equal(rooms.query, '')
  // The expanded bot survives a section switch so "All chats" → "Assistants" returns to it.
  assert.equal(rooms.botId, 'aj')
})

test('navReducer: rooms are explicit and any other action clears the room', () => {
  let state = navReducer(initialNavState(), { type: 'open-room', roomId: 'r1' })
  assert.equal(state.roomId, 'r1')
  assert.equal(state.section, 'rooms')
  assert.equal(navReducer(state, { type: 'close-room' }).roomId, null)
  assert.equal(navReducer(state, { type: 'select-session', sessionId: 's1' }).roomId, null)
  assert.equal(navReducer(state, { type: 'sync-session', sessionId: 's2' }).roomId, null)
})

test('navReducer: unknown actions and garbage patches are inert', () => {
  const state = initialNavState()
  assert.equal(navReducer(state, { type: 'nope' }), state)
  assert.equal(navReducer(state, null), state)
  // A normalised state that needs no change is returned as-is.
  assert.equal(navReducer(state, { type: 'collapse-bot' }), state)
  assert.deepEqual(normalizeNavState({ section: 'bogus', botId: 7, query: 3 }), initialNavState())
})

test('createNavStore notifies subscribers only on real changes', () => {
  const store = createNavStore()
  let calls = 0
  const off = store.subscribe(() => {
    calls += 1
  })
  store.dispatch({ type: 'toggle-bot', botId: 'aj' })
  assert.equal(calls, 1)
  store.dispatch({ type: 'toggle-bot', botId: 'aj' })
  assert.equal(calls, 2)
  store.dispatch({ type: 'set-query', query: '' })
  assert.equal(calls, 2, 'no-op dispatch does not notify')
  off()
  store.dispatch({ type: 'toggle-bot', botId: 'ken' })
  assert.equal(calls, 2, 'unsubscribe stops notifications')
  assert.equal(store.getState().botId, 'ken')
})

test('navigation persists to sessionStorage and restores defensively', () => {
  const memory = new Map()
  const storage = {
    getItem: (key) => (memory.has(key) ? memory.get(key) : null),
    setItem: (key, value) => memory.set(key, String(value)),
  }
  assert.equal(persistNavState({ ...initialNavState(), botId: 'aj', sessionId: 's1' }, storage), true)
  assert.ok(memory.get(NAV_STORAGE_KEY).includes('"aj"'))
  assert.deepEqual(restoreNavState(storage), { ...initialNavState(), botId: 'aj', sessionId: 's1' })

  memory.set(NAV_STORAGE_KEY, '{not json')
  assert.equal(restoreNavState(storage), null)
  const throwing = {
    getItem: () => {
      throw new Error('denied')
    },
    setItem: () => {
      throw new Error('denied')
    },
  }
  assert.equal(restoreNavState(throwing), null)
  assert.equal(persistNavState(initialNavState(), throwing), false)
})

test('labels are stable for titled, untitled and blank Sessions', () => {
  assert.equal(sessionLabel({ title: '  Plan  ' }), 'Plan')
  assert.equal(sessionLabel({ displayTitle: 'From cwd' }), 'From cwd')
  assert.equal(sessionLabel({ blank: true }), 'New chat')
  assert.equal(sessionLabel({}), 'Untitled chat')
  assert.equal(sessionLabel(null), 'New chat')
})

test('relativeTime is short and never throws on junk', () => {
  const now = 1_700_000_000_000
  assert.equal(relativeTime(now - 5_000, now), 'now')
  assert.equal(relativeTime(now - 5 * 60_000, now), '5m')
  assert.equal(relativeTime(now - 3 * 3_600_000, now), '3h')
  assert.equal(relativeTime(now - 2 * 86_400_000, now), '2d')
  assert.equal(relativeTime(0, now), '')
  assert.equal(relativeTime('nope', now), '')
})

test('workspaceLabel prefers the title then the path basename', () => {
  assert.equal(workspaceLabel({ title: 'default-workspace', path: '/home/pedro/x' }).name, 'default-workspace')
  assert.equal(workspaceLabel({ path: '/home/pedro/projects/app/' }).name, 'app')
  assert.equal(workspaceLabel(null).name, 'Workspace')
})
