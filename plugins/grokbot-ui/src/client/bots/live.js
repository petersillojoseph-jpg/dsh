/**
 * Live bot activity derived from real DSH session state.
 *
 * A bot DM is a normal DSH session whose `agentPreset` projection is
 * `grokbot-<botId>`. The Session UI exposes two global standard props to slot
 * registrations:
 *
 *   - `useSessions((state) => state)` — SessionListState, including
 *     `projectionsBySession[id].values.agentPreset`
 *   - `useSessionStatus((map) => map)` — a Map<sessionId, SessionStatus>
 *     (`running`, `pendingInteraction`, `completionUnread`)
 *
 * Rooms are host-side one-shot calls rather than DSH sessions, so their
 * activity comes from the room send lifecycle in `Rooms.jsx`.
 *
 * Nothing here invents state: a bot with no mapped session (or no known
 * status) stays `idle`.
 */
import React from 'react'

export const BOT_PRESET_PREFIX = 'grokbot-'

/** Avatar activity names accepted by `BotAvatar`. */
export const ACTIVITY_LABELS = {
  idle: 'Idle',
  working: 'Working',
  reading: 'Reading',
  writing: 'Writing',
  thinking: 'Thinking',
  waiting: 'Waiting for you',
  error: 'Needs attention',
}

const ACTIVITY_RANK = {
  waiting: 4,
  error: 3,
  working: 2,
  reading: 2,
  writing: 2,
  thinking: 2,
  idle: 0,
}

export function activityLabel(activity) {
  return ACTIVITY_LABELS[activity] || ACTIVITY_LABELS.idle
}

/**
 * Map one session's status/snapshot facts onto an avatar activity.
 *
 * @param {object|undefined} status SessionStatus from `useSessionStatus`
 * @param {object|undefined} snapshot SessionSnapshot from `useSession`
 * @returns {'idle'|'working'|'waiting'|'error'}
 */
export function activityFromSession(status, snapshot) {
  if (snapshot && (snapshot.promptError || snapshot.lastAgentError)) return 'error'
  if (status && status.pendingInteraction) return 'waiting'
  if ((status && status.running) || (snapshot && snapshot.running)) return 'working'
  return 'idle'
}

function rank(activity) {
  return Object.prototype.hasOwnProperty.call(ACTIVITY_RANK, activity) ? ACTIVITY_RANK[activity] : 0
}

function bestSessionActivity(current, next) {
  if (!current) return next
  if (rank(next.activity) > rank(current.activity)) return next
  if (rank(next.activity) === rank(current.activity) && next.updatedAt > current.updatedAt) return next
  return current
}

/**
 * Build `Map<botId, { activity, sessionId, updatedAt }>` from the Session list
 * and status snapshots. When a bot has several DM sessions, the most relevant
 * one wins: waiting > working > idle, then most recently updated.
 *
 * @param {any[]} bots normalized bot records
 * @param {object|null} sessionsState SessionListState (or null)
 * @param {Map<string, object>|null} statuses SessionStatus map (or null)
 */
export function deriveBotActivities(bots, sessionsState, statuses) {
  const result = new Map()
  if (!Array.isArray(bots) || !bots.length) return result
  if (!sessionsState || !sessionsState.byId) return result

  const known = new Set(bots.map((bot) => bot && bot.id).filter(Boolean))
  const projections = sessionsState.projectionsBySession || {}
  const best = new Map()

  for (const sessionId of Object.keys(sessionsState.byId)) {
    const summary = sessionsState.byId[sessionId]
    const projection = projections[sessionId]
    const preset = projection && projection.values ? projection.values.agentPreset : undefined
    if (typeof preset !== 'string' || !preset.startsWith(BOT_PRESET_PREFIX)) continue
    const botId = preset.slice(BOT_PRESET_PREFIX.length)
    if (!known.has(botId)) continue

    const status = statuses && typeof statuses.get === 'function' ? statuses.get(sessionId) : undefined
    let activity = 'idle'
    if (status && status.pendingInteraction) activity = 'waiting'
    else if ((status && status.running) || (summary && summary.running)) activity = 'working'

    const next = { activity, sessionId, updatedAt: (summary && summary.updatedAt) || 0 }
    best.set(botId, bestSessionActivity(best.get(botId), next))
  }

  for (const [botId, info] of best) result.set(botId, info)
  return result
}

/** Activity string for one bot from a `deriveBotActivities` map. */
export function botActivity(activities, botId) {
  const info = activities && typeof activities.get === 'function' ? activities.get(botId) : null
  return info && info.activity ? info.activity : 'idle'
}

function useNoSessionList() {
  return null
}

function useNoSessionStatus() {
  return null
}

function useNoSessionSnapshot() {
  return undefined
}

/**
 * Subscribe to the live activity of every bot seen in the DSH session list.
 * Safe to call when the slot did not provide the hooks (returns an empty map).
 *
 * @param {any[]} bots
 * @param {Function|undefined} useSessions global slot prop
 * @param {Function|undefined} useSessionStatus global slot prop
 */
export function useBotActivities(bots, useSessions, useSessionStatus) {
  const readSessions = typeof useSessions === 'function' ? useSessions : useNoSessionList
  const readStatuses = typeof useSessionStatus === 'function' ? useSessionStatus : useNoSessionStatus
  const sessionsState = readSessions((state) => state)
  const statuses = readStatuses((state) => state)
  return React.useMemo(
    () => deriveBotActivities(bots, sessionsState, statuses),
    [bots, sessionsState, statuses],
  )
}

/**
 * Activity for a row rendered in a ROOT-scoped session-row slot (the sidebar
 * `sidebar.session.row.leading` slot passes `sessionId` as an owner prop and
 * has no `useSession`). The global status map supplies pending interaction;
 * the Session list supplies the running flag (the status map's `running` is
 * only a fallback — the list row is the authoritative display fallback).
 */
export function useSessionRowActivity(props) {
  const sessionId = props ? props.sessionId : undefined
  const readStatus = props && typeof props.useSessionStatus === 'function' ? props.useSessionStatus : useNoSessionStatus
  const readSessions = props && typeof props.useSessions === 'function' ? props.useSessions : useNoSessionList
  const status = readStatus((map) => (map && sessionId !== undefined ? map.get(sessionId) : undefined))
  const running = readSessions((state) => {
    if (!state || !state.byId || sessionId === undefined) return false
    const summary = state.byId[sessionId]
    return !!(summary && summary.running)
  })
  if (status && status.pendingInteraction) return 'waiting'
  if ((status && status.running) || running) return 'working'
  return 'idle'
}

/**
 * Activity for the Session that owns a session-scoped slot entry.
 * `props` are the standard slot props (`useSession`, `useSessionStatus`,
 * `sessionId`); the fallbacks only exist so a future slot shape cannot crash
 * the decoration if one prop is missing.
 */
export function useOwnSessionActivity(props) {
  const readStatus = props && typeof props.useSessionStatus === 'function' ? props.useSessionStatus : useNoSessionStatus
  const readSnapshot = props && typeof props.useSession === 'function' ? props.useSession : useNoSessionSnapshot
  const sessionId = props ? props.sessionId : undefined
  const status = readStatus((map) => (map && sessionId !== undefined ? map.get(sessionId) : undefined))
  const snapshot = readSnapshot((value) => value)
  return activityFromSession(status, snapshot)
}
