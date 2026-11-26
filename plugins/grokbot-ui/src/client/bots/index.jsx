/**
 * Grokbot UI — bot experience entry (Grokbot sidebar + header chrome).
 *
 * Layout (Option A): this plugin takes over the layout-owned `sidebar` slot
 * with its own component, shadowing ui-sidebar at a lower priority. The main
 * column stays DSH's native Conversation (composer, tool cards, approvals
 * untouched), so there is no full-window overlay and no handoff back and forth
 * any more.
 *
 * Registrations, each independent and each in its own try/catch:
 *
 *  - `sidebar`          (single, root, priority -10, NO children) — Sidebar.jsx
 *  - `shell.leading`    (single) — the sub-768px / drawer opener
 *  - `shell.overlay`    (list, id grokbot-shell) — BotsRoot: sheets, toasts,
 *                        desktop notifications and the group-chat room layer
 *
 * The `← Bot` breadcrumb lives with the identity decorations (they already own
 * `conversation.session.header.actions`); it reads the same registry.
 *
 * Declared child seats of the native sidebar (brand mark/name, panellist,
 * settings, workspaces) simply do not mount in our column: losing seats are
 * silent by design.
 */
import React from 'react'
import { BotsRoot } from './BotsRoot.jsx'
import { GptSettings, GptSettingsIcon } from './GptSettings.jsx'
import { GrokDictation } from './GrokDictation.jsx'
import { GrokbotSidebar } from './Sidebar.jsx'
import { createRegistry } from './registry.js'
import { createChromeStore, EMPTY_CHROME } from './chrome-state.js'
import { LeadingOpener } from './chrome.jsx'
import { openWorkspaceById, runShortcut } from './services.js'

/** Same shadowing trick the brand seats use: the shipped occupant sits at 0. */
const SIDEBAR_PRIORITY = -10

const LOG_PREFIX = '[grokbot-ui/bots]'

/**
 * Register the Grokbot sidebar, its chrome and its sheets.
 * @param {object} ctx DSH client plugin context (needs `ctx.slots`; reads
 *   `ctx.uiWorkspace`, `ctx.layout`, `ctx.shortcuts` lazily).
 * @returns {{registry: object, dispose: () => void}}
 */
