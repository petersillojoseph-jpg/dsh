/**
 * Header / frame chrome owned by the Grokbot sidebar.
 *
 *  - `LeadingOpener` occupies `shell.leading`: the sidebar opener the frame
 *    mounts for a drawer or a hidden sidebar. ui-sidebar used to supply this
 *    seat; now that the slot is ours, this is the replacement.
 *
 * The `← Bot` breadcrumb lives in identity/index.jsx (which already owns the
 * bot header seats) and reads the same registry chrome store.
 */
import React from 'react'
import { Icon } from './components.jsx'

/** Sidebar opener for drawer / narrow frames. */
export function LeadingOpener({ registry, toggleSidebar }) {
  const open = () => {
    if (typeof toggleSidebar === 'function') toggleSidebar()
  }
  return (
    <div className="gb-s gb-slead">
      <button
        type="button"
        className="gb-slead-toggle"
        aria-label="Open Grokbot sidebar"
        title="Open Grokbot sidebar"
        data-sidebar-opener="leading"
        onClick={open}
      >
        <Icon name="panel" size={18} />
      </button>
    </div>
  )
}
