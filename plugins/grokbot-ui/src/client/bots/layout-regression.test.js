import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

const here = import.meta.dirname
const styles = fs.readFileSync(path.join(here, 'styles.css'), 'utf8')
const sidebar = fs.readFileSync(path.join(here, 'sidebar.css'), 'utf8')

test('the sidebar owns its geometry: 12px inline padding, 36px rows, 56px rail', () => {
  assert.match(sidebar, /--gb-s-pad:\s*12px/)
  assert.match(sidebar, /--gb-s-row:\s*36px/)
  assert.match(sidebar, /--gb-s-rail-w:\s*56px/)
  assert.match(sidebar, /\.gb-s \{[\s\S]*?padding: 6px var\(--gb-s-pad, 12px\) 6px;/)
  assert.match(sidebar, /\.gb-s-rail \{[^}]*padding: 8px 0 6px;/s)
})

test('the sidebar is scoped: no rule targets a host element by hashed class', () => {
  const rules = sidebar.replace(/\/\*[\s\S]*?\*\//g, '')
  const selectors = Array.from(rules.matchAll(/^([ \t]*[^{}@\n][^{}]*)\{/gm)).map((m) => m[1].trim())
  // Keyframe stops and nested declaration text are not selectors.
  const skip = new Set(['from', 'to', '0%', '50%', '100%', '0%, 100%', '0%, 50%, 100%'])
  const offenders = selectors.filter((selector) => {
    if (selector.startsWith('@') || selector.startsWith('body') || selector.startsWith(':where(body') || skip.has(selector)) return false
    if (selector.startsWith('--') || selector.startsWith('color:') || selector.startsWith('font:')) return false
    return selector
      .split(',')
      .map((part) => part.trim())
      .some((part) => part && !/^\.gb-s([\w-]*|\b)/.test(part))
  })
  assert.deepEqual(offenders, [], 'sidebar.css leaked a non-gb-s selector')
})

test('no full-window overlay or handoff surface survives', () => {
  assert.doesNotMatch(styles, /\.gb-native-return/)
  assert.doesNotMatch(styles, /\.gb-surface\b/)
  assert.doesNotMatch(styles, /\.gb-nav\b/)
  assert.doesNotMatch(styles, /\.gb-history\b/)
  assert.doesNotMatch(styles, /\.gb-page\b/)
})

test('light and dark values are re-declared on the sidebar root (it is not inside .gb-root)', () => {
  // The sidebar/room root is outside `.gb-root`, so it carries its own values.
  // They sit in a zero-specificity `:where()` block so the column rule itself
  // cannot reset them (`--gb-bg` unset) on the room layer.
  assert.match(sidebar, /^:where\(\.gb-s\) \{\n  --gb-bg:/m)
  assert.match(sidebar, /^  :where\(body:not\(\[data-ds-light-theme\]\)\) \.gb-s \{/m)
  assert.match(sidebar, /body\[data-ds-dark-theme\] :where\(\.gb-s\) \{/)
  assert.match(sidebar, /^\.gb-s\.gb-s \{/m)
  // The room surface paints its own background and owns its own box.
  assert.match(sidebar, /\.gb-s\.gb-sroom-layer \{[\s\S]*?background: var\(--gb-bg, #ffffff\);/)
  assert.match(sidebar, /\.gb-s\.gb-sroom-layer \{[\s\S]*?width: auto;/)
  // The room surface must never fade: a half-opaque overlay would show the
  // Conversation through it.
  const roomRule = sidebar.slice(sidebar.indexOf('.gb-s.gb-sroom-layer {'))
  assert.doesNotMatch(roomRule.slice(0, roomRule.indexOf('}')), /animation:/)
  assert.doesNotMatch(sidebar, /^\.gb-s \{\n  --gb-bg:/m)
})

test('sheets and toasts keep their shared shell alignment tokens', () => {
  assert.match(styles, /--gb-shell-pad:\s*clamp\(/)
  assert.match(styles, /@media \(max-width: 1100px\) and \(min-width: 761px\)/)
  assert.match(styles, /\.gb-toasts--raised/)
})
