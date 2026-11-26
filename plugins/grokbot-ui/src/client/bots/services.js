/**
 * Small service shims used by the chrome registrations.
 *
 * Both are deliberately dumb: they report whether the shell accepted the
 * request and nothing more, so the caller owns all user-visible feedback.
 * Neither may claim that something appeared on screen — see `runShortcut`.
 */

/**
 * Invoke a registered DSH shortcut command by id, at menu level.
 *
 * `ctx.shortcuts.registry.invoke(id, context)` runs the command's own
 * `resolve()` (region/modal rules) without going through a key binding. That
 * matters because on Linux web some commands ship with no default key at all —
 * `settings.open` among them — so a synthetic keydown would be a no-op. This
 * is the same path the shell's menus use.
 *
 * @param {object|null} shortcuts the `ctx.shortcuts` service
 * @param {string} commandId e.g. `settings.open`
 * @returns {'invoked'|'unavailable'|'failed'}
 *   `invoked`   — the registry ran the command without throwing. It does NOT
 *                 mean the command painted anything: a command whose panel has
 *                 no mount point resolves and no-ops. Callers that need an
 *                 affordance must not treat this as "the user got feedback".
 *   `unavailable` — the shortcuts service/registry is missing.
 *   `failed`    — the registry threw.
 */
export function runShortcut(shortcuts, commandId) {
  if (!shortcuts || !shortcuts.registry || typeof shortcuts.registry.invoke !== 'function') return 'unavailable'
  let modal = null
  try {
    const modals = document.querySelectorAll('[data-shortcut-modal]')
    modal = modals.length ? modals[modals.length - 1].getAttribute('data-shortcut-modal') || 'other' : null
  } catch {
    modal = null
  }
  try {
    shortcuts.registry.invoke(commandId, { region: 'page', modal })
    return 'invoked'
  } catch {
    return 'failed'
  }
}

/**
 * Open one of the shell's built-in workspaces by id.
 *
 * `ctx.uiWorkspace.openWorkspace` connects a Workspace and opens its session,
 * so it is only used when a Workspace really exists; otherwise this reports
 * false and the caller shows a notice.
 *
 * @param {object|null} workspace the `ctx.uiWorkspace` service
 * @param {string|null} workspaceId
 * @returns {Promise<boolean>}
 */
export async function openWorkspaceById(workspace, workspaceId) {
  if (!workspace || typeof workspace.openWorkspace !== 'function' || !workspaceId) return false
  try {
    await workspace.openWorkspace(workspaceId)
    return true
  } catch {
    return false
  }
}