export function registerBots(ctx) {
  const registry = createRegistry(ctx)
  const chrome = createChromeStore()
  registry.chrome = chrome

  const disposers = []
  const register = (slot, id, options, component) => {
    try {
      const dispose = ctx.slots.inject(slot, () =>
        ctx.slots.register({ name: slot, id, ...options }, component),
      )
      if (typeof dispose === 'function') disposers.push(dispose)
    } catch (error) {
      console.warn(`${LOG_PREFIX} could not register ${slot}`, error)
    }
  }

  // --- services resolved lazily (a missing one disables one control) --------

  const getWorkspace = () => {
    try {
      return ctx.uiWorkspace || null
    } catch {
      return null
    }
  }
  const getLayout = () => {
    try {
      return ctx.layout || null
    } catch {
      return null
    }
  }
  const getShortcuts = () => {
    try {
      return ctx.shortcuts || null
    } catch {
      return null
    }
  }

  const revealConversation = () => {
    const layout = getLayout()
    if (!layout || typeof layout.selectPanel !== 'function') return
    let active = null
    try {
      active = layout.panelInfo ? layout.panelInfo.getSnapshot().activePanelId : null
    } catch {
      active = null
    }
    if (!active) return
    try {
      layout.selectPanel(null)
    } catch {
      /* unregistered key: nothing to reveal */
    }
  }

  const openSession = (sessionId) => {
    const workspace = getWorkspace()
    if (!workspace || typeof workspace.openSession !== 'function') {
      throw new Error('Session navigation is not available yet.')
    }
    if (registry.nav.getState().roomId) registry.nav.dispatch({ type: 'close-room' })
    workspace.openSession(sessionId)
  }

  const startSession = (workspaceId, options) => {
    const workspace = getWorkspace()
    if (!workspace || typeof workspace.startSession !== 'function') {
      throw new Error('Chat is not available yet — the workspace UI is still loading.')
    }
    if (registry.nav.getState().roomId) registry.nav.dispatch({ type: 'close-room' })
    workspace.startSession(workspaceId, options)
  }

  const selectPanel = (panelId) => {
    const layout = getLayout()
    if (!layout || typeof layout.selectPanel !== 'function') throw new Error('Panels are not available yet.')
    layout.selectPanel(panelId)
  }

  const toggleSidebar = () => {
    const layout = getLayout()
    if (!layout || typeof layout.toggleSidebar !== 'function') return
    layout.toggleSidebar()
  }

  /**
   * Try the shell's own `settings.open` command at menu level.
   *
   * Note: in this DSH build the command executes (its store flips open) but the
   * panel it drives is only rendered by ui-settings-general's `SettingsRoot`,
   * which mounts inside the native sidebar's `sidebar.settings` seat. A plugin
   * that owns `sidebar` cannot mount that seat (re-declaring the children is a
   * hard slot error), so the dialog cannot paint here until upstream moves the
   * panel to a root-level outlet.
   *
   * `KEY:` invoking it is still worth doing — the shell's own handler stays the
   * source of truth if a future build can paint — but it must never be reported
   * as user-visible feedback. So this always returns false, and every caller
   * pairs it with a real affordance (the footer opens SettingsNotice). That is
   * what keeps the button from being a silent dead click.
   */
  const openSettings = () => {
    return runShortcut(getShortcuts(), 'settings.open') === 'invoked'
  }

  /** Open DSH's recent-workspace picker (no full workspace tree in our column). */
  const openWorkspace = () => {
    const workspace = getWorkspace()
    if (!workspace) return false
    let target = null
    try {
      const snapshot = ctx.workspaces && ctx.workspaces.list ? ctx.workspaces.list.getSnapshot() : null
      const items = snapshot && Array.isArray(snapshot.items) ? snapshot.items : []
      target = items.length ? items[0].workspaceId : null
    } catch {
      target = null
    }
    if (typeof workspace.openWorkspace === 'function' && target) {
      void openWorkspaceById(workspace, target).then((ok) => {
        if (!ok) registry.toast('Could not open that workspace.', 'error')
      })
      return true
    }
    if (typeof workspace.startSession === 'function') {
      try {
        workspace.startSession()
        return true
      } catch {
        return false
      }
    }
    return false
  }

  const closeDrawer = () => {
    // Closing the drawer = collapsing the (track-less) sidebar.
    let isDrawer = false
    try {
      const frame = document.querySelector('[data-sidebar-drawer]')
      isDrawer = !!frame
    } catch {
      isDrawer = false
    }
    if (isDrawer && typeof toggleSidebar === 'function') toggleSidebar()
  }

  const shared = {
    openSession,
    startSession,
    selectPanel,
    toggleSidebar,
    openSettings,
    openWorkspace,
    closeDrawer,
    revealConversation,
  }

  register('conversation.input.right', 'dsh-grok-dictation', { order: 90 }, GrokDictation)
  register('settings.section', 'dsh-gpts', { order: 12, label: () => 'GPTs' }, (props) => <GptSettings registry={registry} {...props} />)
  register('settings.section.icon', 'dsh-gpts', {}, GptSettingsIcon)

  // --- sidebar -------------------------------------------------------------

  try {
    const dispose = ctx.slots.inject('sidebar', () =>
      ctx.slots.register(
        // NO `children`: re-declaring the native child seats would race
        // ui-plugin-manager (it registers `sidebar.panellist` unconditionally).
        { name: 'sidebar', priority: SIDEBAR_PRIORITY },
        (props) => <GrokbotSidebar registry={registry} {...shared} {...props} />,
      ),
    )
    if (typeof dispose === 'function') disposers.push(dispose)
  } catch (error) {
    console.warn(`${LOG_PREFIX} could not take over the sidebar`, error)
  }

  // --- shell.leading opener (drawer + narrow frames) ------------------------

  register('shell.leading', 'grokbot-leading', { priority: SIDEBAR_PRIORITY }, (props) => (
    <LeadingOpener registry={registry} toggleSidebar={toggleSidebar} {...props} />
  ))

  // --- sheets, toasts, notifications, room layer ----------------------------

  register('shell.overlay', 'grokbot-shell', { order: 10 }, (props) => (
    <BotsRoot ctx={ctx} registry={registry} {...props} />
  ))

  // Publish the sidebar's own view of "what is open" for the breadcrumb.
  const publishChrome = () => {
    const state = registry.nav.getState()
    const bots = registry.botsStore.getState().bots
    const bot = state.botId ? bots.find((candidate) => candidate.id === state.botId) || null : null
    chrome.set({
      ...EMPTY_CHROME,
      botId: state.botId,
      botName: bot ? bot.name : state.botId,
      sessionId: state.sessionId,
      roomId: state.roomId,
      section: state.section,
      open: state.section === 'assistants' && !!state.botId,
    })
  }
  disposers.push(registry.nav.subscribe(publishChrome))
  disposers.push(registry.botsStore.subscribe(publishChrome))
  publishChrome()

  return {
    registry,
    dispose: () => {
      for (let index = disposers.length - 1; index >= 0; index -= 1) {
        try {
          disposers[index]()
        } catch (error) {
          console.warn(`${LOG_PREFIX} disposer failed`, error)
        }
      }
    },
  }
}

export { BotsRoot, GrokbotSidebar }
