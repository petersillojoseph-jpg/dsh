/**
 * In-app bot identity: the animated avatar chip in a bot Session's header,
 * the `← Bot` breadcrumb beside it (back to that bot's chat list in the
 * Grokbot sidebar), and the hero brand cluster.
 *
 * Bot definitions are read from the plugin's own local API (the same source the
 * Bots surface uses) and cached in this module. Nothing here blocks rendering:
 * before the first fetch resolves the decorations render nothing.
 *
 * Activity comes from the real Session standard props: the header chip uses
 * `useSession` + `useSessionStatus` (running → working, pending interaction →
 * waiting, failed → error, else idle). No activity is invented: unknown
 * sessions stay idle. (`sidebar.session.row.leading` is no longer mounted —
 * the Grokbot sidebar owns its own rows and avatars.)
 */
import React from 'react'
import { BotAvatar } from '../shared/avatar/index.jsx'
import { activityLabel, useOwnSessionActivity } from '../bots/live.js'
import { botIdForPreset, sessionRows, sessionLabel, relativeTime } from '../bots/nav.js'
import { VisuallyHidden } from '../bots/components.jsx'

const API_STATE = '/grokbot/api/state'
const PRESET_PREFIX = 'grokbot-'

/** @type {{ bots: any[], byPreset: Map<string, any>, loadedAt: number, loading: Promise<any>|null, listeners: Set<Function> }} */
const store = {
  bots: [],
  byPreset: new Map(),
  loadedAt: 0,
  loading: null,
  listeners: new Set(),
}

function publish() {
  for (const listener of store.listeners) {
    try { listener() } catch {}
  }
}

function indexBots(bots) {
  const byPreset = new Map()
  for (const bot of Array.isArray(bots) ? bots : []) {
    if (!bot || typeof bot.id !== 'string') continue
    byPreset.set(PRESET_PREFIX + bot.id, bot)
  }
  store.bots = Array.isArray(bots) ? bots : []
  store.byPreset = byPreset
  store.loadedAt = Date.now()
}

/** Refresh the bot cache at most once every few seconds. */
export function refreshBotIdentity(force = false) {
  if (store.loading) return store.loading
  if (!force && Date.now() - store.loadedAt < 8000) return Promise.resolve(store.bots)
  store.loading = fetch(API_STATE, { headers: { accept: 'application/json' } })
    .then((response) => (response.ok ? response.json() : Promise.reject(new Error(String(response.status)))))
    .then((data) => {
      indexBots(data?.bots)
      publish()
      return store.bots
    })
    .catch(() => store.bots)
    .finally(() => { store.loading = null })
  return store.loading
}

function useBotStore() {
  const [, setRevision] = React.useState(0)
  React.useEffect(() => {
    const listener = () => setRevision((value) => value + 1)
    store.listeners.add(listener)
    refreshBotIdentity()
    return () => { store.listeners.delete(listener) }
  }, [])
  return store
}

function botForPreset(preset) {
  if (typeof preset !== 'string' || !preset.startsWith(PRESET_PREFIX)) return null
  return store.byPreset.get(preset) || null
}

function activityTone(activity) {
  if (activity === 'working' || activity === 'reading' || activity === 'writing' || activity === 'thinking') return 'working'
  if (activity === 'waiting') return 'waiting'
  if (activity === 'error') return 'error'
  return 'idle'
}

function BotHeaderChip(props) {
  const identity = useBotStore()
  const preset = props.useProjection?.('agentPreset')
  const bot = botForPreset(preset) || identity.byPreset.get(preset) || null
  const activity = useOwnSessionActivity(props)
  if (!bot) return null
  const tone = activityTone(activity)
  return (
    <div className="gb-idchip" title={`${bot.name} · local bot · ${activityLabel(activity)}`}>
      <BotAvatar bot={bot} size={26} activity={activity} />
      <span className="gb-idchip-name">{bot.name}</span>
      <span className={`gb-idchip-dot gb-idchip-dot--${tone}`} aria-hidden="true" />
      <VisuallyHidden>{activityLabel(activity)}</VisuallyHidden>
    </div>
  )
}

