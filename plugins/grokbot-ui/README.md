# Grokbot UI — local bots with Rakazo avatars, in DeepSeek Harness

A single local DSH plugin bundle that gives the Web GUI Rakazo's product design and
a real local bot roster. Everything (bots, avatars, rooms, transcripts) runs on
this machine; only model inference is remote.

## What you get

- **Rakazo avatars**: two ported Rakazo avatar sets, rendered as inline SVG with no
  assets or fonts:
  - the **animated logo mascot** — plate, body and hands with clay lighting, eyes
    with gaze/glint, deterministic identity traits per bot (colour, blink variant,
    blink timing, scanning side, tempo), a 24s blink loop, breathing, idle gaze and
    hand motion, and task cues (book while reading, keyboard while writing);
  - the **organic set** — Rakazo's 8 shipped shapes (`hex, wedge, squircle, tablet,
    pebble, blob, teardrop, cloud`) with bar eyes, identity-seeded body family/eye
    tilt, and a working body morph + glow.
  - plus **image avatars**: uploaded pictures are circle-cropped, resized to
    256×256 and stored as a small webp data URL.
  - activity states `idle, working, reading, writing, thinking, waiting, error`
    crossfade between poses; avatars pause offscreen/hidden, are static below 24px
    and under `prefers-reduced-motion`, and never run per-frame React updates.
- **Avatar Studio**: a look editor embedded in the create/edit bot sheet and
  reachable by clicking any bot avatar. Bot/Upload tabs, Original/Rakazo set
  switch, the 8 organic shapes, Rakazo's 11-colour palette (Staff White,
  Executive Violet, Emerald, Forge Orange, Cyber Cyan, Cobalt Blue, Amber Gold,
  Caramel Bronze, Crimson Red, Neon Pink, Slate Silver), Reset, and image upload
  (drag/drop, paste or file picker) with a large live animated preview.
- **Rakazo product design**: exact Rakazo light/dark tokens and type scale mapped
  onto the DSH theme override layer — floating bot identity pill in the chat
  header, solid user bubbles (black light / light-grey dark), plain assistant
  text, flat pill composer, rounded sheets, sidebar/roster with animated avatars
  and presence dots. Light/dark/system all work; the plugin only overrides tokens
  and never changes your theme choice.
- **A Bots roster**: create, edit and delete bots. Each bot has a name, title,
  instructions and an avatar. Bots are registered as real DSH agent presets
  (`grokbot-<id>`) with the full local coding tool set (shell, files, search, web,
  subagents, jobs, skills, planner, todo, …).
- **1:1 chats** with every bot: normal DSH sessions, opened in DSH's own
  conversation panel while the Grokbot sidebar stays on screen. The header shows
  the bot's animated avatar, name and live presence plus a `← Bot` breadcrumb; the
  sidebar row carries its avatar and status, and the avatar animates with the
  session (working, waiting, error).
- **Bots DM each other (no room needed)**: every bot is a full local agent and its
  persona knows the other bots. A bot can hand work to another bot directly by
  starting a delegated agent session with that bot's preset (for example AJ
  delegates to Ken, Ken runs Sunday, Sunday asks Ethan to check, Ethan hands the
  approved build to Willow). The delegated bot runs with the full local toolset,
  so the builder can actually write files; results come back to the bot that asked
  and get relayed up the chain. The chain is autonomous: once you approve a plan in
  your DM with the coordinating bot, the rest runs without you prompting each step.
  Delegation depth is capped at 8, and bots are told never to invent another bot's
  reply.
- **Group rooms** (optional, for brainstorming): several bots answer in order and see the whole conversation.
  `@Name` picks who replies, and a bot can **ping another bot** the same way — if
  AJ writes `@Ken …`, Ken answers next with full room history, and the handoff
  continues while bots keep pinging each other (bounded to 8 rounds / 16 replies
  per turn, 5 minutes). While a reply is generated the bot's avatar shows a
  working/writing pose and typing dots, and `@Name` pings are highlighted.
- **Autonomous workflows + approval gates**: bots keep handing work along by
  themselves — you do not prompt each step. When a bot needs your decision it
  writes `@user` (for example "Is this plan good to build? @user") and the room
  pauses, showing “<bot> is waiting for your answer”. Your next message resumes
  the exact handoff automatically, so after you approve a plan AJ/Ken hand it to
  Sunday, Sunday hands the build to Ethan, revisions and publishing all run
  without further prompts (up to the per-turn safety limits above).
- **Room memory (Memo)**: an extra summarizer bot is seeded automatically. It
  folds older room messages into a compact shared brief that every bot reads
  before replying, so bots get the brief + the last ~12 messages instead of the
  full transcript. The brief is saved with the room and appears in the chat as a
  muted system line ("Shared brief from Memo …"); Memo can be renamed, restyled
  or chatted with like any other bot, and it never speaks on its own.
- **Persistent local state** at `data/bots.json` (bots, rooms, transcripts), with
  an automatic v1 → v2 avatar migration and a backup written before migrations.

## Use it

The Grokbot sidebar **is** the app's left column. DSH's own conversation stays in
the main column, so you never get kicked out of the bot UI to read a chat.

1. Refresh the app window (`Ctrl+R`) after a rebuild.
2. **Assistants** lists your bots with animated avatars and live presence dots.
   Click a bot → its chats expand inline and its most recent chat opens beside
   it. If that chat is mid-run, it opens directly instead.
3. Click any chat under the bot → the conversation swaps in place; the sidebar
   stays, and that row is highlighted. Click the bot row again (or the
   **← Bot** breadcrumb in the chat header) to go back to its chat list without
   changing the session. A second click on the selected bot collapses its list.
4. **New chat with <bot>** starts a session already set to that bot's agent
   preset; it appears highlighted under the bot.
5. **Group chats** opens a room over the chat area — several bots answer in
   order, `@Name` directs a reply, and a bot can ping another bot. Close the
   room (or click any bot/chat) to get back to the conversation.
6. **All chats** has every conversation that isn't a bot DM, grouped by
   workspace; chats of deleted bots stay under a muted `… (deleted)` group.
7. The footer: a one-line **Workspace** row, **Plugins**, **Settings**,
   **New assistant**, **New group chat**. Collapse the column to a 56px rail
   (Mod+B) for the mascot, New session, bot dots and Settings; drag its edge to
   resize it; below 768px it becomes a drawer with a focus trap and Escape.

Tell a bot what you want built in its own chat: it delegates to the other bots
(Ken plans, Sunday builds, Ethan checks, Willow writes the script) and relays
progress back to you.

> Delegation is part of the bot's **agent preset**, so use a **new chat** after
> updating the plugin (an old DM session keeps its original preset).

### Known limitation: DSH Settings

In this DSH build `settings.open` has no Linux-web key binding (so `Ctrl+,` is
inert even in the stock UI) and its panel is mounted inside the native
sidebar's settings seat, which a plugin that replaces the sidebar cannot mount.
The footer's **Settings** runs the command correctly but cannot paint the dialog
until DSH moves it to a root-level outlet. Settings you can reach today:
**Plugins → Built-in plugin settings** (subagent, web search, agent loop,
shell), and `Ctrl+/` to review or assign shortcuts.
See `docs/DSH-SURFACE-INTEGRATION.md` for the full analysis.

### Reverting

`node scripts/revert-sidebar.mjs --dry-run` prints the plan;
`node scripts/revert-sidebar.mjs` restores the previous full-window Grokbot
surface from the cold backup (`grokbot-ui-backup-1795151161`), rebuilds
`client.js`, and prints the Ctrl+R reminder. `data/` is never touched.

## Where things live

```
grokbot-ui/
  index.js                 host entry
  client.js                generated browser bundle (do not edit by hand)
  build.mjs                esbuild wrapper for client.js
  src/host/                bot store (v2 avatar schema + migration), preset
                           registration, HTTP API, room replies + @mention
                           handoffs, room brief summarizer (summary.js)
  src/client/shared/avatar/ ported Rakazo avatar engine (logo mascot, organic
                           set, image avatars, traits, activity, CSS, harness)
  src/client/bots/         sidebar (Sidebar.jsx), nav store (nav.js), room
                           layer (RoomSurface.jsx), create/edit sheet, Avatar
                           Studio, rooms, live session activity, registry.js
  scripts/revert-sidebar.mjs  restores the pre-sidebar plugin from the backup
  src/client/identity/     header pill, ← Bot breadcrumb, hero cluster avatars
  src/client/theme/        Rakazo tokens + type scale + global reskin CSS
  src/client/decorations/  chat pill chrome accents (the native sidebar brand
                           seats no longer mount; the sidebar draws its own)
  data/bots.json           bots + rooms + transcripts (human-readable)
  data/bots.backup-*.json  pre-migration backup (keep)
  references/rakazo/       offline reference copy of the adapted Rakazo files
  LICENSES/                Apache-2.0 + upstream Rakazo NOTICE
  THIRD_PARTY_NOTICES.md   attribution for the adapted Rakazo code
  docs/                    final screenshots
  SPEC.md                  implementation notes and API contract
