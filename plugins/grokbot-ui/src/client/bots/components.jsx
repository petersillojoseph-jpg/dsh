/**
 * Small shared primitives for the Grokbot bot experience.
 *
 * Flat and neutral by design: icons are inline SVG, avatars are the shared
 * Grok-style clay SVG component, and every surface is a 1px-hairline sheet.
 */
import React from 'react'
import { BotAvatarStack } from '../shared/avatar/index.jsx'
import { activityLabel } from './live.js'

export function Icon({ name, size = 18, className = '' }) {
  const paths = ICONS[name] || ICONS.spark
  return (
    <svg
      className={`gb-icon ${className}`.trim()}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {paths}
    </svg>
  )
}

const ICONS = {
  search: <><circle cx="10.8" cy="10.8" r="6.3" /><path d="m16 16 4.4 4.4" /></>,
  spark: (
    <>
      <path d="M12 4l1.6 4.4L18 10l-4.4 1.6L12 16l-1.6-4.4L6 10l4.4-1.6L12 4Z" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  back: <path d="M15 5l-7 7 7 7" />,
  chevronRight: <path d="M9 5l7 7-7 7" />,
  chat: <path d="M20 12a7.5 7.5 0 0 1-7.5 7.5H6l-3 2.4.7-4A7.5 7.5 0 0 1 4.5 12 7.5 7.5 0 0 1 12 4.5 7.5 7.5 0 0 1 20 12Z" />,
  allChats: <><rect x="4" y="4.5" width="16" height="15" rx="3" /><path d="M8 9h8M8 12.5h8M8 16h4" /></>,
  edit: (
    <>
      <path d="M4 20h4l10-10a2.1 2.1 0 0 0-3-3L5 17v3Z" />
      <path d="M13.5 6.5l3 3" />
    </>
  ),
  trash: (
    <>
      <path d="M4 7h16M9 7V5h6v2M6.5 7l.9 13h9.2l.9-13" />
      <path d="M10 11v6M14 11v6" />
    </>
  ),
  rooms: (
    <>
      <circle cx="9" cy="8.5" r="3" />
      <circle cx="16.5" cy="9.5" r="2.4" />
      <path d="M3.5 19a5.5 5.5 0 0 1 11 0M14 14.6a4.2 4.2 0 0 1 6.5 3.6" />
    </>
  ),
  send: <path d="M12 19V5M5 12l7-7 7 7" />,
  retry: (
    <>
      <path d="M20 12a8 8 0 1 1-2.3-5.6" />
      <path d="M20 4v4h-4" />
    </>
  ),
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  arrowUp: <path d="M12 19V5M5 12l7-7 7 7" />,
  hash: (
    <>
      <path d="M9 3.5L7.5 20.5M16.5 3.5L15 20.5M3.5 9h17M3 15h17" />
    </>
  ),
  alert: (
    <>
      <path d="M12 4l9 16H3l9-16Z" />
      <path d="M12 10v4M12 17.2v.1" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8.5" r="3" />
      <path d="M3.5 19a5.5 5.5 0 0 1 11 0" />
      <path d="M15.5 6.6a3 3 0 0 1 0 5.8M17 14.6a5.5 5.5 0 0 1 3.5 4.4" />
    </>
  ),
  upload: (
    <>
      <path d="M12 16V4M7.5 8.5 12 4l4.5 4.5" />
      <path d="M4 15.5V19a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 20 19v-3.5" />
    </>
  ),
  image: (
    <>
      <rect x="3.5" y="4.5" width="17" height="15" rx="2.5" />
      <circle cx="9" cy="10" r="1.6" />
      <path d="m4.5 17 4.6-4.4a1.8 1.8 0 0 1 2.5 0l2.3 2.2 1.7-1.6a1.8 1.8 0 0 1 2.5 0l2.4 2.4" />
    </>
  ),
  settings: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1 1.56V21a2 2 0 1 1-4 0v-.09A1.7 1.7 0 0 0 9 19.35a1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.64 15a1.7 1.7 0 0 0-1.56-1H3a2 2 0 1 1 0-4h.09A1.7 1.7 0 0 0 4.65 9a1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 9 4.64h.08A1.7 1.7 0 0 0 10 3.09V3a2 2 0 1 1 4 0v.09a1.7 1.7 0 0 0 1 1.56 1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.36 9v.08a1.7 1.7 0 0 0 1.55 1H21a2 2 0 1 1 0 4h-.09a1.7 1.7 0 0 0-1.51 1Z" />
    </>
  ),
  plugins: (
    <>
      <rect x="4" y="4" width="6.5" height="6.5" rx="1.6" />
      <rect x="13.5" y="4" width="6.5" height="6.5" rx="1.6" />
      <rect x="4" y="13.5" width="6.5" height="6.5" rx="1.6" />
      <path d="M16.75 13.5v6.5M13.5 16.75H20" />
    </>
  ),
  panel: (
    <>
      <rect x="3.5" y="4.5" width="17" height="15" rx="2.5" />
      <path d="M9.5 4.5v15" />
      <path d="M6 8.5h1M6 12h1M6 15.5h1" />
    </>
  ),
  folder: (
    <>
      <path d="M3.5 7.2A2.2 2.2 0 0 1 5.7 5h3.1l1.7 2h7.8a2.2 2.2 0 0 1 2.2 2.2v7.6A2.2 2.2 0 0 1 18.3 19H5.7a2.2 2.2 0 0 1-2.2-2.2V7.2Z" />
    </>
  ),
}