function HeroBrandMark({ ctx, registry }) {
  const identity = useBotStore()
  const source = ctx.sessions?.list
  const subscribe = React.useCallback((fn) => source ? source.subscribe(fn) : () => {}, [source])
  const getSnapshot = React.useCallback(() => source ? source.getSnapshot() : null, [source])
  const sessions = React.useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
  const bots = identity.bots.filter((bot) => bot.id !== 'memo').slice(0, 5)
  const rows = sessionRows(sessions)
  const active = rows.find((row) => row.retainedBy && (row.retainedBy.mainView || 0) > 0)
  const activeBotId = active ? botIdForPreset(active.agentPreset) : null
  const recent = rows.filter((row) => !row.blank).slice(0, 3)
  const start = (bot) => {
    try {
      if (activeBotId === bot.id) {
        registry.nav.dispatch({ type: 'collapse-bot' })
        ctx.uiWorkspace.startSession(undefined, { agentPreset: 'standard' })
      } else {
        registry.nav.dispatch({ type: 'open-bot', botId: bot.id })
        ctx.uiWorkspace.startSession(undefined, { agentPreset: `grokbot-${bot.id}` })
      }
    } catch (error) { registry.toast(error?.message || 'Could not start a chat.', 'error') }
  }
  const openPptx = () => {
    try {
      registry.nav.dispatch({ type: 'collapse-bot' })
      ctx.uiWorkspace.startSession(undefined, { agentPreset: 'standard', prompt: '/pptx ', whenDraftExists: 'append' })
    } catch (error) { registry.toast(error?.message || 'Could not open the PPTX skill.', 'error') }
  }
  const open = (row) => {
    try {
      registry.nav.dispatch({ type: 'select-session', sessionId: row.id })
      ctx.uiWorkspace.openSession(row.id)
    } catch (error) { registry.toast(error?.message || 'Could not open that chat.', 'error') }
  }
  return (
    <span className="dsh-welcome">
      <span className="dsh-welcome-title">Welcome to dsh</span>
      <span className="dsh-welcome-copy">Pick a GPT or start something new below.</span>
      {bots.length > 0 && <span className="dsh-welcome-section"><span className="dsh-welcome-label">YOUR GPTs</span><span className="dsh-welcome-bots">{bots.map(bot => <button type="button" key={bot.id} className="dsh-welcome-bot" aria-pressed={activeBotId === bot.id} onClick={() => start(bot)}><BotAvatar bot={bot} size={32} activity="idle" /><span><strong>{bot.name}</strong><small>{bot.tagline && bot.tagline.toLowerCase() !== 'assistant' ? bot.tagline : 'GPT'}</small></span></button>)}</span></span>}
      <span className="dsh-welcome-section"><span className="dsh-welcome-label">SKILLS</span><span className="dsh-welcome-bots"><button type="button" className="dsh-welcome-bot dsh-welcome-skill" onClick={openPptx}><span className="dsh-skill-icon" aria-hidden="true"><svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3.5h8l4 4V20a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1Z"/><path d="M14 3.5V8h4M8.5 12h6.5M8.5 15h6.5M8.5 18h4"/></svg></span><span><strong>PPTX</strong><small>Spanish lesson slides</small></span></button></span></span>
      {recent.length > 0 && <span className="dsh-welcome-section"><span className="dsh-welcome-label">RECENT CHATS</span><span className="dsh-welcome-recent">{recent.map(row => <button type="button" key={row.id} className="dsh-welcome-chat" onClick={() => open(row)}><span>{sessionLabel(row)}</span><small>{relativeTime(row.updatedAt)}</small></button>)}</span></span>}
    </span>
  )
}

/**
 * `← Bot name` in the conversation header: leaves a bot chat for that bot's
 * chat list without changing the open Session.
 *
 * It hides itself while the sidebar already shows that bot's list for this
 * exact Session — a button that does nothing would just be noise.
 */
function BotBackCrumb(props) {
  const identity = useBotStore()
  const chrome = props.registry && props.registry.chrome ? useChromeStore(props.registry.chrome) : null
  const preset = props.useProjection?.('agentPreset')
  const sessionId = props.sessionId
  const botId = botIdForPreset(preset) || null
  const bot = botId ? identity.byPreset.get(`grokbot-${botId}`) || null : null
  if (!bot || !props.registry) return null
  if (chrome && chrome.open && chrome.botId === botId && chrome.sessionId === sessionId) return null
  const back = () => {
    const nav = props.registry.nav
    if (nav.getState().roomId) nav.dispatch({ type: 'close-room' })
    if (sessionId) nav.dispatch({ type: 'select-session', sessionId })
    nav.dispatch({ type: 'open-bot', botId })
  }
  return (
    <button
      type="button"
      className="grok-crumb"
      onClick={back}
      title={`All chats with ${bot.name}`}
      aria-label={`All chats with ${bot.name}`}
      data-grokbot-breadcrumb="true"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
        <path d="M15 5l-7 7 7 7" />
      </svg>
      <span className="grok-crumb-name">{bot.name}</span>
    </button>
  )
}

