import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

/**
 * Regression tests for the two defects found in review (2026-11-20).
 *
 * 1. "All chats" group headers rendered the count flush against the name
 *    (measured 0px between `.gb-sgroup-name` and `.gb-s-label-count`) because
 *    `.gb-s-label-count` uses `margin-inline-start: auto` while the name was
 *    not flexible and the grouphead carried no gap. Control: `.gb-snav`
 *    correctly showed 9px.
 * 2. The footer's Settings button was a silent dead click: `runShortcut`
 *    returned "handled" whenever `invoke()` did not throw, so the sidebar never
 *    raised its notice, and nothing painted.
 */

const here = import.meta.dirname
const styles = fs.readFileSync(path.join(here, 'styles.css'), 'utf8')
const sidebar = fs.readFileSync(path.join(here, 'sidebar.css'), 'utf8')
const services = fs.readFileSync(path.join(here, 'services.js'), 'utf8')
const sidebarJsx = fs.readFileSync(path.join(here, 'Sidebar.jsx'), 'utf8')
const registryJs = fs.readFileSync(path.join(here, 'registry.js'), 'utf8')
const rootJsx = fs.readFileSync(path.join(here, 'BotsRoot.jsx'), 'utf8')

/** Body of a single top-level rule, or null. */
function ruleBody(css, selector) {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const match = css.match(new RegExp(`(?:^|\\n)${escaped}\\s*\\{([^}]*)\\}`))
  return match ? match[1] : null
}

test('item 1: group headers separate the name from the count like the section tabs', () => {
  const head = ruleBody(sidebar, '.gb-slabel.gb-sgrouphead')
  assert.ok(head, '.gb-slabel.gb-sgrouphead rule is missing')
  assert.match(head, /gap:\s*9px/, 'grouphead must gap 9px, matching .gb-snav')

  // The real root cause: the markup uses `gb-slabel` (no hyphen) but the base
  // layout rule is `.gb-s-label`, which nothing in the tree matches. The
  // grouphead therefore stayed a UA `inline-block` <button> where `gap` and
  // `flex` are inert. It must declare its own flex row.
  assert.match(head, /display:\s*flex/, '.gb-sgrouphead must be a flex row, not a UA inline-block button')
  assert.match(head, /align-items:\s*center/)
  // No element carries a bare `gb-s-label` token; the header's class is
  // `gb-slabel` (+ `gb-sgrouphead`), so the base rule must not be relied on.
  assert.doesNotMatch(sidebarJsx, /className="gb-s-label(?: |")/, 'nothing carries the unmatched gb-s-label class')

  const name = ruleBody(sidebar, '.gb-sgroup-name')
  assert.ok(name, '.gb-sgroup-name rule is missing')
  // Without a flexible name, the count's `margin-inline-start: auto` has no
  // free space to claim and collapses the gap to 0.
  assert.match(name, /flex:\s*1/, '.gb-sgroup-name must flex so the count right-aligns')
  assert.match(name, /min-width:\s*0/, '.gb-sgroup-name must be allowed to shrink')

  // The control the fix is measured against.
  const nav = ruleBody(sidebar, '.gb-snav')
  assert.match(nav, /gap:\s*9px/)

  const count = ruleBody(sidebar, '.gb-s-label-count')
  assert.match(count, /margin-inline-start:\s*auto/)
})

test('item 2: runShortcut never reports a paint, only "the registry ran"', () => {
  assert.match(services, /@returns \{'invoked'\|'unavailable'\|'failed'\}/)
  assert.match(services, /return 'invoked'/)
  assert.match(services, /return 'unavailable'/)
  assert.match(services, /return 'failed'/)
  // The old boolean conflation: `true` meant both "ran" and "user saw it".
  const body = services.slice(services.indexOf('export function runShortcut'))
  const fn = body.slice(0, body.indexOf('\n}\n') + 3)
  assert.doesNotMatch(fn, /return true/, 'runShortcut must not return a boolean')
  assert.doesNotMatch(fn, /return false/, 'runShortcut must not return a boolean')
})

test('item 2: the Settings row always raises the notice instead of swallowing the click', () => {
  assert.match(sidebarJsx, /registry\.dialogs\.dispatch\(\{ type: 'open-settings' \}\)/)
  // It must not be gated on openSettings() reporting success.
  assert.doesNotMatch(sidebarJsx, /!openSettings\(\)/)
  // The tooltip must not promise a dialog that cannot paint.
  assert.doesNotMatch(sidebarJsx, /Open DSH settings \(or edit settings inside Plugins\)/)
  assert.match(sidebarJsx, /Built-in plugin settings/)

  // The sheet is owned by the overlay root (the sidebar is overflow:hidden).
  assert.match(rootJsx, /dialogsState\.settingsNotice/)
  assert.match(rootJsx, /<SettingsNotice/)
  assert.match(rootJsx, /selectPanel\('plugins'\)/)

  // Dialog state round-trips through the store.
  assert.match(registryJs, /case 'open-settings':/)
  assert.match(registryJs, /case 'close-settings':/)
  assert.match(registryJs, /settingsNotice: false/)
})

test('item 2: the notice styles exist for light and dark (token-driven)', () => {
  assert.match(styles, /\.gb-sheet--notice \{/)
  assert.match(styles, /\.gb-notice-body \{/)
  assert.match(styles, /\.gb-notice-list \{/)
  const hack = styles.slice(styles.indexOf('.gb-sheet--notice {'))
  assert.doesNotMatch(hack.slice(0, 400), /color:\s*#[0-9a-f]{3,6}/i, 'notice must not hard-code a colour')
})
