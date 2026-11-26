/**
 * GrokbotSidebar — the occupant of the layout-owned `sidebar` slot.
 *
 * The slot is a SIBLING of the main column and never unmounts while the user
 * moves between chats, so the sidebar is the assistant directory that stays on
 * screen beside DSH's own Conversation:
 *
 *   Assistants   the bot roster; the selected bot expands its chats inline
 *   Group chats  rooms; a room opens over the main column
 *   All chats    every Session that is not a bot DM, grouped by workspace
 *
 * Clicking a chat never leaves the sidebar: it asks the workspace service to
 * open that Session and the main column swaps underneath.
 *
 * Props come from the frame owner (`collapsed/width/drawer`), from this
 * plugin's slot `inject` factory (see bot-injected.js: `registry`), and from
 * the standard slot props (`useSessions`, `useSessionStatus`, `useWorkspaces`,
 * `usePanelInfo`). Everything degrades: a missing prop disables one control,
 * never the column.
 */
import React from 'react'
import styles from './styles.css'
import sidebarStyles from './sidebar.css'
import { BotAvatar } from '../shared/avatar/index.jsx'
import { MediaLibrary } from './MediaLibrary.jsx'
import { Icon, Spinner, StackedAvatars } from './components.jsx'
import { useNavState } from './nav-context.js'
import { activityLabel } from './live.js'
import {
  botIdForPreset,
  botTone,
  latestChatFor,
  relativeTime,
  sessionLabel,
  splitSessions,
  workspaceLabel,
} from './nav.js'

/** Fixed launcher mark: the mascot, independent of whatever bots exist. */
export const BRAND_BOT = Object.freeze({ id: 'grokbot-launcher', name: 'Bots', color: '#A97EFE', avatarSet: 'rakazo' })

const NOTHING = null

/* -------------------------------------------------------------------------- */
/* Small pieces                                                               */
/* -------------------------------------------------------------------------- */

function RailItem({ label, hint, active = false, onClick, children, opener }) {
  return (
    <span className="gb-srail">
      <button
        type="button"
        className={`gb-srail-item${active ? ' is-active' : ''}`}
        aria-label={label}
        onClick={onClick}
        data-sidebar-opener={opener || undefined}
      >
        {children}
      </button>
      <span className="gb-stip" role="presentation" aria-hidden="true">
        {label}
        {hint ? <kbd className="gb-sfoot-kbd">{hint}</kbd> : null}
      </span>
    </span>
  )
}

function MenuItem({ children, onSelect, danger = false }) {
  return (
    <button
      type="button"
      className={`gb-sitem${danger ? ' gb-sitem--danger' : ''}`}
      onClick={(event) => {
        event.stopPropagation()
        onSelect()
      }}
    >
      {children}
    </button>
  )
}

function ChatRow({ row, tone, active, onOpen }) {
  const label = sessionLabel(row)
  const meta = relativeTime(row.updatedAt)
  return (
    <button
      type="button"
      className={`gb-srow gb-schat${active ? ' is-active' : ''}`}
      aria-current={active ? 'page' : undefined}
      onClick={() => onOpen(row)}
      title={label}
    >
      <span className="gb-schat-mark" aria-hidden="true">
        {tone === 'working' ? <i className="gb-schat-dot" /> : <Icon name="chat" size={12} />}
      </span>
      <span className="gb-srow-copy">
        <span className="gb-srow-title">{label}</span>
        {meta && !row.blank ? <span className="gb-srow-sub">{meta}</span> : null}
      </span>
    </button>
  )
}

/* -------------------------------------------------------------------------- */
/* Sidebar                                                                    */
/* -------------------------------------------------------------------------- */