/** Subscribe to the chrome store the sidebar publishes. */
function useChromeStore(store) {
  const subscribe = React.useCallback((listener) => store.subscribe(listener), [store])
  const getSnapshot = React.useCallback(() => store.getState(), [store])
  return React.useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
}

const STYLES = `
.gb-idchip{display:inline-flex;align-items:center;gap:7px;height:28px;padding:0 10px 0 3px;margin-inline-end:4px;border:1px solid var(--dsw-alias-border-l2,rgba(0,0,0,.1));border-radius:999px;background:var(--dsw-alias-bg-layer-1,transparent);color:var(--dsw-alias-label-primary,#111);font-size:12px;font-weight:600;letter-spacing:-.01em;cursor:default;user-select:none;white-space:nowrap}
.gb-idchip-name{max-width:120px;overflow:hidden;text-overflow:ellipsis}
.gb-idchip-dot{width:6px;height:6px;border-radius:50%;background:#9aa0a6;box-shadow:0 0 0 2px var(--dsw-alias-bg-layer-1,#fff)}
.gb-idchip-dot--working{background:#2bb673}
.gb-idchip-dot--waiting{background:#f5a623}
.gb-idchip-dot--error{background:#ff3e51}
.gb-idchip-dot--idle{background:var(--dsw-alias-label-tertiary,#9aa0a6)}
.grok-crumb{display:inline-flex;align-items:center;gap:4px;max-width:190px;height:28px;margin-inline-end:6px;padding:0 10px 0 7px;border:1px solid var(--dsw-alias-border-l2,rgba(0,0,0,.1));border-radius:999px;background:var(--dsw-alias-bg-layer-1,transparent);color:var(--dsw-alias-label-secondary,#5c5c5c);font:inherit;font-size:12px;font-weight:600;white-space:nowrap;cursor:pointer}
.grok-crumb:hover{background:var(--dsw-alias-interactive-bg-hover,rgba(0,0,0,.05));color:var(--dsw-alias-label-primary,#111)}
.grok-crumb svg{flex:none}
.grok-crumb-name{overflow:hidden;text-overflow:ellipsis}
.gb-hero-cluster{display:inline-flex;align-items:center;justify-content:center}
.gb-hero-cluster-item{display:inline-flex;margin-inline-start:-12px;filter:drop-shadow(0 2px 6px rgba(0,0,0,.12))}
.gb-hero-cluster-item:first-child{margin-inline-start:0}
/* The welcome lives in the existing hero seat, keeping the native composer mounted. */
[class*="_headline"]:has(.dsh-welcome) { display:block; width:100%; }
[class*="_headline"]:has(.dsh-welcome) [class*="_titleGroup"] { display:none; }
[class*="_headline"]:has(.dsh-welcome) [class*="_fishHitbox"] { display:block; width:100%; }
div:has(> span > .dsh-welcome) { display:block; width:100%; }
div:has(> span > .dsh-welcome) > span:has(> .dsh-welcome) { display:block; width:100%; }
div:has(> span > .dsh-welcome) > span:not(:has(> .dsh-welcome)) { display:none; }
.dsh-welcome { display:flex; flex-direction:column; align-items:stretch; width:100%; text-align:left; font-family:inherit; font-size:14px; line-height:1.35; color:var(--dsw-alias-label-primary,#1c1c1c); }
.dsh-welcome-kicker,.dsh-welcome-label { color:var(--dsw-alias-label-caption,#777); font-size:10px; font-weight:700; letter-spacing:.12em; }
.dsh-welcome-title { margin-top:8px; font-size:30px; line-height:1.15; font-weight:700; letter-spacing:-.035em; }
.dsh-welcome-copy { margin-top:6px; color:var(--dsw-alias-label-caption,#777); font-size:13px; font-weight:400; }
.dsh-welcome-section { display:block; margin-top:19px; }
.dsh-welcome-label { display:block; margin-bottom:8px; }
.dsh-welcome-bots { display:flex; gap:7px; overflow-x:auto; padding:2px 2px 5px; }
.dsh-welcome-bot,.dsh-welcome-chat { border:1px solid var(--dsw-alias-border-l4,rgba(128,128,128,.2)); background:var(--dsw-alias-interactive-bg-hover,rgba(128,128,128,.06)); color:inherit; cursor:pointer; transition:transform .16s ease,box-shadow .16s ease; }
.dsh-welcome-bot { display:flex; flex:0 0 auto; align-items:center; gap:8px; padding:7px 10px; border-radius:14px; text-align:left; }
.dsh-skill-icon { display:grid!important; place-items:center; width:32px; height:32px; border-radius:10px; background:color-mix(in srgb, #a97efe 20%, transparent); color:#7756c7; flex:none; }
.dsh-welcome-bot span:not(.dsh-skill-icon) { display:flex; flex-direction:column; max-width:100px; }
.dsh-welcome-bot strong { font-size:12px; font-weight:650; }
.dsh-welcome-bot small,.dsh-welcome-chat small { color:var(--dsw-alias-label-caption,#777); font-size:11px; font-weight:400; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.dsh-welcome-recent { display:flex; flex-direction:column; gap:4px; }
.dsh-welcome-chat { display:flex; justify-content:space-between; align-items:center; gap:12px; padding:7px 10px; border-radius:9px; font-size:12px; text-align:left; }
.dsh-welcome-chat > span { overflow:hidden; white-space:nowrap; text-overflow:ellipsis; }
.dsh-welcome-bot[aria-pressed="true"] { background:color-mix(in srgb, #a97efe 20%, var(--dsw-alias-bg-base,#fff)); border-color:#8b6fe8; box-shadow:0 0 0 1px #8b6fe8; }
.dsh-welcome-bot:hover,.dsh-welcome-chat:hover { transform:translateY(-1px); box-shadow:0 5px 16px rgba(0,0,0,.08); }
.dsh-welcome button:focus-visible { outline:2px solid #8b6fe8; outline-offset:2px; }
@media (prefers-reduced-motion:reduce) { .dsh-welcome-bot,.dsh-welcome-chat { transition:none; } .dsh-welcome-bot[aria-pressed="true"] { background:color-mix(in srgb, #a97efe 20%, var(--dsw-alias-bg-base,#fff)); border-color:#8b6fe8; box-shadow:0 0 0 1px #8b6fe8; }
.dsh-welcome-bot:hover,.dsh-welcome-chat:hover { transform:none; } }
@media (max-height:700px) { .dsh-welcome-section { margin-top:10px; } .dsh-welcome-recent { max-height:66px; overflow:auto; } }

`

