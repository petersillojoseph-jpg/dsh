# dsh for macOS

A customised macOS desktop wrapper and plugin collection for DeepSeek Harness (dsh). The interface supports GPTs, chat, dictation, OpenUI, image and video generation, speech generation and a media library.

## Contents

- `desktop/` — Electron launcher and preload used by the installed app.
- `plugins/grokbot-ui/` — customised dsh interface, media library and host routes.
- `plugins/image-generation/` — OpenRouter image generation and editing.
- `plugins/video-generation/` — OpenRouter video generation.
- `plugins/speech-generation/` — OpenRouter text-to-speech with Fish Audio Drama 3.
- `plugins/openui/` — optional OpenUI integration.
- `branding/` — macOS app icon.
- `tests/` — local development tests, some of which may depend on paths and tools from the original installation.

This is a source backup of an existing customised installation, not a self-contained installer. It requires a compatible dsh runtime and profile configured to load the local plugins. The launcher and media paths assume `~/Applications/DeepSeek Harness Runtime`; credentials, plugin settings, user data, generated media, local runtime dependencies and the dsh profile are intentionally not included. Install and configure those separately. Bundled browser clients are included alongside their editable sources. Running and packaging on a fresh Mac has not been verified.

The installation this snapshot came from used `@deepseek-ai/dsh` version range `^0.2.2-rc.5`. Some features use external services and require their own API keys and may incur charges. Generated content and requests are sent to the relevant providers. Review the original plugin's licensing information in `plugins/grokbot-ui/LICENSES/` and `THIRD_PARTY_NOTICES.md`; no additional license is granted for other code in this snapshot.