export function Spinner({ size = 16, className = '' }) {
  return (
    <span
      className={`gb-spinner ${className}`.trim()}
      style={{ width: size, height: size }}
      aria-hidden="true"
    />
  )
}

export function TypingDots() {
  return (
    <span className="gb-typing" aria-hidden="true">
      <i />
      <i />
      <i />
    </span>
  )
}

/** Screen-reader-only text without depending on a shared utility class. */
export function VisuallyHidden({ children }) {
  return (
    <span
      style={{
        position: 'absolute',
        width: 1,
        height: 1,
        padding: 0,
        margin: -1,
        overflow: 'hidden',
        clip: 'rect(0 0 0 0)',
        whiteSpace: 'nowrap',
        border: 0,
      }}
    >
      {children}
    </span>
  )
}

/** Small activity dot backed by real session state (idle/working/waiting/error). */
export function ActivityDot({ activity = 'idle', className = '' }) {
  const tone =
    activity === 'working' || activity === 'reading' || activity === 'writing' || activity === 'thinking'
      ? 'working'
      : activity === 'waiting'
        ? 'waiting'
        : activity === 'error'
          ? 'error'
          : 'idle'
  return (
    <span
      className={`gb-activity-dot gb-activity-dot--${tone} ${className}`.trim()}
      title={activityLabel(activity)}
      aria-hidden="true"
    />
  )
}

/** Small stacked-avatar cluster used by room rows and empty states. */
export function StackedAvatars({ bots, size = 30, max = 3, className = '' }) {
  const all = Array.isArray(bots) ? bots.filter(Boolean) : []
  const shown = all.slice(0, max)
  const rest = all.length - shown.length
  if (!shown.length) return null
  return (
    <span className={`gb-stack ${className}`.trim()} aria-hidden="true">
      <BotAvatarStack bots={shown} size={size} max={max} />
      {rest > 0 ? <span className="gb-stack-rest">+{rest}</span> : null}
    </span>
  )
}

/** Auto-dismissing toast stack; owned and rendered by BotsRoot. */
export function ToastStack({ toasts, onDismiss, raised = false }) {
  if (!toasts.length) return null
  return (
    <div className={`gb-toasts${raised ? ' gb-toasts--raised' : ''}`} role="status" aria-live="polite">
      {toasts.map((toast) => (
        <div key={toast.id} className={`gb-toast gb-toast--${toast.tone || 'info'}`}>
          <Icon name={toast.tone === 'error' ? 'alert' : toast.tone === 'success' ? 'check' : 'spark'} size={15} />
          <span className="gb-toast-text">{toast.message}</span>
          <button type="button" className="gb-toast-close" aria-label="Dismiss notification" onClick={() => onDismiss(toast.id)}>
            <Icon name="close" size={13} />
          </button>
        </div>
      ))}
    </div>
  )
}

/**
 * Keep Tab focus inside the given element while `active`. Also restores focus
 * to the previously focused element on teardown.
 */
export function useFocusTrap(ref, active) {
  React.useEffect(() => {
    if (!active || !ref.current) return undefined
    const node = ref.current
    const previous = typeof document !== 'undefined' ? document.activeElement : null
    const selector = [
      'a[href]',
      'button:not([disabled])',
      'textarea:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ].join(',')

    const focusable = () =>
      Array.from(node.querySelectorAll(selector)).filter(
        (element) => element.offsetParent !== null || element === document.activeElement,
      )

    const preferred = node.querySelector('[data-autofocus]')
    const first = preferred || focusable()[0]
    if (first && typeof first.focus === 'function') first.focus()
    else if (typeof node.focus === 'function') node.focus()

    const onKeyDown = (event) => {
      if (event.key !== 'Tab') return
      const list = focusable()
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
      if (previous && typeof previous.focus === 'function' && document.contains(previous)) {
        try {
          previous.focus()
        } catch {
          /* ignore focus restoration failures */
        }
      }
    }
  }, [ref, active])
}

/** Neutral confirmation sheet used for destructive row actions. */
export function ConfirmDialog({ title, description, confirmLabel = 'Delete', busy = false, onConfirm, onClose }) {
  const sheetRef = React.useRef(null)
  useFocusTrap(sheetRef, true)
  const onScrimMouseDown = (event) => {
    if (event.target === event.currentTarget && !busy) onClose()
  }
  return (
    <div className="gb-scrim" onMouseDown={onScrimMouseDown}>
      <div
        className="gb-sheet gb-sheet--confirm"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="gb-confirm-title"
        aria-describedby="gb-confirm-desc"
        ref={sheetRef}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <h2 id="gb-confirm-title">{title}</h2>
        <p id="gb-confirm-desc">{description}</p>
        <div className="gb-sheet-foot">
          <button type="button" className="gb-btn gb-btn--secondary" onClick={onClose} disabled={busy}>
            Cancel
          </button>
          <button type="button" className="gb-btn gb-btn--danger" onClick={onConfirm} disabled={busy}>
            {busy ? <Spinner size={14} /> : null}
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}

/** Never let a render error inside the bots surface take the whole app down. */
export class BotsErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.error('[grokbot-ui] bots UI crashed:', error, info)
  }

  render() {
    if (!this.state.error) return this.props.children
    return (
      <div className="gb-crash" role="alert">
        <Icon name="alert" size={18} />
        <div>
          <strong>Bots hit a snag.</strong>
          <p>The rest of the app is untouched. Reload the panel to try again.</p>
        </div>
        <button type="button" className="gb-btn gb-btn--secondary gb-btn--sm" onClick={() => this.setState({ error: null })}>
          Reload panel
        </button>
      </div>
    )
  }
}
