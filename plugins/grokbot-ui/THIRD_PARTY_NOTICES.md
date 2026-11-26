# Third-party notices

Grokbot UI is a local DeepSeek Harness plugin. Parts of its avatar rendering and
visual design are adapted from **Rakazo**, an open-source AI-agent workspace UI.

## Rakazo

- Project: Rakazo
- Upstream: https://github.com/elie222/rakazo
- License: Apache License, Version 2.0 (see `LICENSES/Apache-2.0.txt`)
- Upstream NOTICE: `LICENSES/Rakazo-NOTICE.txt`

Rakazo is copyright its contributors. This plugin does not import Rakazo's
packages, dependencies, backend, database, or services. Only the files listed
below were adapted (rewritten from TypeScript/Tailwind to plain React 18 JSX,
inline SVG, and self-contained CSS) and are redistributed under the same
Apache-2.0 terms.

### Adapted source files

Avatar engine (ported to `src/client/shared/avatar/`):

- `packages/contracts/src/bots/bot-avatar.ts` → `model.js` (palette, avatar
  value parsing/validation, avatar-set resolution, legacy migration), `index.jsx`
- `packages/core/src/avatars/logo-avatar-art.ts` → `logo-art.js`
- `packages/core/src/avatars/logo-avatar-traits.ts` → `traits.js`
- `packages/core/src/avatars/logo-avatar-motion.ts` → `avatar.css`, `logo.jsx`
- `packages/core/src/avatars/logo-avatar-activity.ts`,
  `logo-avatar-activity-store.ts` → `traits.js` (activity normalization),
  `src/client/bots/live.js` (DSH session activity mapping)
- `packages/core/src/avatars/avatar-shape.ts` → `organic-path.js`, `organic.jsx`
- `packages/core/src/avatars/bot-avatar-shapes.ts` → `organic-path.js`
- `packages/core/src/avatars/bot-avatar-colors.ts` → `model.js`, `logo-art.js`,
  `traits.js`
- `packages/ui-web/src/logo-avatar.tsx`, `logo-avatar-body.tsx` → `logo.jsx`
- `packages/ui-web/src/logo-avatar.css` → `avatar.css`
- `packages/ui-web/src/bot-avatar.tsx` → `index.jsx`, `organic.jsx`
- `packages/ui-web/src/hooks/use-logo-avatar-layers.ts` → `hooks.js` (`logo.jsx`
  consumes it)
- `packages/ui-web/src/hooks/use-avatar-motion-visibility.ts` → `hooks.js`
- `packages/ui-web/src/group-avatar.tsx` → `index.jsx` (`BotAvatarStack`)
- `packages/ui-tokens/src/index.ts` (colour/contrast helpers) → `model.js`,
  `logo-art.js`

Avatar Studio and product screens (adapted to this plugin's local bot model):

- `apps/web/src/pages/shell/bots/avatar-studio-popover.tsx`,
  `create-bot-dialog.tsx`, `bot-panel.tsx`, `bot-picker.tsx`,
  `bot-settings-sections.tsx` → `src/client/bots/` (`AvatarStudio.jsx`,
  `BotDialog.jsx`, `BotDetail.jsx`, `Roster.jsx`, `BotsRoot.jsx`)
- `apps/web/src/pages/shell/chat/chat-header.tsx`, `message-view.tsx`,
  `transcript.tsx` → `src/client/identity/index.jsx`, `src/client/theme/`,
  `src/client/decorations/`, `src/client/bots/styles.css` (chat header pill,
  message treatment)
- `apps/web/src/pages/shell/sidebar/sidebar-roster.tsx`, `shell-sidebar.tsx`,
  `sidebar-header.tsx` → `src/client/theme/`, `src/client/decorations/`
  (sidebar roster shell)
- `packages/ui-tokens/src/tokens.css`, `packages/ui-web/src/styles.css`,
  `apps/web/src/styles.css` → `src/client/theme/tokens.js`,
  `src/client/theme/grok.css`, `src/client/bots/styles.css` (design tokens and
  type scale)

### Deliberately not ported

Rakazo features for cloud VMs, computer use, 24/7 agents/routines, background
runs, email/Slack/Teams, billing, calls/voice, members/invites/multi-user auth,
artifacts, files storage, and their settings screens are not part of this
plugin.

## Upstream NOTICE text

```
Rakazo includes third-party code under the notices below.

Importing a Grok Bot (packages/core/src/agent-import/grok-bot.ts) adapts the
export prompt, reply repairs and export reading of
OpenMausBot's shared/grok-import.ts, https://github.com/milind-soni/OpenMausBot,
Copyright 2026 Milind Soni and OpenMausBot contributors, used under the Apache
License, Version 2.0.

That code in turn adapts the agent-importers plugin in hermes-official-plugins,
https://github.com/NousResearch/hermes-official-plugins, Copyright (c) 2026
Nous Research, used under the MIT License:

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
```
