/**
 * BotsRoot — the plugin's persistent headless shell behind `registerBots`.
 *
 * What used to be a full-window app surface over the shell is now split up:
 *  - the roster/list navigation is the `sidebar` slot occupant (Sidebar.jsx);
 *  - bot chats are ordinary DSH Conversations in the native main column;
 *  - rooms paint over the main column (RoomSurface.jsx);
 *  - this component only owns the parts that are NOT layout: the bot/room data
 *    fetch, every sheet (create/edit, Avatar Studio, new room, delete confirm),
 *    the toast stack, the desktop-notification bridge, and the room layer.
 *
 * It renders no wrapper element beyond a fragment + own <style> nodes, so it
 * can be mounted in `shell.overlay` (dialogs portal on top of everything) and
 * can render the room layer into the app frame.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import styles from './styles.css'
import sidebarStyles from './sidebar.css'
import { api, normalizeBots, normalizeRoom, normalizeRooms, normalizeState } from './api.js'
import { BotsErrorBoundary, ConfirmDialog, ToastStack } from './components.jsx'
import { SettingsNotice } from './SettingsNotice.jsx'
import { AvatarStudioDialog } from './AvatarStudio.jsx'
import { BotDialog } from './BotDialog.jsx'
import { CreateRoomDialog } from './Rooms.jsx'
import { RoomSurface } from './RoomSurface.jsx'
import { botActivity, useBotActivities } from './live.js'

/** Let the header decorations refresh their bot cache after a mutation. */
function notifyBotsChanged() {
  try {
    window.dispatchEvent(new CustomEvent('grokbot:bots-changed'))
  } catch {
    /* no CustomEvent support: the periodic refresh still catches up */
  }
}

/** The app frame element (the layout's three-column grid), found lazily. */
export function findFrame() {
  const column = document.querySelector('[data-slot="sidebar"]')
  if (column && column.parentElement) {
    const grid = column.parentElement.parentElement
    if (grid) return grid
  }
  return null
}