/**
 * Register the identity decorations.
 * @param {object} ctx browser cordis context with `slots`
 */
export function installIdentity(ctx, registry) {
  ctx.effect(() => {
    const style = document.createElement('style')
    style.dataset.grokbotIdentity = '1'
    style.textContent = STYLES
    document.head.appendChild(style)
    const timer = setInterval(() => { if (!document.hidden) refreshBotIdentity() }, 30000)
    const onVisible = () => { if (!document.hidden) refreshBotIdentity(true) }
    const onBotsChanged = () => { refreshBotIdentity(true) }
    document.addEventListener('visibilitychange', onVisible)
    window.addEventListener('grokbot:bots-changed', onBotsChanged)
    return () => {
      clearInterval(timer)
      document.removeEventListener('visibilitychange', onVisible)
      window.removeEventListener('grokbot:bots-changed', onBotsChanged)
      style.remove()
    }
  })

  const register = (slot, id, component, order) => {
    try {
      const dispose = ctx.slots.inject(slot, () =>
        ctx.slots.register({ name: slot, id, order }, component),
      )
      if (typeof dispose === 'function') ctx.effect(() => dispose)
    } catch (error) {
      console.warn(`[grokbot-ui] could not register ${slot}`, error)
    }
  }

  register('conversation.hero.brand.mark', 'grokbot-hero-mark', (props) => <HeroBrandMark {...props} ctx={ctx} registry={registry} />, -10)
  register('conversation.session.header.actions', 'grokbot-session-badge', BotHeaderChip, 10)
  // The breadcrumb is a chrome-level decoration: it renders nothing when the
  // slot did not pass a Session id.
  if (registry) {
    try {
      const dispose = ctx.slots.inject('conversation.session.header.actions', () =>
        ctx.slots.register(
          { name: 'conversation.session.header.actions', id: 'grokbot-back-crumb', order: 5 },
          (props) => <BotBackCrumb registry={registry} {...(props || {})} />,
        ),
      )
      if (typeof dispose === 'function') ctx.effect(() => dispose)
    } catch (error) {
      console.warn('[grokbot-ui] could not register the bot breadcrumb', error)
    }
  }
}

/** Read the cached bots (useful for other modules). */
export function cachedBots() {
  return store.bots
}
