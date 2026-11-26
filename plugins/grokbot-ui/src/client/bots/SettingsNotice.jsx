import * as React from 'react'
import { Icon } from './components.jsx'

/**
 * The honest affordance behind the footer's Settings row.
 *
 * Why this exists: in this DSH build `settings.open` has no key binding and
 * its panel is mounted inside the *native* sidebar's `sidebar.settings` seat.
 * A plugin that owns `sidebar` cannot mount that seat (re-declaring the
 * children is a hard slot error), so invoking the command correctly flips its
 * store but paints nothing. The button used to swallow that silence: it
 * reported success because `invoke()` did not throw, and the user saw a dead
 * click. This sheet says what is reachable today and takes you there.
 *
 * Rendered by BotsRoot inside `shell.overlay`, not from the sidebar itself —
 * the sidebar column is `overflow: hidden`, so a modal drawn there would be
 * clipped.
 *
 * @param {object} props
 * @param {(panelId: string) => void} props.onOpenPlugins
 * @param {() => void} props.onClose
 */
export function SettingsNotice({ onOpenPlugins, onClose }) {
  const sheetRef = React.useRef(null)
  const closeRef = React.useRef(null)

  React.useEffect(() => {
    const previous = typeof document !== 'undefined' ? document.activeElement : null
    // Focus lands on Close: Escape and an immediate Enter are both safe.
    if (closeRef.current && typeof closeRef.current.focus === 'function') closeRef.current.focus()

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        event.stopPropagation()
        onClose()
        return
      }
      if (event.key !== 'Tab') return
      const node = sheetRef.current
      if (!node) return
      const list = Array.from(node.querySelectorAll('button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'))
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

    const node = sheetRef.current
    if (node) node.addEventListener('keydown', onKeyDown)
    return () => {
      if (node) node.removeEventListener('keydown', onKeyDown)
      if (previous && typeof previous.focus === 'function' && document.contains(previous)) {
        try {
          previous.focus({ preventScroll: true })
        } catch {
          /* ignore focus restoration failures */
        }
      }
    }
  }, [onClose])

  const onScrimMouseDown = (event) => {
    if (event.target === event.currentTarget) onClose()
  }

  return (
    <div className="gb-scrim" onMouseDown={onScrimMouseDown}>
      <div
        className="gb-sheet gb-sheet--notice"
        role="dialog"
        aria-modal="true"
        aria-labelledby="gb-settings-title"
        aria-describedby="gb-settings-body"
        data-settings-notice="true"
        ref={sheetRef}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="gb-sheet-head">
          <h2 id="gb-settings-title">
            <Icon name="settings" size={16} /> Settings
          </h2>
          <button
            type="button"
            className="gb-sheet-close"
            aria-label="Close settings notice"
            onClick={onClose}
            ref={closeRef}
          >
            <Icon name="close" size={15} />
          </button>
        </div>
        <p className="gb-notice-body" id="gb-settings-body">
          The full settings dialog cannot open from the Grokbot sidebar in this DSH build — its panel is owned by the
          native sidebar, which this plugin replaces. Everything it exposes is reachable from{' '}
          <strong>Plugins → Built-in plugin settings</strong>.
        </p>
        <ul className="gb-notice-list">
          <li>Built-in plugin settings: subagent, web search, agent loop and shell options.</li>
          <li>
            <kbd>Ctrl+/</kbd> reviews or assigns keyboard shortcuts.
          </li>
        </ul>
        <div className="gb-sheet-foot">
          <button type="button" className="gb-btn gb-btn--secondary" onClick={onClose}>
            Close
          </button>
          <button type="button" className="gb-btn gb-btn--primary" onClick={onOpenPlugins} data-settings-go="true">
            Open Plugins → Built-in plugin settings
          </button>
        </div>
      </div>
    </div>
  )
}