export function BotsRoot({ ctx, registry, ...slotProps }) {
  const dataState = registry.useBots()
  const dialogsState = registry.useDialogs()
  const { toasts } = registry.useToasts()

  const mountedRef = React.useRef(true)
  React.useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
    }
  }, [])

  const botsStore = registry.botsStore

  const load = React.useCallback(
    async ({ quiet = false } = {}) => {
      const current = botsStore.getState()
      if (!quiet) {
        botsStore.set({ status: current.status === 'ready' ? 'ready' : 'loading', error: null })
      }
      try {
        const payload = await api.getState()
        const next = normalizeState(payload)
        if (!mountedRef.current) return null
        botsStore.set({ status: 'ready', bots: next.bots, rooms: next.rooms, model: next.model, error: null })
        return next
      } catch (error) {
        if (!mountedRef.current) return null
        const message = error && error.message ? error.message : 'Could not reach the local bot service.'
        botsStore.set({ status: botsStore.getState().status === 'ready' ? 'ready' : 'error', error: message })
        if (!quiet) registry.toast(message, 'error')
        return null
      }
    },
    [botsStore, registry],
  )

  registry.reload = load

  // Initial load + a quiet refresh when the window wakes up.
  React.useEffect(() => {
    void load()
    const onVisible = () => {
      if (!document.hidden) void load({ quiet: true })
    }
    document.addEventListener('visibilitychange', onVisible)
    return () => document.removeEventListener('visibilitychange', onVisible)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Live per-bot session status for the notification bridge.
  const useSessions = typeof slotProps.useSessions === 'function' ? slotProps.useSessions : () => null
  const useSessionStatus = typeof slotProps.useSessionStatus === 'function' ? slotProps.useSessionStatus : () => null
  const sessionsState = useSessions((state) => state)
  const sessionStatusSnapshot = useSessionStatus((snapshot) => snapshot)
  const previousSessionSnapshot = React.useRef(null)
  const notificationFailureLogged = React.useRef(false)

  const notifyNative = React.useCallback(
    (kind, sessionId) => {
      const session = sessionsState && sessionsState.byId ? sessionsState.byId[sessionId] : null
      const sessionName = session && session.displayTitle ? session.displayTitle : 'Agent'
      void api.notifyAgent(kind, sessionName).catch((error) => {
        if (notificationFailureLogged.current) return
        notificationFailureLogged.current = true
        console.warn('[grokbot-ui] Could not deliver an Omarchy desktop notification', error)
      })
    },
    [sessionsState],
  )

  React.useEffect(() => {
    if (!sessionStatusSnapshot || typeof sessionStatusSnapshot.forEach !== 'function') return
    const previous = previousSessionSnapshot.current
    const current = new Map(sessionStatusSnapshot)
    previousSessionSnapshot.current = { statuses: current, sessionsState }

    for (const [sessionId, status] of current) {
      const before = previous ? previous.statuses.get(sessionId) : undefined
      const pending = status && status.pendingInteraction
      if (pending && (!before || !before.pendingInteraction || before.pendingInteraction.key !== pending.key)) {
        if (pending.kind === 'approval' || pending.kind === 'question') notifyNative(pending.kind, sessionId)
      }
      const previousSummary =
        previous && previous.sessionsState && previous.sessionsState.byId ? previous.sessionsState.byId[sessionId] : null
      const currentSummary = sessionsState && sessionsState.byId ? sessionsState.byId[sessionId] : null
      const wasRunning = before && typeof before.running === 'boolean' ? before.running : previousSummary && previousSummary.running
      const isRunning = status && typeof status.running === 'boolean' ? status.running : currentSummary && currentSummary.running
      const finished = (wasRunning === true && isRunning === false && !pending) || (previous && !before && status && status.completionUnread && !pending)
      if (finished) notifyNative('finished', sessionId)
    }
  }, [sessionStatusSnapshot, sessionsState, notifyNative])

  // --- mutations -----------------------------------------------------------

  const bots = dataState.bots
  const rooms = dataState.rooms

  const afterBots = React.useCallback(
    (payload) => {
      const nextBots = normalizeBots(payload && payload.bots)
      if (nextBots) botsStore.set({ bots: nextBots })
      notifyBotsChanged()
      void load({ quiet: true })
    },
    [botsStore, load],
  )

  const saveBot = React.useCallback(
    async (draft) => {
      const payload = await api.saveBot(draft)
      afterBots(payload)
      registry.dialogs.dispatch({ type: 'close-bot-dialog' })
      registry.toast(draft && draft.id ? 'GPT saved.' : 'GPT created.', 'success')
      if (payload && typeof payload.warning === 'string' && payload.warning) registry.toast(payload.warning, 'error')
    },
    [afterBots, registry],
  )

  const saveBotAvatar = React.useCallback(
    async (bot, patch) => {
      const draft = {
        id: bot.id,
        name: bot.name,
        tagline: bot.tagline || '',
        instructions: bot.instructions || '',
        color: patch.color,
        avatarSet: patch.avatarSet,
      }
      if (bot.createdAt) draft.createdAt = bot.createdAt
      const payload = await api.saveBot(draft)
      afterBots(payload)
      registry.toast('Look updated.', 'success')
      if (payload && typeof payload.warning === 'string' && payload.warning) registry.toast(payload.warning, 'error')
    },
    [afterBots, registry],
  )

  const deleteBot = React.useCallback(
    async (bot) => {
      registry.dialogs.dispatch({ type: 'busy', busy: true })
      try {
        const payload = await api.deleteBot(bot.id)
        afterBots(payload)
        registry.dialogs.dispatch({ type: 'close-confirm' })
        registry.dialogs.dispatch({ type: 'close-studio' })
        registry.toast(`${bot.name} deleted.`, 'success')
      } catch (error) {
        registry.toast(error && error.message ? error.message : 'Could not delete this GPT.', 'error')
      } finally {
        if (mountedRef.current) registry.dialogs.dispatch({ type: 'busy', busy: false })
      }
    },
    [afterBots, registry],
  )

  const createRoom = React.useCallback(
    async ({ name, botIds }) => {
      const payload = await api.createRoom(name, botIds)
      const nextRooms = normalizeRooms(payload && payload.rooms)
      const created = normalizeRoom(payload && payload.room)
      if (nextRooms) botsStore.set({ rooms: nextRooms })
      const room = created || (nextRooms && nextRooms.length ? nextRooms[nextRooms.length - 1] : null)
      registry.dialogs.dispatch({ type: 'close-room-dialog' })
      if (room) {
        registry.nav.dispatch({ type: 'open-room', roomId: room.id })
      } else {
        registry.nav.dispatch({ type: 'select-section', section: 'rooms' })
      }
      registry.toast('Group chat created.', 'success')
      void load({ quiet: true })
    },
    [botsStore, registry, load],
  )

  const deleteRoom = React.useCallback(
    async (room) => {
      registry.dialogs.dispatch({ type: 'busy', busy: true })
      try {
        const payload = await api.deleteRoom(room.id)
        const nextRooms = normalizeRooms(payload && payload.rooms)
        if (nextRooms) botsStore.set({ rooms: nextRooms })
        registry.dialogs.dispatch({ type: 'close-confirm' })
        registry.toast(`${room.name} deleted.`, 'success')
        void load({ quiet: true })
      } catch (error) {
        registry.toast(error && error.message ? error.message : 'Could not delete this group chat.', 'error')
      } finally {
        if (mountedRef.current) registry.dialogs.dispatch({ type: 'busy', busy: false })
      }
    },
    [botsStore, registry, load],
  )

  // --- Escape closes the topmost sheet -------------------------------------

  const dialogsRef = React.useRef(dialogsState)
  dialogsRef.current = dialogsState

  React.useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key !== 'Escape') return
      const current = dialogsRef.current
      const top = current.confirm
        ? { type: 'close-confirm' }
        : current.studio
          ? { type: 'close-studio' }
          : current.botDialog
            ? { type: 'close-bot-dialog' }
            : current.roomDialog
              ? { type: 'close-room-dialog' }
              : null
      if (!top) return
      event.preventDefault()
      event.stopPropagation()
      registry.dialogs.dispatch(top)
    }
    window.addEventListener('keydown', onKeyDown, true)
    return () => window.removeEventListener('keydown', onKeyDown, true)
  }, [registry])

  // --- derived -------------------------------------------------------------

  const botDialog = dialogsState.botDialog
  const dialogBot = botDialog && botDialog.botId ? bots.find((bot) => bot.id === botDialog.botId) || null : null
  const studio = dialogsState.studio
  const studioBot = studio ? bots.find((bot) => bot.id === studio.botId) || null : null
  const confirm = dialogsState.confirm
  const confirmBot = confirm && confirm.kind === 'bot' ? bots.find((bot) => bot.id === confirm.id) || null : null
  const confirmRoom = confirm && confirm.kind === 'room' ? rooms.find((room) => room.id === confirm.id) || null : null
  const activities = useBotActivities(bots, slotProps.useSessions, slotProps.useSessionStatus)

  // The room layer belongs to the frame's last child slot; a portal keeps it
  // there while the React owner stays in `shell.overlay`.
  const frame = typeof document !== 'undefined' ? findFrame() : null

  const dismissToast = (id) => registry.toastStore.dismiss(id)

  /** Settings has no paintable dialog here — take the user to the real settings. */
  const openPluginsFromSettings = () => {
    registry.dialogs.dispatch({ type: 'close-settings' })
    try {
      if (ctx && ctx.layout && typeof ctx.layout.selectPanel === 'function') {
        ctx.layout.selectPanel('plugins')
        return
      }
      throw new Error('Panels are not available yet.')
    } catch (error) {
      registry.toast(error && error.message ? error.message : 'The Plugins panel is not available yet.', 'error')
    }
  }

  return (
    <>
      <style data-grokbot-bots="true">{styles + sidebarStyles}</style>
      <BotsErrorBoundary>
        {frame
          ? ReactDOM.createPortal(<RoomSurface registry={registry} frameEl={findFrame} />, frame)
          : null}

        {botDialog ? (
          <BotDialog
            mode={botDialog.mode}
            bot={dialogBot}
            onClose={() => registry.dialogs.dispatch({ type: 'close-bot-dialog' })}
            onSave={saveBot}
          />
        ) : null}

        {dialogsState.roomDialog ? (
          <CreateRoomDialog
            bots={bots}
            initialBotIds={dialogsState.roomDialog.botIds}
            onClose={() => registry.dialogs.dispatch({ type: 'close-room-dialog' })}
            onCreate={createRoom}
          />
        ) : null}

        {studioBot ? (
          <AvatarStudioDialog
            bot={studioBot}
            activity={botActivity(activities, studioBot.id)}
            onClose={() => registry.dialogs.dispatch({ type: 'close-studio' })}
            onSave={(patch) => saveBotAvatar(studioBot, patch)}
          />
        ) : null}

        {confirm && (confirmBot || confirmRoom) ? (
          <ConfirmDialog
            title={confirmBot ? `Delete ${confirmBot.name}?` : `Delete ${confirmRoom.name}?`}
            description={
              confirmBot
                ? `The GPT and its agent preset are removed. Its past chats stay in "All chats" under "${confirmBot.id} (deleted)".`
                : 'The group chat and its transcript are removed. The assistants themselves stay.'
            }
            confirmLabel="Delete"
            busy={dialogsState.busy}
            onConfirm={() => (confirmBot ? deleteBot(confirmBot) : deleteRoom(confirmRoom))}
            onClose={() => registry.dialogs.dispatch({ type: 'close-confirm' })}
          />
        ) : null}

        {dialogsState.settingsNotice ? (
          <SettingsNotice
            onOpenPlugins={openPluginsFromSettings}
            onClose={() => registry.dialogs.dispatch({ type: 'close-settings' })}
          />
        ) : null}

        <ToastStack toasts={toasts} onDismiss={dismissToast} raised={ctx ? true : false} />
      </BotsErrorBoundary>
    </>
  )
}
