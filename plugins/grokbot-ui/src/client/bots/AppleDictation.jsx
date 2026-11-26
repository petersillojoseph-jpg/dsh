import React from 'react'

export function AppleDictation() {
  if (typeof window.dshDictation?.start !== 'function') return null
  return <button type="button" className="dsh-apple-dictation" aria-label="Start macOS Dictation" title="Start macOS Dictation" onMouseDown={(event) => event.preventDefault()} onClick={(event) => {
    const card = event.currentTarget.closest('[data-composer-card]')
    const editor = card?.querySelector('[contenteditable="true"], textarea:not([disabled]), [role="textbox"]')
    if (!editor) return
    editor.focus()
    window.dshDictation.start()
  }}><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="9" y="3" width="6" height="12" rx="3"/><path d="M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v3M9 21h6"/></svg></button>
}