```

## Avatar data model

Each bot persists:

- `color`: the avatar value — `#RRGGBB`, `#RRGGBB::shape_N` (one of the 8 shipped
  organic shapes), or a `data:image/webp;base64,…` URL (capped at 200,000 chars);
- `avatarSet`: `rakazo` (animated mascot) or `organic` (shipped shapes).

Old `{ color, shape, face }` bots are migrated on load: the legacy colour id maps
onto Rakazo's palette, the legacy shape maps onto the closest shipped shape, and
`face` is dropped (Rakazo avatars have no face variants). The host backs up
`data/bots.json` to `data/bots.backup-<timestamp>.json` before a schema migration.

## Build / reload

The plugin is installed into `~/.dsh/profiles/web` as a link to this directory, so:

- **client changes**: run `node build.mjs`, then refresh the app window.
- **host changes**: run `node build.mjs` is not needed; toggle the installed bundle
  in DSH's plugin manager (off/on) — or restart the app — to reload the host module.

The plugin uses the local default model (`agentDefaultModel`); group-room replies
are short one-shot calls, while bot DMs are full DSH agent sessions with tools.

## Attribution

Avatar rendering, Avatar Studio behaviour and the visual design are adapted from
**Rakazo** (https://github.com/elie222/rakazo), Apache-2.0. See
`THIRD_PARTY_NOTICES.md`, `LICENSES/Apache-2.0.txt` and
`LICENSES/Rakazo-NOTICE.txt`.

## Not included

No cloud VM/computer panel, no 24/7 agents or routines, no schedules/background
runs, no email/Slack/Teams, no calls/voice, no billing, no multi-user invites.
Bots run locally; only model inference leaves the machine.