export function GrokbotSidebar(props) {
  const [mediaOpen,setMediaOpen]=React.useState(false)
  const {
    registry,
    collapsed = false,
    drawer = false,
    openSession,
    startSession,
    toggleSidebar,
    selectPanel,
    openSettings,
    openWorkspace,
    closeDrawer,
  } = props

  const useSessions = typeof props.useSessions === 'function' ? props.useSessions : () => NOTHING
  const useSessionStatus = typeof props.useSessionStatus === 'function' ? props.useSessionStatus : () => null
  const useWorkspaces = typeof props.useWorkspaces === 'function' ? props.useWorkspaces : () => null
  const usePanelInfo = typeof props.usePanelInfo === 'function' ? props.usePanelInfo : () => null

  const sessionsState = useSessions((state) => state)
  const statusMap = useSessionStatus((state) => state)
  const workspacesState = useWorkspaces((state) => state)
  const panelInfo = usePanelInfo((info) => info)

  const nav = useNavState(registry.nav)
  React.useEffect(() => {
    if (nav.section === 'rooms') registry.nav.dispatch({ type: 'select-section', section: 'assistants' })
    if (nav.roomId) registry.nav.dispatch({ type: 'close-room' })
  }, [nav.section, nav.roomId, registry])
  const data = registry.useBots()
  const work = registry.useBusy()

  const bots = data.bots
  const rooms = data.rooms
  const split = React.useMemo(() => splitSessions(sessionsState, bots.map((bot) => bot.id)), [sessionsState, bots])

  // The Conversation the main column currently retains (`retainedBy.mainView`).
  const retainedId = React.useMemo(
    () => split.all.find((row) => row.retainedBy && (row.retainedBy.mainView || 0) > 0)?.id || null,
    [split.all],
  )
  const activeSessionId = retainedId || nav.sessionId
  const sessionRow = activeSessionId ? split.all.find((row) => row.id === activeSessionId) || null : null
  const activeBotId = sessionRow ? botIdForPreset(sessionRow.agentPreset) : null
  // The bot row that reads as selected: the channel the open chat belongs to.
  // It stays highlighted while another bot's list is expanded, so "the
  // conversation belongs to AJ" is never lost from the chrome.
  const selectedBotId = activeBotId

  // Keep the store in step with attention elsewhere (chat started from the
  // composer, session removed): the section is never forced.
  React.useEffect(() => {
    if (retainedId && retainedId !== nav.sessionId) {
      registry.nav.dispatch({ type: 'sync-session', sessionId: retainedId })
    }
  }, [retainedId, nav.sessionId, registry])

  // A room that was deleted while open leaves the main column.
  const room = nav.roomId ? rooms.find((candidate) => candidate.id === nav.roomId) || null : null
  React.useEffect(() => {
    if (nav.roomId && !room) registry.nav.dispatch({ type: 'close-room' })
  }, [nav.roomId, room, registry])

  const needle = nav.query.trim().toLowerCase()
  const matches = React.useCallback(
    (...values) => !needle || values.some((value) => String(value || '').toLowerCase().includes(needle)),
    [needle],
  )
  const visibleBots = needle ? bots.filter((bot) => matches(bot.name, bot.tagline)) : bots
  const visibleRooms = needle ? rooms.filter((candidate) => matches(candidate.name)) : rooms

  const panelId = panelInfo ? panelInfo.activePanelId : null
  const pluginsOpen = panelId === 'plugins'

  // ----- actions (each guarded: a missing service disables one control) -----

  /** Return the main column to the Conversation from a global panel. */
  const revealConversation = React.useCallback(() => {
    if (!panelId || !openSession) return
    try {
      selectPanel(null)
    } catch {
      /* unregistered key: nothing to reveal */
    }
  }, [panelId, openSession, selectPanel])

  const openChat = React.useCallback(
    (row) => {
      if (!row || !openSession) return
      if (registry.nav.getState().roomId) registry.nav.dispatch({ type: 'close-room' })
      registry.nav.dispatch({ type: 'select-session', sessionId: row.id })
      try {
        openSession(row.id)
      } catch (error) {
        registry.toast(error && error.message ? error.message : 'Could not open that chat.', 'error')
      }
    },
    [openSession, registry],
  )

  const newChat = React.useCallback(
    (bot) => {
      if (!startSession) return
      try {
        if (nav.roomId) registry.nav.dispatch({ type: 'close-room' })
        registry.nav.dispatch({ type: 'open-bot', botId: bot.id })
        startSession(undefined, { agentPreset: `grokbot-${bot.id}` })
        closeDrawer()
      } catch (error) {
        registry.toast(error && error.message ? error.message : `Could not start a chat with ${bot.name}.`, 'error')
      }
    },
    [startSession, registry, closeDrawer],
  )

  /** Select a GPT; selecting the active GPT again returns to a standard chat. */
  const activateBot = React.useCallback((bot) => {
    if (!startSession) return
    try {
      if (nav.roomId) registry.nav.dispatch({ type: 'close-room' })
      revealConversation()
      if (selectedBotId === bot.id) {
        registry.nav.dispatch({ type: 'collapse-bot' })
        startSession(undefined, { agentPreset: 'standard' })
      } else {
        registry.nav.dispatch({ type: 'open-bot', botId: bot.id })
        startSession(undefined, { agentPreset: `grokbot-${bot.id}` })
      }
      closeDrawer()
    } catch (error) {
      registry.toast(error?.message || 'Could not switch chats.', 'error')
    }
  }, [nav.roomId, registry, selectedBotId, startSession, closeDrawer, revealConversation])

  const openRoom = React.useCallback(
    (target) => {
      revealConversation()
      registry.nav.dispatch({ type: 'open-room', roomId: target.id })
      closeDrawer()
    },
    [revealConversation, registry, closeDrawer],
  )

  const newSession = React.useCallback(() => {
    if (!startSession) return
    try {
      if (registry.nav.getState().roomId) registry.nav.dispatch({ type: 'close-room' })
      registry.nav.dispatch({ type: 'collapse-bot' })
      revealConversation()
      startSession(undefined, { agentPreset: 'standard' })
      closeDrawer()
    } catch (error) {
      registry.toast(error && error.message ? error.message : 'Could not start a new chat.', 'error')
    }
  }, [startSession, registry, closeDrawer, revealConversation])

  const onPlugins = React.useCallback(() => {
    if (!selectPanel) return
    try {
      selectPanel('plugins')
      closeDrawer()
    } catch {
      registry.toast('The Plugins panel is not available yet.', 'error')
    }
  }, [selectPanel, registry, closeDrawer])

  /**
   * Settings. The full `settings.open` dialog cannot paint in this build (its
   * panel is mounted in the native sidebar's seat — see index.jsx), so this
   * never pretends it opened. It asks the shell once anyway, then always
   * raises the honest notice from BotsRoot's overlay so the click is never
   * silent. The notice carries the way to Plugins → Built-in plugin settings.
   */
  const onSettings = React.useCallback(() => {
    let opened = false
    try { opened = typeof openSettings === 'function' && openSettings() } catch {}
    closeDrawer()
    if (!opened) registry.dialogs.dispatch({ type: 'open-settings' })
  }, [openSettings, registry, closeDrawer])

  const onWorkspace = React.useCallback(() => {
    if (typeof openWorkspace !== 'function' || !openWorkspace()) {
      registry.toast('Workspaces are not available right now.', 'error')
    }
  }, [openWorkspace, registry])

  // ----- drawer semantics ---------------------------------------------------

  const columnRef = React.useRef(null)
  useDrawerBehaviour({ drawer, collapsed, columnRef, onClose: toggleSidebar })

  const ws = workspaceLabel(currentWorkspace(workspacesState, sessionRow))

  // ----- rail ---------------------------------------------------------------

  // In drawer mode the frame owns visibility: a closed drawer parks the column
  // off-canvas in a zero-width track and the `shell.leading` opener is the only
  // visible affordance. Painting a rail there would put a second, unreachable
  // "open" control inside a track the frame has already collapsed, so render
  // nothing. (`collapsed && drawer` is the closed-drawer state; the expanded
  // drawer branch below carries role="dialog" and the focus trap.)
  if (collapsed && drawer) return null

  if (collapsed) {
    return (
      <div className="gb-s gb-s-rail" aria-label="dsh" ref={columnRef}>
        <style data-grokbot-sidebar="true">{styles + sidebarStyles}</style>
        <RailItem label="Open sidebar (Ctrl+B)" opener="toggle" onClick={() => toggleSidebar && toggleSidebar()}>
          <span className="gb-s-mark">
            <BotAvatar bot={BRAND_BOT} size={24} />
          </span>
        </RailItem>
        <RailItem label="New chat" onClick={newSession}>
          <Icon name="plus" size={18} />
        </RailItem>
        <div className="gb-srail-stack">
          {bots.slice(0, 8).map((bot) => {
            const tone = botTone(split, statusMap, bot.id)
            return (
              <RailItem
                key={bot.id}
                label={tone === 'idle' ? bot.name : `${bot.name} · ${activityLabel(tone)}`}
                active={selectedBotId === bot.id}
                onClick={() => {
                  // The rail cannot show an inline list, so a click expands the
                  // assistant and re-opens the wide column around it.
                  activateBot(bot)
                  if (typeof toggleSidebar === 'function') toggleSidebar()
                }}
              >
                <span className="gb-srow-avatar">
                  <BotAvatar bot={bot} size={26} />
                  <i className={`gb-sdot gb-sdot--${tone}`} aria-hidden="true" />
                </span>
              </RailItem>
            )
          })}
        </div>
        {mediaOpen && <MediaLibrary onClose={() => setMediaOpen(false)} />}
        <RailItem label="Media library" onClick={() => setMediaOpen(true)}><span aria-hidden="true">▧</span></RailItem>
        <RailItem label="Settings" onClick={onSettings}>
          <Icon name="settings" size={18} />
        </RailItem>
      </div>
    )
  }

  // ----- wide column --------------------------------------------------------

  const sections = [
    { id: 'chats', label: 'All chats', count: split.others.filter((row) => !row.blank).length, icon: 'allChats' },
  ]

  return (
    <div
      className="gb-s"
      aria-label="dsh"
      ref={columnRef}
      role={drawer ? 'dialog' : undefined}
      aria-modal={drawer ? true : undefined}
      tabIndex={drawer ? -1 : undefined}
    >
      <style data-grokbot-sidebar="true">{styles + sidebarStyles}</style>

      <div className="gb-s-brand">
        <span className="gb-s-brandmark" aria-hidden="true">
          <BotAvatar bot={BRAND_BOT} size={26} />
        </span>
        <span className="gb-s-wordmark">dsh</span>
        {drawer ? (
          <button type="button" className="gb-s-close" aria-label="Close sidebar" onClick={() => toggleSidebar && toggleSidebar()}>
            <Icon name="close" size={16} />
          </button>
        ) : null}
      </div>

      <button type="button" className="gb-s-primary" onClick={newSession}>
        <Icon name="plus" size={16} />
        <span>New chat</span>
      </button>

      <label className="gb-s-search">
        <Icon name="search" size={14} />
        <input
          type="search"
          value={nav.query}
          placeholder={nav.section === 'chats' ? 'Search chats' : nav.section === 'rooms' ? 'Search group chats' : 'Search GPTs'}
          aria-label={nav.section === 'chats' ? 'Search chats' : nav.section === 'rooms' ? 'Search group chats' : 'Search GPTs'}
          onChange={(event) => registry.nav.dispatch({ type: 'set-query', query: event.target.value })}
          onKeyDown={(event) => {
            if (event.key === 'Escape' && nav.query) {
              event.preventDefault()
              event.stopPropagation()
              registry.nav.dispatch({ type: 'set-query', query: '' })
            }
          }}
        />
      </label>

      <div className="gb-s-section" aria-label="Chat navigation">
        {sections.map((section) => (
          <button
            key={section.id}
            type="button"
            aria-pressed={nav.section === section.id}
            className={`gb-snav${nav.section === section.id ? ' is-active' : ''}`}
            onClick={() => {
              if (section.id !== 'rooms' && nav.roomId) registry.nav.dispatch({ type: 'close-room' })
              registry.nav.dispatch({ type: 'select-section', section: nav.section === section.id ? 'assistants' : section.id })
            }}
          >
            <span className="gb-snav-icon" aria-hidden="true">
              <Icon name={section.icon} size={15} />
            </span>
            <span className="gb-snav-label">{section.label}</span>
            <span className="gb-s-label-count">{section.count}</span>
          </button>
        ))}
      </div>

      <div className="gb-s-scroll">
        {data.error ? (
          <div className="gb-serr" role="status">
            <strong>Bots are offline</strong>
            {data.error}
            <button type="button" className="gb-snew" onClick={() => registry.reload()}>
              <Icon name="retry" size={13} /> Try again
            </button>
          </div>
        ) : null}

        {true ? (
          <BotSection
            bots={visibleBots}
            allBots={bots}
            split={split}
            statusMap={statusMap}
            activeSessionId={activeSessionId}
            selectedBotId={selectedBotId}
            expandedId={nav.botId}
            needle={needle}
            loading={data.status === 'loading' || data.status === 'idle'}
            registry={registry}
            onActivate={activateBot}
            onChat={openChat}
            onNewChat={newChat}
          />
        ) : null}



        {nav.section === 'chats' ? (
          <AllChats
            others={split.others}
            orphans={split.orphans}
            activeSessionId={activeSessionId}
            needle={needle}
            onChat={openChat}
          />
        ) : null}
      </div>

      {mediaOpen && <MediaLibrary onClose={() => setMediaOpen(false)} />}
      <div className="gb-s-foot">
        <button type="button" className="gb-sws" onClick={onWorkspace} title={`${ws.name} — ${ws.detail}`}>
          <Icon name="folder" size={14} />
          <span className="gb-sws-name">Workspace: {ws.name}</span>
          <Icon name="chevronRight" size={13} />
        </button>
        <button type="button" className="gb-sfoot" onClick={() => setMediaOpen(true)}><span aria-hidden="true" style={{width:16,textAlign:"center",fontSize:18}}>▧</span><span>Media library</span></button>
        <button
          type="button"
          className={`gb-sfoot${pluginsOpen ? ' is-active' : ''}`}
          aria-current={pluginsOpen ? 'page' : undefined}
          onClick={onPlugins}
        >
          <Icon name="plugins" size={16} />
          <span>Plugins</span>
        </button>
        <button
          type="button"
          className="gb-sfoot"
          onClick={onSettings}
          title="Settings"
          aria-haspopup="dialog"
        >
          <Icon name="settings" size={16} />
          <span>Settings</span>
        </button>
        <button
          type="button"
          className="gb-sfoot"
          onClick={() => registry.dialogs.dispatch({ type: 'edit-bot', botId: null })}
        >
          <Icon name="plus" size={16} />
          <span>New GPT</span>
        </button>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Sections                                                                   */
/* -------------------------------------------------------------------------- */

function BotSection({ bots, allBots, split, statusMap, activeSessionId, selectedBotId, expandedId, needle, loading, registry, onActivate, onChat, onNewChat }) {
  if (loading && !allBots.length) {
    return (
      <div className="gb-slist-empty" aria-busy="true">
        <Spinner size={13} /> Loading GPTs…
      </div>
    )
  }
  if (!allBots.length) return <div className="gb-slist-empty">No GPTs yet — create one below.</div>
  if (!bots.length) return <div className="gb-slist-empty">No GPT matches “{needle}”.</div>

  return bots.map((bot) => (
    <BotItem
      key={bot.id}
      bot={bot}
      chats={(split.byBot.get(bot.id) || []).filter((row) => !row.blank)}
      tone={botTone(split, statusMap, bot.id)}
      statusMap={statusMap}
      activeSessionId={activeSessionId}
      selected={selectedBotId === bot.id}
      expanded={expandedId === bot.id}
      registry={registry}
      onActivate={onActivate}
      onChat={onChat}
      onNewChat={onNewChat}
    />
  ))
}

function BotItem({ bot, chats, tone, statusMap, activeSessionId, selected, expanded, registry, onActivate, onChat, onNewChat }) {
  const [menuOpen, setMenuOpen] = React.useState(false)
  const rowRef = React.useRef(null)

  React.useEffect(() => {
    if (!menuOpen) return undefined
    const onDocDown = (event) => {
      if (rowRef.current && rowRef.current.contains(event.target)) return
      setMenuOpen(false)
    }
    const onKey = (event) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('mousedown', onDocDown, true)
    document.addEventListener('keydown', onKey, true)
    return () => {
      document.removeEventListener('mousedown', onDocDown, true)
      document.removeEventListener('keydown', onKey, true)
    }
  }, [menuOpen])

  const menu = (type, extra) => {
    setMenuOpen(false)
    registry.dialogs.dispatch({ type, ...extra })
  }

  return (
    <div ref={rowRef}>
      <div className={`gb-srow${selected ? ' is-active' : ''}${menuOpen ? ' is-channel' : ''}`}>
        <button
          type="button"
          className="gb-srow-avatar gb-srow-avatar-btn gb-as-trigger"
          aria-label={`${bot.name} — more actions`}
          title="More actions"
          aria-haspopup="menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <BotAvatar bot={bot} size={26} activity={tone === 'waiting' ? 'waiting' : tone === 'working' ? 'writing' : 'idle'} />
          <span className={`gb-sdot gb-sdot--${tone}`} aria-hidden="true" />
        </button>
        <button
          type="button"
          className="gb-srow-main"
          aria-expanded={expanded}
          aria-pressed={selected}
          onClick={() => onActivate(bot)}
          title={bot.tagline ? `${bot.name} — ${bot.tagline}` : bot.name}
        >
          <span className="gb-srow-copy">
            <span className="gb-srow-title">{bot.name}</span>
            <span className="gb-srow-sub">{tone === 'idle' ? (bot.tagline && bot.tagline.toLowerCase() !== 'assistant' ? bot.tagline : 'GPT') : activityLabel(tone)}</span>
          </span>
        </button>
        <span className="gb-srow-chevron" aria-hidden="true">
          <Icon name="chevronRight" size={14} />
        </span>
      </div>

      {menuOpen ? (
        <div className="gb-smenu" role="menu" aria-label={`${bot.name} actions`}>
          <MenuItem onSelect={() => menu('edit-bot', { botId: bot.id })}>
            <Icon name="edit" size={14} /> Edit GPT
          </MenuItem>
          <MenuItem onSelect={() => menu('avatar-studio', { botId: bot.id })}>
            <Icon name="image" size={14} /> Change look
          </MenuItem>
          <MenuItem danger onSelect={() => menu('confirm-delete-bot', { botId: bot.id })}>
            <Icon name="trash" size={14} /> Delete GPT
          </MenuItem>
        </div>
      ) : null}

      {expanded ? (
        <div className="gb-slist">
          <button type="button" className="gb-snew" onClick={() => onNewChat(bot)}>
            <Icon name="plus" size={13} /> New chat with {bot.name}
          </button>
          {chats.length ? (
            chats.map((row) => (
              <ChatRow
                key={row.id}
                row={row}
                tone={rowTone(statusMap, row)}
                active={row.id === activeSessionId}
                onOpen={onChat}
              />
            ))
          ) : (
            <div className="gb-slist-empty">No chats with {bot.name} yet</div>
          )}
        </div>
      ) : null}
    </div>
  )
}

function RoomSection({ rooms, allRooms, bots, activeRoomId, work, onOpen, onCreate }) {
  if (!allRooms.length) {
    return (
      <div className="gb-slist-empty">
        No group chats yet.
        <button type="button" className="gb-snew" onClick={onCreate}>
          <Icon name="plus" size={13} /> New group chat
        </button>
      </div>
    )
  }
  if (!rooms.length) return <div className="gb-slist-empty">No group chat matches your search.</div>

  const byId = new Map(bots.map((bot) => [bot.id, bot]))
  return rooms.map((room) => {
    const members = (room.botIds || []).map((id) => byId.get(id)).filter(Boolean)
    const busy = work && work.roomId === room.id
    const active = room.id === activeRoomId
    return (
      <button
        key={room.id}
        type="button"
        className={`gb-srow${active ? ' is-active' : ''}`}
        aria-current={active ? 'page' : undefined}
        onClick={() => onOpen(room)}
        title={room.name}
      >
        <span className="gb-srow-avatar">
          <StackedAvatars bots={members} size={22} max={2} />
        </span>
        <span className="gb-srow-copy">
          <span className="gb-srow-title">{room.name}</span>
          <span className="gb-srow-sub">
            {members.length === 1 ? '1 bot' : `${members.length} bots`}
            {busy ? ' · replying…' : room.pending ? ' · waiting for you' : ''}
          </span>
        </span>
        {room.pending ? <i className="gb-sdot gb-sdot--waiting" aria-hidden="true" /> : null}
      </button>
    )
  })
}

function AllChats({ others, orphans, activeSessionId, needle, onChat }) {
  const [collapsedGroups, setCollapsedGroups] = React.useState({})

  const groups = React.useMemo(() => {
    const byLabel = new Map()
    for (const row of others.filter((item) => !item.blank)) {
      const label = row.workspaceName || basenameOf(row.cwd) || 'Ungrouped'
      const group = byLabel.get(label)
      if (group) group.rows.push(row)
      else byLabel.set(label, { label, rows: [row] })
    }
    return Array.from(byLabel.values()).sort((a, b) => (b.rows[0].updatedAt || 0) - (a.rows[0].updatedAt || 0))
  }, [others])

  const orphanGroups = React.useMemo(
    () => Array.from(orphans.entries()).map(([botId, rows]) => ({ label: `${botId} (deleted)`, rows: rows.filter((row) => !row.blank) })).filter((group) => group.rows.length),
    [orphans],
  )

  const all = groups.concat(orphanGroups)
  const total = all.reduce((sum, group) => sum + group.rows.length, 0)
  if (!total) return <div className="gb-slist-empty">No chats yet.</div>

  const isOpen = (label) => collapsedGroups[label] !== true
  const toggle = (label) => setCollapsedGroups((previous) => ({ ...previous, [label]: previous[label] !== true }))

  const renderRows = (rows) => {
    const visible = needle
      ? rows.filter((row) => `${sessionLabel(row)} ${row.cwd || ''}`.toLowerCase().includes(needle))
      : rows
    if (!visible.length) return <div className="gb-slist-empty">No chat matches your search.</div>
    return visible.slice(0, 40).map((row) => (
      <ChatRow key={row.id} row={row} tone={rowTone(null, row)} active={row.id === activeSessionId} onOpen={onChat} />
    ))
  }

  return all.map((group) => (
    <div key={group.label}>
      <button
        type="button"
        className="gb-slabel gb-sgrouphead"
        aria-expanded={isOpen(group.label)}
        onClick={() => toggle(group.label)}
      >
        <span className="gb-sgroup-name">{group.label}</span>
        <span className="gb-s-label-count">{group.rows.length}</span>
      </button>
      {isOpen(group.label) ? <div className="gb-slist">{renderRows(group.rows)}</div> : null}
    </div>
  ))
}

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

function basenameOf(value) {
  if (typeof value !== 'string' || !value) return ''
  const parts = value.replace(/[/\\]+$/, '').split(/[/\\]/)
  return parts[parts.length - 1] || ''
}

function rowTone(statusMap, row) {
  const status = statusMap && typeof statusMap.get === 'function' ? statusMap.get(row.id) : undefined
  if (status && status.pendingInteraction) return 'waiting'
  if (status && typeof status.running === 'boolean') return status.running ? 'working' : 'idle'
  return row && row.running ? 'working' : 'idle'
}

/** Workspace for the selected Session, else the most recently updated one. */
function currentWorkspace(workspacesState, sessionRow) {
  const items = workspacesState && Array.isArray(workspacesState.items) ? workspacesState.items : []
  if (!items.length) return null
  const sessionWorkspaceId = sessionRow && sessionRow.workspaceId
  if (sessionWorkspaceId) {
    const match = items.find((item) => item.workspaceId === sessionWorkspaceId)
    if (match) return match
  }
  if (sessionRow && sessionRow.cwd) {
    const match = items.find((item) => item.path === sessionRow.cwd)
    if (match) return match
  }
  return items.slice().sort((a, b) => String(b.updatedAt || '').localeCompare(String(a.updatedAt || '')))[0]
}

/* -------------------------------------------------------------------------- */
/* Drawer behaviour                                                           */
/* -------------------------------------------------------------------------- */

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

/**
 * What ui-sidebar used to give the drawer: a focus trap while it is open,
 * Escape to close, focus moved in on open and back to the opener on close. A
 * no-op in the docked column (the frame already owns the mask and `inert`).
 *
 * Focus return is deliberately explicit. The opener is the frame's leading
 * seat button (`[data-sidebar-opener]`), not whatever happened to be focused
 * when the effect ran — on open the frame has usually already moved focus into
 * the drawer, so `document.activeElement` is not the opener. The restore is
 * also deferred a frame, because closing re-renders the frame and it focuses
 * the composer on the same tick; without the defer the composer wins.
 */
function useDrawerBehaviour({ drawer, collapsed, columnRef, onClose }) {
  const closeRef = React.useRef(onClose)
  closeRef.current = onClose
  const openerRef = React.useRef(null)

  // Track the opener while the drawer is closed: it is present (and focused
  // or clicked) before the drawer opens, and it is the element to return to.
  React.useEffect(() => {
    if (!drawer) return undefined
    const capture = () => {
      const node = document.querySelector('[data-sidebar-opener="leading"], [data-sidebar-opener="toggle"]')
      if (node) openerRef.current = node
    }
    capture()
    // The seat may mount after this effect; pick it up on the first pointer
    // press anywhere (capture phase, so it runs before the click handler).
    const onPointerDown = (event) => {
      const target = event.target
      const opener = target && target.closest && target.closest('[data-sidebar-opener]')
      if (opener) openerRef.current = opener
      else capture()
    }
    document.addEventListener('pointerdown', onPointerDown, true)
    return () => document.removeEventListener('pointerdown', onPointerDown, true)
  }, [drawer])

  React.useEffect(() => {
    if (!drawer || collapsed) return undefined
    const node = columnRef.current
    if (!node) return undefined
    if (!openerRef.current) {
      const fallback = document.querySelector('[data-sidebar-opener="leading"], [data-sidebar-opener="toggle"]')
      if (fallback) openerRef.current = fallback
    }

    const focusables = () =>
      Array.from(node.querySelectorAll(FOCUSABLE)).filter(
        (element) => element.offsetParent !== null || element === document.activeElement,
      )

    const first = focusables()[0]
    if (first && typeof first.focus === 'function') first.focus({ preventScroll: true })
    else if (typeof node.focus === 'function') node.focus({ preventScroll: true })

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        // A sheet above the drawer owns its own Escape.
        if (document.querySelector('.gb-scrim')) return
        event.preventDefault()
        event.stopPropagation()
        if (typeof closeRef.current === 'function') closeRef.current()
        return
      }
      if (event.key !== 'Tab') return
      const list = focusables()
      if (!list.length) return
      const index = list.indexOf(document.activeElement)
      if (event.shiftKey) {
        if (index <= 0) {
          event.preventDefault()
          list[list.length - 1].focus()
        }
      } else if (index === list.length - 1 || index === -1) {
        event.preventDefault()
        list[0].focus()
      }
    }

    node.addEventListener('keydown', onKeyDown)
    return () => {
      node.removeEventListener('keydown', onKeyDown)
      const opener = openerRef.current
      // Defer past the frame's own re-focus of the composer on close.
      const restore = () => {
        if (!opener || !document.contains(opener)) return
        if (typeof opener.focus !== 'function') return
        try {
          opener.focus({ preventScroll: true })
        } catch {
          /* ignore */
        }
      }
      const raf = typeof requestAnimationFrame === 'function' ? requestAnimationFrame(restore) : null
      const timer = setTimeout(restore, 0)
      // The two are idempotent; whichever runs last wins, and both target the
      // same element. Nothing to cancel — the effect is already cleaning up.
      void raf
      void timer
    }
  }, [drawer, collapsed, columnRef])
}
