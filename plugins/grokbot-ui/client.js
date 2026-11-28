/* Grokbot UI client bundle. */
window.__ModuleLoader__.load({ id: '@local/grokbot-ui', factory(require) {
var __grokbotEntry = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined") return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x + '" is not supported');
  });
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // work/plugin/package/src/client/index.jsx
  var index_exports = {};
  __export(index_exports, {
    apply: () => apply,
    inject: () => inject
  });

  // work/plugin/package/src/client/theme/grok.css
  var grok_default = '/* ==========================================================================\n   Grokbot UI \u2014 Rakazo product visual language\n   --------------------------------------------------------------------------\n   Adapted from Rakazo (Apache-2.0), https://github.com/elie222/rakazo:\n   packages/ui-tokens/src/tokens.css and packages/ui-web/src/styles.css.\n   The palette and type scale are exact upstream values; the DSH `--dsw-*`\n   override layer carries them into shipped components (theme/tokens.js), and\n   this sheet applies the product language to the app chrome and the plugin\'s\n   own surfaces.\n\n   Rules of this sheet:\n   - flat surfaces, hairlines, solid fills, one type scale, one accent blue;\n   - the only strong colour comes from bot avatars and the working/status dots;\n   - stable DSH data attributes and our own `gb-*` classes only \u2014 never hashed\n     CSS-module names as style selectors.\n   ========================================================================== */\n\n/* --------------------------------------------------------------------------\n   0. Rakazo palette + scale tokens (exact values from tokens.css)\n   -------------------------------------------------------------------------- */\n\nbody {\n  --rk-bg: #ffffff;\n  --rk-dialog: #ffffff;\n  --rk-fg: #1c1c1c;\n  --rk-card: #f2f2f2;\n  --rk-card-fg: #1c1c1c;\n  --rk-popover: #ffffff;\n  --rk-popover-fg: #1c1c1c;\n  --rk-glass-fill: #ffffff;\n  --rk-glass-stroke: #14141416;\n  --rk-primary: #1c1c1c;\n  --rk-primary-fg: #fcfcfc;\n  --rk-primary-hover: #363636;\n  --rk-primary-disabled: #1c1c1c26;\n  --rk-secondary: #1c1c1c0f;\n  --rk-secondary-fg: #1c1c1c;\n  --rk-chat-user: #1c1c1c;\n  --rk-chat-user-fg: #ffffff;\n  --rk-muted: #f2f2f2;\n  --rk-muted-fg: #1c1c1cad;\n  --rk-faint-fg: #1c1c1c8f;\n  --rk-accent: #1c1c1c0f;\n  --rk-accent-fg: #1c1c1c;\n  --rk-destructive: #cd2834;\n  --rk-destructive-fill: #e72e3b;\n  --rk-destructive-fg: #ffffff;\n  --rk-border: #1c1c1c1f;\n  --rk-input: #1c1c1c3d;\n  --rk-ring: #1e86fc;\n  --rk-sidebar: #f5f5f5;\n  --rk-sidebar-fg: #1c1c1c;\n  --rk-sidebar-border: #1c1c1c1f;\n  --rk-sidebar-accent: #1c1c1c14;\n  --rk-sidebar-accent-fg: #1c1c1c;\n  --rk-link: #0b6dd3;\n  --rk-success: #00854a;\n  --rk-warning: #aa6300;\n  --rk-status-working: #0b6dd3;\n  --rk-unread: #0b6dd3;\n  --rk-working-dot: #10ab61;\n  --rk-overlay: #00000080;\n  --rk-scrollbar: #1c1c1c3d;\n  --rk-scrollbar-hover: #1c1c1c85;\n\n  /* Rakazo app-level token names (consumed by the ported avatar engine and any\n     adapted Rakazo CSS). Exact tokens.css names, same light values. */\n  --background: #ffffff;\n  --dialog: #ffffff;\n  --foreground: #1c1c1c;\n  --card: #f2f2f2;\n  --card-foreground: #1c1c1c;\n  --popover: #ffffff;\n  --popover-foreground: #1c1c1c;\n  --glass-fill: #ffffff;\n  --glass-stroke: #14141416;\n  --primary: #1c1c1c;\n  --primary-foreground: #fcfcfc;\n  --primary-hover: #363636;\n  --primary-disabled: #1c1c1c26;\n  --secondary: #1c1c1c0f;\n  --secondary-foreground: #1c1c1c;\n  --chat-user: #1c1c1c;\n  --chat-user-foreground: #ffffff;\n  --muted: #f2f2f2;\n  --muted-foreground: #1c1c1cad;\n  --faint-foreground: #1c1c1c8f;\n  --accent: #1c1c1c0f;\n  --accent-foreground: #1c1c1c;\n  --destructive: #cd2834;\n  --destructive-fill: #e72e3b;\n  --destructive-foreground: #ffffff;\n  --border: #1c1c1c1f;\n  --input: #1c1c1c3d;\n  --ring: #1e86fc;\n  --sidebar: #f5f5f5;\n  --sidebar-foreground: #1c1c1c;\n  --sidebar-border: #1c1c1c1f;\n  --sidebar-accent: #1c1c1c14;\n  --sidebar-accent-foreground: #1c1c1c;\n  --link: #0b6dd3;\n  --favicon-plate: #ffffff;\n  --success: #00854a;\n  --warning: #aa6300;\n  --status-working: #0b6dd3;\n  --unread: #0b6dd3;\n  --working-dot: #10ab61;\n  --overlay: #00000080;\n  --scrollbar: #1c1c1c3d;\n  --scrollbar-hover: #1c1c1c85;\n\n  /* Typography aliases in Rakazo\'s names, for adapted reference CSS. */\n  --font-sans: var(--rk-font-sans);\n  --font-mono: var(--rk-font-mono);\n  --radius: 12px;\n\n  /* Type scale (packages/ui-web/src/styles.css, exact). */\n  --rk-font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;\n  --rk-font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono",\n    "Courier New", monospace;\n  --rk-text-caption: 11px;\n  --rk-text-caption-lh: 16px;\n  --rk-text-caption-ls: 0.005em;\n  --rk-text-label: 12px;\n  --rk-text-label-lh: 16px;\n  --rk-text-body-sm: 13px;\n  --rk-text-body-sm-lh: 18px;\n  --rk-text-body: 14px;\n  --rk-text-body-lh: 20px;\n  --rk-text-body-lg: 15px;\n  --rk-text-body-lg-lh: 22px;\n  --rk-text-heading3: 17px;\n  --rk-text-heading3-lh: 24px;\n  --rk-text-heading3-ls: -0.008em;\n  --rk-text-heading2: 22px;\n  --rk-text-heading2-lh: 28px;\n  --rk-text-heading2-ls: -0.012em;\n  --rk-text-heading1: 26px;\n  --rk-text-heading1-lh: 32px;\n  --rk-text-heading1-ls: -0.015em;\n  --rk-text-display: 32px;\n  --rk-text-display-lh: 40px;\n  --rk-text-display-ls: -0.02em;\n  --rk-weight-regular: 400;\n  --rk-weight-medium: 500;\n  --rk-weight-semibold: 600;\n\n  /* Radius: 12px base, sm/md/lg/xl/2xl derived (ui-web/styles.css). */\n  --rk-radius-sm: 8px;\n  --rk-radius-md: 10px;\n  --rk-radius-lg: 12px;\n  --rk-radius-xl: 16px;\n  --rk-radius-2xl: 20px;\n  --rk-radius: 12px;\n  --rk-radius-pill: 999px;\n\n  --rk-shadow-sm: 0 1px 2px 0 #0000000a;\n  --rk-shadow-md: 0 4px 12px 0 #00000008, 0 1px 3px 0 #0000000a;\n  --rk-shadow-lg: 0 12px 32px 0 #00000014, 0 2px 8px 0 #0000000a;\n\n  /* DSH shared variables the shipped components read directly. */\n  --dsw-radius-xs: 4px;\n  --dsw-radius-sm: var(--rk-radius-sm);\n  --dsw-radius-md: var(--rk-radius-md);\n  --dsw-radius-lg: var(--rk-radius-lg);\n  --dsw-radius-xl: var(--rk-radius-xl);\n  --dsw-radius-panel: var(--rk-radius-2xl);\n  --dsw-focus-ring-color: var(--rk-ring);\n  --dsw-focus-ring-width: 2px;\n  --dsh-scrollbar-thumb: var(--rk-scrollbar);\n  --dsh-scrollbar-thumb-hover: var(--rk-scrollbar-hover);\n\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\nbody[data-ds-dark-theme] {\n  --rk-bg: #0a0a0a;\n  --rk-dialog: #161616;\n  --rk-fg: #f5f5f5;\n  --rk-card: #232323;\n  --rk-card-fg: #f5f5f5;\n  --rk-popover: #232323;\n  --rk-popover-fg: #f5f5f5;\n  --rk-glass-fill: #2c2c2e;\n  --rk-glass-stroke: #fcfcfc26;\n  --rk-primary: #f5f5f5;\n  --rk-primary-fg: #121212;\n  --rk-primary-hover: #dbdbdb;\n  --rk-primary-disabled: #f5f5f521;\n  --rk-secondary: #f5f5f50a;\n  --rk-secondary-fg: #f5f5f5;\n  --rk-chat-user: #3e3e3e;\n  --rk-chat-user-fg: #f5f5f5;\n  --rk-muted: #232323;\n  --rk-muted-fg: #f5f5f5a8;\n  --rk-faint-fg: #f5f5f58a;\n  --rk-accent: #f5f5f51a;\n  --rk-accent-fg: #f5f5f5;\n  --rk-destructive: #ff6463;\n  --rk-destructive-fill: #cf2b35;\n  --rk-destructive-fg: #ffffff;\n  --rk-border: #f5f5f51a;\n  --rk-input: #f5f5f538;\n  --rk-ring: #1884fc;\n  --rk-sidebar: #0a0a0a;\n  --rk-sidebar-fg: #f5f5f5;\n  --rk-sidebar-border: #f5f5f50f;\n  --rk-sidebar-accent: #f5f5f514;\n  --rk-sidebar-accent-fg: #f5f5f5;\n  --rk-link: #4d9bff;\n  --rk-success: #00ba69;\n  --rk-warning: #e28600;\n  --rk-status-working: #4d9bff;\n  --rk-unread: #4d9bff;\n  --rk-working-dot: #0e9f5a;\n  --rk-overlay: #000000b2;\n  --rk-scrollbar: #f5f5f538;\n  --rk-scrollbar-hover: #f5f5f580;\n\n  --background: #0a0a0a;\n  --dialog: #161616;\n  --foreground: #f5f5f5;\n  --card: #232323;\n  --card-foreground: #f5f5f5;\n  --popover: #232323;\n  --popover-foreground: #f5f5f5;\n  --glass-fill: #2c2c2e;\n  --glass-stroke: #fcfcfc26;\n  --primary: #f5f5f5;\n  --primary-foreground: #121212;\n  --primary-hover: #dbdbdb;\n  --primary-disabled: #f5f5f521;\n  --secondary: #f5f5f50a;\n  --secondary-foreground: #f5f5f5;\n  --chat-user: #3e3e3e;\n  --chat-user-foreground: #f5f5f5;\n  --muted: #232323;\n  --muted-foreground: #f5f5f5a8;\n  --faint-foreground: #f5f5f58a;\n  --accent: #f5f5f51a;\n  --accent-foreground: #f5f5f5;\n  --destructive: #ff6463;\n  --destructive-fill: #cf2b35;\n  --destructive-foreground: #ffffff;\n  --border: #f5f5f51a;\n  --input: #f5f5f538;\n  --ring: #1884fc;\n  --sidebar: #0a0a0a;\n  --sidebar-foreground: #f5f5f5;\n  --sidebar-border: #f5f5f50f;\n  --sidebar-accent: #f5f5f514;\n  --sidebar-accent-foreground: #f5f5f5;\n  --link: #4d9bff;\n  --favicon-plate: #ffffff;\n  --success: #00ba69;\n  --warning: #e28600;\n  --status-working: #4d9bff;\n  --unread: #4d9bff;\n  --working-dot: #0e9f5a;\n  --overlay: #000000b2;\n  --scrollbar: #f5f5f538;\n  --scrollbar-hover: #f5f5f580;\n\n  --rk-shadow-sm: 0 1px 2px 0 #00000066;\n  --rk-shadow-md: 0 4px 12px 0 #00000055, 0 1px 3px 0 #00000066;\n  --rk-shadow-lg: 0 12px 32px 0 #00000080, 0 2px 8px 0 #00000066;\n}\n\n/* --------------------------------------------------------------------------\n   1. Base canvas + typography\n   -------------------------------------------------------------------------- */\n\nhtml,\nbody {\n  background-color: var(--rk-bg);\n}\n\nbody {\n  color: var(--rk-fg);\n  font-family: var(--rk-font-sans);\n  font-size: var(--rk-text-body);\n  line-height: var(--rk-text-body-lh);\n  font-weight: var(--rk-weight-regular);\n}\n\nbody ::selection {\n  background: color-mix(in srgb, var(--rk-ring) 22%, transparent);\n  color: var(--rk-fg);\n}\n\nbody :focus-visible {\n  outline: 2px solid var(--rk-ring);\n  outline-offset: 2px;\n}\n\n/* Flat, thin Rakazo scrollbars: 6px, transparent track, rounded thumb. */\n* {\n  scrollbar-width: thin;\n  scrollbar-color: var(--rk-scrollbar) transparent;\n}\n\n::-webkit-scrollbar {\n  width: 6px;\n  height: 6px;\n}\n\n::-webkit-scrollbar-track {\n  background: transparent;\n}\n\n::-webkit-scrollbar-thumb {\n  border-radius: 3px;\n  background: var(--rk-scrollbar);\n}\n\n::-webkit-scrollbar-thumb:hover {\n  background: var(--rk-scrollbar-hover);\n}\n\n/* Small caption text keeps Rakazo\'s positive tracking. */\n[data-slot="sidebar"] [class*="sectionLabel"],\n[data-slot="sidebar"] [class*="SectionLabel"] {\n  font-size: var(--rk-text-caption);\n  line-height: var(--rk-text-caption-lh);\n  letter-spacing: var(--rk-text-caption-ls);\n}\n\n/* --------------------------------------------------------------------------\n   2. Shell surfaces\n   -------------------------------------------------------------------------- */\n\n[data-slot="sidebar"] > div {\n  background: var(--rk-sidebar) !important;\n  border-right: 1px solid var(--rk-sidebar-border);\n  box-shadow: none !important;\n  -webkit-backdrop-filter: none !important;\n  backdrop-filter: none !important;\n}\n\n[data-conversation-region="chat"] {\n  background: var(--rk-bg) !important;\n  background-image: none !important;\n}\n\n[data-rightbar-collapsed="false"] [data-dockkit-surface],\n[data-rightbar-collapsed="false"] [data-sidebar-right-panel] > div {\n  background: var(--rk-dialog) !important;\n  border-left: 1px solid var(--rk-border);\n  -webkit-backdrop-filter: none !important;\n  backdrop-filter: none !important;\n}\n\n[data-sidebar-right-panel] {\n  box-shadow: none;\n}\n\n[data-side="sidebar"] {\n  background: transparent;\n  box-shadow: none;\n}\n\n[data-side="sidebar"]:hover {\n  background: var(--rk-accent);\n}\n\n[data-shell-bottom] {\n  background: var(--rk-bg);\n  border-top: 1px solid var(--rk-border);\n}\n\n/* --------------------------------------------------------------------------\n   3. Sidebar \u2014 Rakazo roster density\n   -------------------------------------------------------------------------- */\n\n[data-slot="sidebar"] {\n  font-size: var(--rk-text-body-sm);\n  line-height: var(--rk-text-body-sm-lh);\n}\n\n[data-slot="sidebar"] button {\n  transition:\n    background-color 140ms ease,\n    border-color 140ms ease,\n    color 140ms ease,\n    opacity 140ms ease;\n}\n\n/* Brand row: the animated mascot + wordmark. */\n[data-slot="sidebar"] [class*="_brand"] {\n  border-radius: var(--rk-radius-md);\n}\n\n[data-slot="sidebar"] [class*="_brand"]:hover {\n  background: var(--rk-accent);\n}\n\n[data-slot="sidebar"] [class*="_brandName"],\n[data-slot="sidebar"] [class*="_brandName"] * {\n  font-family: var(--rk-font-sans);\n  font-size: var(--rk-text-body);\n  line-height: var(--rk-text-body-lh);\n  font-weight: var(--rk-weight-semibold);\n  letter-spacing: -0.011em;\n  color: var(--rk-fg);\n}\n\n[data-slot="sidebar"] [class*="_brand"]:hover [class*="_brandMark"],\n[data-slot="sidebar"] [class*="_brand"]:hover [class*="_brandName"] {\n  filter: none;\n}\n\n/* New session: a quiet Rakazo outline pill. */\n[data-slot="sidebar"] [class*="_newSession"] {\n  border: 1px solid var(--rk-border) !important;\n  border-radius: var(--rk-radius-md) !important;\n  background: transparent !important;\n  box-shadow: none !important;\n  color: var(--rk-fg) !important;\n  font-size: var(--rk-text-body-sm);\n  line-height: var(--rk-text-body-sm-lh);\n  font-weight: var(--rk-weight-medium);\n}\n\n[data-slot="sidebar"] [class*="_newSession"]:hover {\n  background: var(--rk-accent) !important;\n  border-color: var(--rk-border) !important;\n}\n\n[data-slot="sidebar"] [class*="_newSession"] svg {\n  color: var(--rk-muted-fg);\n}\n\n[data-slot="sidebar"] nav[aria-label="Global panels"] button {\n  border-radius: var(--rk-radius-sm);\n  font-size: var(--rk-text-body-sm);\n  line-height: var(--rk-text-body-sm-lh);\n  font-weight: var(--rk-weight-medium);\n  color: var(--rk-sidebar-fg);\n}\n\n[data-slot="sidebar"] nav[aria-label="Global panels"] button:hover {\n  background: var(--rk-accent) !important;\n  color: var(--rk-fg);\n}\n\n[data-slot="sidebar"] nav[aria-label="Global panels"] button:hover svg {\n  color: var(--rk-fg);\n}\n\n[data-slot="sidebar"] [data-sidebar-toggle]:hover,\n[data-slot="sidebar"] [class*="_iconButton"]:hover {\n  background: var(--rk-accent) !important;\n  box-shadow: none;\n  color: var(--rk-fg);\n}\n\n[data-slot="sidebar"] input:not([type="checkbox"]):not([type="radio"]) {\n  border-radius: var(--rk-radius-sm);\n  box-shadow: none;\n  font-size: var(--rk-text-body-sm);\n  line-height: var(--rk-text-body-sm-lh);\n}\n\n[data-slot="sidebar"] input:not([type="checkbox"]):not([type="radio"]):focus {\n  background: var(--rk-bg) !important;\n  box-shadow: 0 0 0 2px var(--rk-ring);\n}\n\n/* Section labels: 11/16 with the caption tracking, muted. */\n[data-slot="sidebar"] [class*="sectionLabel"],\n[data-slot="sidebar"] [class*="SectionLabel"] {\n  color: var(--rk-muted-fg) !important;\n  font-weight: var(--rk-weight-medium);\n}\n\n/* Session rows: 13/18, selected rows use sidebar-accent. */\n[aria-label="Sessions"] [role="treeitem"] {\n  border-radius: var(--rk-radius-sm);\n  transition: background-color 140ms ease, color 140ms ease;\n}\n\n[aria-label="Sessions"] [role="treeitem"]:hover {\n  background: var(--rk-accent);\n}\n\n[aria-label="Sessions"] [role="treeitem"][data-selected],\n[aria-label="Sessions"] [role="treeitem"][aria-selected="true"],\n[aria-label="Sessions"] [role="treeitem"][data-active] {\n  background: var(--rk-sidebar-accent) !important;\n  box-shadow: none;\n  color: var(--rk-sidebar-accent-fg);\n}\n\n[aria-label="Sessions"] [class*="sessionRow"] [class*="title"],\n[aria-label="Sessions"] [class*="SessionRow"] [class*="title"] {\n  font-size: var(--rk-text-body-sm);\n  line-height: var(--rk-text-body-sm-lh);\n  font-weight: var(--rk-weight-medium);\n}\n\n[aria-label="Sessions"] [class*="_fade"],\n[aria-label="Sessions"] [class*="fade"] {\n  background: linear-gradient(180deg, transparent, var(--rk-sidebar)) !important;\n}\n\n[aria-label="Sessions"] [class*="time"],\n[aria-label="Sessions"] [class*="timestamp"] {\n  font-size: var(--rk-text-label);\n  line-height: var(--rk-text-label-lh);\n  color: var(--rk-faint-fg);\n  font-variant-numeric: tabular-nums;\n}\n\n[aria-label="Account menu"] {\n  border-radius: var(--rk-radius-sm);\n}\n\n[aria-label="Account menu"]:hover {\n  background: var(--rk-accent) !important;\n}\n\n/* --------------------------------------------------------------------------\n   4. Conversation header \u2014 floating, quiet, with the bot identity pill\n   -------------------------------------------------------------------------- */\n\nheader[data-window-drag] {\n  background: color-mix(in srgb, var(--rk-bg) 88%, transparent);\n  border-bottom: 1px solid transparent;\n  -webkit-backdrop-filter: none;\n  backdrop-filter: none;\n  box-shadow: none;\n}\n\nheader[data-window-drag] [class*="_crumbCurrent"] {\n  font-size: var(--rk-text-body);\n  line-height: var(--rk-text-body-lh);\n  font-weight: var(--rk-weight-medium);\n  letter-spacing: -0.011em;\n  color: var(--rk-fg);\n}\n\nheader[data-window-drag] [class*="_crumb"] {\n  font-size: var(--rk-text-body-sm);\n  line-height: var(--rk-text-body-sm-lh);\n  color: var(--rk-muted-fg);\n}\n\nheader[data-window-drag] [class*="_tab"] {\n  font-size: var(--rk-text-body-sm);\n  line-height: var(--rk-text-body-sm-lh);\n  font-weight: var(--rk-weight-medium);\n  color: var(--rk-muted-fg);\n  border-radius: var(--rk-radius-sm);\n  transition: color 140ms ease, background-color 140ms ease;\n}\n\nheader[data-window-drag] [class*="_tab"]:hover {\n  color: var(--rk-fg);\n  background: var(--rk-accent);\n}\n\nheader[data-window-drag] [class*="_tabActive"],\nheader[data-window-drag] [class*="_tab"][data-active],\nheader[data-window-drag] [class*="_tab"][aria-selected="true"] {\n  color: var(--rk-fg);\n  font-weight: var(--rk-weight-semibold);\n}\n\nheader[data-window-drag] [class*="_tabActive"]::after,\nheader[data-window-drag] [class*="_tab"][data-active]::after,\nheader[data-window-drag] [class*="_tab"][aria-selected="true"]::after {\n  background: var(--rk-fg) !important;\n}\n\n[data-conversation-header-corner] button,\n[data-conversation-header-leading] button {\n  border-radius: var(--rk-radius-sm);\n  transition: background-color 140ms ease, color 140ms ease;\n}\n\n[data-conversation-header-corner] button:hover,\n[data-conversation-header-leading] button:hover {\n  background: var(--rk-accent) !important;\n  color: var(--rk-fg);\n  box-shadow: none;\n}\n\n/* Floating pill header actions: plain utility chips in the header row. */\nheader[data-window-drag] [data-slot="conversation.session.header.actions"] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n}\n\nheader[data-window-drag] [data-slot="conversation.session.header.actions"] button,\nheader[data-window-drag] [class*="_trigger"] {\n  font-size: var(--rk-text-body-sm);\n  line-height: var(--rk-text-body-sm-lh);\n  font-weight: var(--rk-weight-medium);\n  color: var(--rk-muted-fg);\n  border-radius: var(--rk-radius-pill);\n  transition: background-color 140ms ease, color 140ms ease;\n}\n\nheader[data-window-drag] [data-slot="conversation.session.header.actions"] button:hover,\nheader[data-window-drag] [class*="_trigger"]:hover {\n  background: var(--rk-accent) !important;\n  color: var(--rk-fg);\n}\n\n/* --------------------------------------------------------------------------\n   5. Hero / empty state \u2014 Rakazo editorial calm\n   -------------------------------------------------------------------------- */\n\n[data-conversation-region="chat"][data-content-phase="hero"] [class*="_headline"] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 18px;\n}\n\n[data-conversation-region="chat"][data-content-phase="hero"] [class*="_titleGroup"] {\n  display: inline-flex;\n  align-items: center;\n  gap: 10px;\n}\n\n[data-conversation-region="chat"][data-content-phase="hero"] [class*="_titleGroup"] > span:first-child {\n  font-family: var(--rk-font-sans);\n  font-size: var(--rk-text-display);\n  line-height: var(--rk-text-display-lh);\n  letter-spacing: var(--rk-text-display-ls);\n  font-weight: var(--rk-weight-semibold);\n  color: var(--rk-fg);\n  background: none;\n  -webkit-background-clip: initial;\n  background-clip: initial;\n  -webkit-text-fill-color: currentColor;\n}\n\n[data-conversation-region="chat"][data-content-phase="hero"] [class*="_previewBadge"] {\n  border: 1px solid var(--rk-border);\n  border-radius: var(--rk-radius-pill);\n  background: transparent !important;\n  color: var(--rk-muted-fg);\n  font-size: var(--rk-text-caption);\n  line-height: var(--rk-text-caption-lh);\n  letter-spacing: var(--rk-text-caption-ls);\n  font-weight: var(--rk-weight-medium);\n  padding: 2px 8px;\n  box-shadow: none;\n}\n\n[data-conversation-region="chat"][data-content-phase="hero"]\n  [class*="_heroWorkspaceRow"]\n  button {\n  border: 1px solid transparent !important;\n  border-radius: var(--rk-radius-pill) !important;\n  background: var(--rk-card) !important;\n  color: var(--rk-muted-fg);\n  font-size: var(--rk-text-body-sm);\n  line-height: var(--rk-text-body-sm-lh);\n  font-weight: var(--rk-weight-medium);\n  padding-inline: 12px;\n  box-shadow: none;\n  transition: background-color 140ms ease, color 140ms ease;\n}\n\n[data-conversation-region="chat"][data-content-phase="hero"]\n  [class*="_heroWorkspaceRow"]\n  button:hover {\n  background: var(--rk-accent) !important;\n  color: var(--rk-fg);\n}\n\n[data-conversation-region="chat"][data-content-phase="hero"] [class*="_heroWorkspaceRow"] svg {\n  color: var(--rk-muted-fg);\n}\n\n[data-slot="conversation.hero.brand.mark"] svg {\n  filter: none;\n  animation: none;\n}\n\n/* --------------------------------------------------------------------------\n   6. Composer \u2014 flat pill surface\n   -------------------------------------------------------------------------- */\n\n[data-composer-card] {\n  position: relative;\n  background: var(--rk-card) !important;\n  border: 1px solid transparent;\n  border-radius: var(--rk-radius-2xl) !important;\n  box-shadow: none;\n  -webkit-backdrop-filter: none !important;\n  backdrop-filter: none !important;\n  transition: background-color 140ms ease, border-color 140ms ease, box-shadow 140ms ease;\n}\n\n[data-composer-card]:hover {\n  background: color-mix(in srgb, var(--rk-card) 82%, var(--rk-fg) 5%) !important;\n  border-color: var(--rk-border);\n}\n\n[data-composer-card]:focus-within {\n  background: var(--rk-dialog) !important;\n  border-color: var(--rk-border);\n  box-shadow: 0 0 0 2px color-mix(in srgb, var(--rk-ring) 20%, transparent);\n}\n\n[data-composer-input] {\n  font-family: var(--rk-font-sans);\n  font-size: var(--rk-text-body-lg);\n  line-height: var(--rk-text-body-lg-lh);\n  color: var(--rk-fg);\n  caret-color: var(--rk-ring);\n}\n\n[data-composer-placeholder] {\n  color: var(--rk-faint-fg);\n  opacity: 1;\n}\n\n[data-composer-card] button {\n  border-radius: var(--rk-radius-pill);\n  transition:\n    background-color 140ms ease,\n    border-color 140ms ease,\n    color 140ms ease,\n    opacity 140ms ease;\n}\n\n[data-composer-card] button[class*="_primary"],\n[data-composer-card] button[aria-label="Send message"] {\n  border-radius: var(--rk-radius-pill) !important;\n  border: none !important;\n  background: var(--rk-primary) !important;\n  color: var(--rk-primary-fg) !important;\n  box-shadow: none !important;\n}\n\n[data-composer-card] button[class*="_primary"]:hover:not(:disabled),\n[data-composer-card] button[aria-label="Send message"]:hover:not(:disabled) {\n  background: var(--rk-primary) !important;\n  opacity: 0.84;\n}\n\n[data-composer-card] button[aria-label="Send message"]:disabled {\n  background: var(--rk-muted) !important;\n  color: var(--rk-faint-fg) !important;\n  opacity: 1;\n}\n\n[data-composer-card] button:not([aria-label="Send message"]):hover:not(:disabled) {\n  background: var(--rk-accent) !important;\n  color: var(--rk-fg);\n}\n\n[data-composer-overlay],\n[data-input-scroll] {\n  border-radius: inherit;\n}\n\n/* Composer utility pills (workspace, access mode, model). */\n[data-composer-card] [class*="_trigger"],\n[data-composer-card] [class*="_seat"] {\n  border-radius: var(--rk-radius-pill);\n  font-size: var(--rk-text-body-sm);\n  line-height: var(--rk-text-body-sm-lh);\n  font-weight: var(--rk-weight-medium);\n  color: var(--rk-muted-fg);\n}\n\n[data-composer-card] [class*="_trigger"]:hover,\n[data-composer-card] [class*="_seat"]:hover {\n  background: var(--rk-accent);\n  color: var(--rk-fg);\n}\n\n/* --------------------------------------------------------------------------\n   7. Transcript: messages, markdown, tools, reasoning\n   -------------------------------------------------------------------------- */\n\n[data-conversation-region="chat"] [data-chat-flow] {\n  color: var(--rk-fg);\n  font-size: var(--rk-text-body-lg);\n  line-height: var(--rk-text-body-lg-lh);\n}\n\n/* User bubbles are a solid fill: near-black on white, light grey on black. */\n[data-message-bubble] {\n  background: var(--rk-chat-user) !important;\n  color: var(--rk-chat-user-fg) !important;\n  border: none !important;\n  border-radius: var(--rk-radius-xl) !important;\n  padding: 12px 18px !important;\n  box-shadow: none !important;\n  -webkit-backdrop-filter: none !important;\n  backdrop-filter: none !important;\n  font-size: var(--rk-text-body-lg);\n  line-height: var(--rk-text-body-lg-lh);\n  max-width: min(100%, 42rem);\n}\n\n[data-message-bubble] * {\n  color: inherit !important;\n}\n\n/* Assistant replies are plain text on the page, not a bubble. */\n[data-chat-flow-kind="assistant"] [class*="_markdown"],\n[data-chat-flow-kind^="assistant"] [class*="_markdown"] {\n  background: transparent !important;\n  border: none !important;\n  padding: 0 !important;\n}\n\n[data-conversation-region="chat"] p,\n[data-conversation-region="chat"] li {\n  font-size: var(--rk-text-body-lg);\n  line-height: var(--rk-text-body-lg-lh);\n}\n\n[data-conversation-region="chat"] h1,\n[data-conversation-region="chat"] h2,\n[data-conversation-region="chat"] h3,\n[data-conversation-region="chat"] h4 {\n  font-family: var(--rk-font-sans);\n  font-weight: var(--rk-weight-semibold);\n  color: var(--rk-fg);\n}\n\n[data-conversation-region="chat"] h1 {\n  font-size: var(--rk-text-heading1);\n  line-height: var(--rk-text-heading1-lh);\n  letter-spacing: var(--rk-text-heading1-ls);\n  margin-bottom: 0.5em;\n}\n\n[data-conversation-region="chat"] h2 {\n  font-size: var(--rk-text-heading2);\n  line-height: var(--rk-text-heading2-lh);\n  letter-spacing: var(--rk-text-heading2-ls);\n  margin-bottom: 0.4em;\n}\n\n[data-conversation-region="chat"] h3 {\n  font-size: var(--rk-text-heading3);\n  line-height: var(--rk-text-heading3-lh);\n  letter-spacing: var(--rk-text-heading3-ls);\n}\n\n[data-conversation-region="chat"] h4 {\n  font-size: var(--rk-text-body-lg);\n  line-height: var(--rk-text-body-lg-lh);\n}\n\n[data-conversation-region="chat"] a {\n  color: var(--rk-link);\n  text-decoration: underline;\n  text-decoration-thickness: 1px;\n  text-underline-offset: 2px;\n}\n\n[data-conversation-region="chat"] strong {\n  font-weight: var(--rk-weight-semibold);\n  color: var(--rk-fg);\n}\n\n[data-conversation-region="chat"] blockquote {\n  margin-inline: 0;\n  padding: 2px 0 2px 14px;\n  border-left: 2px solid var(--rk-border);\n  color: var(--rk-muted-fg);\n  background: transparent;\n}\n\n[data-conversation-region="chat"] hr {\n  border: none;\n  height: 1px;\n  background: var(--rk-border);\n}\n\n[data-conversation-region="chat"] ul li::marker,\n[data-conversation-region="chat"] ol li::marker {\n  color: var(--rk-faint-fg);\n}\n\n[data-conversation-region="chat"] code {\n  border-radius: 5px;\n  background: var(--rk-muted);\n  color: var(--rk-fg);\n  font-family: var(--rk-font-mono);\n  font-size: 13px;\n}\n\n[data-conversation-region="chat"] pre {\n  border: 1px solid var(--rk-border);\n  border-radius: var(--rk-radius-md) !important;\n  background: var(--rk-card) !important;\n  box-shadow: none !important;\n  overflow: hidden;\n}\n\n[data-conversation-region="chat"] pre code {\n  color: var(--rk-fg);\n  background: transparent;\n}\n\n[data-conversation-region="chat"] table {\n  border-collapse: separate;\n  border-spacing: 0;\n  border: 1px solid var(--rk-border);\n  border-radius: var(--rk-radius-md);\n  overflow: hidden;\n}\n\n[data-conversation-region="chat"] th {\n  background: var(--rk-card);\n  color: var(--rk-fg);\n  font-weight: var(--rk-weight-semibold);\n}\n\n[data-conversation-region="chat"] th,\n[data-conversation-region="chat"] td {\n  border-color: var(--rk-border);\n}\n\n[data-conversation-region="chat"] img,\n[data-conversation-region="chat"] video {\n  border-radius: var(--rk-radius-md);\n  border: 1px solid var(--rk-border);\n}\n\n[data-conversation-region="chat"] kbd {\n  border: 1px solid var(--rk-border);\n  border-bottom-width: 2px;\n  border-radius: 4px;\n  background: var(--rk-card);\n  padding: 1px 5px;\n  font-size: 0.86em;\n}\n\n/* Tool calls: quiet Rakazo cards with a hairline. */\n[data-chat-flow-kind="tool-call"] [role="button"][data-state] {\n  background: var(--rk-card) !important;\n  border: 1px solid transparent;\n  border-radius: var(--rk-radius-md) !important;\n  transition: background-color 140ms ease, border-color 140ms ease;\n}\n\n[data-chat-flow-kind="tool-call"] [role="button"][data-state]:hover {\n  background: color-mix(in srgb, var(--rk-card) 80%, var(--rk-fg) 6%) !important;\n  border-color: var(--rk-border);\n}\n\n[data-chat-flow-kind="tool-call"] [role="button"][data-state] svg {\n  color: var(--rk-muted-fg);\n}\n\n[data-chat-flow-kind="tool-call"] [role="button"][data-state="error"] {\n  border-color: var(--rk-destructive);\n  background: color-mix(in srgb, var(--rk-destructive) 8%, var(--rk-bg)) !important;\n}\n\n[data-chat-flow-kind="tool-call"] [class*="_title"],\n[data-chat-flow-kind="tool-call"] [class*="_summary"] {\n  font-size: var(--rk-text-body-sm);\n  line-height: var(--rk-text-body-sm-lh);\n}\n\n/* Reasoning / process disclosures. */\n[data-process-activity],\n[data-disclosure-row] {\n  border-radius: var(--rk-radius-sm);\n  transition: background-color 140ms ease, color 140ms ease;\n}\n\n[data-process-activity]:hover,\n[data-disclosure-row]:hover {\n  background: var(--rk-accent);\n}\n\n[data-step-process-body] {\n  border-left: 1px solid var(--rk-border);\n  margin-left: 6px;\n  padding-left: 14px;\n}\n\n[data-chat-flow-kind="turn-process"] [class*="_label"],\n[data-chat-flow-kind="turn-process"] [class*="_title"] {\n  font-size: var(--rk-text-body-sm);\n  line-height: var(--rk-text-body-sm-lh);\n  color: var(--rk-muted-fg);\n}\n\n[data-turn-start] {\n  border-color: var(--rk-border);\n}\n\n[data-shimmer-decoration] {\n  opacity: 0.4;\n}\n\n/* Message hover actions. */\n[data-chat-flow-kind="user"] [class*="_actions"] {\n  opacity: 0;\n  transition: opacity 140ms ease;\n}\n\n[data-chat-flow-kind="user"]:hover [class*="_actions"],\n[data-chat-flow-kind="user"] [class*="_actions"]:focus-within {\n  opacity: 1;\n}\n\n[data-chat-flow-kind="user"] [class*="_action"],\n[data-chat-flow-kind="user"] [class*="_action"] svg {\n  border-radius: var(--rk-radius-pill);\n  color: var(--rk-muted-fg);\n  transition: background-color 140ms ease, color 140ms ease;\n}\n\n[data-chat-flow-kind="user"] [class*="_action"]:hover {\n  background: var(--rk-accent) !important;\n  color: var(--rk-fg);\n}\n\n[data-conversation-scroll] [class*="_copy"],\npre button {\n  border-radius: var(--rk-radius-sm);\n  transition: background-color 140ms ease, color 140ms ease;\n}\n\npre button:hover {\n  background: var(--rk-accent);\n}\n\n[data-conversation-region="chat"] [class*="_citation"] {\n  border-radius: var(--rk-radius-sm);\n  background: var(--rk-card);\n}\n\n/* --------------------------------------------------------------------------\n   8. Menus, dialogs, listboxes, tooltips, toasts\n   -------------------------------------------------------------------------- */\n\n[role="menu"] {\n  background: var(--rk-popover) !important;\n  border: 1px solid var(--rk-border) !important;\n  border-radius: var(--rk-radius-lg) !important;\n  box-shadow: var(--rk-shadow-lg) !important;\n  -webkit-backdrop-filter: none !important;\n  backdrop-filter: none !important;\n  padding: 4px !important;\n}\n\n[role="menuitem"],\n[role="option"] {\n  border-radius: var(--rk-radius-sm) !important;\n  color: var(--rk-popover-fg);\n  font-size: var(--rk-text-body-sm);\n  line-height: var(--rk-text-body-sm-lh);\n  font-weight: var(--rk-weight-medium);\n  transition: background-color 120ms ease, color 120ms ease;\n}\n\n[role="menuitem"]:hover,\n[role="menuitem"]:focus-visible,\n[role="option"]:hover,\n[role="option"][data-selected] {\n  background: var(--rk-accent) !important;\n  color: var(--rk-fg) !important;\n}\n\n[role="menuitem"]:hover svg,\n[role="option"]:hover svg {\n  color: var(--rk-fg);\n}\n\n[role="listbox"] {\n  background: var(--rk-popover) !important;\n  border: 1px solid var(--rk-border) !important;\n  border-radius: var(--rk-radius-lg) !important;\n  box-shadow: var(--rk-shadow-lg) !important;\n  padding: 4px !important;\n}\n\n/* Dialogs are rounded sheets: 20px, a hairline and a soft ambient shadow. */\n[role="dialog"]:not(.gb-surface):not(.gb-page) {\n  background: var(--rk-dialog) !important;\n  border: 1px solid var(--rk-border) !important;\n  border-radius: var(--rk-radius-2xl) !important;\n  box-shadow: var(--rk-shadow-lg) !important;\n  -webkit-backdrop-filter: none !important;\n  backdrop-filter: none !important;\n  color: var(--rk-fg);\n}\n\n[role="dialog"]:not(.gb-surface) h1,\n[role="dialog"]:not(.gb-surface) h2,\n[role="dialog"]:not(.gb-surface) h3 {\n  font-family: var(--rk-font-sans);\n  letter-spacing: var(--rk-text-heading3-ls);\n  font-weight: var(--rk-weight-semibold);\n}\n\n[role="dialog"] h1 {\n  font-size: var(--rk-text-heading1);\n  line-height: var(--rk-text-heading1-lh);\n  letter-spacing: var(--rk-text-heading1-ls);\n}\n\n[role="dialog"] h2 {\n  font-size: var(--rk-text-heading2);\n  line-height: var(--rk-text-heading2-lh);\n  letter-spacing: var(--rk-text-heading2-ls);\n}\n\n[role="dialog"] h3 {\n  font-size: var(--rk-text-heading3);\n  line-height: var(--rk-text-heading3-lh);\n}\n\n[role="dialog"]:not(.gb-surface) button {\n  transition: background-color 140ms ease, color 140ms ease, border-color 140ms ease;\n}\n\n[role="dialog"]:not(.gb-surface) [class*="_navCell"],\n[role="dialog"]:not(.gb-surface) [class*="_navItem"] {\n  border-radius: var(--rk-radius-sm);\n  font-size: var(--rk-text-body-sm);\n  line-height: var(--rk-text-body-sm-lh);\n}\n\n[role="dialog"]:not(.gb-surface) [class*="_navCell"]:hover,\n[role="dialog"]:not(.gb-surface) [class*="_navItem"]:hover {\n  background: var(--rk-accent) !important;\n}\n\n[role="dialog"]:not(.gb-surface) [class*="_navCell"][class*="_active"],\n[role="dialog"]:not(.gb-surface) [class*="_navItem"][class*="_active"] {\n  background: var(--rk-sidebar-accent) !important;\n  box-shadow: none;\n  color: var(--rk-fg);\n}\n\n[role="dialog"] [data-slot="dialog-overlay"],\n[data-slot="dialog-overlay"] {\n  background: var(--rk-overlay) !important;\n  -webkit-backdrop-filter: none;\n  backdrop-filter: none;\n}\n\n[role="tooltip"] {\n  background: var(--rk-fg) !important;\n  border: none;\n  border-radius: var(--rk-radius-sm) !important;\n  color: var(--rk-bg);\n  font-size: var(--rk-text-caption);\n  line-height: var(--rk-text-caption-lh);\n  letter-spacing: var(--rk-text-caption-ls);\n  box-shadow: var(--rk-shadow-sm);\n}\n\n[class*="_toast"] {\n  background: var(--rk-fg) !important;\n  color: var(--rk-bg) !important;\n  border-radius: var(--rk-radius-lg) !important;\n  border: none;\n  box-shadow: var(--rk-shadow-md);\n  font-size: var(--rk-text-body-sm);\n  line-height: var(--rk-text-body-sm-lh);\n  -webkit-backdrop-filter: none;\n  backdrop-filter: none;\n}\n\n[class*="_toast"] button {\n  color: inherit;\n}\n\n[role="status"] {\n  color: var(--rk-muted-fg);\n  font-size: var(--rk-text-body-sm);\n  line-height: var(--rk-text-body-sm-lh);\n}\n\ninput:not([type="checkbox"]):not([type="radio"]),\ntextarea {\n  border-radius: var(--rk-radius-md);\n  font-family: var(--rk-font-sans);\n  font-size: var(--rk-text-body);\n  line-height: var(--rk-text-body-lh);\n  transition: border-color 140ms ease, box-shadow 140ms ease;\n}\n\ninput:not([type="checkbox"]):not([type="radio"]):focus,\ntextarea:focus {\n  border-color: var(--rk-ring);\n  box-shadow: 0 0 0 2px color-mix(in srgb, var(--rk-ring) 30%, transparent);\n}\n\n[data-slot="settings"] [class*="_card"] {\n  border-radius: var(--rk-radius-lg);\n  border-color: var(--rk-border) !important;\n  background: var(--rk-dialog);\n  transition: border-color 140ms ease;\n}\n\n[data-slot="settings"] [class*="_card"]:hover {\n  border-color: var(--rk-input) !important;\n}\n\n/* --------------------------------------------------------------------------\n   9. Misc: skeletons, attachments, plugin brand seats\n   -------------------------------------------------------------------------- */\n\n[class*="_skeleton"] {\n  background: var(--rk-muted) !important;\n  background-image: none !important;\n  animation: rk-pulse 1.6s ease-in-out infinite;\n}\n\n/* Sidebar brand seats (decorations/index.js). */\n.grok-brandmark {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  flex: none;\n  color: var(--rk-fg);\n}\n\n.grok-brandmark > * {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n\n.grok-brandname {\n  display: inline-flex;\n  align-items: baseline;\n  gap: 6px;\n  line-height: 1;\n  white-space: nowrap;\n  color: var(--rk-fg);\n  font-size: var(--rk-text-body);\n  line-height: var(--rk-text-body-lh);\n  font-weight: var(--rk-weight-semibold);\n  letter-spacing: -0.011em;\n}\n\n/* --------------------------------------------------------------------------\n   10. Motion + reduced motion\n   -------------------------------------------------------------------------- */\n\n@keyframes rk-fade {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n\n@keyframes rk-pulse {\n  0%,\n  100% {\n    opacity: 1;\n  }\n  50% {\n    opacity: 0.55;\n  }\n}\n\n@keyframes rk-rise {\n  from {\n    opacity: 0;\n    transform: translateY(4px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n\n[data-slot="root"] {\n  animation: rk-fade 180ms ease-out both;\n}\n\n/* The bot identity pill floats in with the animated avatar. */\n.gb-idchip {\n  animation: rk-rise 220ms cubic-bezier(0.22, 0.61, 0.36, 1) both;\n}\n\n@media (prefers-reduced-motion: reduce) {\n  *,\n  *::before,\n  *::after {\n    animation-duration: 0.001ms !important;\n    animation-iteration-count: 1 !important;\n    transition-duration: 0.001ms !important;\n    scroll-behavior: auto !important;\n  }\n}\n';

  // work/plugin/package/src/client/theme/tokens.js
  var FONT_SANS = '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
  var FONT_MONO = 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace';
  var RADII = Object.freeze({
    xs: "4px",
    sm: "8px",
    // calc(12px - 4px)
    md: "10px",
    // calc(12px - 2px)
    lg: "12px",
    // base
    xl: "16px",
    // calc(12px + 4px)
    "2xl": "20px"
    // calc(12px + 8px)
  });
  var LIGHT = Object.freeze({
    background: "#ffffff",
    dialog: "#ffffff",
    foreground: "#1c1c1c",
    card: "#f2f2f2",
    cardForeground: "#1c1c1c",
    popover: "#ffffff",
    popoverForeground: "#1c1c1c",
    glassFill: "#ffffff",
    glassStroke: "#14141416",
    primary: "#1c1c1c",
    primaryForeground: "#fcfcfc",
    primaryHover: "#363636",
    primaryDisabled: "#1c1c1c26",
    secondary: "#1c1c1c0f",
    secondaryForeground: "#1c1c1c",
    chatUser: "#1c1c1c",
    chatUserForeground: "#ffffff",
    muted: "#f2f2f2",
    mutedForeground: "#1c1c1cad",
    faintForeground: "#1c1c1c8f",
    accent: "#1c1c1c0f",
    accentForeground: "#1c1c1c",
    destructive: "#cd2834",
    destructiveFill: "#e72e3b",
    destructiveForeground: "#ffffff",
    border: "#1c1c1c1f",
    input: "#1c1c1c3d",
    ring: "#1e86fc",
    sidebar: "#f5f5f5",
    sidebarForeground: "#1c1c1c",
    sidebarBorder: "#1c1c1c1f",
    sidebarAccent: "#1c1c1c14",
    sidebarAccentForeground: "#1c1c1c",
    link: "#0b6dd3",
    success: "#00854a",
    warning: "#aa6300",
    statusWorking: "#0b6dd3",
    unread: "#0b6dd3",
    workingDot: "#10ab61",
    overlay: "#00000080",
    scrollbar: "#1c1c1c3d",
    scrollbarHover: "#1c1c1c85"
  });
  var DARK = Object.freeze({
    background: "#0a0a0a",
    dialog: "#161616",
    foreground: "#f5f5f5",
    card: "#232323",
    cardForeground: "#f5f5f5",
    popover: "#232323",
    popoverForeground: "#f5f5f5",
    glassFill: "#2c2c2e",
    glassStroke: "#fcfcfc26",
    primary: "#f5f5f5",
    primaryForeground: "#121212",
    primaryHover: "#dbdbdb",
    primaryDisabled: "#f5f5f521",
    secondary: "#f5f5f50a",
    secondaryForeground: "#f5f5f5",
    chatUser: "#3e3e3e",
    chatUserForeground: "#f5f5f5",
    muted: "#232323",
    mutedForeground: "#f5f5f5a8",
    faintForeground: "#f5f5f58a",
    accent: "#f5f5f51a",
    accentForeground: "#f5f5f5",
    destructive: "#ff6463",
    destructiveFill: "#cf2b35",
    destructiveForeground: "#ffffff",
    border: "#f5f5f51a",
    input: "#f5f5f538",
    ring: "#1884fc",
    sidebar: "#0a0a0a",
    sidebarForeground: "#f5f5f5",
    sidebarBorder: "#f5f5f50f",
    sidebarAccent: "#f5f5f514",
    sidebarAccentForeground: "#f5f5f5",
    link: "#4d9bff",
    success: "#00ba69",
    warning: "#e28600",
    statusWorking: "#4d9bff",
    unread: "#4d9bff",
    workingDot: "#0e9f5a",
    overlay: "#000000b2",
    scrollbar: "#f5f5f538",
    scrollbarHover: "#f5f5f580"
  });
  function pair(light, dark) {
    return { light, dark };
  }
  function both(value) {
    return { light: value, dark: value };
  }
  function tint(hex, alpha) {
    const value = hex.replace("#", "");
    const r = Number.parseInt(value.slice(0, 2), 16);
    const g = Number.parseInt(value.slice(2, 4), 16);
    const b = Number.parseInt(value.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  var role = (name) => pair(LIGHT[name], DARK[name]);
  var TYPE_SCALE = Object.freeze({
    caption: "11px/16px",
    label: "12px/16px",
    bodySm: "13px/18px",
    body: "14px/20px",
    bodyLg: "15px/22px",
    heading3: "17px/24px",
    heading2: "22px/28px",
    heading1: "26px/32px",
    display: "32px/40px"
  });
  function font(sizeAndLineHeight) {
    return both(`${sizeAndLineHeight} var(--dsw-font-family)`);
  }
  var TOKEN_OVERRIDES = Object.freeze({
    // ---- typography ----------------------------------------------------------
    // One system stack and one type scale, like Rakazo's web client. Composite
    // DSH font tokens keep their role markers (weight) where the shipped role
    // has one and step onto the Rakazo sizes.
    "--dsw-font-family": both(FONT_SANS),
    "--dsw-font-family-brand": both(FONT_SANS),
    "--dsw-font-base-16": font(TYPE_SCALE.bodyLg),
    // body-lg 15/22
    "--dsw-font-s-14": font(TYPE_SCALE.body),
    // body 14/20
    "--dsw-font-xs-13": font(TYPE_SCALE.bodySm),
    // body-sm 13/18
    "--dsw-font-xxs-12": font(TYPE_SCALE.label),
    // label 12/16
    "--dsw-font-xxxs-11": font(TYPE_SCALE.caption),
    // caption 11/16 (+.005em in CSS)
    "--dsw-font-m-18": both(`500 ${TYPE_SCALE.heading3} var(--dsw-font-family)`),
    "--dsw-font-l-20": both(`500 ${TYPE_SCALE.heading2} var(--dsw-font-family)`),
    "--dsw-font-xl-24": both(`600 ${TYPE_SCALE.heading1} var(--dsw-font-family)`),
    "--dsw-font-markdown-base": both(`15px / 22px var(--dsw-font-family)`),
    // body-lg
    "--dsw-font-markdown-h1": both(`600 26px / 32px var(--dsw-font-family)`),
    "--dsw-font-markdown-h2": both(`600 22px / 28px var(--dsw-font-family)`),
    "--dsw-font-markdown-h3": both(`600 17px / 24px var(--dsw-font-family)`),
    "--dsw-font-markdown-h4": both(`600 15px / 22px var(--dsw-font-family)`),
    "--dsw-font-markdown-small": font(TYPE_SCALE.bodySm),
    "--dsw-font-markdown-table": font(TYPE_SCALE.bodySm),
    "--dsw-font-markdown-code": both(`13px / 20px ${FONT_MONO}`),
    "--dsw-font-markdown-code-block": both(`13px / 20px ${FONT_MONO}`),
    "--dsw-font-markdown-code-block-small": both(`12px / 18px ${FONT_MONO}`),
    // ---- radii (Rakazo --radius: 12px base with derived steps) ---------------
    "--dsw-radius-xs": both(RADII.xs),
    "--dsw-radius-sm": both(RADII.sm),
    "--dsw-radius-md": both(RADII.md),
    "--dsw-radius-lg": both(RADII.lg),
    "--dsw-radius-xl": both(RADII.xl),
    "--dsw-radius-panel": both(RADII["2xl"]),
    // ---- focus ring ----------------------------------------------------------
    "--dsw-focus-ring-color": role("ring"),
    "--dsw-focus-ring-width": both("2px"),
    // ---- canvas & layers -----------------------------------------------------
    "--dsw-alias-bg-base": role("background"),
    "--dsw-alias-bg-document-preview": role("muted"),
    "--dsw-alias-bg-document-selection": pair(tint(LIGHT.ring, 0.18), tint(DARK.ring, 0.26)),
    "--dsw-alias-bg-layer-1": role("dialog"),
    "--dsw-alias-bg-layer-2": role("card"),
    "--dsw-alias-bg-layer-3": role("muted"),
    "--dsw-alias-bg-mask-1": role("overlay"),
    // dialog backdrop
    "--dsw-alias-bg-mask-2": pair("#0000003d", "#00000066"),
    "--dsw-alias-bg-mask-3": pair("#000000b3", "#000000d9"),
    "--dsw-alias-bg-mask-drop": pair("#ffffffeb", "#2c2c2ee6"),
    // glass-fill, made opaque enough to read
    "--dsw-alias-bg-mask-photo": both("#000000d9"),
    "--dsw-alias-bg-module-platform": role("card"),
    "--dsw-alias-bg-multi-select": role("muted"),
    "--dsw-alias-bg-overlay": role("popover"),
    "--dsw-alias-bg-skeleton": role("secondary"),
    // ---- hairlines -----------------------------------------------------------
    "--dsw-alias-border-inverted": role("border"),
    "--dsw-alias-border-inverted2": role("input"),
    "--dsw-alias-border-l1": role("sidebarBorder"),
    "--dsw-alias-border-l2": role("border"),
    "--dsw-alias-border-l2-darkmode-thin": role("border"),
    "--dsw-alias-border-l3": role("input"),
    "--dsw-alias-border-l4": role("input"),
    // ---- brand & buttons -----------------------------------------------------
    "--dsw-alias-brand-primary": role("primary"),
    "--dsw-alias-brand-primary-invert": role("primaryForeground"),
    "--dsw-alias-brand-primary-new-colorprimary-new-color": role("ring"),
    "--dsw-alias-brand-text": role("foreground"),
    "--dsw-alias-button-contrast-fill": role("primary"),
    "--dsw-alias-button-elevated-fill": role("popover"),
    "--dsw-alias-button-floating-fill": role("glassFill"),
    "--dsw-alias-button-floating-hover": pair("#f2f2f2", "#333335"),
    "--dsw-alias-button-ghost-active-border": role("input"),
    "--dsw-alias-button-ghost-active-fill": role("secondary"),
    "--dsw-alias-button-ghost-active-hover": role("accent"),
    "--dsw-alias-button-info-fill": role("ring"),
    "--dsw-alias-button-info-hover": role("link"),
    "--dsw-alias-button-primary-dimmed": role("primaryDisabled"),
    "--dsw-alias-button-primary-fill": role("primary"),
    "--dsw-alias-button-primary-hover": role("primaryHover"),
    "--dsw-alias-button-tool-bar-fill": role("secondary"),
    "--dsw-alias-button-tool-bar-fill-invisible": pair("#1c1c1c08", "#f5f5f508"),
    "--dsw-alias-button-tool-bar-hover": role("accent"),
    // ---- typography roles ----------------------------------------------------
    "--dsw-alias-label-caption": role("faintForeground"),
    "--dsw-alias-label-deep-diving": role("foreground"),
    "--dsw-alias-label-deep-diving-shimmer": pair(tint(LIGHT.foreground, 0.35), tint(DARK.foreground, 0.35)),
    "--dsw-alias-label-dimmed": role("primaryDisabled"),
    "--dsw-alias-label-document-preview": role("mutedForeground"),
    "--dsw-alias-label-primary": role("foreground"),
    "--dsw-alias-label-primary-bluish": role("foreground"),
    "--dsw-alias-label-primary-dimmed": role("mutedForeground"),
    "--dsw-alias-label-primary-foreground": role("primaryForeground"),
    "--dsw-alias-label-primary-inverted": role("primaryForeground"),
    "--dsw-alias-label-secondary": role("mutedForeground"),
    "--dsw-alias-label-shimmer": pair(tint(LIGHT.foreground, 0.3), tint(DARK.foreground, 0.4)),
    "--dsw-alias-label-tertiary": role("faintForeground"),
    "--dsw-alias-link": role("link"),
    // ---- markdown & code -----------------------------------------------------
    "--dsw-alias-markdown-citation": role("muted"),
    "--dsw-alias-markdown-code-block": role("card"),
    "--dsw-alias-markdown-code-block-banner": role("muted"),
    "--dsw-alias-markdown-code-segment-selected": role("background"),
    "--dsw-alias-markdown-code-segment-unselected": role("muted"),
    "--dsw-alias-markdown-inline-code": role("muted"),
    "--dsw-alias-markdown-placeholder": role("card"),
    "--dsw-alias-markdown-tag": role("muted"),
    // ---- menus & overlays ----------------------------------------------------
    "--dsw-alias-menu-group-header-fill": role("sidebar"),
    "--dsw-alias-menu-icon": role("mutedForeground"),
    "--dsw-menu-surface-fill": role("popover"),
    "--dsw-specific-menu": role("popover"),
    // ---- scrollbars ----------------------------------------------------------
    "--dsw-alias-scrollbar-bg-l1": role("scrollbar"),
    "--dsw-alias-scrollbar-bg-l2": role("scrollbar"),
    "--dsw-alias-scrollbar-hover-l1": role("scrollbarHover"),
    "--dsw-alias-scrollbar-hover-l2": role("scrollbarHover"),
    // ---- states --------------------------------------------------------------
    "--dsw-alias-state-business-primary": role("statusWorking"),
    "--dsw-alias-state-business-tertiary": pair(tint(LIGHT.statusWorking, 0.12), tint(DARK.statusWorking, 0.16)),
    "--dsw-alias-state-done-primary": role("mutedForeground"),
    "--dsw-alias-state-error-primary": role("destructive"),
    "--dsw-alias-state-error-secondary": role("destructiveFill"),
    "--dsw-alias-state-idle-primary": role("secondary"),
    "--dsw-alias-state-success-primary": role("success"),
    "--dsw-alias-state-success-secondary": role("workingDot"),
    "--dsw-alias-state-success-tertiary": pair(tint(LIGHT.success, 0.1), tint(DARK.success, 0.14)),
    "--dsw-alias-state-warn-label": role("warning"),
    "--dsw-alias-state-warn-primary": role("warning"),
    "--dsw-alias-state-warn-secondary": role("warning"),
    "--dsw-alias-state-warn-tertiary": pair(tint(LIGHT.warning, 0.1), tint(DARK.warning, 0.16)),
    // ---- component surfaces --------------------------------------------------
    "--dsw-alias-switch-thumb": pair("#ffffff", "#f5f5f5"),
    "--dsw-alias-toast-bg": pair("#1c1c1c", "#232323"),
    "--dsw-alias-toast-label": pair("#ffffff", "#f5f5f5"),
    "--dsw-alias-tooltip-bg": pair("#1c1c1c", "#2c2c2e"),
    "--dsw-alias-tooltip-key-bg": pair("#ffffff29", "#ffffff24"),
    "--dsw-alias-turn-trigger-bg": role("secondary"),
    "--dsw-alias-turn-trigger-bg-hover": role("accent"),
    "--dsw-alias-interactive-bg-active": role("sidebarAccent"),
    "--dsw-alias-interactive-bg-hover-accent": pair(tint(LIGHT.ring, 0.1), tint(DARK.ring, 0.18)),
    "--dsw-alias-interactive-bg-hover-danger": pair(tint(LIGHT.destructive, 0.07), tint(DARK.destructive, 0.14)),
    "--dsw-alias-interactive-bg-hover-solid": role("muted"),
    "--dsw-alias-interactive-bg-hover": role("accent"),
    "--dsw-alias-settings-card-fill": role("dialog"),
    "--dsw-alias-settings-card-stroke": role("border"),
    "--dsw-alias-onboarding-accent": role("ring"),
    "--dsw-alias-onboarding-card-fill": role("dialog"),
    "--dsw-alias-onboarding-checkbox-border": role("input"),
    "--dsw-alias-onboarding-secondary-fill": role("muted"),
    // ---- diffs & files -------------------------------------------------------
    "--dsw-alias-code-diff-added": pair(tint(LIGHT.success, 0.1), tint(DARK.success, 0.12)),
    "--dsw-alias-code-diff-deleted": pair(tint(LIGHT.destructive, 0.08), tint(DARK.destructive, 0.14)),
    "--dsw-alias-file-diff-added-bg": pair("#e9f7ee", "#12251a"),
    "--dsw-alias-file-diff-added-gutter": pair("#f0faf3", "#0e1c14"),
    "--dsw-alias-file-diff-added-marker": pair(LIGHT.success, DARK.success),
    "--dsw-alias-file-diff-deleted-bg": pair("#fdecea", "#2a1314"),
    "--dsw-alias-file-diff-deleted-gutter": pair("#fef2f0", "#1e0e10"),
    "--dsw-alias-file-diff-deleted-marker": pair(LIGHT.destructive, DARK.destructive),
    // ---- illustrations (empty states / pickers) ------------------------------
    "--dsw-alias-illustration-background": role("muted"),
    "--dsw-alias-illustration-backing": role("card"),
    "--dsw-alias-illustration-detail": role("faintForeground"),
    "--dsw-alias-illustration-inset": role("background"),
    "--dsw-alias-illustration-shadow": role("background"),
    "--dsw-alias-illustration-surface": role("muted"),
    // ---- component surface aliases (specific layer) --------------------------
    "--dsw-specific-bubble": role("chatUser"),
    "--dsw-specific-bubble-highlight": pair("#363636", "#4a4a4a"),
    "--dsw-specific-input-major": role("popover"),
    "--dsw-specific-login-input": role("muted"),
    "--dsw-specific-selector": role("muted"),
    "--dsw-specific-sidebar-fill": role("sidebar"),
    "--dsw-specific-sidebar-nav-item-active": role("sidebarAccent"),
    "--dsw-specific-sidebar-nav-item-active-accent": role("accent"),
    "--dsw-specific-tip": role("muted"),
    // ---- elevation -----------------------------------------------------------
    // Rakazo's shadcn shadows: quiet, short-throw; the dark theme keeps its
    // hairlines legible by deepening the ambient shadow.
    "--dsw-elevation-stroke-color": role("border"),
    "--dsw-shadow-lv1": pair("0 1px 2px 0 #0000000a", "0 1px 2px 0 #00000066"),
    "--dsw-shadow-lv2": pair(
      "0 4px 12px 0 #00000008, 0 1px 3px 0 #0000000a",
      "0 4px 12px 0 #00000055, 0 1px 3px 0 #00000066"
    ),
    "--dsw-shadow-lv3": pair(
      "0 12px 32px 0 #00000014, 0 2px 8px 0 #0000000a",
      "0 12px 32px 0 #00000080, 0 2px 8px 0 #00000066"
    ),
    "--dsw-elevation-soft": pair(
      "0 0 0 .5px #1c1c1c1f, 0 4px 16px 0 #00000008, 0 0 24px 0 #00000008",
      "0 0 0 .5px #f5f5f51a, 0 4px 16px 0 #00000055, 0 0 24px 0 #00000055"
    ),
    "--dsw-elevation-panel": pair(
      "0 0 0 .5px #1c1c1c1f, 0 3px 8px 0 #00000008, 0 0 16px 0 #00000005",
      "0 0 0 .5px #f5f5f51a, 0 3px 8px 0 #00000055, 0 0 16px 0 #00000044"
    ),
    "--dsw-elevation-prominent": pair(
      "0 0 0 .5px #1c1c1c1f, 0 3px 8px 0 #0000000a, 0 0 20px 0 #0000000d",
      "0 0 0 .5px #f5f5f51a, 0 3px 8px 0 #00000066, 0 0 20px 0 #00000066"
    )
  });
  var TOKEN_COUNT = Object.keys(TOKEN_OVERRIDES).length;

  // work/plugin/package/src/client/theme/index.js
  var OVERRIDE_SOURCE = "@local/grokbot-ui";
  var LOG_PREFIX = "[grokbot-ui/theme]";
  function installTheme(ctx) {
    if (!ctx || typeof ctx !== "object") return () => {
    };
    const disposers = [];
    try {
      const disposeStyle = ctx.effect(() => {
        if (typeof document === "undefined") return () => {
        };
        const style = document.createElement("style");
        style.dataset.grokbotTheme = "rakazo";
        style.textContent = grok_default;
        document.head.appendChild(style);
        return () => {
          style.remove();
        };
      }, `${LOG_PREFIX}: stylesheet`);
      if (typeof disposeStyle === "function") disposers.push(disposeStyle);
    } catch (error) {
      console.warn(`${LOG_PREFIX} stylesheet injection skipped`, error);
    }
    try {
      const snapshot = typeof ctx.theme?.getTheme === "function" ? ctx.theme.getTheme() : null;
      const preference = snapshot && typeof snapshot.preference === "string" ? snapshot.preference : "";
      const known = Array.isArray(snapshot?.themes) ? snapshot.themes.map((theme) => theme && theme.id) : [];
      if (preference && !["system", "light", "dark"].includes(preference) && !known.includes(preference)) {
        ctx.theme.setTheme("system");
      }
    } catch (error) {
      console.warn(`${LOG_PREFIX} could not repair a stale theme preference`, error);
    }
    if (!ctx.theme || typeof ctx.theme.overrideTokens !== "function") {
      console.warn(`${LOG_PREFIX} the client is missing the theme service; stylesheet active, tokens not overridden`);
      return disposeComposite(disposers);
    }
    try {
      const disposeTokens = ctx.effect(() => {
        try {
          const dispose = ctx.theme.overrideTokens(OVERRIDE_SOURCE, TOKEN_OVERRIDES);
          return typeof dispose === "function" ? dispose : () => {
          };
        } catch (error) {
          console.warn(`${LOG_PREFIX} token override layer skipped`, error);
          return () => {
          };
        }
      }, `${LOG_PREFIX}: ${TOKEN_COUNT} token roles`);
      if (typeof disposeTokens === "function") disposers.push(disposeTokens);
    } catch (error) {
      console.warn(`${LOG_PREFIX} theme service unavailable`, error);
    }
    return disposeComposite(disposers);
  }
  function disposeComposite(disposers) {
    let disposed = false;
    return () => {
      if (disposed) return;
      disposed = true;
      for (let index = disposers.length - 1; index >= 0; index -= 1) {
        try {
          disposers[index]();
        } catch (error) {
          console.warn(`${LOG_PREFIX} disposer failed`, error);
        }
      }
    };
  }

  // work/plugin/package/src/client/decorations/index.js
  var import_react5 = __toESM(__require("react"), 1);

  // work/plugin/package/src/client/decorations/chrome.css
  var chrome_default = '/* ==========================================================================\n   Grokbot UI \u2014 chrome decorations\n   --------------------------------------------------------------------------\n   The plugin\'s own seats in the shipped shell: the sidebar brand (animated\n   Rakazo mascot + wordmark) and the floating bot identity pill in a bot\n   session\'s header. Palette and type scale come from the Rakazo design tokens\n   installed by theme/index.js (`--rk-*` + `--dsw-*` overrides).\n\n   The identity chip\'s base styles live in identity/index.jsx (owned by the\n   bot-screens teammate); this sheet layers the Rakazo product look on top, so\n   it uses !important for the few properties that must win regardless of load\n   order.\n   ========================================================================== */\n\n/* Hide the shipped brand artwork when our seats render. */\n[data-slot="sidebar.brand.mark"]:has(.grok-brandmark) > svg,\n[data-slot="sidebar.brand.name"]:has(.grok-brandname) > svg {\n  display: none !important;\n}\n\n.grok-brandmark {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  flex: none;\n  color: var(--rk-fg, #1c1c1c);\n  overflow: visible;\n}\n\n.grok-brandmark > * {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n\n.grok-brandname {\n  display: inline-flex;\n  align-items: baseline;\n  gap: 6px;\n  white-space: nowrap;\n  color: var(--rk-fg, #1c1c1c);\n  font-family: var(--rk-font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif);\n  font-size: var(--rk-text-body, 14px);\n  line-height: var(--rk-text-body-lh, 20px);\n  font-weight: var(--rk-weight-semibold, 600);\n  letter-spacing: -0.011em;\n}\n\n/* --------------------------------------------------------------------------\n   Floating bot identity pill in the session header\n   -------------------------------------------------------------------------- */\n\n.gb-idchip {\n  display: inline-flex;\n  align-items: center;\n  gap: 9px !important;\n  height: 36px !important;\n  padding: 4px 14px 4px 4px !important;\n  margin-inline-end: 6px !important;\n  border: 1px solid var(--rk-border, rgba(28, 28, 28, 0.12)) !important;\n  border-radius: 999px !important;\n  background: var(--rk-popover, #ffffff) !important;\n  box-shadow: var(--rk-shadow-md, 0 4px 12px rgba(0, 0, 0, 0.06)) !important;\n  color: var(--rk-fg, #1c1c1c) !important;\n  font-family: var(--rk-font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif) !important;\n  font-size: var(--rk-text-body-lg, 15px) !important;\n  line-height: var(--rk-text-body-lg-lh, 22px) !important;\n  font-weight: var(--rk-weight-medium, 500) !important;\n  letter-spacing: -0.011em !important;\n  cursor: default;\n  user-select: none;\n  white-space: nowrap;\n  transition: background-color 140ms ease, border-color 140ms ease, box-shadow 140ms ease;\n}\n\n.gb-idchip:hover {\n  border-color: var(--rk-input, rgba(28, 28, 28, 0.24)) !important;\n  box-shadow: var(--rk-shadow-lg, 0 12px 32px rgba(0, 0, 0, 0.08)) !important;\n}\n\n.gb-idchip-name {\n  max-width: 180px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  color: var(--rk-fg, #1c1c1c);\n}\n\n/* The presence dot, backed by real session state. Working is the one green;\n   waiting uses the warning amber, error the destructive red, idle the faint ink. */\n.gb-idchip-dot {\n  width: 6px !important;\n  height: 6px !important;\n  flex: none;\n  border-radius: 50%;\n  background: var(--rk-faint-fg, #1c1c1c8f) !important;\n  box-shadow: 0 0 0 2px var(--rk-popover, #ffffff) !important;\n}\n\n.gb-idchip-dot--working {\n  background: var(--rk-working-dot, #10ab61) !important;\n}\n\n.gb-idchip-dot--waiting {\n  background: var(--rk-warning, #aa6300) !important;\n}\n\n.gb-idchip-dot--error {\n  background: var(--rk-destructive, #cd2834) !important;\n}\n\n.gb-idchip-dot--idle {\n  background: var(--rk-faint-fg, #1c1c1c8f) !important;\n}\n\n/* Sidebar session-row avatar (identity decoration). */\n.gb-rowavatar {\n  display: block;\n  flex: none;\n  border-radius: 50%;\n}\n\n/* Hero cluster of bot avatars above the composer. */\n.gb-hero-cluster {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.gb-hero-cluster-item {\n  display: inline-flex;\n  margin-inline-start: -12px;\n  filter: none;\n}\n\n.gb-hero-cluster-item:first-child {\n  margin-inline-start: 0;\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .gb-idchip {\n    animation: none !important;\n    transition: none !important;\n  }\n}\n';

  // work/plugin/package/src/client/shared/avatar/index.jsx
  var import_react4 = __toESM(__require("react"), 1);

  // work/plugin/package/src/client/shared/avatar/avatar.css
  var avatar_default = "/* ==========================================================================\n   Grokbot UI \u2014 ported Rakazo avatar engine styles\n   --------------------------------------------------------------------------\n   Adapted from Rakazo (Apache-2.0), https://github.com/elie222/rakazo\n     packages/ui-web/src/logo-avatar.css\n     packages/ui-web/src/styles.css (avatar ring / organic avatar sections)\n\n   Light/dark aware through the app's CSS variables (`--background`,\n   `--foreground`, `--border`, `--sidebar`, `--status-working`), with the shipped\n   `--dsw-*` roles as fallbacks. No Tailwind, no external assets.\n   ========================================================================== */\n\n/* Shared, theme-aware avatar variables. */\n.gb-avatar {\n  --gb-avatar-page-bg: var(--background, var(--dsw-alias-bg-base, #ffffff));\n  --gb-avatar-sidebar: var(--sidebar, var(--dsw-alias-bg-layer-2, #f7f7f7));\n  --gb-avatar-fg: var(--foreground, var(--dsw-alias-label-primary, #1c1c1c));\n  --gb-avatar-border: var(--border, var(--dsw-alias-border-l2, rgba(0, 0, 0, 0.08)));\n  --gb-avatar-surface: var(--card, var(--dsw-alias-bg-layer-3, #f2f2f2));\n  --gb-avatar-working: var(\n    --status-working,\n    var(--dsw-alias-brand-primary-new-colorprimary-new-color, #1884fc)\n  );\n}\n\n/* --------------------------------------------------------------------------\n   1. Logo avatar \u2014 plate, body, eyes, task cues\n   -------------------------------------------------------------------------- */\n\n.rakazo-logo-avatar {\n  display: inline-block;\n  overflow: hidden;\n  vertical-align: middle;\n  flex: none;\n}\n.logo-avatar-plate {\n  fill: var(--gb-avatar-sidebar);\n}\n.logo-avatar-outline {\n  fill: none;\n  stroke: var(--gb-avatar-border);\n  stroke-width: 1;\n}\n.logo-avatar-body {\n  transform-origin: 50px 84px;\n}\n.logo-avatar-gaze {\n  transform: translate(clamp(-6.5px, var(--avatar-gaze-x, 0px), 6.5px), clamp(-6.5px, var(--avatar-gaze-y, 0px), 6.5px));\n  transition: transform 180ms cubic-bezier(0.2, 0.8, 0.2, 1);\n}\n.logo-avatar-glint {\n  fill: #ffffff;\n  opacity: 0.15;\n}\n.logo-avatar-eye-lid {\n  transition: transform 180ms cubic-bezier(0.2, 0.8, 0.2, 1);\n}\n\n/* Separate clocks keep a bot's two eyes paired without synchronising the fleet. */\n.rakazo-logo-avatar[data-motion='true'] .logo-avatar-eye {\n  animation: var(--logo-blink-name) var(--logo-blink-duration) ease-in-out\n    var(--logo-blink-delay) infinite;\n}\n.rakazo-logo-avatar[data-motion='true'] .logo-avatar-body,\n.rakazo-logo-avatar[data-motion='true'] .logo-avatar-scan,\n.rakazo-logo-avatar[data-motion='true'] .logo-avatar-eye-lid,\n.rakazo-logo-avatar[data-motion='true'] .logo-avatar-action,\n.rakazo-logo-avatar[data-motion='true'] .logo-avatar-hand {\n  animation-duration: var(--logo-move-duration);\n  animation-delay: var(--logo-move-delay);\n  animation-timing-function: cubic-bezier(0.45, 0, 0.25, 1);\n  animation-iteration-count: infinite;\n}\n\n/* Idle: breathe + a slow gaze scan (acceptance: motion at rest, not a frozen face). */\n.rakazo-logo-avatar[data-motion='true'] .logo-avatar-layer:where([data-activity='idle']) .logo-avatar-body {\n  animation-name: logo-avatar-breathe;\n  animation-duration: var(--logo-breathe-duration);\n}\n.rakazo-logo-avatar[data-motion='true'] .logo-avatar-layer:where([data-activity='idle']) .logo-avatar-scan {\n  animation-name: logo-avatar-idle-scan;\n  animation-duration: calc(var(--logo-breathe-duration) * 2);\n}\n.rakazo-logo-avatar[data-motion='true'] .logo-avatar-hand-left {\n  animation-name: logo-avatar-hand-left;\n  animation-duration: var(--logo-hand-duration);\n}\n.rakazo-logo-avatar[data-motion='true'] .logo-avatar-hand-right {\n  animation-name: logo-avatar-hand-right;\n  animation-duration: var(--logo-hand-duration);\n}\n\n/* Working: breathing only (Rakazo's working pose). */\n.rakazo-logo-avatar[data-motion='true'] .logo-avatar-layer:where([data-activity='working']) .logo-avatar-body {\n  animation-name: logo-avatar-breathe;\n}\n\n.logo-avatar-layer:where([data-activity='reading']) .logo-avatar-gaze {\n  transform: translate(clamp(-6.5px, var(--avatar-gaze-x, 0px), 6.5px), clamp(-6.5px, var(--avatar-gaze-y, 0px), 6.5px));\n}\n.logo-avatar-layer:where([data-activity='reading']) .logo-avatar-eye-lid {\n  transform: scaleY(0.76);\n}\n.logo-avatar-layer:where([data-activity='writing']) .logo-avatar-gaze {\n  transform: translate(clamp(-6.5px, var(--avatar-gaze-x, 0px), 6.5px), clamp(-6.5px, var(--avatar-gaze-y, 0px), 6.5px));\n}\n.logo-avatar-layer:where([data-activity='writing']) .logo-avatar-eye-lid {\n  transform: scaleY(0.62);\n}\n.logo-avatar-layer:where([data-activity='thinking']) .logo-avatar-gaze {\n  transform: translate(clamp(-6.5px, var(--avatar-gaze-x, 0px), 6.5px), clamp(-6.5px, var(--avatar-gaze-y, 0px), 6.5px));\n}\n.logo-avatar-layer:where([data-activity='thinking']) .logo-avatar-eye-lid {\n  transform: scaleY(0.8);\n}\n.logo-avatar-layer:where([data-activity='error']) .logo-avatar-eye-lid {\n  transform: scaleY(0.68);\n}\n.logo-avatar-layer:where([data-activity='waiting']) .logo-avatar-eye-lid {\n  transform: scaleY(0.9);\n}\n\n.rakazo-logo-avatar[data-motion='true'] .logo-avatar-layer:where([data-activity='reading']) .logo-avatar-scan {\n  animation-name: logo-avatar-read;\n}\n.rakazo-logo-avatar[data-motion='true'] .logo-avatar-layer:where([data-activity='reading']) .logo-avatar-eye-lid {\n  animation-name: logo-avatar-read-lids;\n}\n.rakazo-logo-avatar[data-motion='true'] .logo-avatar-layer:where([data-activity='writing']) .logo-avatar-scan {\n  animation-name: logo-avatar-write;\n}\n.rakazo-logo-avatar[data-motion='true'] .logo-avatar-layer:where([data-activity='writing']) .logo-avatar-body {\n  animation-name: logo-avatar-write-body;\n}\n.rakazo-logo-avatar[data-motion='true'] .logo-avatar-layer:where([data-activity='thinking']) .logo-avatar-scan {\n  animation-name: logo-avatar-think;\n}\n.rakazo-logo-avatar[data-motion='true'] .logo-avatar-layer:where([data-activity='thinking']) .logo-avatar-eye-lid {\n  animation-name: logo-avatar-think-lids;\n}\n.rakazo-logo-avatar[data-motion='true'] .logo-avatar-page-cursor {\n  animation-name: logo-avatar-page-line;\n}\n.rakazo-logo-avatar[data-motion='true'] .logo-avatar-key-left {\n  animation-name: logo-avatar-type-left;\n}\n.rakazo-logo-avatar[data-motion='true'] .logo-avatar-key-right {\n  animation-name: logo-avatar-type-right;\n}\n\n/* Pausing preserves phase; no timers, animation frames or React updates drive motion. */\n.rakazo-logo-avatar[data-paused='true'] .logo-avatar-body,\n.rakazo-logo-avatar[data-paused='true'] .logo-avatar-scan,\n.rakazo-logo-avatar[data-paused='true'] .logo-avatar-eye,\n.rakazo-logo-avatar[data-paused='true'] .logo-avatar-eye-lid,\n.rakazo-logo-avatar[data-paused='true'] .logo-avatar-action,\n.rakazo-logo-avatar[data-paused='true'] .logo-avatar-hand {\n  animation-play-state: paused;\n}\n\n@keyframes logo-avatar-blink-three {\n  0.000000% { transform: scaleY(1); }\n  17.083333% { transform: scaleY(1); }\n  17.291667% { transform: scaleY(0.06); }\n  17.375000% { transform: scaleY(0.06); }\n  17.750000% { transform: scaleY(1); }\n  47.916667% { transform: scaleY(1); }\n  48.125000% { transform: scaleY(0.06); }\n  48.208333% { transform: scaleY(0.06); }\n  48.583333% { transform: scaleY(1); }\n  83.333333% { transform: scaleY(1); }\n  83.541667% { transform: scaleY(0.06); }\n  83.625000% { transform: scaleY(0.06); }\n  84.000000% { transform: scaleY(1); }\n  100.000000% { transform: scaleY(1); }\n}\n@keyframes logo-avatar-blink-four {\n  0.000000% { transform: scaleY(1); }\n  13.333333% { transform: scaleY(1); }\n  13.541667% { transform: scaleY(0.06); }\n  13.625000% { transform: scaleY(0.06); }\n  14.000000% { transform: scaleY(1); }\n  37.083333% { transform: scaleY(1); }\n  37.291667% { transform: scaleY(0.06); }\n  37.375000% { transform: scaleY(0.06); }\n  37.750000% { transform: scaleY(1); }\n  59.166667% { transform: scaleY(1); }\n  59.375000% { transform: scaleY(0.06); }\n  59.458333% { transform: scaleY(0.06); }\n  59.833333% { transform: scaleY(1); }\n  87.916667% { transform: scaleY(1); }\n  88.125000% { transform: scaleY(0.06); }\n  88.208333% { transform: scaleY(0.06); }\n  88.583333% { transform: scaleY(1); }\n  100.000000% { transform: scaleY(1); }\n}\n@keyframes logo-avatar-breathe {\n  0%,\n  100% {\n    transform: scale(1);\n  }\n  50% {\n    transform: scale(1.005);\n  }\n}\n@keyframes logo-avatar-idle-scan {\n  0%,\n  100% {\n    transform: translate(0, 0);\n  }\n  28% {\n    transform: translate(0.5px, -0.25px);\n  }\n  55% {\n    transform: translate(-0.4px, 0.2px);\n  }\n  80% {\n    transform: translate(0.25px, 0.1px);\n  }\n}\n@keyframes logo-avatar-hand-left {\n  0%,\n  100% {\n    transform: rotate(0deg);\n  }\n  50% {\n    transform: rotate(-1.6deg);\n  }\n}\n@keyframes logo-avatar-hand-right {\n  0%,\n  100% {\n    transform: rotate(0deg);\n  }\n  50% {\n    transform: rotate(1.6deg);\n  }\n}\n@keyframes logo-avatar-read {\n  0%,\n  6%,\n  96%,\n  100% {\n    transform: translate(0, 0);\n  }\n  24%,\n  28% {\n    transform: translate(20px, 0);\n  }\n  34%,\n  38% {\n    transform: translate(0, 5px);\n  }\n  54%,\n  58% {\n    transform: translate(20px, 5px);\n  }\n  64%,\n  68% {\n    transform: translate(0, 10px);\n  }\n  84%,\n  88% {\n    transform: translate(20px, 10px);\n  }\n}\n@keyframes logo-avatar-read-lids {\n  0%,\n  88%,\n  98%,\n  100% {\n    transform: scaleY(0.76);\n  }\n  92%,\n  94% {\n    transform: scaleY(0.06);\n  }\n}\n@keyframes logo-avatar-write {\n  0%,\n  10%,\n  26%,\n  56%,\n  74%,\n  100% {\n    transform: translateY(0);\n  }\n  18% {\n    transform: translateY(3px);\n  }\n  64% {\n    transform: translateY(6px);\n  }\n}\n@keyframes logo-avatar-write-body {\n  0%,\n  10%,\n  26%,\n  56%,\n  74%,\n  100% {\n    transform: translateY(0);\n  }\n  18% {\n    transform: translateY(0.9px);\n  }\n  64% {\n    transform: translateY(1.4px);\n  }\n}\n@keyframes logo-avatar-think {\n  0%,\n  8%,\n  100% {\n    transform: translate(0, -2px);\n  }\n  24%,\n  40% {\n    transform: translate(calc(-9px * var(--logo-side)), -8px);\n  }\n  56%,\n  65% {\n    transform: translate(calc(-5px * var(--logo-side)), -11px);\n  }\n  82%,\n  90% {\n    transform: translate(0, -3px);\n  }\n}\n@keyframes logo-avatar-think-lids {\n  0%,\n  8%,\n  100% {\n    transform: scaleY(1);\n  }\n  24%,\n  40% {\n    transform: scaleY(0.8);\n  }\n  56%,\n  65% {\n    transform: scaleY(0.68);\n  }\n  82%,\n  90% {\n    transform: scaleY(0.9);\n  }\n}\n@keyframes logo-avatar-page-line {\n  0%,\n  6%,\n  96%,\n  100% {\n    transform: translate(0, 0);\n  }\n  24%,\n  28% {\n    transform: translate(37px, 0);\n  }\n  34%,\n  38% {\n    transform: translate(0, 3px);\n  }\n  54%,\n  58% {\n    transform: translate(37px, 3px);\n  }\n  64%,\n  68% {\n    transform: translate(0, 6px);\n  }\n  84%,\n  88% {\n    transform: translate(37px, 6px);\n  }\n}\n@keyframes logo-avatar-type-left {\n  0%,\n  10%,\n  26%,\n  100% {\n    opacity: 0.7;\n    transform: translateY(0);\n  }\n  18% {\n    opacity: 1;\n    transform: translateY(1px);\n  }\n}\n@keyframes logo-avatar-type-right {\n  0%,\n  56%,\n  74%,\n  100% {\n    opacity: 0.7;\n    transform: translateY(0);\n  }\n  64% {\n    opacity: 1;\n    transform: translateY(1px);\n  }\n}\n\n/* Cues illustrate a task; pointer/key positions are not live telemetry. */\n.logo-avatar-task {\n  fill: none;\n  stroke: var(--gb-avatar-fg);\n  stroke-width: var(--logo-task-stroke);\n  stroke-linecap: round;\n  stroke-linejoin: round;\n}\n.logo-avatar-task-surface {\n  fill: var(--gb-avatar-page-bg);\n}\n.logo-avatar-key-left,\n.logo-avatar-key-right {\n  opacity: 0.7;\n}\n.rakazo-logo-avatar[data-compact='true'] .logo-avatar-task-detail {\n  display: none;\n}\n.rakazo-logo-avatar[data-small='true'] .logo-avatar-task {\n  display: none;\n}\n\n/* Native fades temporarily overlap continuing poses; their clocks do not restart. */\n.logo-avatar-layer[data-entering='true'] {\n  animation: logo-avatar-layer-in 180ms ease-in-out both;\n}\n.logo-avatar-layer[data-outgoing='true'] {\n  animation: logo-avatar-layer-out 180ms ease-in-out both;\n}\n@keyframes logo-avatar-layer-in {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n@keyframes logo-avatar-layer-out {\n  from {\n    opacity: var(--logo-exit-from);\n  }\n  to {\n    opacity: 0;\n  }\n}\n\n/* --------------------------------------------------------------------------\n   2. Image avatars \u2014 circle crop + working ring\n   -------------------------------------------------------------------------- */\n\n.rakazo-bot-avatar {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  flex: none;\n  user-select: none;\n  vertical-align: middle;\n  transition: box-shadow 180ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n.rakazo-bot-avatar-picture {\n  position: absolute;\n  inset: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  overflow: hidden;\n  border-radius: 9999px;\n  border: 1px solid var(--gb-avatar-border);\n  background: var(--gb-avatar-surface);\n  box-shadow: 0 2px 5px rgb(0 0 0 / 0.5);\n}\n.rakazo-bot-avatar-picture img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  display: block;\n}\n.rakazo-bot-avatar-ring {\n  position: absolute;\n  pointer-events: none;\n  animation: rakazo-avatar-spin 1.2s cubic-bezier(0.4, 0, 0.2, 1) infinite;\n  opacity: 0;\n  transition: opacity 180ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n.rakazo-bot-avatar-ring circle {\n  stroke: var(--gb-avatar-working);\n}\n.rakazo-bot-avatar[data-working='true'] .rakazo-bot-avatar-ring {\n  opacity: 1;\n}\n/* Hidden idle rings would otherwise keep the compositor drawing every frame. */\n.rakazo-bot-avatar[data-working='false'] .rakazo-bot-avatar-ring {\n  animation-play-state: paused;\n}\n.rakazo-bot-avatar-ring-working {\n  filter: drop-shadow(0 0 4px var(--gb-avatar-working));\n}\n.rakazo-bot-avatar[data-working='true'] .rakazo-bot-avatar-picture {\n  animation: rakazo-avatar-breathe 1.6s ease-in-out infinite;\n  box-shadow:\n    0 0 0 2px var(--gb-avatar-working),\n    0 0 10px var(--gb-avatar-working);\n}\n@keyframes rakazo-avatar-spin {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\n@keyframes rakazo-avatar-breathe {\n  0%,\n  100% {\n    transform: scale(1);\n    filter: brightness(1);\n  }\n  50% {\n    transform: scale(1.07);\n    filter: brightness(1.12);\n  }\n}\n\n/* --------------------------------------------------------------------------\n   3. Organic avatars \u2014 shipped shapes + seeded bodies\n   -------------------------------------------------------------------------- */\n\n.rakazo-organic-avatar {\n  display: inline-block;\n  overflow: visible;\n  vertical-align: middle;\n  flex: none;\n}\n.rakazo-organic-avatar-body {\n  transform-origin: center;\n  transition: opacity 180ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n.rakazo-organic-avatar-body-working {\n  opacity: 0;\n}\n.rakazo-organic-avatar[data-working='true'] .rakazo-organic-avatar-body-idle {\n  opacity: 0;\n}\n.rakazo-organic-avatar[data-working='true'] .rakazo-organic-avatar-body-working {\n  opacity: 1;\n}\n.rakazo-organic-avatar-eyes {\n  transform-origin: center;\n  transition: opacity 180ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n.rakazo-organic-avatar-gaze { transform: translate(clamp(-6.5px, var(--avatar-gaze-x, 0px), 6.5px), clamp(-6.5px, var(--avatar-gaze-y, 0px), 6.5px)); transition: transform 180ms cubic-bezier(0.2,0.8,0.2,1); }\n.rakazo-organic-avatar-eyes-working {\n  opacity: 0;\n}\n.rakazo-organic-avatar[data-working='true'] .rakazo-organic-avatar-eyes-idle {\n  opacity: 0;\n}\n.rakazo-organic-avatar[data-working='true'] .rakazo-organic-avatar-eyes-working {\n  opacity: 1;\n}\n\n.rakazo-organic-avatar[data-motion='true'][data-working='true'][data-shape-family='0'] .rakazo-organic-avatar-body-working {\n  animation: rakazo-organic-float 1.8s ease-in-out infinite;\n}\n.rakazo-organic-avatar[data-motion='true'][data-working='true'][data-shape-family='1'] .rakazo-organic-avatar-body-working {\n  animation: rakazo-organic-stretch 1.35s ease-in-out infinite;\n}\n.rakazo-organic-avatar[data-motion='true'][data-working='true'][data-shape-family='2'] .rakazo-organic-avatar-body-working,\n.rakazo-organic-avatar[data-motion='true'][data-working='true'][data-shape-family='8'] .rakazo-organic-avatar-body-working {\n  animation: rakazo-organic-sway 1.6s ease-in-out infinite;\n}\n.rakazo-organic-avatar[data-motion='true'][data-working='true'][data-shape-family='3'] .rakazo-organic-avatar-body-working,\n.rakazo-organic-avatar[data-motion='true'][data-working='true'][data-shape-family='4'] .rakazo-organic-avatar-body-working {\n  animation: rakazo-organic-turn 2.4s ease-in-out infinite;\n}\n.rakazo-organic-avatar[data-motion='true'][data-working='true'][data-shape-family='5'] .rakazo-organic-avatar-body-working,\n.rakazo-organic-avatar[data-motion='true'][data-working='true'][data-shape-family='9'] .rakazo-organic-avatar-body-working {\n  animation: rakazo-organic-squash 1.35s ease-in-out infinite;\n}\n.rakazo-organic-avatar[data-motion='true'][data-working='true'][data-shape-family='6'] .rakazo-organic-avatar-body-working {\n  animation: rakazo-organic-pulse 1.1s ease-in-out infinite;\n}\n.rakazo-organic-avatar[data-motion='true'][data-working='true'][data-shape-family='7'] .rakazo-organic-avatar-body-working {\n  transform-origin: center 20%;\n  animation: rakazo-organic-ring 1.35s ease-in-out infinite;\n}\n\n.rakazo-organic-avatar[data-motion='true'][data-working='true'][data-eye-pattern='0'] .rakazo-organic-avatar-eyes-working {\n  animation: rakazo-organic-eyes-loop-0 6.6s ease-in-out infinite;\n}\n.rakazo-organic-avatar[data-motion='true'][data-working='true'][data-eye-pattern='1'] .rakazo-organic-avatar-eyes-working {\n  animation: rakazo-organic-eyes-loop-1 7.2s ease-in-out -1.4s infinite;\n}\n.rakazo-organic-avatar[data-motion='true'][data-working='true'][data-eye-pattern='2'] .rakazo-organic-avatar-eyes-working {\n  animation: rakazo-organic-eyes-loop-2 6.1s ease-in-out -3.2s infinite;\n}\n.rakazo-organic-avatar[data-motion='true'][data-working='true'][data-eye-pattern='3'] .rakazo-organic-avatar-eyes-working {\n  animation: rakazo-organic-eyes-loop-3 7.8s ease-in-out -2.1s infinite;\n}\n\n/* Idle, offscreen and hidden avatars hold still. */\n.rakazo-organic-avatar[data-paused='true'] .rakazo-organic-avatar-body,\n.rakazo-organic-avatar[data-paused='true'] .rakazo-organic-avatar-eyes {\n  animation-play-state: paused;\n}\n\n@keyframes rakazo-organic-float {\n  0%,\n  100% {\n    transform: translateY(2px) scaleX(1.02);\n  }\n  50% {\n    transform: translateY(-3px) scaleX(0.98);\n  }\n}\n@keyframes rakazo-organic-stretch {\n  0%,\n  100% {\n    transform: translateY(2px) scale(1.04, 0.96);\n  }\n  50% {\n    transform: translateY(-3px) scale(0.96, 1.05);\n  }\n}\n@keyframes rakazo-organic-sway {\n  0%,\n  100% {\n    transform: rotate(-3deg) translateX(-1px);\n  }\n  50% {\n    transform: rotate(3deg) translateX(1px);\n  }\n}\n@keyframes rakazo-organic-turn {\n  0%,\n  100% {\n    transform: rotate(-4deg) scale(0.98);\n  }\n  50% {\n    transform: rotate(4deg) scale(1.04);\n  }\n}\n@keyframes rakazo-organic-squash {\n  0%,\n  100% {\n    transform: scale(1.04, 0.96);\n  }\n  50% {\n    transform: scale(0.96, 1.04);\n  }\n}\n@keyframes rakazo-organic-pulse {\n  0%,\n  100% {\n    transform: scale(0.96);\n  }\n  45% {\n    transform: scale(1.06);\n  }\n}\n@keyframes rakazo-organic-ring {\n  0%,\n  100% {\n    transform: rotate(-4deg);\n  }\n  35% {\n    transform: rotate(5deg);\n  }\n  65% {\n    transform: rotate(-3deg);\n  }\n}\n@keyframes rakazo-organic-eyes-loop-0 {\n  0%,\n  100% {\n    transform: translate(-9%, 1%) scaleY(0.94);\n  }\n  18% {\n    transform: translate(9%, -2%) scaleY(1.04);\n  }\n  34% {\n    transform: translate(0, -8%) scale(1.08);\n  }\n  48% {\n    transform: scale(1.12, 0.82);\n  }\n  51% {\n    transform: scale(1.05, 0.08);\n  }\n  54% {\n    transform: scale(1.12, 0.9);\n  }\n  72% {\n    transform: translate(-5%, 7%) scaleY(0.9);\n  }\n  86% {\n    transform: translate(7%, 3%);\n  }\n}\n@keyframes rakazo-organic-eyes-loop-1 {\n  0%,\n  100% {\n    transform: translate(0, -8%) scale(1.06);\n  }\n  16% {\n    transform: translate(8%, 2%);\n  }\n  31% {\n    transform: translate(0, 8%) scaleY(0.9);\n  }\n  46% {\n    transform: translate(-8%, 2%);\n  }\n  61% {\n    transform: scale(0.88, 1.1);\n  }\n  76% {\n    transform: translateY(-7%) scaleY(1.08);\n  }\n  88% {\n    transform: translateY(6%) scale(1.08, 0.86);\n  }\n}\n@keyframes rakazo-organic-eyes-loop-2 {\n  0%,\n  100% {\n    transform: scale(0.9, 1.08);\n  }\n  20% {\n    transform: scale(1.14, 0.84);\n  }\n  24% {\n    transform: scale(1.08, 0.08);\n  }\n  28% {\n    transform: scale(1.02);\n  }\n  45% {\n    transform: translate(-9%, -3%) scaleY(0.94);\n  }\n  62% {\n    transform: translate(9%, 2%) scaleY(1.05);\n  }\n  80% {\n    transform: translate(0, -8%) scale(1.06);\n  }\n}\n@keyframes rakazo-organic-eyes-loop-3 {\n  0%,\n  100% {\n    transform: translateY(7%) scaleY(0.9);\n  }\n  14% {\n    transform: translateY(-9%) scaleY(1.08);\n  }\n  30% {\n    transform: translate(8%, -2%);\n  }\n  47% {\n    transform: translate(-8%, 3%) scaleY(0.94);\n  }\n  63% {\n    transform: scale(1.12, 0.82);\n  }\n  78% {\n    transform: translate(0, -7%) scale(0.9, 1.08);\n  }\n  91% {\n    transform: translate(0, 5%) scale(1.06, 0.9);\n  }\n}\n\n/* --------------------------------------------------------------------------\n   4. Stacks + shape swatches\n   -------------------------------------------------------------------------- */\n\n.rakazo-group-avatar {\n  position: relative;\n  display: inline-block;\n  flex: none;\n  border-radius: 9999px;\n}\n.rakazo-group-avatar:empty::before {\n  content: '';\n}\n.gb-avatar-stack-single {\n  display: inline-flex;\n}\n.gb-avatar-stack-item {\n  position: absolute;\n  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.6));\n}\n.gb-avatar-stack-more {\n  position: absolute;\n  z-index: 4;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 9999px;\n  border: 1px solid var(--gb-avatar-border);\n  background: var(--gb-avatar-surface);\n  color: var(--gb-avatar-fg);\n  font-size: 10px;\n  font-weight: 600;\n  box-shadow: 0 1px 2px rgb(0 0 0 / 0.35);\n}\n.gb-shape-preview {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 44px;\n  height: 44px;\n  padding: 0;\n  border: 1px solid transparent;\n  border-radius: 12px;\n  background: transparent;\n  color: inherit;\n  cursor: pointer;\n  transition:\n    transform 140ms ease,\n    background-color 140ms ease,\n    border-color 140ms ease;\n}\n.gb-shape-preview:hover {\n  transform: scale(1.05);\n  background: var(--dsw-alias-interactive-bg-hover, rgba(127, 127, 127, 0.1));\n}\n.gb-shape-preview:active {\n  transform: scale(0.95);\n}\n.gb-shape-preview:focus-visible {\n  outline: 2px solid var(--gb-avatar-working);\n  outline-offset: 2px;\n}\n.gb-shape-preview-selected {\n  border-color: var(--gb-avatar-border);\n  background: var(--dsw-alias-interactive-bg-hover, rgba(127, 127, 127, 0.12));\n}\n\n/* --------------------------------------------------------------------------\n   5. Reduced motion \u2014 settle every avatar into a still pose\n   -------------------------------------------------------------------------- */\n\n@media (prefers-reduced-motion: reduce) {\n  /* `!important` because activity-specific tracks are more specific than this\n     accessibility override; reduced motion must always win. */\n  .rakazo-logo-avatar[data-motion] .logo-avatar-body,\n  .rakazo-logo-avatar[data-motion] .logo-avatar-eye,\n  .rakazo-logo-avatar[data-motion] .logo-avatar-scan,\n  .rakazo-logo-avatar[data-motion] .logo-avatar-action,\n  .rakazo-logo-avatar[data-motion] .logo-avatar-eye-lid,\n  .rakazo-logo-avatar[data-motion] .logo-avatar-hand,\n  .rakazo-logo-avatar[data-motion] .logo-avatar-layer,\n  .logo-avatar-layer[data-entering='true'],\n  .logo-avatar-layer[data-outgoing='true'] {\n    animation: none !important;\n  }\n  .rakazo-logo-avatar[data-motion] .logo-avatar-gaze,\n  .rakazo-logo-avatar[data-motion] .logo-avatar-eye-lid {\n    transition: none !important;\n  }\n\n  .rakazo-bot-avatar-ring,\n  .rakazo-bot-avatar[data-working='true'] .rakazo-bot-avatar-picture {\n    animation: none !important;\n    transition: none !important;\n  }\n  .rakazo-bot-avatar {\n    transition: none !important;\n  }\n\n  .rakazo-organic-avatar .rakazo-organic-avatar-body,\n  .rakazo-organic-avatar .rakazo-organic-avatar-eyes {\n    animation: none !important;\n    d: var(--rakazo-organic-path);\n    transition: none !important;\n  }\n}\n";

  // work/plugin/package/src/client/shared/avatar/logo.jsx
  var import_react2 = __toESM(__require("react"), 1);

  // work/plugin/package/src/client/shared/avatar/logo-art.js
  var LOGO_AVATAR_VIEWBOX = "0 0 100 100";
  var LOGO_AVATAR_BODY_Y = 9;
  var LOGO_AVATAR_EYES = {
    width: 10.4,
    height: 16,
    leftCx: 40.5,
    rightCx: 59.5,
    cy: 40
  };
  var BOT_EYE_COLOR = "#101014";
  var LOGO_BODY_PATH = "M-1.759 76.330C0.959 69.782 7.117 63.647 10.602 56.566C14.086 49.486 14.898 41.460 17.063 33.747C19.227 26.034 22.744 18.634 28.465 13.175C34.186 7.716 42.110 4.197 50.032 4.183C57.954 4.169 65.874 7.660 71.581 13.121C77.288 18.582 80.783 26.014 82.945 33.732C85.107 41.449 85.935 49.451 89.402 56.543C92.869 63.634 98.975 69.814 101.767 76.305L108 108H-8Z";
  var LOGO_LEFT_HAND_PATH = "M-2 74C7 68 22 75 26 83C31 93 26 102 19 107H-2Z";
  var LOGO_RIGHT_HAND_PATH = "M102 73C92 68 78 75 74 83C69 93 74 102 81 107H102Z";
  function expandHex(hex) {
    const clean = String(hex || "").replace("#", "");
    if (clean.length === 3) {
      return clean.split("").map((character) => character + character).join("");
    }
    return clean;
  }
  function parseRgb(hex) {
    const clean = expandHex(hex);
    const value = Number.parseInt(clean.slice(0, 6) || "ffffff", 16);
    if (!Number.isFinite(value)) return [255, 255, 255];
    return [value >> 16 & 255, value >> 8 & 255, value & 255];
  }
  function relativeLuminance(hex) {
    const rgb = parseRgb(hex).map((channel) => {
      const value = channel / 255;
      return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
  }
  function contrastRatio(a, b) {
    const [high, low] = [relativeLuminance(a), relativeLuminance(b)].sort((x, y) => y - x);
    return (high + 0.05) / (low + 0.05);
  }
  function logoAvatarPaint(hex, originalOrange = false) {
    const full = hex.length === 4 ? `#${[...hex.slice(1)].map((character) => character + character).join("")}` : hex;
    const raw = originalOrange ? "#ff7b08" : full;
    const rgb = [1, 3, 5].map((index) => Number.parseInt(raw.slice(index, index + 2), 16));
    const shade = (factor) => `#${rgb.map(
      (value) => Math.max(0, Math.min(255, Math.round(value * factor))).toString(16).padStart(2, "0")
    ).join("")}`;
    return {
      base: shade(1),
      light: shade(1.12),
      mid: shade(1),
      shadow: shade(0.8),
      edge: shade(0.96),
      deep: shade(0.55),
      flank: originalOrange ? "#c14d08" : shade(0.58),
      contact: originalOrange ? "#961b00" : shade(0.42),
      rim: originalOrange ? "#fff1dc" : `#${rgb.map((value) => Math.round(value + (255 - value) * 0.9).toString(16).padStart(2, "0")).join("")}`
    };
  }
  var LOGO_AVATAR_LIGHTING = {
    body: { cx: "57%", cy: "30%", r: "76%" },
    flank: {
      gradientUnits: "userSpaceOnUse",
      cx: 0,
      cy: 0,
      r: 1,
      gradientTransform: "matrix(45 0 0 44 0 32)"
    },
    crown: {
      gradientUnits: "userSpaceOnUse",
      cx: 0,
      cy: 0,
      r: 1,
      gradientTransform: "matrix(34 0 0 33 57 23.5)",
      peak: 0.28,
      shoulder: 0.12
    },
    leftHand: { cx: "60%", cy: "35%", r: "76%" },
    rightHand: { cx: "40%", cy: "35%", r: "76%" },
    leftContact: {
      gradientUnits: "userSpaceOnUse",
      cx: 0,
      cy: 0,
      r: 1,
      gradientTransform: "matrix(7.5 0 0 17 24.5 91)"
    },
    rightContact: {
      gradientUnits: "userSpaceOnUse",
      cx: 0,
      cy: 0,
      r: 1,
      gradientTransform: "matrix(7.5 0 0 17 75.5 91)"
    },
    rimUpper: {
      gradientUnits: "userSpaceOnUse",
      cx: 0,
      cy: 0,
      r: 1.1,
      gradientTransform: "matrix(35.3494 0 0 45.3948 50.0193 49.4219)"
    },
    rimLeftTrim: {
      gradientUnits: "userSpaceOnUse",
      cx: 0,
      cy: 0,
      r: 1,
      gradientTransform: "matrix(8.4 0 0 10.5 36 19)"
    },
    rimLeft: {
      gradientUnits: "userSpaceOnUse",
      cx: 0,
      cy: 0,
      r: 1.1,
      gradientTransform: "matrix(66.2501 0 0 63.0879 -50 30.676)"
    },
    rimRight: {
      gradientUnits: "userSpaceOnUse",
      cx: 0,
      cy: 0,
      r: 1.1,
      gradientTransform: "matrix(66.2472 0 0 63.3467 150 30.5562)"
    },
    handLight: { leftPeak: 0.15, rightPeak: 0.24, radius: "62%" }
  };
  function botEyeTone(bodyHex) {
    if (contrastRatio(bodyHex, "#FFFFFF") < 2.4) return "dark";
    if (contrastRatio(bodyHex, "#000000") < 2) return "light";
    return "page";
  }
  function logoAvatarEyeInk(bodyColor) {
    if (contrastRatio(bodyColor, BOT_EYE_COLOR) >= 3.5) return BOT_EYE_COLOR;
    return "#F5F5F5";
  }

  // work/plugin/package/src/client/shared/avatar/hooks.js
  var import_react = __require("react");
  var REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
  var gazeTargets = /* @__PURE__ */ new Set();
  var gazeListenerBound = false;
  var gazeFrame = null, gazePoint = null;
  function resetCursorGaze() {
    if (gazeFrame !== null) cancelAnimationFrame(gazeFrame);
    gazeFrame = null; gazePoint = null;
    for (const element of gazeTargets) {
      if (!element.isConnected) {
        gazeTargets.delete(element);
        continue;
      }
      element.style.setProperty("--avatar-gaze-x", "0px");
      element.style.setProperty("--avatar-gaze-y", "0px");
    }
  }
  function resetCursorGazeWhenHidden() {
    if (document.hidden) resetCursorGaze();
  }
  function updateCursorGaze(event) {
  gazePoint = { x: event.clientX, y: event.clientY }
  if (gazeFrame !== null) return
  gazeFrame = requestAnimationFrame(() => {
    gazeFrame = null
    if (!gazePoint) return
    const point = gazePoint
    const updates = []
    for (const element of gazeTargets) {
      if (!element.isConnected) { gazeTargets.delete(element); continue }
      const rect = element.getBoundingClientRect()
      if (!rect.width || !rect.height) continue
      const maxX = Math.min(6.45, rect.width * 0.104)
      const maxY = Math.min(6.45, rect.height * 0.104)
      const dx = Math.max(-maxX, Math.min(maxX, (point.x - rect.left - rect.width / 2) / rect.width * 2 * maxX))
      const dy = Math.max(-maxY, Math.min(maxY, (point.y - rect.top - rect.height / 2) / rect.height * 2 * maxY))
      updates.push([element, dx, dy])
    }
    for (const [element, dx, dy] of updates) {
      element.style.setProperty('--avatar-gaze-x', `${dx}px`)
      element.style.setProperty('--avatar-gaze-y', `${dy}px`)
    }
  })
}

  function useCursorGaze(ref, enabled = true) {
    (0, import_react.useEffect)(() => {
      const element = ref.current;
      if (!enabled || !element || typeof window === "undefined") return void 0;
      gazeTargets.add(element);
      if (!gazeListenerBound) {
        window.addEventListener("pointermove", updateCursorGaze, { passive: true });
        window.addEventListener("blur", resetCursorGaze);
        document.addEventListener("mouseleave", resetCursorGaze);
        document.addEventListener("visibilitychange", resetCursorGazeWhenHidden);
        gazeListenerBound = true;
      }
      return () => {
        gazeTargets.delete(element);
        element.style.removeProperty("--avatar-gaze-x");
        element.style.removeProperty("--avatar-gaze-y");
        if (gazeTargets.size === 0 && gazeListenerBound) {
          window.removeEventListener("pointermove", updateCursorGaze);
          window.removeEventListener("blur", resetCursorGaze);
          document.removeEventListener("mouseleave", resetCursorGaze);
          document.removeEventListener("visibilitychange", resetCursorGazeWhenHidden);
          gazeListenerBound = false;
        }
      };
    }, [ref, enabled]);
  }
  function reducedMotionMedia() {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return null;
    return window.matchMedia(REDUCED_MOTION_QUERY);
  }
  function subscribeReducedMotion(onChange) {
    const media = reducedMotionMedia();
    if (!media) return () => {
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }
  function useReducedMotion() {
    return (0, import_react.useSyncExternalStore)(
      subscribeReducedMotion,
      () => reducedMotionMedia()?.matches ?? false,
      () => false
    );
  }
  var watchers = /* @__PURE__ */ new Map();
  var observer;
  var reducedMotion;
  var visibilityBound = false;
  function notifyVisibility() {
    const reduced = reducedMotion?.matches ?? false;
    const hidden = typeof document !== "undefined" && document.hidden;
    for (const watcher of watchers.values()) {
      watcher.notify(watcher.visible && !hidden, reduced);
    }
  }
  function watch(element, notify) {
    if (!visibilityBound) {
      reducedMotion = reducedMotionMedia();
      reducedMotion?.addEventListener("change", notifyVisibility);
      if (typeof document !== "undefined") {
        document.addEventListener("visibilitychange", notifyVisibility);
      }
      visibilityBound = true;
    }
    if (!observer && typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          const watcher = watchers.get(entry.target);
          if (watcher && watcher.visible !== entry.isIntersecting) {
            watcher.visible = entry.isIntersecting;
            watcher.notify(
              watcher.visible && !document.hidden,
              reducedMotion?.matches ?? false
            );
          }
        }
      });
    }
    watchers.set(element, { visible: true, notify });
    notify(!document.hidden, reducedMotion?.matches ?? false);
    observer?.observe(element);
    return () => {
      observer?.unobserve(element);
      watchers.delete(element);
      if (watchers.size === 0) {
        observer?.disconnect();
        observer = void 0;
        document.removeEventListener("visibilitychange", notifyVisibility);
        reducedMotion?.removeEventListener("change", notifyVisibility);
        reducedMotion = void 0;
        visibilityBound = false;
      }
    };
  }
  function useAvatarMotionVisibility(enabled) {
    const ref = (0, import_react.useRef)(null);
    const [state, setState] = (0, import_react.useState)({ visible: true, reduced: false });
    (0, import_react.useEffect)(() => {
      const element = ref.current;
      if (!enabled || !element) return void 0;
      return watch(
        element,
        (visible, reduced) => setState(
          (previous) => previous.visible === visible && previous.reduced === reduced ? previous : { visible, reduced }
        )
      );
    }, [enabled]);
    return { ref, visible: state.visible, reducedMotion: state.reduced };
  }
  function useLogoAvatarLayers(ref, activity, running, animated) {
    const serial = (0, import_react.useRef)(0);
    const clock = (0, import_react.useRef)(null);
    const knownFades = (0, import_react.useRef)(/* @__PURE__ */ new WeakSet());
    const [layers, setLayers] = (0, import_react.useState)([
      { key: 0, activity, entering: false, outgoing: false, opacity: 1 }
    ]);
    (0, import_react.useLayoutEffect)(() => {
      const element = ref.current;
      if (!element) return;
      const current = layers[layers.length - 1];
      if (current.activity === activity) {
        if (!running && (layers.length > 1 || current.entering)) {
          setLayers([{ ...current, entering: false, outgoing: false, opacity: 1 }]);
        }
        return;
      }
      const key = running ? ++serial.current : current.key;
      const next = { key, activity, entering: running, outgoing: false, opacity: 1 };
      const outgoing = running ? layers.flatMap((layer) => {
        if (layer.outgoing) return [layer];
        const target = element.querySelector(`[data-logo-layer="${layer.key}"]`);
        const opacity = target ? Number(getComputedStyle(target).opacity) : 0;
        return opacity > 0 ? [{ ...layer, entering: false, outgoing: true, opacity }] : [];
      }) : [];
      setLayers([...outgoing, next]);
    }, [activity, layers, ref, running]);
    (0, import_react.useLayoutEffect)(() => {
      const element = ref.current;
      if (!element) return;
      const now = Number(document.timeline?.currentTime ?? 0);
      const previous = clock.current;
      const elapsed = previous ? previous.elapsed + (previous.running ? Math.max(0, now - previous.last) : 0) : 0;
      clock.current = { last: now, elapsed, running };
      if (!animated) return;
      for (const animation of element.getAnimations?.({ subtree: true }) ?? []) {
        if (animation.effect?.getTiming().iterations === Number.POSITIVE_INFINITY) {
          if (running) animation.startTime = now - elapsed;
          else animation.currentTime = elapsed;
        } else if (!knownFades.current.has(animation)) {
          animation.startTime = now;
          knownFades.current.add(animation);
        }
      }
    }, [animated, layers, ref, running]);
    const finish = (0, import_react.useCallback)((key, name) => {
      if (name === "logo-avatar-layer-out") {
        setLayers((previous) => previous.filter((layer) => layer.key !== key));
      }
      if (name === "logo-avatar-layer-in") {
        setLayers(
          (previous) => previous.map((layer) => layer.key === key ? { ...layer, entering: false } : layer)
        );
      }
    }, []);
    return { layers, finish };
  }

  // work/plugin/package/src/client/shared/avatar/model.js
  var BOT_COLOR_LIST = [
    { id: "white", name: "Staff White", hex: "#FFFFFF" },
    { id: "violet", name: "Executive Violet", hex: "#A97EFE", previousHex: "#8B5CF6" },
    { id: "green", name: "Emerald", hex: "#00C972", previousHex: "#10B981" },
    { id: "orange", name: "Forge Orange", hex: "#FF781C", previousHex: "#F97316" },
    { id: "cyan", name: "Cyber Cyan", hex: "#1CC3B0", previousHex: "#06B6D4" },
    { id: "blue", name: "Cobalt Blue", hex: "#2A92FE", previousHex: "#3B82F6" },
    { id: "yellow", name: "Amber Gold", hex: "#FFAF38", previousHex: "#EAB308" },
    { id: "brown", name: "Caramel Bronze", hex: "#A27952", previousHex: "#8D6E63" },
    { id: "red", name: "Crimson Red", hex: "#FF3E51", previousHex: "#EF4444" },
    { id: "magenta", name: "Neon Pink", hex: "#FF5EB1", previousHex: "#EC4899" },
    { id: "gray", name: "Slate Silver", hex: "#94A3B8", previousHex: "#64748B" }
  ];
  var BOT_COLORS = BOT_COLOR_LIST.map((color) => color.hex);
  var DEFAULT_BOT_AVATAR_COLOR = "#A97EFE";
  var DEFAULT_NEW_BOT_AVATAR_SET = "rakazo";
  var BOT_AVATAR_VALUE_MAX_LENGTH = 2e5;
  var SHIPPED_SHAPE_KEYS = [
    "hex",
    "wedge",
    "squircle",
    "tablet",
    "pebble",
    "blob",
    "teardrop",
    "cloud"
  ];
  var SHIPPED_SHAPE_LABELS = {
    hex: "Hex",
    wedge: "Wedge",
    squircle: "Squircle",
    tablet: "Tablet",
    pebble: "Pebble",
    blob: "Blob",
    teardrop: "Teardrop",
    cloud: "Cloud"
  };
  var LEGACY_COLOR_TO_ID = {
    // previous plugin palette ids
    black: "gray",
    brown: "brown",
    red: "red",
    orange: "orange",
    amber: "yellow",
    green: "green",
    teal: "cyan",
    blue: "blue",
    purple: "violet",
    pink: "magenta",
    gray: "gray",
    cream: "white",
    white: "white",
    // xAI/Grok-era ids used by older docs
    violet: "violet",
    mint: "green",
    gold: "yellow",
    yellow: "yellow",
    rose: "magenta",
    cyan: "cyan",
    slate: "gray"
  };
  var LEGACY_HEX_TO_ID = {
    "#0a0a0a": "gray",
    "#8b5e3c": "brown",
    "#f03e3e": "red",
    "#ff6b00": "orange",
    "#ffb703": "yellow",
    "#2bb673": "green",
    "#12b5a5": "cyan",
    "#2d8cff": "blue",
    "#8b5cf6": "violet",
    "#ff3d8b": "magenta",
    "#9aa0a6": "gray",
    "#e8e0d0": "white",
    // palette previousHex values
    "#10b981": "green",
    "#f97316": "orange",
    "#06b6d4": "cyan",
    "#3b82f6": "blue",
    "#eab308": "yellow",
    "#8d6e63": "brown",
    "#ef4444": "red",
    "#ec4899": "magenta",
    "#64748b": "gray"
  };
  var LEGACY_SHAPE_TO_KEY = {
    circle: "squircle",
    capsule: "tablet",
    triangle: "wedge",
    hexagon: "hex",
    droplet: "teardrop",
    pebble: "pebble",
    squircle: "squircle",
    cloud: "cloud",
    blob: "blob",
    hex: "hex",
    wedge: "wedge",
    tablet: "tablet",
    teardrop: "teardrop"
  };
  function resolveBotAvatarSet(value) {
    return value === "organic" ? "organic" : value === "rakazo" ? "rakazo" : DEFAULT_NEW_BOT_AVATAR_SET;
  }
  function shippedHash(value) {
    let hash = 2166136261;
    const text = String(value ?? "");
    for (let index = 0; index < text.length; index += 1) {
      hash = Math.imul(hash ^ text.charCodeAt(index), 16777619);
    }
    return hash >>> 0;
  }
  function shippedRandom(seed) {
    let value = seed >>> 0;
    return () => {
      value = value + 1831565813 | 0;
      let next = Math.imul(value ^ value >>> 15, 1 | value);
      next = next + Math.imul(next ^ next >>> 7, 61 | next) ^ next;
      return ((next ^ next >>> 14) >>> 0) / 4294967296;
    };
  }
  var HEX_COLOR = /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
  var SHAPE_SUFFIX = /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})::shape_\d+$/;
  var DATA_IMAGE = /^data:image\/(?:png|jpeg|webp|gif);base64,[A-Za-z0-9+/]+={0,2}$/;
  function parseBotAvatarValue(raw) {
    const value = typeof raw === "string" ? raw : "";
    if (value.startsWith("data:image/")) return { kind: "image", imageUrl: value };
    if (value.includes("::shape_")) {
      const parts = value.split("::shape_");
      const color = parts[0] || DEFAULT_BOT_AVATAR_COLOR;
      const rawShape = parts[1] ?? "0";
      const parsedShape = /^\d+$/.test(rawShape) ? Number(rawShape) : 0;
      return {
        kind: "shape",
        color,
        shapeIndex: Number.isSafeInteger(parsedShape) ? parsedShape % SHIPPED_SHAPE_KEYS.length : 0
      };
    }
    if (HEX_COLOR.test(value)) return { kind: "color", color: value };
    return { kind: "other", raw: value };
  }
  function isBotAvatarValue(raw) {
    if (typeof raw !== "string" || !raw || raw.length > BOT_AVATAR_VALUE_MAX_LENGTH) return false;
    return HEX_COLOR.test(raw) || SHAPE_SUFFIX.test(raw) || DATA_IMAGE.test(raw);
  }
  function normalizeHexColor(raw) {
    if (typeof raw !== "string") return "";
    const value = raw.trim();
    if (!HEX_COLOR.test(value)) return "";
    return `#${expandHex2(value).toUpperCase()}`;
  }
  function expandHex2(hex) {
    const clean = hex.replace("#", "");
    if (clean.length === 3) return clean.split("").map((c) => c + c).join("");
    return clean;
  }
  function shapeAvatarValue(color, shapeIndex) {
    const count = SHIPPED_SHAPE_KEYS.length;
    const index = Number.isFinite(shapeIndex) ? (Math.trunc(shapeIndex) % count + count) % count : 0;
    return `${normalizeHexColor(color) || DEFAULT_BOT_AVATAR_COLOR}::shape_${index}`;
  }
  function resolvePersonaColorDef(identity, explicitColor) {
    if (explicitColor) {
      const clean = String(explicitColor).trim().toLowerCase();
      const byId = BOT_COLOR_LIST.find((c) => c.id === clean || c.name.toLowerCase() === clean);
      if (byId) return byId;
      const byHex = BOT_COLOR_LIST.find(
        (c) => c.hex.toLowerCase() === clean || c.previousHex && c.previousHex.toLowerCase() === clean
      );
      if (byHex) return byHex;
      const normalized = normalizeHexColor(explicitColor);
      if (normalized) return { id: "custom", name: "Custom", hex: normalized };
    }
    const seed = (shippedHash(identity) ^ Math.imul(1, 2654435769)) >>> 0;
    const index = Math.floor(shippedRandom((seed ^ 2654435769) >>> 0)() * BOT_COLOR_LIST.length);
    return BOT_COLOR_LIST[index % BOT_COLOR_LIST.length] ?? BOT_COLOR_LIST[0];
  }
  function legacyColorValue(raw) {
    if (typeof raw !== "string" || !raw.trim()) return DEFAULT_BOT_AVATAR_COLOR;
    const clean = raw.trim();
    const byId = LEGACY_COLOR_TO_ID[clean.toLowerCase()];
    if (byId) {
      const def = BOT_COLOR_LIST.find((c) => c.id === byId);
      if (def) return def.hex;
    }
    const byOldHex = LEGACY_HEX_TO_ID[clean.toLowerCase()];
    if (byOldHex) {
      const def = BOT_COLOR_LIST.find((c) => c.id === byOldHex);
      if (def) return def.hex;
    }
    const direct = normalizeHexColor(clean);
    if (direct) {
      const byHex = BOT_COLOR_LIST.find(
        (c) => c.hex.toLowerCase() === direct.toLowerCase() || c.previousHex && c.previousHex.toLowerCase() === direct.toLowerCase()
      );
      return byHex ? byHex.hex : direct;
    }
    const byName = BOT_COLOR_LIST.find((c) => c.name.toLowerCase() === clean.toLowerCase());
    return byName ? byName.hex : DEFAULT_BOT_AVATAR_COLOR;
  }
  function migrateLegacyAvatar(bot) {
    const source = bot && typeof bot === "object" ? bot : {};
    const color = legacyColorValue(source.color);
    const shapeKey = LEGACY_SHAPE_TO_KEY[String(source.shape || "").toLowerCase()];
    const hasNewValue = isBotAvatarValue(source.color);
    const avatarSet = source.avatarSet === "rakazo" || source.avatarSet === "organic" ? source.avatarSet : "organic";
    if (hasNewValue) return { color: source.color, avatarSet: source.avatarSet || avatarSet };
    if (shapeKey) {
      return { color: shapeAvatarValue(color, SHIPPED_SHAPE_KEYS.indexOf(shapeKey)), avatarSet };
    }
    return { color, avatarSet };
  }
  function avatarValueForBot(bot) {
    if (!bot || typeof bot !== "object") return DEFAULT_BOT_AVATAR_COLOR;
    if (isBotAvatarValue(bot.color)) return bot.color;
    return migrateLegacyAvatar(bot).color;
  }
  function seededAvatarLook(seedText) {
    const seed = shippedHash(`avatar-studio/look/v1/${seedText || "new-bot"}`);
    const random = shippedRandom(seed);
    const color = BOT_COLOR_LIST[Math.floor(random() * BOT_COLOR_LIST.length)];
    const shapeIndex = Math.floor(random() * SHIPPED_SHAPE_KEYS.length);
    return {
      color: color ? color.hex : DEFAULT_BOT_AVATAR_COLOR,
      shapeIndex,
      avatarSet: DEFAULT_NEW_BOT_AVATAR_SET
    };
  }

  // work/plugin/package/src/client/shared/avatar/traits.js
  var LOGO_AVATAR_LOOP_MS = 24e3;
  var SLOW_PERIODS = [4e3, 4800, 6e3];
  var WRITING_PERIODS = [1200, 1500, 2e3];
  var LOGO_AVATAR_ACTIVITIES = [
    "idle",
    "working",
    "reading",
    "writing",
    "thinking",
    "waiting",
    "error"
  ];
  function normalizeLogoActivity(activity) {
    if (activity === "computer") return "working";
    return LOGO_AVATAR_ACTIVITIES.includes(activity) ? activity : "idle";
  }
  function isWorkingActivity(activity) {
    const value = normalizeLogoActivity(activity);
    return value === "working" || value === "reading" || value === "writing" || value === "thinking";
  }
  function seededLogoAvatarColor(identity) {
    const random = shippedRandom(shippedHash(`logo-avatar/color/v1/${identity}`));
    return BOT_COLORS[Math.floor(random() * BOT_COLORS.length)] || BOT_COLORS[0];
  }
  function logoAvatarTraits(identity, color) {
    const random = shippedRandom(shippedHash(`logo-avatar/v2/${identity}`));
    const blinkVariant = random() < 0.5 ? "three" : "four";
    const blinkMs = LOGO_AVATAR_LOOP_MS;
    const blinkDelayMs = -Math.round(random() * blinkMs * 1e3) / 1e3;
    const tempo = Math.floor(random() * 3);
    const phase = random();
    const side = random() > 0.5 ? 1 : -1;
    const energy = 0.92 + random() * 0.16;
    const colorDef = resolvePersonaColorDef(identity, color || seededLogoAvatarColor(identity));
    return {
      color: colorDef.hex,
      originalOrange: colorDef.id === "orange",
      blinkMs,
      blinkVariant,
      blinkDelayMs,
      phase,
      side,
      energy,
      periods: {
        idle: LOGO_AVATAR_LOOP_MS,
        working: SLOW_PERIODS[tempo],
        reading: SLOW_PERIODS[tempo],
        writing: WRITING_PERIODS[tempo],
        thinking: 6e3,
        waiting: SLOW_PERIODS[tempo],
        error: SLOW_PERIODS[tempo]
      }
    };
  }
  function avatarIdentitySeed(identity) {
    const text = String(identity ?? "");
    let hash = 0;
    for (let index = 0; index < text.length; index += 1) {
      hash = (hash << 5) - hash + text.charCodeAt(index);
      hash |= 0;
    }
    return Math.abs(hash);
  }
  function organicAvatarEyeTilt(seed) {
    return seed % 9 - 4;
  }
  var ORGANIC_AVATAR_FAMILY_COUNT = 10;
  var ORGANIC_AVATAR_HEART_FAMILY = 6;
  function organicAvatarLook(family) {
    return family === 8 ? 2 : family;
  }
  var ORGANIC_AVATAR_LOOKS = [
    ...new Set(
      Array.from({ length: ORGANIC_AVATAR_FAMILY_COUNT }, (_, family) => family).filter((family) => family !== ORGANIC_AVATAR_HEART_FAMILY).map(organicAvatarLook)
    )
  ];

  // work/plugin/package/src/client/shared/avatar/logo.jsx
  var import_jsx_runtime = __require("react/jsx-runtime");
  var EYES = LOGO_AVATAR_EYES;
  var LogoAvatar = (0, import_react2.memo)(function LogoAvatar2({
    activity = "idle",
    size = 38,
    avatarValue,
    identity,
    label,
    motion = true,
    className = ""
  }) {
    const instanceId = import_react2.default.useId().replace(/[^a-zA-Z0-9_-]/g, "");
    const parsed = (0, import_react2.useMemo)(
      () => avatarValue ? parseBotAvatarValue(avatarValue) : null,
      [avatarValue]
    );
    const traits = (0, import_react2.useMemo)(
      () => logoAvatarTraits(
        identity || (parsed && "color" in parsed ? parsed.color : "default"),
        parsed && "color" in parsed ? parsed.color : void 0
      ),
      [identity, parsed]
    );
    const activityPose = normalizeLogoActivity(activity);
    const canMove = motion && size >= 24;
    const { ref, visible, reducedMotion: reducedMotion2 } = useAvatarMotionVisibility(canMove);
    useCursorGaze(ref, canMove && visible && !reducedMotion2);
    const { layers, finish } = useLogoAvatarLayers(
      ref,
      activityPose,
      canMove && visible && !reducedMotion2,
      canMove
    );
    const eyeInk = logoAvatarEyeInk(traits.color);
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "svg",
      {
        ref,
        viewBox: LOGO_AVATAR_VIEWBOX,
        width: size,
        height: size,
        className: `rakazo-logo-avatar gb-avatar ${className}`.trim(),
        "data-activity": activityPose,
        "data-working": activityPose !== "idle" && activityPose !== "error" ? "true" : "false",
        "data-vector-body": "true",
        "data-motion": canMove ? "true" : "false",
        "data-small": size < 24 ? "true" : "false",
        "data-compact": size <= 38 ? "true" : "false",
        "data-paused": visible && !reducedMotion2 ? "false" : "true",
        "data-color": traits.color,
        role: label ? "img" : void 0,
        "aria-label": label || void 0,
        "aria-hidden": label ? void 0 : "true",
        style: {
          "--logo-task-stroke": Math.max(2.4, 100 / Math.max(1, size)),
          "--logo-blink-name": `logo-avatar-blink-${traits.blinkVariant}`,
          "--logo-blink-duration": `${traits.blinkMs}ms`,
          "--logo-blink-delay": `${traits.blinkDelayMs}ms`,
          "--logo-breathe-duration": `${traits.periods.working}ms`,
          "--logo-hand-duration": `${traits.periods.working * 2}ms`,
          "--logo-side": traits.side
        },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("clipPath", { id: `logo-plate-${instanceId}`, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { width: "100", height: "100", rx: "23" }) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", { id: `logo-eye-${instanceId}`, x2: "0.8", y2: "1", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { stopColor: eyeInk, stopOpacity: "0.8" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "0.35", stopColor: eyeInk }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "1", stopColor: eyeInk })
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { clipPath: `url(#logo-plate-${instanceId})`, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { className: "logo-avatar-plate", width: "100", height: "100", rx: "23" }),
            layers.map((layer) => {
              const period = traits.periods[layer.activity] || traits.periods.idle;
              return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                "g",
                {
                  className: "logo-avatar-layer",
                  "data-logo-layer": layer.key,
                  "data-activity": layer.activity,
                  "data-entering": layer.entering ? "true" : "false",
                  "data-outgoing": layer.outgoing ? "true" : "false",
                  style: {
                    "--logo-move-duration": `${period}ms`,
                    "--logo-move-delay": `${-Math.round(period * traits.phase * 1e3) / 1e3}ms`,
                    "--logo-exit-from": layer.opacity
                  },
                  onAnimationEnd: (event) => {
                    if (event.target === event.currentTarget) {
                      finish(layer.key, event.animationName);
                    }
                  },
                  children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { className: "logo-avatar-body", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { transform: `translate(0 ${LOGO_AVATAR_BODY_Y})`, children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                        LogoAvatarBody,
                        {
                          id: `${instanceId}-${layer.key}`,
                          color: traits.color,
                          originalOrange: traits.originalOrange
                        }
                      ),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", { className: "logo-avatar-gaze", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", { className: "logo-avatar-scan", children: [EYES.leftCx, EYES.rightCx].map((x, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                        "g",
                        {
                          className: `logo-avatar-eye-lid logo-avatar-eye-${index}`,
                          style: { transformOrigin: `${x}px ${EYES.cy}px` },
                          children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                            "g",
                            {
                              className: "logo-avatar-eye",
                              style: { transformOrigin: `${x}px ${EYES.cy}px` },
                              children: [
                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                  "ellipse",
                                  {
                                    cx: x,
                                    cy: EYES.cy,
                                    rx: EYES.width / 2,
                                    ry: EYES.height / 2,
                                    fill: `url(#logo-eye-${instanceId})`
                                  }
                                ),
                                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                                  "ellipse",
                                  {
                                    className: "logo-avatar-glint",
                                    cx: x - 1.2,
                                    cy: EYES.cy - 3.6,
                                    rx: "1.4",
                                    ry: "2.2"
                                  }
                                )
                              ]
                            }
                          )
                        },
                        x
                      )) }) })
                    ] }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogoAvatarTask, { activity: layer.activity, id: `${instanceId}-${layer.key}` })
                  ] })
                },
                layer.key
              );
            })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "rect",
            {
              className: "logo-avatar-outline",
              x: "0.5",
              y: "0.5",
              width: "99",
              height: "99",
              rx: "22.5"
            }
          )
        ]
      }
    );
  });
  function LogoAvatarTask({ activity, id }) {
    if (activity === "reading") {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { className: "logo-avatar-task logo-avatar-book", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("clipPath", { id: `book-pages-${id}`, clipPathUnits: "userSpaceOnUse", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "path",
          {
            className: "logo-avatar-safe-area",
            d: "M26 79Q37 75 47 80V91Q37 87 26 91ZM53 80Q63 75 74 79V91Q63 87 53 91Z",
            fill: "white",
            stroke: "none"
          }
        ) }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "path",
          {
            className: "logo-avatar-task-surface",
            d: "M22 76Q36 71 50 77Q64 71 78 76V96Q64 91 50 97Q36 91 22 96Z"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M50 77V97" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { className: "logo-avatar-task-ink", clipPath: `url(#book-pages-${id})`, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M28 84H43M57 84H72", opacity: "0.8" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { className: "logo-avatar-page-cursor logo-avatar-action logo-avatar-task-detail", d: "M27 81.5H36" })
        ] })
      ] });
    }
    if (activity === "writing") {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { className: "logo-avatar-task logo-avatar-keyboard", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("clipPath", { id: `keyboard-bed-${id}`, clipPathUnits: "userSpaceOnUse", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "rect",
          {
            className: "logo-avatar-safe-area",
            x: "26",
            y: "78",
            width: "48",
            height: "16",
            rx: "1",
            fill: "white",
            stroke: "none"
          }
        ) }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { className: "logo-avatar-task-surface", x: "22", y: "75", width: "56", height: "22", rx: "3" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { className: "logo-avatar-task-ink", clipPath: `url(#keyboard-bed-${id})`, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { className: "logo-avatar-key-left logo-avatar-action", d: "M29 82H35M40 82H46" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { className: "logo-avatar-key-right logo-avatar-action", d: "M54 82H60M65 82H71" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M36 90H64", opacity: "0.85" })
        ] })
      ] });
    }
    return null;
  }
  var LogoAvatarBody = (0, import_react2.memo)(function LogoAvatarBody2({ id, color, originalOrange }) {
    const paint = logoAvatarPaint(color, originalOrange);
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { className: "logo-avatar-art", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("clipPath", { id: `body-clip-${id}`, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: LOGO_BODY_PATH }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("radialGradient", { id: `body-fill-${id}`, ...LOGO_AVATAR_LIGHTING.body, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { stopColor: paint.base }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: ".48", stopColor: paint.base }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "1", stopColor: paint.edge })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("radialGradient", { id: `body-shade-${id}`, ...LOGO_AVATAR_LIGHTING.flank, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { stopColor: paint.flank, stopOpacity: ".94" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: ".4", stopColor: paint.flank, stopOpacity: ".94" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: ".65", stopColor: paint.flank, stopOpacity: ".76" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: ".85", stopColor: paint.flank, stopOpacity: ".22" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "1", stopColor: paint.flank, stopOpacity: "0" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
          "radialGradient",
          {
            id: `body-light-${id}`,
            gradientUnits: LOGO_AVATAR_LIGHTING.crown.gradientUnits,
            cx: LOGO_AVATAR_LIGHTING.crown.cx,
            cy: LOGO_AVATAR_LIGHTING.crown.cy,
            r: LOGO_AVATAR_LIGHTING.crown.r,
            gradientTransform: LOGO_AVATAR_LIGHTING.crown.gradientTransform,
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { stopColor: "white", stopOpacity: LOGO_AVATAR_LIGHTING.crown.peak }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: ".4", stopColor: "white", stopOpacity: LOGO_AVATAR_LIGHTING.crown.shoulder }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "1", stopColor: "white", stopOpacity: "0" })
            ]
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("radialGradient", { id: `hand-left-${id}`, ...LOGO_AVATAR_LIGHTING.leftHand, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { stopColor: paint.base }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: ".28", stopColor: paint.base }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "1", stopColor: paint.shadow })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("radialGradient", { id: `hand-right-${id}`, ...LOGO_AVATAR_LIGHTING.rightHand, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { stopColor: paint.base }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: ".28", stopColor: paint.base }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "1", stopColor: paint.shadow })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("radialGradient", { id: `hand-left-light-${id}`, ...LOGO_AVATAR_LIGHTING.leftHand, r: LOGO_AVATAR_LIGHTING.handLight.radius, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { stopColor: "white", stopOpacity: LOGO_AVATAR_LIGHTING.handLight.leftPeak }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "1", stopColor: "white", stopOpacity: "0" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("radialGradient", { id: `hand-right-light-${id}`, ...LOGO_AVATAR_LIGHTING.rightHand, r: LOGO_AVATAR_LIGHTING.handLight.radius, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { stopColor: "white", stopOpacity: LOGO_AVATAR_LIGHTING.handLight.rightPeak }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "1", stopColor: "white", stopOpacity: "0" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("radialGradient", { id: `hand-left-shadow-${id}`, ...LOGO_AVATAR_LIGHTING.leftContact, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { stopColor: paint.contact, stopOpacity: ".72" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: ".45", stopColor: paint.contact, stopOpacity: ".64" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: ".65", stopColor: paint.contact, stopOpacity: ".3" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: ".9", stopColor: paint.contact, stopOpacity: ".04" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "1", stopColor: paint.contact, stopOpacity: "0" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("radialGradient", { id: `hand-right-shadow-${id}`, ...LOGO_AVATAR_LIGHTING.rightContact, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { stopColor: paint.contact, stopOpacity: ".72" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: ".45", stopColor: paint.contact, stopOpacity: ".64" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: ".65", stopColor: paint.contact, stopOpacity: ".3" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: ".9", stopColor: paint.contact, stopOpacity: ".04" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "1", stopColor: paint.contact, stopOpacity: "0" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", { id: `rim-direction-${id}`, gradientUnits: "userSpaceOnUse", x1: "0", y1: "0", x2: "100", y2: "0", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { stopColor: "white", stopOpacity: ".25" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: ".5", stopColor: "white", stopOpacity: ".72" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "1", stopColor: "white" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", { id: `rim-lower-fade-${id}`, gradientUnits: "userSpaceOnUse", x1: "0", y1: "0", x2: "0", y2: "100", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { stopColor: "white", stopOpacity: "0" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: ".36", stopColor: "white", stopOpacity: "0" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: ".58", stopColor: "white" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "1", stopColor: "white" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", { id: `rim-upper-cut-${id}`, gradientUnits: "userSpaceOnUse", x1: "0", y1: "0", x2: "0", y2: "100", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { stopColor: "black", stopOpacity: "0" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: ".36", stopColor: "black", stopOpacity: "0" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: ".58", stopColor: "black" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "1", stopColor: "black" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
          "mask",
          {
            id: `rim-upper-mask-${id}`,
            maskUnits: "userSpaceOnUse",
            style: { maskType: "luminance" },
            x: "0",
            y: "0",
            width: "100",
            height: "110",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { width: "100", height: "110", fill: `url(#rim-direction-${id})` }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { width: "100", height: "110", fill: `url(#rim-upper-cut-${id})` }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { width: "100", height: "110", fill: `url(#rim-left-trim-${id})` })
            ]
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "mask",
          {
            id: `rim-lower-mask-${id}`,
            maskUnits: "userSpaceOnUse",
            style: { maskType: "luminance" },
            x: "0",
            y: "0",
            width: "100",
            height: "110",
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", { width: "100", height: "110", fill: `url(#rim-lower-fade-${id})` })
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("radialGradient", { id: `rim-left-trim-${id}`, ...LOGO_AVATAR_LIGHTING.rimLeftTrim, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { stopColor: "black", stopOpacity: ".6" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: ".9", stopColor: "black", stopOpacity: ".6" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: ".94", stopColor: "black", stopOpacity: ".5" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: ".965", stopColor: "black", stopOpacity: "0" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "1", stopColor: "black", stopOpacity: "0" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("radialGradient", { id: `rim-upper-${id}`, ...LOGO_AVATAR_LIGHTING.rimUpper, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { stopColor: paint.rim, stopOpacity: "0" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: ".818", stopColor: paint.rim, stopOpacity: "0" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: ".855", stopColor: paint.rim, stopOpacity: ".035" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: ".882", stopColor: paint.rim, stopOpacity: ".14" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: ".9", stopColor: paint.rim, stopOpacity: ".42" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: ".918", stopColor: paint.rim, stopOpacity: ".53" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: ".941", stopColor: paint.rim, stopOpacity: ".2" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: ".973", stopColor: paint.rim, stopOpacity: "0" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "1", stopColor: paint.rim, stopOpacity: "0" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("radialGradient", { id: `rim-left-${id}`, ...LOGO_AVATAR_LIGHTING.rimLeft, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { stopColor: paint.rim, stopOpacity: "0" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: ".873", stopColor: paint.rim, stopOpacity: "0" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: ".891", stopColor: paint.rim, stopOpacity: ".22" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: ".912", stopColor: paint.rim, stopOpacity: ".22" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: ".93", stopColor: paint.rim, stopOpacity: ".1" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: ".955", stopColor: paint.rim, stopOpacity: "0" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "1", stopColor: paint.rim, stopOpacity: "0" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("radialGradient", { id: `rim-right-${id}`, ...LOGO_AVATAR_LIGHTING.rimRight, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { stopColor: paint.rim, stopOpacity: "0" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: ".873", stopColor: paint.rim, stopOpacity: "0" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: ".891", stopColor: paint.rim, stopOpacity: ".46" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: ".912", stopColor: paint.rim, stopOpacity: ".46" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: ".93", stopColor: paint.rim, stopOpacity: ".2" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: ".955", stopColor: paint.rim, stopOpacity: "0" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "1", stopColor: paint.rim, stopOpacity: "0" })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: LOGO_BODY_PATH, fill: `url(#body-fill-${id})` }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: LOGO_BODY_PATH, fill: `url(#body-shade-${id})` }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: LOGO_BODY_PATH, fill: `url(#body-light-${id})` }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { clipPath: `url(#body-clip-${id})`, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: LOGO_BODY_PATH, fill: `url(#rim-upper-${id})`, mask: `url(#rim-upper-mask-${id})` }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { mask: `url(#rim-lower-mask-${id})`, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: LOGO_BODY_PATH, fill: `url(#rim-left-${id})` }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: LOGO_BODY_PATH, fill: `url(#rim-right-${id})` })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: LOGO_BODY_PATH, fill: `url(#hand-left-shadow-${id})` }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: LOGO_BODY_PATH, fill: `url(#hand-right-shadow-${id})` }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { className: "logo-avatar-hand logo-avatar-hand-left", style: { transformOrigin: "24px 82px" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: LOGO_LEFT_HAND_PATH, fill: `url(#hand-left-${id})` }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: LOGO_LEFT_HAND_PATH, fill: `url(#hand-left-light-${id})` })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { className: "logo-avatar-hand logo-avatar-hand-right", style: { transformOrigin: "76px 82px" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: LOGO_RIGHT_HAND_PATH, fill: `url(#hand-right-${id})` }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: LOGO_RIGHT_HAND_PATH, fill: `url(#hand-right-light-${id})` })
        ] })
      ] })
    ] });
  });

  // work/plugin/package/src/client/shared/avatar/organic.jsx
  var import_react3 = __toESM(__require("react"), 1);

  // work/plugin/package/src/client/shared/avatar/organic-path.js
  var SHIPPED_BOT_AVATAR_VIEWBOX = "-15 -15 259 259";
  var SHIPPED_BOT_AVATAR_CENTER = 114.2705;
  var SHIPPED_BOT_AVATAR_EYES = {
    width: 15,
    height: 52,
    leftCx: SHIPPED_BOT_AVATAR_CENTER - 22.5,
    rightCx: SHIPPED_BOT_AVATAR_CENTER + 22.5,
    cy: SHIPPED_BOT_AVATAR_CENTER - 8
  };
  var SHIPPED_SHAPE_KEYS2 = [
    "hex",
    "wedge",
    "squircle",
    "tablet",
    "pebble",
    "blob",
    "teardrop",
    "cloud"
  ];
  var SHIPPED_BOT_AVATAR_SHAPES = {
    blob: "M228.541 114.228C228.541 130.133 225.184 145.994 218.738 160.534C212.674 174.217 203.904 186.669 193.065 196.988C155.933 232.34 99.497 238.596 55.5255 212.24C45.097 205.99 35.6851 198.072 27.7451 188.866C19.1926 178.953 12.3686 167.569 7.65781 155.351C2.60712 142.264 0 128.257 0 114.228C0 98.3219 3.35751 82.4611 9.80315 67.9215C15.8672 54.2382 24.6377 41.7862 35.4767 31.4668C72.6081 -3.88483 129.044 -10.1413 173.016 16.2153C183.444 22.4653 192.856 30.3829 200.796 39.5896C209.349 49.5018 216.173 60.8859 220.883 73.1037C225.934 86.1906 228.541 100.198 228.541 114.228Z",
    pebble: "M228.11 115.24C228.26 117.02 228.36 118.81 228.42 120.6C228.49 122.4 228.51 124.19 228.48 126C228.46 127.8 228.39 129.6 228.27 131.41C228.16 133.22 228 135.02 227.78 136.83C227.58 138.64 227.32 140.45 227.01 142.24C226.71 144.04 226.34 145.84 225.93 147.62C225.53 149.41 225.07 151.19 224.56 152.95C224.05 154.72 223.49 156.47 222.87 158.21C222.26 159.95 221.59 161.67 220.87 163.38C220.15 165.08 219.38 166.77 218.56 168.43C217.72 170.09 216.85 171.73 215.92 173.34C214.99 174.95 214.01 176.53 212.98 178.08C211.95 179.63 210.87 181.15 209.73 182.63C208.61 184.12 207.43 185.57 206.2 186.98C204.98 188.38 203.71 189.75 202.39 191.08C201.08 192.41 199.72 193.69 198.33 194.93C196.93 196.17 195.49 197.36 194.02 198.51C192.55 199.65 191.04 200.75 189.5 201.8C187.96 202.84 186.38 203.84 184.78 204.78C183.18 205.73 181.54 206.62 179.9 207.46C178.24 208.31 176.56 209.1 174.86 209.84C173.17 210.57 171.45 211.25 169.73 211.89C167.99 212.52 166.25 213.1 164.5 213.63C162.74 214.15 160.98 214.63 159.2 215.06C157.43 215.48 155.65 215.86 153.87 216.18C152.08 216.52 150.3 216.79 148.52 217.03C146.74 217.26 144.95 217.45 143.17 217.59C141.4 217.75 139.62 217.85 137.85 217.91C136.09 217.97 134.32 217.99 132.56 217.98C130.81 217.96 129.06 217.91 127.33 217.82C125.58 217.74 123.85 217.61 122.14 217.46C120.42 217.31 118.71 217.12 117.01 216.91C115.32 216.7 113.63 216.46 111.96 216.18C110.27 215.92 108.61 215.63 106.95 215.31C105.3 215 103.65 214.65 102.02 214.29C100.38 213.92 98.76 213.53 97.15 213.13C95.52 212.72 93.92 212.3 92.32 211.85C90.72 211.4 89.13 210.94 87.54 210.45C85.96 209.96 84.38 209.45 82.8 208.93C81.24 208.4 79.67 207.85 78.11 207.29C76.55 206.72 75 206.13 73.44 205.52C71.89 204.92 70.35 204.29 68.8 203.63C67.26 202.98 65.73 202.3 64.2 201.6C62.66 200.9 61.14 200.16 59.63 199.41C58.11 198.66 56.59 197.88 55.09 197.07C53.58 196.26 52.09 195.42 50.59 194.55C49.1 193.69 47.62 192.78 46.16 191.85C44.7 190.92 43.23 189.95 41.79 188.96C40.35 187.95 38.92 186.92 37.52 185.85C36.11 184.78 34.72 183.67 33.35 182.53C31.99 181.39 30.64 180.2 29.32 178.98C28 177.76 26.7 176.5 25.44 175.2C24.17 173.91 22.93 172.57 21.73 171.2C20.54 169.83 19.37 168.42 18.25 166.97C17.12 165.53 16.04 164.05 14.99 162.52C13.96 161.01 12.95 159.45 12.01 157.86C11.05 156.28 10.15 154.66 9.3 153.01C8.46 151.36 7.65 149.68 6.91 147.97C6.17 146.26 5.48 144.53 4.85 142.77C4.22 141.01 3.64 139.24 3.14 137.44C2.63 135.64 2.18 133.82 1.8 131.99C1.41 130.16 1.09 128.3 0.83 126.46C0.57 124.6 0.38 122.73 0.24 120.86C0.12 119 0.05 117.12 0.05 115.24C0.05 113.36 0.12 111.48 0.24 109.62C0.38 107.75 0.57 105.88 0.82 104.02C1.08 102.18 1.39 100.32 1.78 98.49C2.15 96.65 2.59 94.84 3.09 93.03C3.58 91.23 4.14 89.45 4.75 87.68C5.36 85.92 6.02 84.18 6.74 82.46C7.45 80.74 8.22 79.04 9.03 77.38C9.86 75.71 10.72 74.08 11.63 72.46C12.54 70.85 13.49 69.27 14.49 67.72C15.48 66.17 16.52 64.65 17.58 63.15C18.66 61.67 19.76 60.21 20.91 58.79C22.05 57.37 23.23 55.98 24.43 54.62C25.63 53.26 26.87 51.94 28.13 50.64C29.39 49.35 30.68 48.09 31.99 46.86C33.31 45.63 34.64 44.44 36 43.28C37.35 42.11 38.73 40.98 40.12 39.89C41.52 38.79 42.93 37.72 44.36 36.68C45.79 35.64 47.24 34.64 48.71 33.66C50.17 32.69 51.64 31.75 53.13 30.83C54.62 29.92 56.14 29.03 57.65 28.17C59.17 27.32 60.7 26.49 62.25 25.7C63.79 24.89 65.34 24.12 66.92 23.38C68.48 22.64 70.06 21.93 71.66 21.25C73.24 20.57 74.84 19.92 76.46 19.29C78.07 18.67 79.7 18.08 81.33 17.51C82.97 16.96 84.62 16.43 86.27 15.93C87.93 15.42 89.59 14.96 91.27 14.52C92.94 14.09 94.63 13.69 96.32 13.32C98.02 12.96 99.73 12.62 101.43 12.32C103.15 12.02 104.86 11.76 106.59 11.54C108.31 11.31 110.05 11.12 111.78 10.98C113.52 10.82 115.27 10.71 117.01 10.64C118.76 10.58 120.51 10.55 122.26 10.56C124.01 10.57 125.76 10.63 127.52 10.72C129.27 10.82 131.02 10.97 132.77 11.15C134.51 11.33 136.26 11.57 138.01 11.83C139.74 12.1 141.48 12.43 143.2 12.78C144.93 13.15 146.64 13.56 148.35 14.01C150.05 14.46 151.75 14.96 153.42 15.49C155.11 16.04 156.77 16.63 158.43 17.26C160.07 17.89 161.71 18.56 163.32 19.28C164.94 19.99 166.54 20.75 168.11 21.55C169.68 22.36 171.24 23.21 172.76 24.09C174.29 24.98 175.8 25.9 177.27 26.85C178.75 27.82 180.2 28.82 181.62 29.86C183.06 30.89 184.46 31.97 185.82 33.08C187.19 34.18 188.53 35.33 189.84 36.5C191.15 37.67 192.43 38.88 193.67 40.11C194.92 41.35 196.14 42.62 197.32 43.91C198.51 45.21 199.65 46.53 200.78 47.87C201.9 49.22 202.98 50.59 204.04 51.99C205.09 53.38 206.12 54.8 207.1 56.24C208.1 57.68 209.05 59.15 209.98 60.64C210.9 62.12 211.79 63.62 212.65 65.14C213.51 66.67 214.33 68.21 215.12 69.76C215.92 71.33 216.68 72.9 217.4 74.49C218.13 76.08 218.82 77.69 219.48 79.31C220.14 80.93 220.76 82.57 221.35 84.22C221.95 85.87 222.49 87.54 223.02 89.22C223.54 90.9 224.03 92.59 224.48 94.29C224.93 95.99 225.35 97.71 225.72 99.43C226.11 101.16 226.45 102.91 226.76 104.65C227.06 106.4 227.33 108.15 227.55 109.92C227.77 111.69 227.97 113.46 228.11 115.24Z",
    squircle: "M228.49 114.27C228.49 123.33 228.47 135.16 228.43 141.46C228.38 147.76 228.32 148.96 228.22 152.06C228.14 155.17 228.03 157.62 227.9 160.07C227.76 162.51 227.62 164.66 227.44 166.73C227.26 168.8 227.07 170.68 226.85 172.5C226.63 174.33 226.39 176.01 226.12 177.65C225.85 179.28 225.57 180.82 225.27 182.31C224.96 183.8 224.62 185.2 224.26 186.56C223.91 187.93 223.54 189.23 223.13 190.49C222.73 191.74 222.31 192.94 221.86 194.11C221.41 195.27 220.93 196.39 220.44 197.48C219.95 198.56 219.43 199.59 218.88 200.61C218.34 201.61 217.76 202.58 217.18 203.52C216.58 204.46 215.96 205.36 215.31 206.23C214.67 207.11 213.99 207.95 213.29 208.76C212.6 209.57 211.87 210.35 211.11 211.11C210.35 211.87 209.57 212.6 208.76 213.29C207.95 213.99 207.11 214.67 206.23 215.31C205.36 215.96 204.46 216.58 203.52 217.18C202.58 217.76 201.61 218.34 200.61 218.88C199.59 219.43 198.56 219.95 197.48 220.44C196.39 220.93 195.27 221.41 194.11 221.86C192.94 222.31 191.74 222.73 190.49 223.13C189.23 223.54 187.93 223.91 186.56 224.26C185.2 224.62 183.8 224.96 182.31 225.27C180.82 225.57 179.28 225.85 177.65 226.12C176.01 226.39 174.33 226.63 172.5 226.85C170.68 227.07 168.8 227.26 166.73 227.44C164.66 227.62 162.51 227.76 160.07 227.9C157.62 228.03 155.17 228.14 152.06 228.22C148.96 228.32 147.76 228.38 141.46 228.43C135.16 228.47 123.33 228.49 114.27 228.49C105.21 228.49 93.39 228.47 87.08 228.43C80.78 228.38 79.58 228.32 76.48 228.22C73.38 228.14 70.92 228.03 68.48 227.9C66.03 227.76 63.9 227.62 61.81 227.44C59.74 227.26 57.87 227.07 56.04 226.85C54.21 226.63 52.53 226.39 50.89 226.12C49.26 225.85 47.72 225.57 46.24 225.27C44.75 224.96 43.34 224.62 41.98 224.26C40.61 223.91 39.31 223.54 38.06 223.13C36.8 222.73 35.6 222.31 34.43 221.86C33.27 221.41 32.15 220.93 31.07 220.44C29.98 219.95 28.95 219.43 27.93 218.88C26.93 218.34 25.96 217.76 25.02 217.18C24.08 216.58 23.18 215.96 22.31 215.31C21.43 214.67 20.59 213.99 19.78 213.29C18.97 212.6 18.19 211.87 17.43 211.11C16.67 210.35 15.95 209.57 15.25 208.76C14.55 207.95 13.87 207.11 13.23 206.23C12.58 205.36 11.96 204.46 11.37 203.52C10.78 202.58 10.2 201.61 9.66 200.61C9.11 199.59 8.6 198.56 8.1 197.48C7.61 196.39 7.13 195.27 6.69 194.11C6.24 192.94 5.81 191.74 5.41 190.49C5.01 189.23 4.63 187.93 4.28 186.56C3.93 185.2 3.59 183.8 3.28 182.31C2.98 180.82 2.69 179.28 2.42 177.65C2.15 176.01 1.92 174.33 1.69 172.5C1.47 170.68 1.28 168.8 1.1 166.73C0.93 164.66 0.78 162.51 0.64 160.07C0.51 157.62 0.4 155.17 0.32 152.06C0.22 148.96 0.16 147.76 0.11 141.46C0.07 135.16 0.05 123.33 0.05 114.27C0.05 105.21 0.07 93.39 0.11 87.08C0.16 80.78 0.22 79.58 0.32 76.48C0.4 73.38 0.51 70.92 0.64 68.48C0.78 66.03 0.93 63.9 1.1 61.81C1.28 59.74 1.47 57.87 1.69 56.04C1.92 54.21 2.15 52.53 2.42 50.89C2.69 49.26 2.98 47.72 3.28 46.24C3.59 44.75 3.93 43.34 4.28 41.98C4.63 40.61 5.01 39.31 5.41 38.06C5.81 36.8 6.24 35.6 6.69 34.43C7.13 33.27 7.61 32.15 8.1 31.07C8.6 29.98 9.11 28.95 9.66 27.93C10.2 26.93 10.78 25.96 11.37 25.02C11.96 24.08 12.58 23.18 13.23 22.31C13.87 21.43 14.55 20.59 15.25 19.78C15.95 18.97 16.67 18.19 17.43 17.43C18.19 16.67 18.97 15.95 19.78 15.25C20.59 14.55 21.43 13.87 22.31 13.23C23.18 12.58 24.08 11.96 25.02 11.37C25.96 10.78 26.93 10.2 27.93 9.66C28.95 9.11 29.98 8.6 31.07 8.1C32.15 7.61 33.27 7.13 34.43 6.69C35.6 6.24 36.8 5.81 38.06 5.41C39.31 5.01 40.61 4.63 41.98 4.28C43.34 3.93 44.75 3.59 46.24 3.28C47.72 2.98 49.26 2.69 50.89 2.42C52.53 2.15 54.21 1.92 56.04 1.69C57.87 1.47 59.74 1.28 61.81 1.1C63.9 0.93 66.03 0.78 68.48 0.64C70.92 0.51 73.38 0.4 76.48 0.32C79.58 0.22 80.78 0.16 87.08 0.11C93.39 0.07 105.21 0.05 114.27 0.05C123.33 0.05 135.16 0.07 141.46 0.11C147.76 0.16 148.96 0.22 152.06 0.32C155.17 0.4 157.62 0.51 160.07 0.64C162.51 0.78 164.66 0.93 166.73 1.1C168.8 1.28 170.68 1.47 172.5 1.69C174.33 1.92 176.01 2.15 177.65 2.42C179.28 2.69 180.82 2.98 182.31 3.28C183.8 3.59 185.2 3.93 186.56 4.28C187.93 4.63 189.23 5.01 190.49 5.41C191.74 5.81 192.94 6.24 194.11 6.69C195.27 7.13 196.39 7.61 197.48 8.1C198.56 8.6 199.59 9.11 200.61 9.66C201.61 10.2 202.58 10.78 203.52 11.37C204.46 11.96 205.36 12.58 206.23 13.23C207.11 13.87 207.95 14.55 208.76 15.25C209.57 15.95 210.35 16.67 211.11 17.43C211.87 18.19 212.6 18.97 213.29 19.78C213.99 20.59 214.67 21.43 215.31 22.31C215.96 23.18 216.58 24.08 217.18 25.02C217.76 25.96 218.34 26.93 218.88 27.93C219.43 28.95 219.95 29.98 220.44 31.07C220.93 32.15 221.41 33.27 221.86 34.43C222.31 35.6 222.73 36.8 223.13 38.06C223.54 39.31 223.91 40.61 224.26 41.98C224.62 43.34 224.96 44.75 225.27 46.24C225.57 47.72 225.85 49.26 226.12 50.89C226.39 52.53 226.63 54.21 226.85 56.04C227.07 57.87 227.26 59.74 227.44 61.81C227.62 63.9 227.76 66.03 227.9 68.48C228.03 70.92 228.14 73.38 228.22 76.48C228.32 79.58 228.38 80.78 228.43 87.08C228.47 93.39 228.49 105.21 228.49 114.27Z",
    tablet: "M74.27 40.27L154.27 40.27C195.14 40.27 228.27 73.4 228.27 114.27C228.27 155.14 195.14 188.27 154.27 188.27L74.27 188.27C33.4 188.27 0.27 155.14 0.27 114.27C0.27 73.4 33.4 40.27 74.27 40.27Z",
    wedge: "M77.26 42.06Q114.27 -22.05 151.28 42.06L216.15 154.43Q253.17 218.53 179.14 218.53L49.4 218.53Q-24.62 218.53 12.39 154.43Z",
    hex: "M217.73 153.04Q217.73 174 199.58 184.48L132.42 223.25Q114.27 233.73 96.12 223.25L28.96 184.48Q10.81 174 10.81 153.04L10.81 75.5Q10.81 54.54 28.96 44.06L96.12 5.29Q114.27 -5.19 132.42 5.29L199.58 44.06Q217.73 54.54 217.73 75.5Z",
    cloud: "M221.98 112.32C222.74 113.71 223.45 115.15 224.08 116.59C224.71 118.05 225.28 119.52 225.79 121.02C226.29 122.51 226.72 124.03 227.08 125.56C227.44 127.08 227.73 128.62 227.96 130.17C228.18 131.72 228.33 133.28 228.41 134.83C228.5 136.38 228.51 137.94 228.46 139.5C228.41 141.05 228.29 142.6 228.1 144.14C227.91 145.69 227.65 147.22 227.32 148.73C227 150.25 226.61 151.76 226.15 153.23C225.7 154.72 225.17 156.18 224.59 157.61C224 159.04 223.36 160.46 222.65 161.83C221.94 163.21 221.17 164.56 220.34 165.87C219.51 167.17 218.62 168.45 217.69 169.68C216.74 170.91 215.74 172.11 214.7 173.26C213.64 174.41 212.54 175.51 211.4 176.56C210.25 177.62 209.05 178.62 207.81 179.57C206.57 180.52 205.29 181.42 203.96 182.26C202.63 183.09 201.27 183.88 199.87 184.59C198.47 185.31 197.03 185.97 195.56 186.56C194.1 187.16 192.6 187.68 191.08 188.15C189.56 188.61 188.01 189 186.44 189.32C184.86 189.66 183.27 189.91 181.67 190.09C180.06 190.27 178.44 190.38 176.81 190.41C175.18 190.44 173.53 190.4 171.89 190.27C170.24 190.15 168.58 189.95 166.93 189.68C165.28 189.39 163.49 188.79 161.98 188.58C160.48 188.38 159 188.07 157.89 188.47C156.78 188.86 156.18 190.11 155.28 190.91C154.4 191.69 153.48 192.46 152.53 193.19C151.59 193.93 150.62 194.64 149.63 195.33C148.65 196.01 147.63 196.67 146.6 197.29C145.56 197.92 144.51 198.51 143.43 199.08C142.37 199.63 141.28 200.17 140.16 200.67C139.06 201.17 137.94 201.63 136.79 202.07C135.66 202.5 134.5 202.9 133.34 203.27C132.18 203.64 131 203.97 129.81 204.26C128.62 204.55 127.42 204.82 126.22 205.03C125.02 205.26 123.81 205.44 122.59 205.59C121.37 205.73 120.15 205.85 118.93 205.93C117.7 206 116.48 206.04 115.25 206.04C114.02 206.04 112.8 206 111.57 205.93C110.35 205.85 109.13 205.73 107.91 205.59C106.7 205.44 105.48 205.26 104.28 205.03C103.07 204.82 101.87 204.55 100.68 204.26C99.5 203.97 98.32 203.64 97.16 203.27C96 202.9 94.84 202.5 93.7 202.07C92.56 201.63 91.44 201.17 90.33 200.67C89.22 200.17 88.13 199.63 87.06 199.08C85.99 198.51 84.94 197.92 83.9 197.29C82.87 196.67 81.86 196.01 80.87 195.33C79.88 194.64 78.91 193.93 77.97 193.19C77.02 192.46 76.21 191.5 75.21 190.91C74.21 190.3 73.34 189.57 71.98 189.58C70.62 189.59 68.7 190.57 67.06 190.96C65.41 191.35 63.75 191.65 62.09 191.87C60.44 192.1 58.77 192.24 57.12 192.32C55.47 192.39 53.82 192.39 52.18 192.31C50.55 192.23 48.92 192.09 47.31 191.86C45.7 191.65 44.1 191.35 42.53 190.99C40.95 190.63 39.39 190.2 37.86 189.7C36.33 189.21 34.83 188.65 33.35 188.03C31.88 187.4 30.43 186.71 29.03 185.96C27.62 185.2 26.24 184.39 24.92 183.54C23.59 182.67 22.29 181.74 21.04 180.76C19.79 179.79 18.59 178.75 17.43 177.68C16.28 176.6 15.16 175.47 14.11 174.3C13.06 173.13 12.04 171.91 11.09 170.65C10.15 169.39 9.25 168.09 8.41 166.75C7.58 165.43 6.8 164.05 6.08 162.64C5.36 161.25 4.7 159.81 4.1 158.36C3.51 156.9 2.98 155.41 2.51 153.91C2.04 152.4 1.64 150.88 1.3 149.34C0.97 147.8 0.7 146.24 0.5 144.68C0.3 143.12 0.17 141.54 0.1 139.97C0.03 138.38 0.03 136.8 0.11 135.22C0.18 133.64 0.33 132.06 0.53 130.49C0.74 128.91 1.02 127.35 1.36 125.8C1.71 124.25 2.12 122.71 2.61 121.18C3.09 119.66 3.64 118.16 4.26 116.68C4.87 115.2 5.56 113.74 6.3 112.32C7.05 110.89 7.86 109.5 8.74 108.13C9.61 106.77 10.56 105.45 11.55 104.16C12.55 102.87 13.61 101.62 14.73 100.42C15.86 99.23 17.04 98.06 18.27 96.96C19.51 95.86 20.8 94.79 22.14 93.8C23.49 92.8 24.89 91.86 26.34 90.98C27.8 90.09 30.02 89.5 30.85 88.52C31.68 87.53 31.25 86.24 31.33 85.05C31.4 83.86 31.28 82.59 31.31 81.35C31.35 80.12 31.42 78.88 31.54 77.64C31.64 76.4 31.79 75.16 31.98 73.93C32.17 72.69 32.39 71.46 32.66 70.24C32.92 69.01 33.22 67.79 33.58 66.58C33.92 65.36 34.3 64.16 34.72 62.97C35.14 61.78 35.59 60.59 36.08 59.43C36.58 58.25 37.11 57.1 37.69 55.96C38.25 54.83 38.86 53.7 39.5 52.6C40.14 51.5 40.82 50.41 41.52 49.35C42.24 48.3 42.99 47.25 43.76 46.24C44.54 45.22 45.35 44.22 46.19 43.26C47.03 42.29 47.91 41.35 48.81 40.45C49.71 39.53 50.64 38.65 51.6 37.8C52.56 36.94 53.55 36.12 54.56 35.33C55.57 34.54 56.61 33.79 57.67 33.06C58.72 32.33 59.81 31.65 60.91 31C62.01 30.33 63.14 29.72 64.28 29.13C65.41 28.56 66.57 28.01 67.74 27.49C68.92 26.98 70.11 26.52 71.31 26.09C72.51 25.66 73.73 25.26 74.95 24.91C76.17 24.54 77.41 24.23 78.65 23.96C79.89 23.68 81.14 23.44 82.39 23.25C83.64 23.05 84.9 22.88 86.16 22.77C87.41 22.65 88.68 22.57 89.92 22.53C91.18 22.49 92.44 22.49 93.69 22.53C94.94 22.57 96.19 22.65 97.43 22.77C98.67 22.88 99.91 23.03 101.14 23.23C102.36 23.42 103.58 23.65 104.78 23.91C105.99 24.17 107.18 24.48 108.37 24.81C109.54 25.14 110.71 25.51 111.85 25.92C113 26.32 114.14 26.76 115.25 27.22C116.36 27.69 117.45 28.2 118.54 28.72C119.61 29.25 120.67 29.81 121.7 30.39C122.73 30.98 123.74 31.59 124.73 32.24C125.71 32.87 126.68 33.54 127.62 34.23C128.55 34.91 129.44 35.75 130.36 36.36C131.28 36.96 132.09 37.8 133.12 37.85C134.17 37.89 135.43 36.99 136.6 36.63C137.77 36.26 138.96 35.93 140.16 35.64C141.36 35.36 142.58 35.12 143.8 34.91C145.02 34.72 146.26 34.56 147.5 34.44C148.74 34.33 149.99 34.26 151.25 34.23C152.5 34.21 153.75 34.22 155.01 34.29C156.26 34.35 157.52 34.46 158.77 34.61C160.02 34.77 161.27 34.96 162.5 35.2C163.74 35.45 164.98 35.74 166.2 36.07C167.42 36.41 168.63 36.78 169.82 37.21C171.02 37.63 172.2 38.08 173.37 38.59C174.54 39.1 175.69 39.65 176.81 40.24C177.93 40.83 179.05 41.46 180.13 42.14C181.21 42.8 182.27 43.51 183.3 44.26C184.34 45.02 185.34 45.81 186.32 46.63C187.3 47.45 188.24 48.31 189.15 49.19C190.07 50.09 190.96 51.02 191.8 51.97C192.65 52.92 193.47 53.92 194.24 54.93C195.01 55.95 195.75 56.99 196.45 58.06C197.16 59.13 197.81 60.23 198.43 61.34C199.05 62.46 199.64 63.6 200.17 64.76C200.71 65.92 201.21 67.1 201.66 68.29C202.11 69.48 202.52 70.7 202.88 71.92C203.25 73.14 203.56 74.38 203.83 75.62C204.11 76.87 204.34 78.13 204.52 79.39C204.7 80.65 204.84 81.91 204.93 83.18C205.02 84.45 205.06 85.72 205.06 86.98C205.06 88.25 204.81 89.57 204.93 90.79C205.03 92.01 204.94 93.22 205.73 94.32C206.53 95.42 208.44 96.29 209.71 97.36C210.98 98.43 212.19 99.55 213.33 100.71C214.48 101.87 215.57 103.09 216.59 104.34C217.62 105.59 218.58 106.89 219.48 108.23C220.38 109.56 221.21 110.92 221.98 112.32Z",
    teardrop: "M125.97 7.2Q114.27 -7.28 102.57 7.2L43.49 80.31C13.46 117.46 17.28 171.51 52.23 204.08C87.17 236.65 141.37 236.65 176.32 204.08C211.26 171.51 215.08 117.46 185.05 80.31Z"
  };
  var FALLBACK_SHAPE_PATH = SHIPPED_BOT_AVATAR_SHAPES.hex || "";
  function shippedBotAvatarShapePath(shapeIndex) {
    const count = SHIPPED_SHAPE_KEYS2.length;
    const normalized = Number.isFinite(shapeIndex) ? (Math.trunc(shapeIndex) % count + count) % count : 0;
    const key = SHIPPED_SHAPE_KEYS2[normalized] || "hex";
    return SHIPPED_BOT_AVATAR_SHAPES[key] || FALLBACK_SHAPE_PATH;
  }
  var ORGANIC_AVATAR_VIEWBOX = "-60 -60 120 120";
  var ORGANIC_AVATAR_EYES = {
    width: 7,
    height: 24,
    leftCx: -10.5,
    rightCx: 10.5,
    cy: 0
  };
  function avatarEyeRects(eyes) {
    return [eyes.leftCx, eyes.rightCx].map((cx) => ({
      x: cx - eyes.width / 2,
      y: eyes.cy - eyes.height / 2,
      width: eyes.width,
      height: eyes.height,
      rx: eyes.width / 2
    }));
  }
  var ORGANIC_AVATAR_TEMPLATES = [
    [
      [-43, 22],
      [-51, 16],
      [-53, 6],
      [-49, -4],
      [-40, -12],
      [-30, -13],
      [-27, -24],
      [-18, -34],
      [-6, -36],
      [4, -32],
      [12, -42],
      [25, -45],
      [37, -38],
      [43, -27],
      [42, -17],
      [51, -11],
      [56, 0],
      [54, 12],
      [46, 20],
      [30, 24],
      [0, 25],
      [-29, 25]
    ],
    [
      [0, -52],
      [12, -35],
      [28, -17],
      [39, 2],
      [42, 21],
      [34, 38],
      [19, 49],
      [0, 52],
      [-19, 49],
      [-34, 38],
      [-42, 21],
      [-39, 2],
      [-28, -17],
      [-12, -35]
    ],
    [
      [-42, -23],
      [-27, -40],
      [-7, -46],
      [14, -40],
      [33, -27],
      [46, -8],
      [46, 14],
      [35, 34],
      [14, 46],
      [-8, 46],
      [-29, 38],
      [-43, 21],
      [-48, 0]
    ],
    Array.from({ length: 40 }, (_, index) => {
      const angle = index / 40 * Math.PI * 2;
      const radius = 44 + Math.cos(angle * 5) * 5;
      return [Math.cos(angle) * radius, Math.sin(angle) * radius];
    }),
    Array.from({ length: 36 }, (_, index) => {
      const angle = index / 36 * Math.PI * 2;
      const radius = 43 + Math.cos(angle * 6) * 7;
      return [Math.cos(angle) * radius, Math.sin(angle) * radius];
    }),
    Array.from({ length: 32 }, (_, index) => {
      const angle = index / 32 * Math.PI * 2;
      const x = Math.cos(angle);
      const y = Math.sin(angle);
      return [
        Math.sign(x) * Math.sqrt(Math.abs(x)) * 46,
        Math.sign(y) * Math.sqrt(Math.abs(y)) * 43
      ];
    }),
    [
      [0, 48],
      [-14, 36],
      [-32, 20],
      [-45, 0],
      [-43, -20],
      [-29, -36],
      [-10, -39],
      [0, -27],
      [10, -39],
      [29, -36],
      [43, -20],
      [45, 0],
      [32, 20],
      [14, 36]
    ],
    [
      [-48, 35],
      [-38, 22],
      [-34, -8],
      [-27, -31],
      [-12, -44],
      [0, -48],
      [12, -44],
      [27, -31],
      [34, -8],
      [38, 22],
      [48, 35],
      [26, 42],
      [0, 44],
      [-26, 42]
    ],
    [
      [-45, -19],
      [-28, -38],
      [-4, -46],
      [22, -41],
      [42, -25],
      [49, -2],
      [42, 23],
      [22, 42],
      [-4, 47],
      [-29, 38],
      [-46, 18],
      [-50, 0]
    ],
    [
      [-50, 0],
      [-45, -20],
      [-30, -38],
      [0, -48],
      [30, -38],
      [45, -20],
      [50, 0],
      [35, 10],
      [18, 12],
      [16, 38],
      [0, 46],
      [-16, 38],
      [-18, 12],
      [-35, 10]
    ]
  ];
  function organicAvatarPath(seed, phaseOffset = 0) {
    const phase = seed % 360 * Math.PI / 180 + phaseOffset;
    const family = seed % ORGANIC_AVATAR_TEMPLATES.length;
    const template = ORGANIC_AVATAR_TEMPLATES[family] || ORGANIC_AVATAR_TEMPLATES[5];
    const xScale = 1 + Math.sin(phase) * 0.035;
    const yScale = 1 + Math.cos(phase) * 0.025;
    const shear = Math.sin(phase * 1.7) * 0.025;
    let points = template.map(([x, y]) => ({ x: x * xScale + y * shear, y: y * yScale }));
    const smoothingPasses = family >= 3 && family <= 5 ? 1 : 2;
    for (let pass = 0; pass < smoothingPasses; pass += 1) {
      points = points.flatMap((point, index) => {
        const next = points[(index + 1) % points.length];
        return [
          { x: point.x * 0.75 + next.x * 0.25, y: point.y * 0.75 + next.y * 0.25 },
          { x: point.x * 0.25 + next.x * 0.75, y: point.y * 0.25 + next.y * 0.75 }
        ];
      });
    }
    const pointCount = points.length;
    const round = (value) => Math.round(value * 100) / 100;
    const first = points[0];
    let path = `M${round(first.x)} ${round(first.y)}`;
    for (let index = 0; index < pointCount; index += 1) {
      const before = points[(index - 1 + pointCount) % pointCount];
      const current = points[index];
      const next = points[(index + 1) % pointCount];
      const after = points[(index + 2) % pointCount];
      path += `C${round(current.x + (next.x - before.x) / 6)} ${round(current.y + (next.y - before.y) / 6)} ${round(next.x - (after.x - current.x) / 6)} ${round(next.y - (after.y - current.y) / 6)} ${round(next.x)} ${round(next.y)}`;
    }
    return `${path}Z`;
  }

  // work/plugin/package/src/client/shared/avatar/organic.jsx
  var import_jsx_runtime2 = __require("react/jsx-runtime");
  function organicEyeFill(color) {
    const tone = botEyeTone(color);
    if (tone === "dark") return BOT_EYE_COLOR;
    if (tone === "light") return "#F5F5F5";
    return "var(--gb-avatar-page-bg, #ffffff)";
  }
  function BarEyes({ eyes, fill }) {
    return avatarEyeRects(eyes).map((rect) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("rect", { ...rect, style: { fill } }, rect.x));
  }
  var OrganicAvatar = (0, import_react3.memo)(function OrganicAvatar2({
    color,
    identity = "",
    shapeIndex,
    size = 36,
    isWorking = false,
    animated = true,
    className = "",
    label
  }) {
    const reducedMotion2 = useReducedMotion();
    const canMove = Boolean(animated) && size >= 24;
    const { ref, visible } = useAvatarMotionVisibility(canMove);
    useCursorGaze(ref, canMove && visible && !reducedMotion2);
    const seed = (0, import_react3.useMemo)(
      () => avatarIdentitySeed(identity || color || "avatar"),
      [identity, color]
    );
    const shipped = shapeIndex !== void 0 && shapeIndex !== null;
    const eyeTilt = organicAvatarEyeTilt(seed);
    const family = seed % 10;
    const eyes = shipped ? SHIPPED_BOT_AVATAR_EYES : ORGANIC_AVATAR_EYES;
    const viewBox = shipped ? SHIPPED_BOT_AVATAR_VIEWBOX : ORGANIC_AVATAR_VIEWBOX;
    const shapeA = (0, import_react3.useMemo)(
      () => shipped ? shippedBotAvatarShapePath(shapeIndex) : organicAvatarPath(seed),
      [shipped, shapeIndex, seed]
    );
    const shapeB = (0, import_react3.useMemo)(
      () => shipped ? null : organicAvatarPath(seed, 0.42),
      [shipped, seed]
    );
    const duration = `${4.8 + seed % 24 / 10}s`;
    const eyeFill = organicEyeFill(color);
    const morphing = canMove && isWorking && Boolean(shapeB) && !reducedMotion2;
    const paused = !visible || reducedMotion2;
    (0, import_react3.useEffect)(() => {
      const element = ref.current;
      if (!element) return;
      if (paused) element.pauseAnimations?.();
      else element.unpauseAnimations?.();
    }, [ref, paused]);
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
      "svg",
      {
        ref,
        viewBox,
        width: size,
        height: size,
        role: label ? "img" : void 0,
        "aria-label": label || void 0,
        "aria-hidden": label ? void 0 : "true",
        className: `rakazo-organic-avatar gb-avatar ${className}`.trim(),
        "data-working": isWorking ? "true" : "false",
        "data-paused": paused ? "true" : "false",
        "data-motion": canMove && !reducedMotion2 ? "true" : "false",
        "data-shape-family": family,
        "data-eye-pattern": seed % 4,
        "data-organic": shipped ? "shipped" : "seeded",
        style: { width: size, height: size, flex: "none" },
        children: [
          ["idle", "working"].map((mode) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            "path",
            {
              className: `rakazo-organic-avatar-body rakazo-organic-avatar-body-${mode}`,
              d: shapeA,
              fill: color,
              style: {
                "--rakazo-organic-path": `path("${shapeA}")`,
                filter: mode === "working" ? `drop-shadow(0 0 ${Math.round(size * 0.16)}px ${color})` : "drop-shadow(0 2px 3px rgba(0,0,0,.34))"
              },
              children: morphing && mode === "working" ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                "animate",
                {
                  attributeName: "d",
                  values: `${shapeA};${shapeB};${shapeA}`,
                  dur: duration,
                  repeatCount: "indefinite"
                }
              ) : null
            },
            mode
          )),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("g", { transform: `rotate(${eyeTilt})`, children: ["idle", "working"].map((mode) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("g", { className: `rakazo-organic-avatar-eyes rakazo-organic-avatar-eyes-${mode}`, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("g", { className: "rakazo-organic-avatar-gaze", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(BarEyes, { eyes, fill: eyeFill }) }) }, mode)) })
        ]
      }
    );
  });

  // work/plugin/package/src/client/shared/avatar/index.jsx
  var import_jsx_runtime3 = __require("react/jsx-runtime");
  function injectAvatarStyles() {
    if (typeof document === "undefined") return;
    const parent = document.head || document.documentElement;
    if (!parent) return;
    let element = document.querySelector("style[data-grokbot-avatar]");
    if (!element) {
      element = document.createElement("style");
      element.setAttribute("data-grokbot-avatar", "");
      parent.appendChild(element);
    }
    if (!element.textContent) element.textContent = avatar_default;
  }
  injectAvatarStyles();
  var WORKING_STATUSES = /* @__PURE__ */ new Set([
    "running",
    "working",
    "busy",
    "queued",
    "active",
    "streaming",
    "composing",
    "waiting",
    "waiting_input",
    "waiting_takeover"
  ]);
  var WAITING_STATUSES = /* @__PURE__ */ new Set(["waiting", "waiting_input", "waiting_takeover", "awaiting_user"]);
  function isWorkingStatus(status) {
    return WORKING_STATUSES.has(String(status || "").toLowerCase());
  }
  function statusToActivity(status) {
    const value = String(status || "").toLowerCase();
    if (value === "failed" || value === "error") return "error";
    if (WAITING_STATUSES.has(value)) return "waiting";
    if (WORKING_STATUSES.has(value)) return "working";
    return "idle";
  }
  var BotAvatar = (0, import_react4.memo)(function BotAvatar2({
    bot,
    color,
    avatarSet,
    identity,
    activity,
    size = 36,
    status,
    animated = true,
    className = "",
    title,
    label
  }) {
    const rawValue = (0, import_react4.useMemo)(() => {
      if (typeof color === "string" && color) return color;
      if (bot && typeof bot === "object") return avatarValueForBot(bot);
      return DEFAULT_BOT_AVATAR_COLOR;
    }, [color, bot]);
    const parsed = (0, import_react4.useMemo)(() => parseBotAvatarValue(rawValue), [rawValue]);
    const valueIdentity = parsed.kind === "color" || parsed.kind === "shape" ? parsed.color : "avatar";
    const effectiveIdentity = identity || bot?.id || bot?.name || valueIdentity;
    const set = resolveBotAvatarSet(avatarSet ?? bot?.avatarSet);
    const pose = activity != null ? normalizeLogoActivity(activity) : statusToActivity(status);
    const working = isWorkingActivity(pose) || isWorkingStatus(status);
    const colorDef = (0, import_react4.useMemo)(
      () => resolvePersonaColorDef(
        effectiveIdentity,
        parsed.kind === "image" ? void 0 : parsed.kind === "other" ? parsed.raw : parsed.color
      ),
      [effectiveIdentity, parsed]
    );
    const accessibleLabel = label || title || (bot?.name ? `${bot.name} avatar` : void 0);
    if (parsed.kind === "image") {
      return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
        "div",
        {
          className: `rakazo-bot-avatar gb-avatar ${className}`.trim(),
          "data-working": working ? "true" : "false",
          "data-avatar-kind": "image",
          style: { width: size, height: size },
          title,
          role: accessibleLabel ? "img" : void 0,
          "aria-label": accessibleLabel,
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "rakazo-bot-avatar-picture", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("img", { src: parsed.imageUrl, alt: "", draggable: false }) }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              "svg",
              {
                className: "rakazo-bot-avatar-ring rakazo-bot-avatar-ring-working",
                style: { inset: -4, width: size + 8, height: size + 8 },
                viewBox: "0 0 48 48",
                fill: "none",
                "aria-hidden": "true",
                children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                  "circle",
                  {
                    cx: "24",
                    cy: "24",
                    r: "22",
                    strokeWidth: "3.2",
                    strokeLinecap: "round",
                    strokeDasharray: "45 80"
                  }
                )
              }
            )
          ]
        }
      );
    }
    if (parsed.kind === "shape") {
      return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        OrganicAvatar,
        {
          color: colorDef.hex,
          identity: effectiveIdentity,
          shapeIndex: parsed.shapeIndex,
          size,
          isWorking: working,
          animated,
          className,
          label: accessibleLabel
        }
      );
    }
    if (set === "rakazo") {
      return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        LogoAvatar,
        {
          activity: pose,
          size,
          avatarValue: colorDef.hex,
          identity: effectiveIdentity,
          label: accessibleLabel,
          motion: animated,
          className
        }
      );
    }
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
      OrganicAvatar,
      {
        color: colorDef.hex,
        identity: effectiveIdentity,
        size,
        isWorking: working,
        animated,
        className,
        label: accessibleLabel
      }
    );
  });
  function StackedMember({ member, size }) {
    const bot = member.bot || null;
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
      BotAvatar,
      {
        bot,
        color: bot ? void 0 : member.color,
        avatarSet: member.avatarSet,
        identity: member.botId ?? member.name,
        activity: member.activity,
        status: member.status,
        size
      }
    );
  }
  var BotAvatarStack = (0, import_react4.memo)(function BotAvatarStack2({
    bots,
    members,
    size = 38,
    className = ""
  }) {
    const list = (0, import_react4.useMemo)(() => {
      if (Array.isArray(members) && members.length) return members;
      if (Array.isArray(bots))
        return bots.map((bot) => ({
          bot,
          botId: bot?.id,
          name: bot?.name,
          status: bot?.status,
          activity: bot?.activity
        }));
      return [];
    }, [bots, members]);
    const first = list[0];
    if (!first) {
      return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        "div",
        {
          className: `rakazo-group-avatar gb-avatar ${className}`.trim(),
          style: { width: size, height: size, flex: "none" },
          "aria-hidden": "true",
          children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
            "svg",
            {
              style: { width: Math.round(size * 0.48), height: Math.round(size * 0.48) },
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "2",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" }),
                /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("circle", { cx: "9", cy: "7", r: "4" }),
                /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("path", { d: "M22 21v-2a4 4 0 0 0-3-3.87" }),
                /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("path", { d: "M16 3.13a4 4 0 0 1 0 7.75" })
              ]
            }
          )
        }
      );
    }
    if (list.length === 1) {
      return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "gb-avatar-stack-single", style: { width: size, height: size, flex: "none" }, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(StackedMember, { member: first, size }) });
    }
    const pair2 = list.length === 2;
    const miniSize = Math.round(size * (pair2 ? 0.65 : 0.54));
    const positions = pair2 ? [
      { top: 0, left: 0 },
      { right: 0, bottom: 0 }
    ] : [
      { top: 0, left: (size - miniSize) / 2 },
      { bottom: 0, left: 0 },
      { right: 0, bottom: 0 }
    ];
    const visibleMembers = list.slice(0, pair2 || list.length === 3 ? list.length : 2);
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
      "div",
      {
        className: `rakazo-group-avatar gb-avatar ${className}`.trim(),
        style: { width: size, height: size, flex: "none" },
        children: [
          visibleMembers.map((member, index) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
            "div",
            {
              className: "gb-avatar-stack-item",
              style: { ...positions[index], zIndex: index + 1 },
              children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(StackedMember, { member, size: miniSize })
            },
            member.botId ?? member.name ?? index
          )),
          list.length > 3 ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
            "div",
            {
              className: "gb-avatar-stack-more",
              style: { width: miniSize, height: miniSize, right: 0, bottom: 0 },
              "aria-hidden": "true",
              children: `+${list.length - 2}`
            }
          ) : null
        ]
      }
    );
  });
  var BOT_MASCOT_SHAPES = SHIPPED_SHAPE_KEYS.map(
    (key) => SHIPPED_BOT_AVATAR_SHAPES[key]
  );

  // work/plugin/package/src/client/decorations/index.js
  var BRAND_AVATAR = Object.freeze({
    id: "grokbot-brand",
    name: "dsh",
    color: "#2a92fe",
    avatarSet: "rakazo"
  });
  var LOG_PREFIX2 = "[grokbot-ui/chrome]";
  var BRAND_PRIORITY = -10;
  var h = import_react5.default.createElement;
  function GrokBrandMark(props) {
    const raw = props && typeof props.size === "number" ? props.size : 20;
    const edge = Math.min(48, Math.max(10, raw));
    return h(
      "span",
      { className: "grok-brandmark", style: { width: `${edge}px`, height: `${edge}px` }, "aria-hidden": "true" },
      h(BotAvatar, { bot: BRAND_AVATAR, size: edge, animated: true, label: "dsh" })
    );
  }
  function GrokBrandName() {
    return h("span", { className: "grok-brandname" }, "dsh");
  }
  function registerSeats(ctx) {
    const disposers = [];
    const slots = ctx && ctx.slots;
    if (!slots || typeof slots.inject !== "function" || typeof slots.register !== "function") {
      console.warn(`${LOG_PREFIX2} slot service unavailable; brand decoration skipped`);
      return disposers;
    }
    const seats = [
      {
        key: "sidebar.brand.mark",
        label: "brand mark",
        component: GrokBrandMark,
        options: { name: "sidebar.brand.mark", priority: BRAND_PRIORITY }
      },
      {
        key: "sidebar.brand.name",
        label: "brand name",
        component: GrokBrandName,
        options: { name: "sidebar.brand.name", priority: BRAND_PRIORITY }
      }
    ];
    for (const seat of seats) {
      try {
        const dispose = slots.inject(seat.key, () => slots.register(seat.options, seat.component));
        if (typeof dispose === "function") disposers.push(dispose);
      } catch (error) {
        console.warn(`${LOG_PREFIX2} ${seat.label} slot registration failed`, error);
      }
    }
    return disposers;
  }
  function installChrome(ctx) {
    const disposers = [];
    try {
      const disposeStyle = ctx.effect(() => {
        if (typeof document === "undefined") return () => {
        };
        const style = document.createElement("style");
        style.dataset.grokbotChrome = "minimal";
        style.textContent = chrome_default;
        document.head.appendChild(style);
        return () => {
          style.remove();
        };
      }, `${LOG_PREFIX2}: chrome stylesheet`);
      if (typeof disposeStyle === "function") disposers.push(disposeStyle);
    } catch (error) {
      console.warn(`${LOG_PREFIX2} chrome stylesheet skipped`, error);
    }
    try {
      disposers.push(...registerSeats(ctx));
    } catch (error) {
      console.warn(`${LOG_PREFIX2} seat registration skipped`, error);
    }
    return () => {
      for (let index = disposers.length - 1; index >= 0; index -= 1) {
        try {
          disposers[index]();
        } catch (error) {
          console.warn(`${LOG_PREFIX2} disposer failed`, error);
        }
      }
    };
  }

  // work/plugin/package/src/client/bots/index.jsx
  var import_react20 = __toESM(__require("react"), 1);

  // work/plugin/package/src/client/bots/BotsRoot.jsx
  var import_react12 = __toESM(__require("react"), 1);
  var import_react_dom = __toESM(__require("react-dom"), 1);

  // work/plugin/package/src/client/bots/styles.css
  var styles_default = "/* =========================================================================\n   Grokbot UI \u2014 bot experience styles (Rakazo product language)\n   -------------------------------------------------------------------------\n   Adapted from Rakazo (Apache-2.0), https://github.com/elie222/rakazo:\n   palette / radii / type scale from packages/ui-tokens/src/tokens.css and\n   packages/ui-web/src/styles.css; roster, chat header, message and sheet\n   proportions from apps/web/src/pages/shell/{sidebar,chat,bots}.\n\n   Scoped under .gb-root; no global selectors are emitted. Structural class\n   names used by the JSX are stable (`gb-*`); the values inside them follow the\n   Rakazo design tokens installed by theme/index.js.\n   ========================================================================= */\n\n.gb-root {\n  /* ---- Light. --rk-* comes from the theme layer; the literals are the exact\n     Rakazo web-light values so the surface still looks right without it. */\n  --gb-bg: var(--rk-bg, #ffffff);\n  --gb-surface: var(--rk-dialog, #ffffff);\n  --gb-surface-2: var(--rk-card, #f2f2f2);\n  --gb-elevated: var(--rk-popover, #ffffff);\n  --gb-fg: var(--rk-fg, #1c1c1c);\n  --gb-fg-2: var(--rk-muted-fg, #1c1c1cad);\n  --gb-muted: var(--rk-faint-fg, #1c1c1c8f);\n  --gb-line: var(--rk-border, #1c1c1c1f);\n  --gb-line-strong: var(--rk-input, #1c1c1c3d);\n  --gb-hover: var(--rk-accent, #1c1c1c0f);\n  --gb-hover-strong: var(--rk-sidebar-accent, #1c1c1c14);\n  --gb-accent: var(--rk-link, #0b6dd3);\n  --gb-ring: var(--rk-ring, #1e86fc);\n  --gb-primary: var(--rk-primary, #1c1c1c);\n  --gb-primary-fg: var(--rk-primary-fg, #fcfcfc);\n  --gb-chat-user: var(--rk-chat-user, #1c1c1c);\n  --gb-chat-user-fg: var(--rk-chat-user-fg, #ffffff);\n  --gb-working: var(--rk-status-working, #0b6dd3);\n  --gb-unread: var(--rk-unread, #0b6dd3);\n  --gb-working-dot: var(--rk-working-dot, #10ab61);\n  --gb-danger: var(--rk-destructive, #cd2834);\n  --gb-danger-fill: var(--rk-destructive-fill, #e72e3b);\n  --gb-success: var(--rk-success, #00854a);\n  --gb-danger-bg: color-mix(in srgb, var(--gb-danger) 8%, transparent);\n  --gb-scrim: var(--rk-overlay, #00000080);\n  --gb-shadow:\n    var(--rk-shadow-lg, 0 12px 32px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04));\n  --gb-shadow-sm: var(--rk-shadow-md, 0 4px 12px rgba(0, 0, 0, 0.03), 0 1px 3px rgba(0, 0, 0, 0.04));\n\n  /* Shared shell geometry keeps navigation, header, and content aligned. */\n  --gb-shell-pad: clamp(16px, 2.4vw, 24px);\n  --gb-shell-gap: 16px;\n\n  /* Radius: 12px base with the derived Rakazo steps. */\n  --gb-radius-sm: var(--rk-radius-sm, 8px);\n  --gb-radius-md: var(--rk-radius-md, 10px);\n  --gb-radius-lg: var(--rk-radius-lg, 12px);\n  --gb-radius-xl: var(--rk-radius-xl, 16px);\n  --gb-radius-2xl: var(--rk-radius-2xl, 20px);\n  --gb-radius-pill: 999px;\n\n  /* Type scale. */\n  --gb-font: var(--rk-font-sans, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif);\n  --gb-font-mono: var(--rk-font-mono, ui-monospace, SFMono-Regular, Menlo, monospace);\n  --gb-caption: var(--rk-text-caption, 11px);\n  --gb-caption-lh: var(--rk-text-caption-lh, 16px);\n  --gb-label: var(--rk-text-label, 12px);\n  --gb-label-lh: var(--rk-text-label-lh, 16px);\n  --gb-body-sm: var(--rk-text-body-sm, 13px);\n  --gb-body-sm-lh: var(--rk-text-body-sm-lh, 18px);\n  --gb-body: var(--rk-text-body, 14px);\n  --gb-body-lh: var(--rk-text-body-lh, 20px);\n  --gb-body-lg: var(--rk-text-body-lg, 15px);\n  --gb-body-lg-lh: var(--rk-text-body-lg-lh, 22px);\n  --gb-heading3: var(--rk-text-heading3, 17px);\n  --gb-heading3-lh: var(--rk-text-heading3-lh, 24px);\n  --gb-heading3-ls: var(--rk-text-heading3-ls, -0.008em);\n  --gb-heading2: var(--rk-text-heading2, 22px);\n  --gb-heading2-lh: var(--rk-text-heading2-lh, 28px);\n  --gb-heading2-ls: var(--rk-text-heading2-ls, -0.012em);\n  --gb-heading1: var(--rk-text-heading1, 26px);\n  --gb-heading1-lh: var(--rk-text-heading1-lh, 32px);\n  --gb-heading1-ls: var(--rk-text-heading1-ls, -0.015em);\n  --gb-display: var(--rk-text-display, 32px);\n  --gb-display-lh: var(--rk-text-display-lh, 40px);\n  --gb-display-ls: var(--rk-text-display-ls, -0.02em);\n\n  display: contents;\n  font-family: var(--gb-font);\n  color: var(--gb-fg);\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  text-rendering: optimizeLegibility;\n}\n\n/* ---- Dark: the app's resolved theme attribute always wins. The system\n   fallback only applies when the shell has not marked an explicit light theme. */\n@media (prefers-color-scheme: dark) {\n  body:not([data-ds-light-theme]) .gb-root {\n    --gb-bg: var(--rk-bg, #0a0a0a);\n    --gb-surface: var(--rk-dialog, #161616);\n    --gb-surface-2: var(--rk-card, #232323);\n    --gb-elevated: var(--rk-popover, #232323);\n    --gb-fg: var(--rk-fg, #f5f5f5);\n    --gb-fg-2: var(--rk-muted-fg, #f5f5f5a8);\n    --gb-muted: var(--rk-faint-fg, #f5f5f58a);\n    --gb-line: var(--rk-border, #f5f5f51a);\n    --gb-line-strong: var(--rk-input, #f5f5f538);\n    --gb-hover: var(--rk-accent, #f5f5f51a);\n    --gb-hover-strong: var(--rk-sidebar-accent, #f5f5f514);\n    --gb-accent: var(--rk-link, #4d9bff);\n    --gb-ring: var(--rk-ring, #1884fc);\n    --gb-primary: var(--rk-primary, #f5f5f5);\n    --gb-primary-fg: var(--rk-primary-fg, #121212);\n    --gb-chat-user: var(--rk-chat-user, #3e3e3e);\n    --gb-chat-user-fg: var(--rk-chat-user-fg, #f5f5f5);\n    --gb-working: var(--rk-status-working, #4d9bff);\n    --gb-unread: var(--rk-unread, #4d9bff);\n    --gb-working-dot: var(--rk-working-dot, #0e9f5a);\n    --gb-danger: var(--rk-destructive, #ff6463);\n    --gb-danger-fill: var(--rk-destructive-fill, #cf2b35);\n    --gb-success: var(--rk-success, #00ba69);\n    --gb-scrim: var(--rk-overlay, #000000b2);\n    --gb-shadow:\n      var(--rk-shadow-lg, 0 12px 32px rgba(0, 0, 0, 0.5), 0 2px 8px rgba(0, 0, 0, 0.4));\n    --gb-shadow-sm: var(--rk-shadow-md, 0 4px 12px rgba(0, 0, 0, 0.34), 0 1px 3px rgba(0, 0, 0, 0.4));\n  }\n}\n\nbody[data-ds-dark-theme] .gb-root {\n  --gb-bg: var(--rk-bg, #0a0a0a);\n  --gb-surface: var(--rk-dialog, #161616);\n  --gb-surface-2: var(--rk-card, #232323);\n  --gb-elevated: var(--rk-popover, #232323);\n  --gb-fg: var(--rk-fg, #f5f5f5);\n  --gb-fg-2: var(--rk-muted-fg, #f5f5f5a8);\n  --gb-muted: var(--rk-faint-fg, #f5f5f58a);\n  --gb-line: var(--rk-border, #f5f5f51a);\n  --gb-line-strong: var(--rk-input, #f5f5f538);\n  --gb-hover: var(--rk-accent, #f5f5f51a);\n  --gb-hover-strong: var(--rk-sidebar-accent, #f5f5f514);\n  --gb-accent: var(--rk-link, #4d9bff);\n  --gb-ring: var(--rk-ring, #1884fc);\n  --gb-primary: var(--rk-primary, #f5f5f5);\n  --gb-primary-fg: var(--rk-primary-fg, #121212);\n  --gb-chat-user: var(--rk-chat-user, #3e3e3e);\n  --gb-chat-user-fg: var(--rk-chat-user-fg, #f5f5f5);\n  --gb-working: var(--rk-status-working, #4d9bff);\n  --gb-unread: var(--rk-unread, #4d9bff);\n  --gb-working-dot: var(--rk-working-dot, #0e9f5a);\n  --gb-danger: var(--rk-destructive, #ff6463);\n  --gb-danger-fill: var(--rk-destructive-fill, #cf2b35);\n  --gb-success: var(--rk-success, #00ba69);\n  --gb-scrim: var(--rk-overlay, #000000b2);\n  --gb-shadow:\n    var(--rk-shadow-lg, 0 12px 32px rgba(0, 0, 0, 0.5), 0 2px 8px rgba(0, 0, 0, 0.4));\n  --gb-shadow-sm: var(--rk-shadow-md, 0 4px 12px rgba(0, 0, 0, 0.34), 0 1px 3px rgba(0, 0, 0, 0.4));\n}\n\n/* ------------------------------------------------------------------ base */\n\n.gb-root *,\n.gb-root *::before,\n.gb-root *::after {\n  box-sizing: border-box;\n}\n\n.gb-root button {\n  font-family: inherit;\n}\n\n.gb-root svg {\n  display: block;\n}\n\n.gb-root :focus-visible {\n  outline: 2px solid var(--gb-ring);\n  outline-offset: 2px;\n}\n\n.gb-root ::selection {\n  background: color-mix(in srgb, var(--gb-ring) 22%, transparent);\n  color: var(--gb-fg);\n}\n\n/* -------------------------------------------------------------- launcher */\n\n.gb-launcher {\n  position: fixed;\n  right: 20px;\n  bottom: 20px;\n  z-index: 60;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  height: 44px;\n  padding: 4px 16px 4px 5px;\n  border-radius: var(--gb-radius-pill);\n  border: 1px solid var(--gb-line);\n  background: var(--gb-elevated);\n  color: var(--gb-fg);\n  font-family: var(--gb-font);\n  font-size: var(--gb-body-sm);\n  line-height: var(--gb-body-sm-lh);\n  font-weight: 500;\n  cursor: pointer;\n  box-shadow: var(--gb-shadow);\n  transition: background-color 0.15s ease, transform 0.15s ease, box-shadow 0.15s ease;\n}\n\n.gb-launcher:hover {\n  background: var(--gb-surface-2);\n  transform: translateY(-1px);\n  box-shadow: var(--gb-shadow);\n}\n\n.gb-launcher:active {\n  transform: translateY(0);\n}\n\n.gb-launcher-avatar {\n  display: flex;\n  flex: none;\n  width: 34px;\n  height: 34px;\n  align-items: center;\n  justify-content: center;\n}\n\n.gb-launcher-label {\n  padding-right: 1px;\n}\n\n.gb-launcher-count {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 18px;\n  height: 18px;\n  padding: 0 5px;\n  margin-left: 2px;\n  border-radius: var(--gb-radius-pill);\n  background: var(--gb-hover);\n  color: var(--gb-fg-2);\n  font-size: var(--gb-caption);\n  line-height: 1;\n  font-weight: 600;\n}\n\n.gb-header-left {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  min-width: 0;\n}\n\n.gb-header-left h1 {\n  margin: 0;\n  font-family: var(--gb-font);\n  font-size: var(--gb-heading1);\n  line-height: var(--gb-heading1-lh);\n  letter-spacing: var(--gb-heading1-ls);\n  font-weight: 600;\n  color: var(--gb-fg);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.gb-header-title {\n  display: flex;\n  flex-direction: column;\n  gap: 3px;\n  min-width: 0;\n}\n\n.gb-header-title h1 {\n  font-size: var(--gb-heading2);\n  line-height: var(--gb-heading2-lh);\n  letter-spacing: var(--gb-heading2-ls);\n}\n\n.gb-header-sub {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  color: color-mix(in srgb, var(--gb-fg-2) 115%, var(--gb-fg));\n  font-size: var(--gb-body-sm);\n  line-height: var(--gb-body-sm-lh);\n}\n\n.gb-header-actions {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  flex: none;\n}\n\n.gb-backbtn {\n  border-color: var(--gb-line);\n  background: transparent;\n}\n\n/* ------------------------------------------------------------------- tabs */\n\n.gb-tabs {\n  display: flex;\n  align-items: center;\n  gap: 2px;\n  padding: 3px;\n  border-radius: var(--gb-radius-pill);\n  background: var(--gb-surface-2);\n}\n\n.gb-tab {\n  padding: 6px 14px;\n  border: 0;\n  border-radius: var(--gb-radius-pill);\n  background: transparent;\n  color: var(--gb-fg-2);\n  font-family: inherit;\n  font-size: var(--gb-label);\n  line-height: var(--gb-label-lh);\n  font-weight: 500;\n  cursor: pointer;\n  transition: background-color 0.15s ease, color 0.15s ease, box-shadow 0.15s ease;\n}\n\n.gb-tab:hover {\n  color: var(--gb-fg);\n}\n\n.gb-tab--active {\n  position: relative;\n  background: var(--gb-elevated);\n  color: var(--gb-fg);\n  font-weight: 600;\n  box-shadow: var(--gb-shadow-sm);\n}\n\n.gb-tab--active::after {\n  content: '';\n  position: absolute;\n  right: 18px;\n  bottom: 2px;\n  left: 18px;\n  height: 2px;\n  border-radius: var(--gb-radius-pill);\n  background: var(--gb-accent);\n  opacity: .55;\n}\n\n/* ---------------------------------------------------------------- buttons */\n\n.gb-btn {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 6px;\n  min-height: 34px;\n  padding: 7px 14px;\n  border: 1px solid transparent;\n  border-radius: var(--gb-radius-md);\n  background: transparent;\n  color: var(--gb-fg);\n  font-family: inherit;\n  font-size: var(--gb-body-sm);\n  line-height: var(--gb-body-sm-lh);\n  font-weight: 500;\n  white-space: nowrap;\n  cursor: pointer;\n  transition: background-color 0.15s ease, border-color 0.15s ease, opacity 0.15s ease;\n}\n\n.gb-btn:disabled {\n  opacity: 0.45;\n  cursor: default;\n}\n\n.gb-btn--pill {\n  border-radius: var(--gb-radius-pill);\n  padding: 7px 16px;\n}\n\n.gb-btn--primary {\n  background: var(--gb-primary);\n  border-color: var(--gb-primary);\n  color: var(--gb-primary-fg);\n}\n\n.gb-btn--primary:hover:not(:disabled) {\n  background: var(--rk-primary-hover, #363636);\n  border-color: var(--rk-primary-hover, #363636);\n}\n\nbody[data-ds-dark-theme] .gb-btn--primary:hover:not(:disabled) {\n  background: var(--rk-primary-hover, #dbdbdb);\n  border-color: var(--rk-primary-hover, #dbdbdb);\n}\n\n.gb-btn--secondary {\n  background: transparent;\n  border-color: var(--gb-line);\n  color: var(--gb-fg);\n}\n\n.gb-btn--secondary:hover:not(:disabled) {\n  background: var(--gb-hover);\n  border-color: var(--gb-line);\n}\n\n.gb-btn--ghost {\n  background: transparent;\n  color: var(--gb-fg-2);\n}\n\n.gb-btn--ghost:hover:not(:disabled) {\n  background: var(--gb-hover);\n  color: var(--gb-fg);\n}\n\n.gb-btn--danger {\n  background: var(--gb-danger-fill);\n  border-color: var(--gb-danger-fill);\n  color: #ffffff;\n}\n\n.gb-btn--danger:hover:not(:disabled) {\n  opacity: 0.88;\n}\n\n.gb-btn--sm {\n  min-height: 28px;\n  padding: 4px 10px;\n  border-radius: var(--gb-radius-sm);\n  font-size: var(--gb-label);\n  line-height: var(--gb-label-lh);\n}\n\n.gb-iconbtn {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 30px;\n  height: 30px;\n  flex: none;\n  padding: 0;\n  border: 1px solid transparent;\n  border-radius: var(--gb-radius-sm);\n  background: transparent;\n  color: var(--gb-fg-2);\n  cursor: pointer;\n  transition: background-color 0.15s ease, color 0.15s ease;\n}\n\n.gb-iconbtn:hover {\n  background: var(--gb-hover);\n  color: var(--gb-fg);\n}\n\n.gb-iconbtn--danger:hover {\n  background: var(--gb-danger-bg);\n  color: var(--gb-danger);\n}\n\n/* ---------------------------------------------------------------- content */\n\n.gb-content {\n  grid-column: 2;\n  grid-row: 2;\n  display: flex;\n  flex-direction: column;\n  flex: 1;\n  min-height: 0;\n  padding: var(--gb-shell-gap) var(--gb-shell-pad) 24px;\n  overflow-y: auto;\n}\n\n/* ---------------------------------------------------------------- roster */\n\n.gb-roster {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n\n\n/* ------------------------------------------------------------------ stack */\n\n.gb-stack {\n  display: inline-flex;\n  align-items: center;\n  --gb-stack-ring: var(--gb-bg);\n}\n\n.gb-stack-item {\n  display: inline-flex;\n  margin-left: -10px;\n  border-radius: 50%;\n  box-shadow: 0 0 0 2px var(--gb-stack-ring);\n  line-height: 0;\n}\n\n.gb-stack-item:first-child {\n  margin-left: 0;\n}\n\n.gb-stack-rest {\n  margin-left: 7px;\n  color: var(--gb-fg-2);\n  font-size: var(--gb-caption);\n  line-height: var(--gb-caption-lh);\n  font-weight: 600;\n}\n\n/* ------------------------------------------------------------------ empty */\n\n.gb-empty {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 10px;\n  padding: 76px 20px;\n  text-align: center;\n}\n\n.gb-empty h2 {\n  margin: 8px 0 0;\n  font-size: var(--gb-heading3);\n  line-height: var(--gb-heading3-lh);\n  letter-spacing: var(--gb-heading3-ls);\n  font-weight: 600;\n  color: var(--gb-fg);\n}\n\n.gb-empty p {\n  max-width: 46ch;\n  margin: 0;\n  color: var(--gb-fg-2);\n  font-size: var(--gb-body-sm);\n  line-height: var(--gb-body-sm-lh);\n}\n\n.gb-empty .gb-btn {\n  margin-top: 8px;\n}\n\n.gb-empty-cluster {\n  display: flex;\n  align-items: center;\n  margin-bottom: 4px;\n}\n\n.gb-empty-cluster-item {\n  display: inline-flex;\n  margin-left: -14px;\n  transform: rotate(calc((var(--gb-cluster-index, 0) - 1) * 5deg));\n}\n\n.gb-empty-cluster-item:first-child {\n  margin-left: 0;\n}\n\n.gb-empty-cluster--soft {\n  margin-bottom: 12px;\n}\n\n.gb-empty-mark {\n  display: grid;\n  place-items: center;\n  width: 48px;\n  height: 48px;\n  border-radius: var(--gb-radius-xl);\n  border: 1px solid var(--gb-line);\n  background: var(--gb-surface-2);\n  color: var(--gb-fg-2);\n}\n\n.gb-empty-mark--error {\n  color: var(--gb-danger);\n  border-color: color-mix(in srgb, var(--gb-danger) 30%, transparent);\n  background: var(--gb-danger-bg);\n}\n\n/* ----------------------------------------------------------------- sheets */\n\n.gb-scrim {\n  position: fixed;\n  inset: 0;\n  z-index: 100;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 20px;\n  background: var(--gb-scrim);\n  animation: gb-fade-in 0.14s ease both;\n}\n\n.gb-sheet {\n  position: relative;\n  width: min(560px, 100%);\n  max-height: min(90vh, 880px);\n  overflow-y: auto;\n  padding: 22px 24px;\n  border: 1px solid var(--gb-line);\n  border-radius: var(--gb-radius-2xl);\n  background: var(--gb-surface);\n  color: var(--gb-fg);\n  font-family: var(--gb-font);\n  box-shadow: var(--gb-shadow);\n  scrollbar-width: thin;\n  scrollbar-color: var(--gb-line-strong) transparent;\n  animation: gb-sheet-in 0.16s ease both;\n}\n\n.gb-sheet--editor {\n  width: min(600px, 100%);\n}\n\n.gb-sheet--detail {\n  width: min(520px, 100%);\n}\n\n.gb-sheet--room {\n  width: min(520px, 100%);\n}\n\n.gb-sheet--confirm {\n  width: min(400px, 100%);\n}\n\n/* The footer's Settings affordance (SettingsNotice.jsx): says what is\n * reachable instead of a dead click. */\n.gb-sheet--notice {\n  width: min(480px, 100%);\n}\n\n.gb-sheet--notice .gb-sheet-head h2 {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n\n.gb-notice-body {\n  margin: 0;\n  color: var(--gb-fg-2);\n  font-size: var(--gb-body-sm);\n  line-height: var(--gb-body-sm-lh);\n}\n\n.gb-notice-body strong {\n  color: var(--gb-fg);\n  font-weight: 600;\n}\n\n.gb-notice-list {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n  margin: 14px 0 0;\n  padding-inline-start: 18px;\n  color: var(--gb-fg-2);\n  font-size: var(--gb-caption);\n  line-height: 18px;\n}\n\n.gb-notice-list li::marker {\n  color: var(--gb-muted);\n}\n\n.gb-notice-list kbd {\n  margin-inline-start: 2px;\n  padding: 1px 5px;\n  border: 1px solid var(--gb-line);\n  border-radius: var(--gb-radius-sm);\n  background: var(--gb-hover);\n  color: var(--gb-fg-2);\n  font-family: var(--gb-font);\n  font-size: 10px;\n  font-weight: 500;\n  letter-spacing: 0.02em;\n}\n\n.gb-sheet--notice .gb-sheet-foot {\n  justify-content: flex-end;\n  flex-wrap: wrap;\n}\n\n.gb-sheet-head {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 12px;\n  margin-bottom: 18px;\n}\n\n.gb-sheet-head h2 {\n  margin: 0;\n  font-size: var(--gb-heading2);\n  line-height: var(--gb-heading2-lh);\n  letter-spacing: var(--gb-heading2-ls);\n  font-weight: 600;\n  color: var(--gb-fg);\n}\n\n.gb-sheet-close {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 30px;\n  height: 30px;\n  flex: none;\n  padding: 0;\n  border: 1px solid transparent;\n  border-radius: var(--gb-radius-sm);\n  background: transparent;\n  color: var(--gb-fg-2);\n  cursor: pointer;\n  transition: background-color 0.15s ease, color 0.15s ease;\n}\n\n.gb-sheet-close:hover {\n  background: var(--gb-hover);\n  color: var(--gb-fg);\n}\n\n.gb-sheet--detail > .gb-sheet-close {\n  position: absolute;\n  top: 14px;\n  right: 14px;\n}\n\n.gb-sheet--confirm h2 {\n  margin: 0;\n  font-size: var(--gb-heading3);\n  line-height: var(--gb-heading3-lh);\n  letter-spacing: var(--gb-heading3-ls);\n  font-weight: 600;\n}\n\n.gb-sheet--confirm p {\n  margin: 8px 0 0;\n  color: var(--gb-fg-2);\n  font-size: var(--gb-body-sm);\n  line-height: var(--gb-body-sm-lh);\n}\n\n.gb-sheet-foot {\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  gap: 8px;\n  margin-top: 20px;\n  padding-top: 16px;\n  border-top: 1px solid var(--gb-line);\n}\n\n/* ------------------------------------------------------------------ forms */\n\n.gb-form {\n  display: flex;\n  flex-direction: column;\n  gap: 14px;\n}\n\n.gb-form-row {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 12px;\n}\n\n.gb-field {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n  min-width: 0;\n}\n\n.gb-label {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  color: var(--gb-fg-2);\n  font-size: var(--gb-label);\n  line-height: var(--gb-label-lh);\n  font-weight: 500;\n  letter-spacing: 0;\n}\n\n.gb-input,\n.gb-textarea {\n  width: 100%;\n  min-height: 38px;\n  padding: 8px 12px;\n  border: 1px solid var(--gb-line);\n  border-radius: var(--gb-radius-md);\n  background: transparent;\n  color: var(--gb-fg);\n  font-family: inherit;\n  font-size: var(--gb-body);\n  line-height: var(--gb-body-lh);\n  transition: border-color 0.15s ease, box-shadow 0.15s ease;\n}\n\n.gb-input::placeholder,\n.gb-textarea::placeholder {\n  color: var(--gb-muted);\n}\n\n.gb-input:focus,\n.gb-textarea:focus {\n  outline: none;\n  border-color: var(--gb-ring);\n  box-shadow: 0 0 0 3px color-mix(in srgb, var(--gb-ring) 22%, transparent);\n}\n\n.gb-textarea {\n  resize: vertical;\n  min-height: 96px;\n  max-height: 280px;\n}\n\n.gb-hint {\n  color: var(--gb-muted);\n  font-size: var(--gb-label);\n  line-height: var(--gb-label-lh);\n}\n\n.gb-form-error {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 9px 12px;\n  border: 1px solid color-mix(in srgb, var(--gb-danger) 40%, transparent);\n  border-radius: var(--gb-radius-md);\n  background: var(--gb-danger-bg);\n  color: var(--gb-danger);\n  font-size: var(--gb-body-sm);\n  line-height: var(--gb-body-sm-lh);\n}\n\n/* ------------------------------------------------------------- bot editor */\n\n.gb-editor-preview {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  padding: 14px 16px;\n  border: 1px solid var(--gb-line);\n  border-radius: var(--gb-radius-xl);\n  background: var(--gb-surface-2);\n}\n\n.gb-editor-preview-text {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  min-width: 0;\n}\n\n.gb-editor-preview-text strong {\n  font-size: var(--gb-heading3);\n  line-height: var(--gb-heading3-lh);\n  letter-spacing: var(--gb-heading3-ls);\n  font-weight: 600;\n  color: var(--gb-fg);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.gb-editor-preview-text span {\n  color: var(--gb-fg-2);\n  font-size: var(--gb-body-sm);\n  line-height: var(--gb-body-sm-lh);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.gb-picker {\n  display: flex;\n  flex-direction: column;\n  min-width: 0;\n  margin: 0;\n  padding: 0;\n  border: 0;\n}\n\n.gb-picker legend {\n  padding: 0;\n  margin-bottom: 8px;\n}\n\n.gb-shape-grid,\n.gb-face-grid {\n  display: grid;\n  grid-template-columns: repeat(8, minmax(0, 1fr));\n  gap: 6px;\n}\n\n.gb-tile {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 4px;\n  padding: 8px 2px 6px;\n  border: 1px solid var(--gb-line);\n  border-radius: var(--gb-radius-md);\n  background: transparent;\n  color: var(--gb-fg-2);\n  font-family: inherit;\n  font-size: var(--gb-label);\n  line-height: var(--gb-label-lh);\n  font-weight: 500;\n  cursor: pointer;\n  transition: background-color 0.15s ease, border-color 0.15s ease, color 0.15s ease;\n}\n\n.gb-tile:hover {\n  background: var(--gb-hover);\n}\n\n.gb-tile--active {\n  border-color: var(--gb-fg);\n  background: var(--gb-hover);\n  color: var(--gb-fg);\n}\n\n.gb-tile-label {\n  font-size: var(--gb-caption);\n  line-height: 1;\n  letter-spacing: var(--rk-text-caption-ls, 0.005em);\n  white-space: nowrap;\n}\n\n.gb-color-grid {\n  display: grid;\n  grid-template-columns: repeat(6, 1fr);\n  gap: 8px;\n}\n\n.gb-color {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 4px;\n  padding: 6px 3px 5px;\n  border: 1px solid transparent;\n  border-radius: var(--gb-radius-md);\n  background: transparent;\n  color: var(--gb-fg-2);\n  font-family: inherit;\n  font-size: var(--gb-caption);\n  line-height: 1;\n  font-weight: 500;\n  cursor: pointer;\n  transition: background-color 0.15s ease, border-color 0.15s ease, color 0.15s ease;\n}\n\n.gb-color:hover {\n  background: var(--gb-hover);\n}\n\n.gb-color--active {\n  border-color: var(--gb-fg);\n  background: var(--gb-hover);\n  color: var(--gb-fg);\n}\n\n.gb-color-dot {\n  width: 26px;\n  height: 26px;\n  border-radius: 50%;\n  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.16), inset 0 2px 4px rgba(255, 255, 255, 0.22);\n}\n\n.gb-color--active .gb-color-dot {\n  box-shadow: 0 0 0 2px var(--gb-surface), 0 0 0 3.5px var(--gb-fg),\n    inset 0 0 0 1px rgba(0, 0, 0, 0.16);\n}\n\n.gb-color-label {\n  line-height: 1;\n}\n\n/* ----------------------------------------------------------------- detail */\n\n.gb-detail-head {\n  display: flex;\n  align-items: center;\n  gap: 18px;\n  padding-right: 30px;\n}\n\n.gb-detail-identity {\n  display: flex;\n  flex-direction: column;\n  gap: 3px;\n  min-width: 0;\n}\n\n.gb-detail-identity h2 {\n  margin: 0;\n  font-size: var(--gb-heading2);\n  line-height: var(--gb-heading2-lh);\n  letter-spacing: var(--gb-heading2-ls);\n  font-weight: 600;\n  color: var(--gb-fg);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.gb-detail-title {\n  margin: 0;\n  color: var(--gb-fg-2);\n  font-size: var(--gb-body-sm);\n  line-height: var(--gb-body-sm-lh);\n}\n\n.gb-detail-section {\n  margin-top: 18px;\n  padding-top: 16px;\n  border-top: 1px solid var(--gb-line);\n}\n\n.gb-detail-section .gb-label {\n  margin-bottom: 8px;\n}\n\n.gb-detail-instructions {\n  max-height: 230px;\n  margin: 0;\n  overflow-y: auto;\n  color: var(--gb-fg);\n  font-size: var(--gb-body);\n  line-height: var(--gb-body-lh);\n  white-space: pre-wrap;\n  overflow-wrap: anywhere;\n  scrollbar-width: thin;\n}\n\n.gb-detail-foot {\n  flex-wrap: wrap;\n}\n\n/* ------------------------------------------------------------- room sheet */\n\n.gb-room-preview {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 12px 16px;\n  border: 1px solid var(--gb-line);\n  border-radius: var(--gb-radius-xl);\n  background: var(--gb-surface-2);\n  --gb-stack-ring: var(--gb-surface-2);\n}\n\n.gb-picklist {\n  display: flex;\n  flex-direction: column;\n  max-height: 260px;\n  overflow-y: auto;\n  border: 1px solid var(--gb-line);\n  border-radius: var(--gb-radius-lg);\n  scrollbar-width: thin;\n}\n\n.gb-pickrow {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 10px 14px;\n  border: 0;\n  border-bottom: 1px solid var(--gb-line);\n  background: transparent;\n  color: var(--gb-fg);\n  font-family: inherit;\n  text-align: left;\n  cursor: pointer;\n  transition: background-color 0.15s ease;\n}\n\n.gb-pickrow:last-child {\n  border-bottom: 0;\n}\n\n.gb-pickrow:hover {\n  background: var(--gb-hover);\n}\n\n.gb-pickrow--active {\n  background: var(--gb-hover);\n}\n\n.gb-pickrow-name {\n  flex: 1;\n  min-width: 0;\n  font-size: var(--gb-body-sm);\n  line-height: var(--gb-body-sm-lh);\n  font-weight: 500;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.gb-pickrow-check {\n  display: grid;\n  place-items: center;\n  width: 20px;\n  height: 20px;\n  flex: none;\n  border: 1px solid var(--gb-line-strong);\n  border-radius: 50%;\n  color: var(--gb-primary-fg);\n}\n\n.gb-pickrow--active .gb-pickrow-check {\n  border-color: var(--gb-primary);\n  background: var(--gb-primary);\n  color: var(--gb-primary-fg);\n}\n\n/* ------------------------------------------------------------------- chat */\n\n.gb-chat {\n  display: flex;\n  flex: 1;\n  flex-direction: column;\n  min-height: 0;\n}\n\n.gb-transcript {\n  display: flex;\n  flex: 1;\n  flex-direction: column;\n  gap: 18px;\n  min-height: 0;\n  overflow-y: auto;\n  padding: 20px 2px 12px;\n  scrollbar-width: thin;\n  scrollbar-color: var(--gb-line-strong) transparent;\n}\n\n.gb-chat-empty {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 8px;\n  max-width: 44ch;\n  margin: auto;\n  padding: 40px 20px;\n  text-align: center;\n}\n\n.gb-chat-empty h3 {\n  margin: 8px 0 0;\n  font-size: var(--gb-heading3);\n  line-height: var(--gb-heading3-lh);\n  letter-spacing: var(--gb-heading3-ls);\n  font-weight: 600;\n  color: var(--gb-fg);\n}\n\n.gb-chat-empty p {\n  margin: 0;\n  color: var(--gb-fg-2);\n  font-size: var(--gb-body-sm);\n  line-height: var(--gb-body-sm-lh);\n}\n\n.gb-msg {\n  display: flex;\n  gap: 10px;\n  max-width: 82%;\n  animation: gb-msg-in 0.16s ease both;\n}\n\n.gb-msg--bot {\n  align-self: flex-start;\n}\n\n.gb-msg--user {\n  align-self: flex-end;\n  justify-content: flex-end;\n}\n\n.gb-msg--system {\n  align-self: center;\n  max-width: 90%;\n  color: var(--gb-faint-fg, var(--gb-muted));\n  font-size: var(--gb-label);\n  line-height: var(--gb-label-lh);\n  text-align: center;\n}\n\n.gb-msg--bot > .gb-avatar,\n.gb-msg--bot > *:first-child {\n  margin-top: 1px;\n  flex: none;\n}\n\n.gb-msg-body {\n  display: flex;\n  flex-direction: column;\n  gap: 3px;\n  min-width: 0;\n}\n\n.gb-msg-name {\n  color: var(--gb-fg-2);\n  font-size: var(--gb-body-sm);\n  line-height: var(--gb-body-sm-lh);\n  font-weight: 600;\n  letter-spacing: -0.008em;\n}\n\n/* Assistant messages are plain text on the page, not a bubble. */\n.gb-msg-text {\n  color: var(--gb-fg);\n  font-size: var(--gb-body-lg);\n  line-height: var(--gb-body-lg-lh);\n  white-space: pre-wrap;\n  overflow-wrap: anywhere;\n}\n\n/* A quiet bubble for neutral content\u2026 */\n.gb-bubble {\n  padding: 12px 18px;\n  border-radius: var(--gb-radius-xl);\n  background: var(--gb-surface-2);\n  color: var(--gb-fg);\n  font-size: var(--gb-body-lg);\n  line-height: var(--gb-body-lg-lh);\n}\n\n/* \u2026but user bubbles are a solid fill: near-black in light, light grey in dark. */\n.gb-bubble.gb-bubble--user {\n  background: var(--gb-chat-user);\n  color: var(--gb-chat-user-fg);\n  white-space: pre-wrap;\n  overflow-wrap: anywhere;\n}\n\n.gb-typing-bubble {\n  display: inline-flex;\n  align-items: center;\n  align-self: flex-start;\n  padding: 12px 16px;\n  border-radius: var(--gb-radius-xl);\n  background: var(--gb-surface-2);\n}\n\n.gb-typing {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n}\n\n.gb-typing i {\n  width: 5px;\n  height: 5px;\n  border-radius: 50%;\n  background: var(--gb-muted);\n  animation: gb-dot 1.2s ease-in-out infinite;\n}\n\n.gb-typing i:nth-child(2) {\n  animation-delay: 0.15s;\n}\n\n.gb-typing i:nth-child(3) {\n  animation-delay: 0.3s;\n}\n\n.gb-chat-error {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  margin: 0 0 10px;\n  padding: 9px 12px;\n  border: 1px solid color-mix(in srgb, var(--gb-danger) 40%, transparent);\n  border-left: 2px solid var(--gb-danger);\n  border-radius: var(--gb-radius-md);\n  background: var(--gb-danger-bg);\n  color: var(--gb-fg);\n  font-size: var(--gb-body-sm);\n  line-height: var(--gb-body-sm-lh);\n}\n\n.gb-chat-error > span {\n  flex: 1;\n  min-width: 0;\n}\n\n/* --------------------------------------------------------------- composer */\n\n.gb-composer {\n  flex: none;\n  padding: 10px 0 18px;\n  background: var(--gb-bg);\n}\n\n.gb-mentions {\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 6px;\n  margin-bottom: 8px;\n}\n\n.gb-mentions-label {\n  color: var(--gb-muted);\n  font-size: var(--gb-caption);\n  line-height: var(--gb-caption-lh);\n  letter-spacing: var(--rk-text-caption-ls, 0.005em);\n  font-weight: 500;\n  text-transform: uppercase;\n}\n\n.gb-mention {\n  padding: 3px 10px;\n  border: 1px solid var(--gb-line);\n  border-radius: var(--gb-radius-pill);\n  background: transparent;\n  color: var(--gb-fg-2);\n  font-family: inherit;\n  font-size: var(--gb-label);\n  line-height: var(--gb-label-lh);\n  font-weight: 500;\n  cursor: pointer;\n  transition: background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease;\n}\n\n.gb-mention:hover {\n  border-color: var(--gb-line);\n  background: var(--gb-hover);\n  color: var(--gb-fg);\n}\n\n/* Flat pill composer, like Rakazo's: a soft fill, no double border. */\n.gb-composer-pill {\n  display: flex;\n  align-items: flex-end;\n  gap: 8px;\n  padding: 6px 6px 6px 16px;\n  border: 1px solid transparent;\n  border-radius: var(--gb-radius-2xl);\n  background: var(--gb-surface-2);\n  transition: background-color 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease;\n}\n\n.gb-composer-pill:hover {\n  border-color: var(--gb-line);\n}\n\n.gb-composer-pill:focus-within {\n  background: var(--gb-surface);\n  border-color: var(--gb-line);\n  box-shadow: 0 0 0 2px color-mix(in srgb, var(--gb-ring) 30%, transparent);\n}\n\n.gb-composer-input {\n  flex: 1;\n  min-width: 0;\n  min-height: 24px;\n  max-height: 140px;\n  padding: 6px 0;\n  border: 0;\n  background: transparent;\n  color: var(--gb-fg);\n  font-family: inherit;\n  font-size: var(--gb-body-lg);\n  line-height: var(--gb-body-lg-lh);\n  resize: none;\n  overflow-y: auto;\n  scrollbar-width: thin;\n}\n\n.gb-composer-input::placeholder {\n  color: var(--gb-muted);\n}\n\n.gb-composer-input:focus {\n  outline: none;\n}\n\n.gb-send {\n  display: grid;\n  place-items: center;\n  width: 34px;\n  height: 34px;\n  flex: none;\n  padding: 0;\n  border: 0;\n  border-radius: 50%;\n  background: var(--gb-primary);\n  color: var(--gb-primary-fg);\n  cursor: pointer;\n  transition: opacity 0.15s ease;\n}\n\n.gb-send:hover:not(:disabled) {\n  opacity: 0.84;\n}\n\n.gb-send:disabled {\n  opacity: 0.35;\n  cursor: default;\n}\n\n.gb-composer-hint {\n  margin: 8px 2px 0;\n  color: var(--gb-muted);\n  font-size: var(--gb-caption);\n  line-height: var(--gb-caption-lh);\n}\n\n/* ----------------------------------------------------------------- toasts */\n\n.gb-toasts {\n  position: fixed;\n  left: 50%;\n  bottom: 22px;\n  z-index: 130;\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n  width: min(420px, calc(100vw - 32px));\n  transform: translateX(-50%);\n  pointer-events: none;\n}\n\n.gb-toasts--raised {\n  bottom: 104px;\n}\n\n.gb-toast {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  width: 100%;\n  padding: 10px 14px;\n  border: 1px solid transparent;\n  border-radius: var(--gb-radius-lg);\n  background: var(--gb-fg);\n  color: var(--gb-bg);\n  font-size: var(--gb-body-sm);\n  line-height: var(--gb-body-sm-lh);\n  box-shadow: var(--gb-shadow);\n  pointer-events: auto;\n  animation: gb-toast-in 0.15s ease both;\n}\n\n.gb-toast--success > .gb-icon {\n  color: var(--gb-working-dot);\n}\n\n.gb-toast--error > .gb-icon {\n  color: var(--gb-danger);\n}\n\n.gb-toast-text {\n  flex: 1;\n  min-width: 0;\n}\n\n.gb-toast-close {\n  display: grid;\n  place-items: center;\n  width: 22px;\n  height: 22px;\n  flex: none;\n  padding: 0;\n  border: 0;\n  border-radius: 6px;\n  background: transparent;\n  color: inherit;\n  opacity: 0.6;\n  cursor: pointer;\n}\n\n.gb-toast-close:hover {\n  background: var(--gb-hover);\n  opacity: 1;\n}\n\n/* ------------------------------------------------------------ crash / misc */\n\n.gb-crash {\n  position: fixed;\n  right: 20px;\n  bottom: 20px;\n  z-index: 140;\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  max-width: 420px;\n  padding: 12px 16px;\n  border: 1px solid var(--gb-line);\n  border-radius: var(--gb-radius-xl);\n  background: var(--gb-surface);\n  color: var(--gb-fg);\n  font-size: var(--gb-body-sm);\n  line-height: var(--gb-body-sm-lh);\n  box-shadow: var(--gb-shadow);\n}\n\n.gb-crash strong {\n  display: block;\n  font-size: var(--gb-body);\n  line-height: var(--gb-body-lh);\n}\n\n.gb-crash p {\n  margin: 2px 0 0;\n  color: var(--gb-fg-2);\n}\n\n.gb-spinner {\n  display: inline-block;\n  flex: none;\n  border: 2px solid var(--gb-line-strong);\n  border-top-color: currentColor;\n  border-radius: 50%;\n  animation: gb-spin 0.7s linear infinite;\n}\n\n.gb-icon {\n  flex: none;\n}\n\n/* -------------------------------------------------- avatar studio (gb-as-*) */\n\n/* Avatar affordances in the roster, detail sheet and studio preview. */\n.gb-as-trigger,\n.gb-row-avatar-btn,\n.gb-srow-avatar-btn,\n.gb-detail-avatar {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  flex: none;\n  padding: 0;\n  border: 0;\n  border-radius: 50%;\n  background: transparent;\n  color: inherit;\n  cursor: pointer;\n}\n\n.gb-as-trigger-pencil {\n  position: absolute;\n  right: -1px;\n  bottom: -1px;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 18px;\n  height: 18px;\n  border: 1px solid var(--gb-line);\n  border-radius: 50%;\n  background: var(--gb-elevated);\n  color: var(--gb-fg-2);\n  box-shadow: var(--gb-shadow-sm);\n  opacity: 0;\n  transition: opacity 0.15s ease, background-color 0.15s ease, color 0.15s ease;\n}\n\n.gb-as-trigger-pencil--lg {\n  width: 26px;\n  height: 26px;\n  right: 2px;\n  bottom: 2px;\n}\n\n.gb-as-trigger:hover .gb-as-trigger-pencil,\n.gb-as-trigger:focus-visible .gb-as-trigger-pencil,\n.gb-row-avatar-btn:hover .gb-as-trigger-pencil,\n.gb-row-avatar-btn:focus-visible .gb-as-trigger-pencil,\n.gb-srow-avatar-btn:hover .gb-as-trigger-pencil,\n.gb-srow-avatar-btn:focus-visible .gb-as-trigger-pencil,\n.gb-detail-avatar:hover .gb-as-trigger-pencil,\n.gb-detail-avatar:focus-visible .gb-as-trigger-pencil {\n  opacity: 1;\n}\n\n.gb-as-trigger-pencil svg {\n  color: inherit;\n}\n\n.gb-detail-avatar {\n  width: 96px;\n  height: 96px;\n}\n\n.gb-as {\n  display: flex;\n  flex-direction: column;\n  gap: 18px;\n  min-width: 0;\n}\n\n/* Large live preview: avatar on the left, name + status on the right. */\n.gb-as-preview {\n  position: relative;\n  display: flex;\n  align-items: center;\n  gap: 18px;\n  width: 100%;\n  padding: 18px 20px;\n  border-radius: var(--gb-radius-xl);\n  background: var(--gb-surface-2);\n}\n\n.gb-as-preview-btn {\n  position: relative;\n  display: inline-flex;\n  flex: none;\n  align-items: center;\n  justify-content: center;\n  padding: 0;\n  border: 0;\n  border-radius: 50%;\n  background: transparent;\n  cursor: pointer;\n}\n\n.gb-as-preview-pencil {\n  position: absolute;\n  right: -2px;\n  bottom: -2px;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 26px;\n  height: 26px;\n  border: 1px solid var(--gb-line);\n  border-radius: 50%;\n  background: var(--gb-elevated);\n  color: var(--gb-fg-2);\n  box-shadow: var(--gb-shadow-sm);\n  opacity: 0;\n  transition: opacity 0.15s ease, background-color 0.15s ease, color 0.15s ease;\n}\n\n.gb-as-preview-btn:hover .gb-as-preview-pencil,\n.gb-as-preview-btn:focus-visible .gb-as-preview-pencil {\n  opacity: 1;\n}\n\n.gb-as-preview-pencil:hover {\n  background: var(--gb-hover);\n  color: var(--gb-fg);\n}\n\n.gb-as-preview-text {\n  display: flex;\n  flex-direction: column;\n  gap: 3px;\n  min-width: 0;\n}\n\n.gb-as-preview-text strong {\n  color: var(--gb-fg);\n  font-size: var(--gb-heading3);\n  line-height: var(--gb-heading3-lh);\n  letter-spacing: var(--gb-heading3-ls);\n  font-weight: 600;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.gb-as-preview-text span {\n  color: var(--gb-fg-2);\n  font-size: var(--gb-body-sm);\n  line-height: var(--gb-body-sm-lh);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n/* Bot | Upload tabs on the left, Reset on the right. */\n.gb-as-tabbar {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 10px;\n}\n\n.gb-as-tabs,\n.gb-as-tabbar .gb-as-tabs {\n  display: inline-flex;\n  align-items: center;\n  gap: 2px;\n  padding: 3px;\n  border-radius: var(--gb-radius-pill);\n  background: var(--gb-surface-2);\n}\n\n.gb-as-tab {\n  padding: 6px 16px;\n  border: 0;\n  border-radius: var(--gb-radius-pill);\n  background: transparent;\n  color: var(--gb-fg-2);\n  font-family: inherit;\n  font-size: var(--gb-label);\n  line-height: var(--gb-label-lh);\n  font-weight: 500;\n  cursor: pointer;\n  transition: background-color 0.15s ease, color 0.15s ease;\n}\n\n.gb-as-tab:hover {\n  color: var(--gb-fg);\n}\n\n.gb-as-tab--active {\n  background: var(--gb-elevated);\n  color: var(--gb-fg);\n  font-weight: 600;\n  box-shadow: var(--gb-shadow-sm);\n}\n\n.gb-as-reset {\n  padding: 5px 10px;\n  border: 0;\n  border-radius: var(--gb-radius-sm);\n  background: transparent;\n  color: var(--gb-fg-2);\n  font-family: inherit;\n  font-size: var(--gb-label);\n  line-height: var(--gb-label-lh);\n  font-weight: 500;\n  cursor: pointer;\n  transition: background-color 0.15s ease, color 0.15s ease;\n}\n\n.gb-as-reset:hover:not(:disabled) {\n  background: var(--gb-hover);\n  color: var(--gb-fg);\n}\n\n.gb-as-panel {\n  display: flex;\n  flex-direction: column;\n  gap: 18px;\n  min-width: 0;\n}\n\n.gb-as-field {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  min-width: 0;\n}\n\n.gb-as-field-head {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 8px;\n}\n\n.gb-as-label {\n  color: var(--gb-fg-2);\n  font-size: var(--gb-label);\n  line-height: var(--gb-label-lh);\n  font-weight: 500;\n}\n\n.gb-as-default {\n  padding: 3px 10px;\n  border: 1px solid transparent;\n  border-radius: var(--gb-radius-pill);\n  background: transparent;\n  color: var(--gb-fg-2);\n  font-family: inherit;\n  font-size: var(--gb-label);\n  line-height: var(--gb-label-lh);\n  font-weight: 500;\n  cursor: pointer;\n  transition: background-color 0.15s ease, border-color 0.15s ease, color 0.15s ease;\n}\n\n.gb-as-default:hover {\n  background: var(--gb-hover);\n  color: var(--gb-fg);\n}\n\n.gb-as-default--active {\n  border-color: var(--gb-line);\n  background: var(--gb-hover);\n  color: var(--gb-fg);\n}\n\n/* Icon set: a two-stop segmented control. */\n.gb-as-set {\n  display: inline-flex;\n  align-items: center;\n  gap: 2px;\n  align-self: flex-start;\n  padding: 3px;\n  border-radius: var(--gb-radius-pill);\n  background: var(--gb-surface-2);\n}\n\n.gb-as-set-btn {\n  padding: 6px 16px;\n  border: 0;\n  border-radius: var(--gb-radius-pill);\n  background: transparent;\n  color: var(--gb-fg-2);\n  font-family: inherit;\n  font-size: var(--gb-label);\n  line-height: var(--gb-label-lh);\n  font-weight: 500;\n  cursor: pointer;\n  transition: background-color 0.15s ease, color 0.15s ease;\n}\n\n.gb-as-set-btn:hover {\n  color: var(--gb-fg);\n}\n\n.gb-as-set-btn--active {\n  background: var(--gb-elevated);\n  color: var(--gb-fg);\n  font-weight: 600;\n  box-shadow: var(--gb-shadow-sm);\n}\n\n/* Shapes reuse the .gb-tile / .gb-shape-grid look; labels stay caption-sized. */\n.gb-as-shape {\n  padding: 8px 2px 6px;\n}\n\n.gb-as-shape-label {\n  color: inherit;\n}\n\n.gb-as-shape-grid {\n  display: grid;\n  grid-template-columns: repeat(8, minmax(0, 1fr));\n  gap: 6px;\n}\n\n.gb-as-shape--active {\n  border-color: var(--gb-fg);\n  background: var(--gb-hover);\n}\n\n.gb-as-color--active {\n  border-color: var(--gb-fg);\n  background: var(--gb-hover);\n  color: var(--gb-fg);\n}\n\n.gb-as-sheet {\n  width: min(620px, 100%);\n}\n\n/* Colours: 11 Rakazo swatches with names underneath. */\n.gb-as-color-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(58px, 1fr));\n  gap: 6px;\n}\n\n.gb-as-color {\n  border-radius: var(--gb-radius-md);\n}\n\n.gb-as-color-dot {\n  width: 26px;\n  height: 26px;\n}\n\n.gb-as-color-label {\n  max-width: 100%;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  color: var(--gb-fg-2);\n  font-size: var(--gb-caption);\n  line-height: 1.1;\n}\n\n.gb-color--active .gb-as-color-label {\n  color: var(--gb-fg);\n}\n\n/* Upload: a dashed drop target with a choose-file pill. */\n.gb-as-upload {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  width: 100%;\n  min-height: 168px;\n  padding: 24px;\n  border: 1px dashed var(--gb-line-strong);\n  border-radius: var(--gb-radius-xl);\n  background: var(--gb-surface-2);\n  color: var(--gb-fg-2);\n  font-family: inherit;\n  text-align: center;\n  cursor: pointer;\n  transition: background-color 0.15s ease, border-color 0.15s ease;\n}\n\n.gb-as-upload:hover:not(:disabled),\n.gb-as-upload--over {\n  border-color: var(--gb-ring);\n  background: color-mix(in srgb, var(--gb-ring) 7%, var(--gb-surface-2));\n}\n\n.gb-as-upload-icon {\n  display: grid;\n  place-items: center;\n  width: 34px;\n  height: 34px;\n  border-radius: var(--gb-radius-md);\n  background: var(--gb-hover);\n  color: var(--gb-fg-2);\n}\n\n.gb-as-upload-text {\n  margin: 0;\n  color: var(--gb-fg);\n  font-size: var(--gb-body-sm);\n  line-height: var(--gb-body-sm-lh);\n  font-weight: 600;\n}\n\n.gb-as-upload-choose {\n  display: inline-flex;\n  align-items: center;\n  padding: 5px 12px;\n  border: 1px solid var(--gb-line);\n  border-radius: var(--gb-radius-pill);\n  background: var(--gb-elevated);\n  color: var(--gb-fg);\n  font-size: var(--gb-label);\n  line-height: var(--gb-label-lh);\n  font-weight: 500;\n}\n\n.gb-as-hint {\n  margin: 0;\n  color: var(--gb-muted);\n  font-size: var(--gb-label);\n  line-height: var(--gb-label-lh);\n}\n\n.gb-as-file {\n  display: none;\n}\n\n.gb-as-error {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 9px 12px;\n  border: 1px solid color-mix(in srgb, var(--gb-danger) 40%, transparent);\n  border-radius: var(--gb-radius-md);\n  background: var(--gb-danger-bg);\n  color: var(--gb-danger);\n  font-size: var(--gb-body-sm);\n  line-height: var(--gb-body-sm-lh);\n}\n\n.gb-as-error > span {\n  flex: 1;\n  min-width: 0;\n}\n\n/* The standalone studio sheet gets a little more room for the swatch grid. */\n.gb-sheet--studio {\n  width: min(620px, 100%);\n  max-height: min(92vh, 900px);\n}\n\n/* Activity dot: small real-session-state presence marker. */\n.gb-activity-dot {\n  display: inline-block;\n  width: 7px;\n  height: 7px;\n  margin-inline-start: 6px;\n  border-radius: 50%;\n  vertical-align: middle;\n  background: var(--gb-muted);\n  flex: none;\n}\n\n.gb-activity-dot--working {\n  background: var(--gb-working-dot);\n  box-shadow: 0 0 0 3px color-mix(in srgb, var(--gb-working-dot) 18%, transparent);\n  animation: gb-pulse 1.6s ease-in-out infinite;\n}\n\n.gb-activity-dot--waiting {\n  background: var(--rk-warning, #aa6300);\n}\n\n.gb-activity-dot--error {\n  background: var(--gb-danger);\n}\n\n.gb-activity-dot--idle {\n  background: var(--gb-faint-fg, var(--gb-muted));\n}\n\n.gb-detail-identity h2 {\n  display: inline-flex;\n  align-items: center;\n  gap: 2px;\n}\n\n.gb-row-main--split {\n  min-width: 0;\n}\n\n/* -------------------------------------------------------------- animations */\n\n@keyframes gb-fade-in {\n  from { opacity: 0; }\n  to { opacity: 1; }\n}\n\n@keyframes gb-sheet-in {\n  from { opacity: 0; transform: translateY(6px) scale(0.995); }\n  to { opacity: 1; transform: none; }\n}\n\n@keyframes gb-row-in {\n  from { opacity: 0; }\n  to { opacity: 1; }\n}\n\n@keyframes gb-msg-in {\n  from { opacity: 0; transform: translateY(4px); }\n  to { opacity: 1; transform: none; }\n}\n\n@keyframes gb-toast-in {\n  from { opacity: 0; transform: translateY(6px); }\n  to { opacity: 1; transform: none; }\n}\n\n@keyframes gb-dot {\n  0%, 60%, 100% { opacity: 0.4; transform: translateY(0); }\n  30% { opacity: 1; transform: translateY(-2px); }\n}\n\n@keyframes gb-pulse {\n  0%, 100% { opacity: 1; }\n  50% { opacity: 0.55; }\n}\n\n@keyframes gb-spin {\n  to { transform: rotate(360deg); }\n}\n\n/* -------------------------------------------------------------- responsive */\n\n@media (hover: none) {\n  .gb-as-preview-pencil {\n    opacity: 1;\n  }\n}\n\n@media (max-width: 1100px) and (min-width: 761px) {\n  .gb-root { --gb-shell-pad: 18px; --gb-shell-gap: 14px; }\n  .gb-tabs { max-width: 100%; overflow-x: auto; }\n}\n\n@media (max-width: 760px) {\n  .gb-tabs .gb-tab {\n    padding: 6px 10px;\n  }\n\n  .gb-sheet {\n    padding: 18px 16px;\n  }\n\n  .gb-form-row {\n    grid-template-columns: 1fr;\n  }\n\n  .gb-shape-grid,\n  .gb-face-grid,\n  .gb-as-shapes {\n    grid-template-columns: repeat(4, minmax(0, 1fr));\n    gap: 6px;\n  }\n\n  .gb-color-grid {\n    grid-template-columns: repeat(4, 1fr);\n    gap: 6px;\n  }\n\n  .gb-as-colors {\n    grid-template-columns: repeat(6, minmax(0, 1fr));\n  }\n\n  .gb-empty {\n    padding: 54px 12px;\n  }\n\n  .gb-scrim {\n    padding: 10px;\n  }\n\n  .gb-sheet {\n    max-height: 92vh;\n  }\n\n  .gb-msg {\n    max-width: 90%;\n  }\n\n  .gb-launcher {\n    right: 14px;\n    bottom: 14px;\n  }\n\n  .gb-launcher-count {\n    display: none;\n  }\n\n  .gb-toasts {\n    bottom: 76px;\n  }\n\n  .gb-toasts--raised {\n    bottom: 104px;\n  }\n}\n\n@media (max-width: 420px) {\n  .gb-tabs {\n    padding: 2px;\n  }\n\n  .gb-tab {\n    padding: 5px 8px;\n    font-size: var(--gb-caption);\n  }\n\n  .gb-btn--pill {\n    padding: 6px 12px;\n  }\n\n  .gb-color-grid {\n    grid-template-columns: repeat(4, 1fr);\n  }\n}\n\n/* ----------------------------------------------------------- reduced motion */\n\n@media (prefers-reduced-motion: reduce) {\n  .gb-root *,\n  .gb-root *::before,\n  .gb-root *::after {\n    animation-duration: 0.001ms !important;\n    animation-iteration-count: 1 !important;\n    transition-duration: 0.001ms !important;\n    scroll-behavior: auto !important;\n  }\n}\n\n/* Inline @Name pings in room transcripts (the same chip used in the composer). */\n.gb-mention--inline {\n  padding: 0 3px;\n  border: 0;\n  border-radius: 4px;\n  background: var(--gb-hover, rgba(28, 28, 28, 0.06));\n  color: var(--gb-accent);\n  font: inherit;\n  font-weight: 600;\n  cursor: default;\n}\n.gb-mention--inline:hover {\n  border: 0;\n  background: var(--gb-hover, rgba(28, 28, 28, 0.06));\n  color: var(--gb-accent);\n}\n\n/* A bot asked the user a question with @user; the room is paused until they reply. */\n.gb-waiting {\n  display: flex;\n  align-items: center;\n  gap: 7px;\n  margin: 0 0 8px;\n  padding: 7px 12px;\n  border: 1px solid var(--gb-line);\n  border-radius: var(--gb-radius-pill);\n  background: var(--gb-hover);\n  color: var(--gb-fg-2);\n  font-size: var(--gb-label);\n  line-height: var(--gb-label-lh);\n}\n.gb-waiting svg {\n  flex: none;\n  color: var(--gb-accent);\n}\n\n.dsh-apple-dictation { display:inline-flex; align-items:center; justify-content:center; width:32px; height:32px; padding:0; border:0; border-radius:50%; background:transparent; color:var(--dsw-alias-label-caption,#777); cursor:pointer; }\n.dsh-apple-dictation:hover { background:var(--dsw-alias-interactive-bg-hover,rgba(128,128,128,.12)); color:var(--dsw-alias-label-primary,#222); }\n.dsh-apple-dictation:focus-visible { outline:2px solid #8b6fe8; outline-offset:2px; }\n\n.dsh-dictation-wrap { position:relative; display:inline-flex; align-items:center; gap:4px; }\n.dsh-dictation-cancel { border:0; background:transparent; color:inherit; font-size:20px; cursor:pointer; }\n.dsh-apple-dictation.is-recording { background:#df3947; color:#fff; animation:dsh-record-pulse 1.6s infinite; }\n.dsh-dictation-stop { width:9px; height:9px; border-radius:2px; background:currentColor; }\n.dsh-dictation-status { font-size:12px; color:var(--dsw-alias-label-caption,#777); white-space:nowrap; }\n.dsh-dictation-message { position:absolute; bottom:40px; right:0; width:240px; padding:10px 12px; border-radius:10px; background:var(--dsw-alias-bg-base,#fff); color:var(--dsw-alias-label-primary,#222); box-shadow:0 4px 18px #0003; font-size:12px; line-height:1.4; z-index:20; }\n@keyframes dsh-record-pulse { 50% { box-shadow:0 0 0 5px #df39472a; } }\n@media(prefers-reduced-motion:reduce){.dsh-apple-dictation.is-recording{animation:none}}\n\n.dsh-dictation-wave { display:inline-flex; align-items:center; justify-content:center; gap:3px; height:32px; padding:0 8px; }\n.dsh-dictation-wave > span { display:block; width:3px; height:23px; border-radius:4px; background:currentColor; opacity:.75; transform:scaleY(.16); transition:transform 80ms ease-out; }\n@media(prefers-reduced-motion:reduce){.dsh-dictation-wave > span{transition:none}}\n.dsh-openui-trigger { border:0; background:transparent; color:inherit; border-radius:50%; width:32px; height:32px; cursor:pointer; font-size:20px }\n.dsh-openui-trigger:hover { background:#8882 }\n.dsh-openui-backdrop { position:fixed; inset:0; z-index:10000; background:#0007; display:flex; justify-content:flex-end }\n.dsh-openui-panel { width:min(760px,100%); height:100%; background:var(--dsw-alias-bg-base,#fff); color:var(--dsw-alias-label-primary,#222); display:flex; flex-direction:column; box-shadow:0 0 30px #0004; font:14px system-ui }\n.dsh-openui-panel header { display:flex; justify-content:space-between; padding:18px 24px; border-bottom:1px solid #8883; align-items:center }\n.dsh-openui-panel header strong,.dsh-openui-panel header small { display:block }.dsh-openui-panel header strong{font-size:18px}.dsh-openui-panel header small{opacity:.6;margin-top:4px}\n.dsh-openui-panel button { cursor:pointer; border:0; border-radius:9px; padding:8px 12px; background:#8882; color:inherit; margin-left:5px }.dsh-openui-panel button:disabled{opacity:.45;cursor:default}\n.dsh-openui-messages { overflow:auto; flex:1; padding:24px; display:flex; flex-direction:column; gap:18px }.dsh-openui-user { align-self:flex-end; background:#8882; border-radius:16px; padding:11px 15px; white-space:pre-wrap; max-width:85% }.dsh-openui-result{min-width:0}.dsh-openui-error{color:#c33}\n.dsh-openui-panel form { padding:16px 24px; border-top:1px solid #8883 }.dsh-openui-panel textarea,.dsh-openui-setup input{width:100%; box-sizing:border-box; border:1px solid #8885; border-radius:10px; padding:10px; background:transparent; color:inherit; font:inherit; resize:vertical}.dsh-openui-panel form div{text-align:right;margin-top:8px}.dsh-openui-setup{padding:12px 24px;border-bottom:1px solid #8883}.dsh-openui-setup p{font-size:12px;line-height:1.5}.dsh-openui-setup a{color:#7160d8}\n";

  // work/plugin/package/src/client/bots/sidebar.css
  var sidebar_default = '/* =========================================================================\n   Grokbot UI \u2014 sidebar column, main-column chrome and the room surface\n   -------------------------------------------------------------------------\n   Geometry follows Rakazo (Apache-2.0,\n   references/rakazo/apps/web/src/pages/shell/sidebar): a 280px column with\n   8px inline padding, 36px rows on an 8px rhythm, hairline footer groups and\n   a 56px icon rail when collapsed.\n\n   Every selector is either scoped under `.gb-s` (the sidebar occupant) or\n   under a `gb-` class that only this plugin renders, so no host element in the\n   Conversation, composer, tool cards or approvals is restyled here.\n   The token variables (--rk-*/--gb-*) live in styles.css; the light/dark\n   *values* are re-declared on `.gb-s` below because the sidebar and the room\n   layer are siblings of the `.gb-root` elements that carry them.\n   ========================================================================= */\n\n/* ---------------------------------------------------------------- tokens */\n\n:where(.gb-s) {\n  --gb-bg: var(--rk-bg, #ffffff);\n  --gb-surface: var(--rk-dialog, #ffffff);\n  --gb-surface-2: var(--rk-card, #f2f2f2);\n  --gb-elevated: var(--rk-popover, #ffffff);\n  --gb-fg: var(--rk-fg, #1c1c1c);\n  --gb-fg-2: var(--rk-muted-fg, #1c1c1cad);\n  --gb-muted: var(--rk-faint-fg, #1c1c1c8f);\n  --gb-line: var(--rk-border, #1c1c1c1f);\n  --gb-line-strong: var(--rk-input, #1c1c1c3d);\n  --gb-hover: var(--rk-accent, #1c1c1c0f);\n  --gb-hover-strong: var(--rk-sidebar-accent, #1c1c1c14);\n  --gb-sidebar: var(--rk-sidebar, #f7f7f7);\n  --gb-sidebar-fg: var(--rk-sidebar-fg, #1c1c1c);\n  --gb-sidebar-accent: var(--rk-sidebar-accent, #1c1c1c14);\n  --gb-sidebar-accent-fg: var(--rk-sidebar-accent-fg, #1c1c1c);\n  --gb-sidebar-line: var(--rk-sidebar-border, #1c1c1c1f);\n  --gb-accent: var(--rk-link, #0b6dd3);\n  --gb-ring: var(--rk-ring, #1e86fc);\n  --gb-primary: var(--rk-primary, #1c1c1c);\n  --gb-primary-fg: var(--rk-primary-fg, #fcfcfc);\n  --gb-working: var(--rk-status-working, #0b6dd3);\n  --gb-working-dot: var(--rk-working-dot, #10ab61);\n  --gb-danger: var(--rk-destructive, #cd2834);\n  --gb-success: var(--rk-success, #00854a);\n  --gb-shadow-sm: var(--rk-shadow-md, 0 4px 12px rgba(0, 0, 0, 0.03), 0 1px 3px rgba(0, 0, 0, 0.04));\n  --gb-font: var(--rk-font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif);\n  --gb-radius-sm: var(--rk-radius-sm, 8px);\n  --gb-radius-md: var(--rk-radius-md, 10px);\n  --gb-radius-lg: var(--rk-radius-lg, 12px);\n  --gb-radius-pill: 999px;\n  --gb-caption: var(--rk-text-caption, 11px);\n  --gb-label: var(--rk-text-label, 12px);\n  --gb-body-sm: var(--rk-text-body-sm, 13px);\n  --gb-body: var(--rk-text-body, 14px);\n\n  /* Sidebar geometry (Rakazo: 8px inline padding, 4px paint inset). */\n  --gb-s-pad: 12px;\n  --gb-s-paint: 4px;\n  --gb-s-row: 36px;\n  --gb-s-rail-w: 56px;\n\n  color: var(--gb-fg);\n  font-family: var(--gb-font);\n  font-size: var(--gb-body-sm);\n}\n\n@media (prefers-color-scheme: dark) {\n  :where(body:not([data-ds-light-theme])) .gb-s {\n    --gb-bg: var(--rk-bg, #0a0a0a);\n    --gb-surface: var(--rk-dialog, #161616);\n    --gb-surface-2: var(--rk-card, #232323);\n    --gb-elevated: var(--rk-popover, #232323);\n    --gb-fg: var(--rk-fg, #f5f5f5);\n    --gb-fg-2: var(--rk-muted-fg, #f5f5f5a8);\n    --gb-muted: var(--rk-faint-fg, #f5f5f58a);\n    --gb-line: var(--rk-border, #f5f5f51a);\n    --gb-line-strong: var(--rk-input, #f5f5f538);\n    --gb-hover: var(--rk-accent, #f5f5f51a);\n    --gb-hover-strong: var(--rk-sidebar-accent, #f5f5f514);\n    --gb-sidebar: var(--rk-sidebar, #111214);\n    --gb-sidebar-fg: var(--rk-sidebar-fg, #f5f5f5);\n    --gb-sidebar-accent: var(--rk-sidebar-accent, #f5f5f51a);\n    --gb-sidebar-accent-fg: var(--rk-sidebar-accent-fg, #f5f5f5);\n    --gb-sidebar-line: var(--rk-sidebar-border, #f5f5f51a);\n    --gb-primary: var(--rk-primary, #f5f5f5);\n    --gb-primary-fg: var(--rk-primary-fg, #121212);\n    --gb-working-dot: var(--rk-working-dot, #0e9f5a);\n    --gb-danger: var(--rk-destructive, #ff6463);\n    --gb-success: var(--rk-success, #00ba69);\n  }\n}\n\nbody[data-ds-dark-theme] :where(.gb-s) {\n  --gb-bg: var(--rk-bg, #0a0a0a);\n  --gb-surface: var(--rk-dialog, #161616);\n  --gb-surface-2: var(--rk-card, #232323);\n  --gb-elevated: var(--rk-popover, #232323);\n  --gb-fg: var(--rk-fg, #f5f5f5);\n  --gb-fg-2: var(--rk-muted-fg, #f5f5f5a8);\n  --gb-muted: var(--rk-faint-fg, #f5f5f58a);\n  --gb-line: var(--rk-border, #f5f5f51a);\n  --gb-line-strong: var(--rk-input, #f5f5f538);\n  --gb-hover: var(--rk-accent, #f5f5f51a);\n  --gb-hover-strong: var(--rk-sidebar-accent, #f5f5f514);\n  --gb-sidebar: var(--rk-sidebar, #111214);\n  --gb-sidebar-fg: var(--rk-sidebar-fg, #f5f5f5);\n  --gb-sidebar-accent: var(--rk-sidebar-accent, #f5f5f51a);\n  --gb-sidebar-accent-fg: var(--rk-sidebar-accent-fg, #f5f5f5);\n  --gb-sidebar-line: var(--rk-sidebar-border, #f5f5f51a);\n  --gb-primary: var(--rk-primary, #f5f5f5);\n  --gb-primary-fg: var(--rk-primary-fg, #121212);\n  --gb-working-dot: var(--rk-working-dot, #0e9f5a);\n  --gb-danger: var(--rk-destructive, #ff6463);\n  --gb-success: var(--rk-success, #00ba69);\n}\n\n/* ------------------------------------------------------------------ base */\n\n.gb-s *,\n.gb-s *::before,\n.gb-s *::after {\n  box-sizing: border-box;\n}\n\n.gb-s button {\n  font-family: inherit;\n}\n\n.gb-s svg {\n  display: block;\n}\n\n.gb-s :focus-visible {\n  outline: 2px solid var(--gb-ring);\n  outline-offset: -1px;\n}\n\n.gb-s ::selection {\n  background: color-mix(in srgb, var(--gb-ring) 22%, transparent);\n  color: var(--gb-fg);\n}\n\n/* The column: the frame owns the grid track; this fills it.\n   Higher specificity than the :where() token blocks above, so the local\n   declarations resolve to the theme values instead of `unset`. */\n.gb-s.gb-s {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  height: 100%;\n  min-height: 0;\n  /* 12px inline breathing room on each side. border-box is what makes it\n     breathing room: the frame hands us a fixed-width track (280px), so with\n     content-box the padding pushed the column to 304px and the right edge\n     (counts, chevrons, scrollbar) was clipped by the track. The literal sits\n     before the var so the padding survives where `--gb-s-pad` does not\n     resolve. */\n  box-sizing: border-box;\n  padding: 6px 12px 6px;\n  padding: 6px var(--gb-s-pad, 12px) 6px;\n  background: var(--gb-sidebar);\n  color: var(--gb-sidebar-fg);\n}\n\n.gb-s-rail {\n  align-items: center;\n  padding: 8px 0 6px;\n}\n\n.gb-s-scroll {\n  display: flex;\n  flex: 1;\n  flex-direction: column;\n  gap: 2px;\n  min-height: 0;\n  overflow-x: hidden;\n  overflow-y: auto;\n  scrollbar-width: thin;\n  scrollbar-color: var(--gb-sidebar-line) transparent;\n  /* The 6px scrollbar sits in a reserved right-hand gutter. Left edge stays at\n     0 so the scroll content lines up with the section tabs above it; the\n     matching right-side inset lives on the list/header rules instead. */\n  scrollbar-gutter: stable;\n  padding: 0 0 8px;\n}\n\n.gb-s-scroll::-webkit-scrollbar {\n  width: 6px;\n}\n\n.gb-s-scroll::-webkit-scrollbar-thumb {\n  border-radius: 3px;\n  background: var(--gb-sidebar-line);\n}\n\n/* ----------------------------------------------------------------- brand */\n\n.gb-s-brand {\n  display: flex;\n  align-items: center;\n  gap: 9px;\n  height: 44px;\n  padding: 0 4px 0 8px;\n  margin-bottom: 6px;\n  flex: none;\n}\n\n.gb-s-brandmark {\n  display: flex;\n  flex: none;\n  align-items: center;\n  justify-content: center;\n  width: 26px;\n  height: 26px;\n}\n\n.gb-s-wordmark {\n  flex: 1;\n  min-width: 0;\n  overflow: hidden;\n  color: var(--gb-sidebar-fg);\n  font-size: 16px;\n  font-weight: 650;\n  letter-spacing: -0.014em;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n\n.gb-s-close,\n.gb-s-iconbtn {\n  display: inline-flex;\n  flex: none;\n  align-items: center;\n  justify-content: center;\n  width: 30px;\n  height: 30px;\n  padding: 0;\n  border: 0;\n  border-radius: var(--gb-radius-sm);\n  background: transparent;\n  color: var(--gb-fg-2);\n  cursor: pointer;\n}\n\n.gb-s-iconbtn:hover,\n.gb-s-close:hover {\n  background: var(--gb-hover-strong);\n  color: var(--gb-fg);\n}\n\n/* ------------------------------------------------------- new session row */\n\n.gb-s-primary {\n  display: flex;\n  flex: none;\n  align-items: center;\n  gap: 9px;\n  width: 100%;\n  height: 38px;\n  margin: 0 calc(var(--gb-s-paint) + 1px) 10px;\n  padding: 0 12px;\n  border: 1px solid var(--gb-line-strong);\n  border-radius: var(--gb-radius-md);\n  background: var(--gb-surface);\n  color: var(--gb-fg);\n  font-size: var(--gb-body-sm);\n  font-weight: 550;\n  cursor: pointer;\n  transition: background-color 0.14s ease, border-color 0.14s ease;\n}\n\n.gb-s-primary:hover {\n  background: var(--gb-surface-2);\n}\n\n.gb-s-primary svg {\n  flex: none;\n  color: var(--gb-fg-2);\n}\n\n.gb-s-rail .gb-s-primary {\n  width: 36px;\n  height: 36px;\n  margin: 0 0 10px;\n  padding: 0;\n  justify-content: center;\n  border-color: transparent;\n  background: transparent;\n}\n\n.gb-s-rail .gb-s-primary:hover {\n  background: var(--gb-hover-strong);\n}\n\n/* ---------------------------------------------------------------- search */\n\n.gb-s-search {\n  display: flex;\n  flex: none;\n  align-items: center;\n  gap: 8px;\n  height: 34px;\n  margin: 0 calc(var(--gb-s-paint)) 8px;\n  padding: 0 10px;\n  border: 1px solid transparent;\n  border-radius: var(--gb-radius-sm);\n  background: var(--gb-hover);\n  color: var(--gb-muted);\n  transition: border-color 0.14s ease, background-color 0.14s ease;\n}\n\n.gb-s-search:focus-within {\n  border-color: var(--gb-line-strong);\n  background: var(--gb-surface);\n}\n\n.gb-s-search svg {\n  flex: none;\n}\n\n.gb-s-search input {\n  width: 100%;\n  min-width: 0;\n  border: 0;\n  outline: 0;\n  background: transparent;\n  color: var(--gb-fg);\n  font: inherit;\n  font-size: var(--gb-body-sm);\n}\n\n.gb-s-search input::placeholder {\n  color: var(--gb-muted);\n}\n\n/* ---------------------------------------------------------------- rows */\n\n.gb-s-section {\n  display: flex;\n  flex: none;\n  flex-direction: column;\n  gap: 1px;\n  padding: 2px 0;\n}\n\n.gb-s-section + .gb-s-section {\n  margin-top: 6px;\n}\n\n.gb-s-label {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  min-height: 26px;\n  margin-top: 8px;\n  padding: 0 10px;\n  color: var(--gb-muted);\n  font-size: 11px;\n  font-weight: 600;\n  letter-spacing: 0.06em;\n  text-transform: uppercase;\n}\n\n.gb-s-label-count {\n  margin-inline-start: auto;\n  color: var(--gb-muted);\n  font-weight: 500;\n  letter-spacing: 0;\n  font-variant-numeric: tabular-nums;\n}\n\n.gb-srow {\n  position: relative;\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  width: 100%;\n  min-height: var(--gb-s-row);\n  padding: 5px calc(10px - var(--gb-s-paint));\n  border: 0;\n  border-inline: var(--gb-s-paint) solid transparent;\n  border-radius: var(--gb-radius-md);\n  background: transparent;\n  background-clip: padding-box;\n  color: var(--gb-sidebar-fg);\n  font: inherit;\n  font-size: var(--gb-body-sm);\n  text-align: start;\n  cursor: pointer;\n}\n\n.gb-srow:hover {\n  background-color: var(--gb-hover);\n}\n\n.gb-srow.is-active {\n  background-color: var(--gb-sidebar-accent);\n  color: var(--gb-sidebar-accent-fg);\n}\n\n.gb-srow.is-channel {\n  background-color: var(--gb-hover);\n}\n\n.gb-srow-avatar {\n  position: relative;\n  display: flex;\n  flex: none;\n  align-items: center;\n  justify-content: center;\n  width: 26px;\n  height: 26px;\n}\n\n.gb-srow-copy {\n  display: flex;\n  flex: 1;\n  flex-direction: column;\n  gap: 1px;\n  min-width: 0;\n}\n\n.gb-srow-title,\n.gb-srow-sub {\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n\n.gb-srow-title {\n  color: inherit;\n  font-size: var(--gb-body-sm);\n  font-weight: 550;\n  line-height: 18px;\n}\n\n.gb-srow-sub {\n  color: var(--gb-fg-2);\n  font-size: var(--gb-caption);\n  font-weight: 450;\n  line-height: 15px;\n}\n\n.gb-srow-chevron {\n  display: flex;\n  flex: none;\n  align-items: center;\n  color: var(--gb-muted);\n  transition: transform 0.16s ease;\n}\n\n.gb-srow[aria-expanded="true"] .gb-srow-chevron,\n.gb-srow:has(> .gb-srow-main[aria-expanded="true"]) .gb-srow-chevron {\n  transform: rotate(90deg);\n}\n\n/* Presence dot: a ring of the row background keeps it legible on any fill. */\n.gb-sdot {\n  position: absolute;\n  right: -1px;\n  bottom: -1px;\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  background: transparent;\n  box-shadow: 0 0 0 2px var(--gb-sidebar);\n}\n\n.gb-srow:hover .gb-sdot,\n.gb-srow.is-active .gb-sdot {\n  box-shadow: 0 0 0 2px color-mix(in srgb, var(--gb-sidebar-accent) 55%, var(--gb-sidebar));\n}\n\n.gb-sdot--working {\n  background: var(--gb-working-dot);\n}\n\n.gb-sdot--waiting {\n  background: var(--gb-working);\n  animation: gb-sdot-pulse 1.6s ease-in-out infinite;\n}\n\n.gb-sdot--error {\n  background: var(--gb-danger);\n}\n\n@keyframes gb-sdot-pulse {\n  0%, 100% { opacity: 1; }\n  50% { opacity: 0.45; }\n}\n\n/* Session rows: smaller type, a leading glyph instead of an avatar. */\n.gb-schat {\n  min-height: 32px;\n  padding-block: 4px;\n}\n\n.gb-schat .gb-srow-title {\n  font-weight: 500;\n}\n\n.gb-schat.is-active .gb-srow-title {\n  font-weight: 600;\n}\n\n.gb-schat-mark {\n  display: flex;\n  flex: none;\n  align-items: center;\n  justify-content: center;\n  width: 20px;\n  height: 20px;\n  border-radius: 50%;\n  background: color-mix(in srgb, var(--gb-fg) 6%, transparent);\n  color: var(--gb-fg-2);\n}\n\n.gb-schat.is-active .gb-schat-mark {\n  background: color-mix(in srgb, var(--gb-fg) 10%, transparent);\n  color: var(--gb-fg);\n}\n\n.gb-schat-dot {\n  width: 6px;\n  height: 6px;\n  border-radius: 50%;\n  background: var(--gb-working-dot);\n}\n\n/* The expanded bot\'s inline list: aligned to its avatar, hairlined. */\n.gb-slist {\n  display: flex;\n  flex-direction: column;\n  gap: 1px;\n  margin: 1px 0 4px 23px;\n  padding-inline-start: 3px;\n  border-inline-start: 1px solid var(--gb-sidebar-line);\n  animation: gb-slist-in 0.16s ease both;\n}\n\n@keyframes gb-slist-in {\n  from { opacity: 0; transform: translateY(-2px); }\n  to { opacity: 1; transform: translateY(0); }\n}\n\n.gb-slist-empty {\n  padding: 2px 10px 6px;\n  color: var(--gb-muted);\n  font-size: var(--gb-caption);\n  line-height: 16px;\n}\n\n.gb-snew {\n  display: flex;\n  align-items: center;\n  gap: 7px;\n  width: 100%;\n  min-height: 32px;\n  padding: 4px 10px;\n  border: 0;\n  border-radius: var(--gb-radius-sm);\n  background: transparent;\n  color: var(--gb-fg-2);\n  font: inherit;\n  font-size: var(--gb-body-sm);\n  text-align: start;\n  cursor: pointer;\n}\n\n.gb-snew:hover {\n  background: var(--gb-hover);\n  color: var(--gb-fg);\n}\n\n\n/* The clickable name half of a bot row (the avatar opens its actions). */\n.gb-srow-main {\n  display: flex;\n  flex: 1;\n  min-width: 0;\n  padding: 0;\n  border: 0;\n  background: transparent;\n  color: inherit;\n  font: inherit;\n  text-align: start;\n  cursor: pointer;\n}\n\n/* Section tabs sit inside the top block, without a fill until active. */\n.gb-snav {\n  display: flex;\n  align-items: center;\n  gap: 9px;\n  min-height: 32px;\n  width: 100%;\n  /* 10px right inset so the section counts sit off the edge as one column\n     instead of touching the sidebar\'s outer padding. Written without\n     `--gb-s-paint`: that token does not resolve here, and an invalid calc()\n     in a shorthand drops the WHOLE declaration (which is why the counts used\n     to sit flush at 0 padding). */\n  padding: 4px 10px;\n  border: 0;\n  border-inline: var(--gb-s-paint) solid transparent;\n  border-radius: var(--gb-radius-sm);\n  background: transparent;\n  background-clip: padding-box;\n  color: var(--gb-fg-2);\n  font: inherit;\n  font-size: var(--gb-body-sm);\n  text-align: start;\n  cursor: pointer;\n}\n\n.gb-snav:hover {\n  background: var(--gb-hover);\n  color: var(--gb-fg);\n}\n\n.gb-snav.is-active {\n  background: var(--gb-hover-strong);\n  color: var(--gb-fg);\n  font-weight: 550;\n}\n\n.gb-snav-icon {\n  display: flex;\n  flex: none;\n  align-items: center;\n  justify-content: center;\n  width: 20px;\n  color: inherit;\n}\n\n.gb-snav-label {\n  flex: 1;\n  min-width: 0;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n\n/* Per-bot actions menu (edit, look, room, delete). */\n.gb-smenu {\n  display: flex;\n  flex-direction: column;\n  gap: 1px;\n  margin: 2px 0 4px 18px;\n  padding: 4px;\n  border: 1px solid var(--gb-line);\n  border-radius: var(--gb-radius-md);\n  background: var(--gb-elevated);\n  box-shadow: var(--gb-shadow-sm);\n  animation: gb-slist-in 0.14s ease both;\n}\n\n.gb-sitem {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  min-height: 30px;\n  padding: 4px 8px;\n  border: 0;\n  border-radius: var(--gb-radius-sm);\n  background: transparent;\n  color: var(--gb-fg);\n  font: inherit;\n  font-size: var(--gb-body-sm);\n  text-align: start;\n  cursor: pointer;\n}\n\n.gb-sitem:hover {\n  background: var(--gb-hover);\n}\n\n.gb-sitem svg {\n  flex: none;\n  color: var(--gb-fg-2);\n}\n\n.gb-sitem--danger,\n.gb-sitem--danger svg {\n  color: var(--gb-danger);\n}\n\n/* "All chats" workspace group headers.\n *\n * Root cause of the "name55" bug: this button never inherited `.gb-s-label`\'s\n * layout. The markup uses `gb-slabel` (no hyphen) while the base rule is\n * `.gb-s-label`, which no element in the tree carries \u2014 so the head stayed a\n * UA `inline-block` <button> and its name/count laid out inline, where `gap`\n * and `flex` are inert and the count\'s `margin-inline-start: auto` had no\n * free space to claim. Measured 0px between name and count (control\n * `.gb-snav`: 9px). So the layout is declared here in full rather than\n * inherited from a rule that does not match. */\n.gb-slabel.gb-sgrouphead {\n  display: flex;\n  align-items: center;\n  gap: 9px;\n  width: 100%;\n  min-height: 26px;\n  margin-top: 8px;\n  /* Match `.gb-snav`\'s geometry so the group count lands on the same right\n     edge as the section-tab counts above it. The head lives inside the\n     scroller, which is 6px narrower than the tabs (reserved scrollbar\n     gutter), and a literal 10px inset here made the two count columns visibly\n     disagree. No inline inset: the scroller\'s gutter already provides the\n     right-side breathing room. */\n  padding: 4px 0;\n  border: 0;\n  background: transparent;\n  color: var(--gb-muted);\n  font: inherit;\n  font-size: 11px;\n  font-weight: 600;\n  letter-spacing: 0.06em;\n  text-transform: uppercase;\n  cursor: pointer;\n  text-align: start;\n}\n\n.gb-slabel.gb-sgrouphead:hover {\n  color: var(--gb-fg);\n}\n\n.gb-sgroup-name {\n  flex: 1;\n  min-width: 0;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n\n/* ---------------------------------------------------------------- footer */\n\n.gb-s-foot {\n  display: flex;\n  flex: none;\n  flex-direction: column;\n  gap: 1px;\n  padding-top: 6px;\n  border-top: 1px solid var(--gb-sidebar-line);\n}\n\n.gb-sws {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  min-height: 30px;\n  width: 100%;\n  padding: 3px 10px;\n  border: 0;\n  border-radius: var(--gb-radius-sm);\n  background: transparent;\n  color: var(--gb-fg-2);\n  font: inherit;\n  font-size: var(--gb-caption);\n  line-height: 15px;\n  text-align: start;\n  cursor: pointer;\n}\n\n.gb-sws:hover {\n  background: var(--gb-hover);\n  color: var(--gb-fg);\n}\n\n.gb-sws strong {\n  color: var(--gb-fg);\n  font-weight: 550;\n}\n\n.gb-sws-name {\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n\n.gb-sws svg:last-child {\n  flex: none;\n  margin-inline-start: auto;\n  color: var(--gb-muted);\n}\n\n.gb-sws-menu {\n  display: flex;\n  flex-direction: column;\n  gap: 1px;\n  margin: 2px 0 4px;\n  padding: 4px 0;\n  border-top: 1px solid var(--gb-sidebar-line);\n  animation: gb-slist-in 0.16s ease both;\n}\n\n.gb-sfoot {\n  display: flex;\n  align-items: center;\n  gap: 9px;\n  min-height: 32px;\n  width: 100%;\n  padding: 4px calc(10px - var(--gb-s-paint));\n  border: 0;\n  border-inline: var(--gb-s-paint) solid transparent;\n  border-radius: var(--gb-radius-sm);\n  background: transparent;\n  background-clip: padding-box;\n  color: var(--gb-fg-2);\n  font: inherit;\n  font-size: var(--gb-body-sm);\n  text-align: start;\n  cursor: pointer;\n}\n\n.gb-sfoot:hover {\n  background: var(--gb-hover);\n  color: var(--gb-fg);\n}\n\n.gb-sfoot.is-active {\n  background: var(--gb-hover-strong);\n  color: var(--gb-fg);\n}\n\n.gb-sfoot svg {\n  flex: none;\n}\n\n.gb-sfoot .gb-foot-kbd {\n  margin-inline-start: auto;\n  color: var(--gb-muted);\n  font-family: var(--gb-font);\n  font-size: 10px;\n  font-weight: 500;\n  letter-spacing: 0.02em;\n}\n\n.gb-serr {\n  margin: 4px 4px 8px;\n  padding: 8px 10px;\n  border: 1px solid var(--gb-line);\n  border-radius: var(--gb-radius-sm);\n  background: color-mix(in srgb, var(--gb-danger) 7%, transparent);\n  color: var(--gb-fg-2);\n  font-size: var(--gb-caption);\n  line-height: 16px;\n}\n\n.gb-serr strong {\n  display: block;\n  color: var(--gb-danger);\n  font-weight: 600;\n}\n\n/* ------------------------------------------------------------------ rail */\n\n.gb-srail {\n  position: relative;\n  display: inline-flex;\n}\n\n/* Tooltip: CSS-only, shows on hover/focus of a rail button. */\n.gb-stip {\n  position: absolute;\n  top: 50%;\n  left: calc(100% + 10px);\n  z-index: 60;\n  display: none;\n  align-items: center;\n  gap: 8px;\n  max-width: 260px;\n  padding: 5px 9px;\n  border: 1px solid var(--gb-line);\n  border-radius: var(--gb-radius-sm);\n  background: var(--gb-elevated);\n  box-shadow: var(--gb-shadow-sm);\n  color: var(--gb-fg);\n  font-size: var(--gb-label);\n  line-height: 16px;\n  white-space: nowrap;\n  transform: translateY(-50%);\n  pointer-events: none;\n}\n\n.gb-srail:hover > .gb-stip,\n.gb-srail:focus-within > .gb-stip {\n  display: flex;\n}\n\n.gb-s-rail .gb-srail-item {\n  position: relative;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 36px;\n  height: 36px;\n  padding: 0;\n  border: 0;\n  border-radius: var(--gb-radius-md);\n  background: transparent;\n  color: var(--gb-fg-2);\n  cursor: pointer;\n}\n\n.gb-s-rail .gb-srail-item:hover,\n.gb-s-rail .gb-srail-item.is-active {\n  background: var(--gb-hover-strong);\n  color: var(--gb-fg);\n}\n\n.gb-s-rail .gb-srail-stack {\n  display: flex;\n  flex: 1;\n  flex-direction: column;\n  align-items: center;\n  gap: 8px;\n  min-height: 0;\n  overflow-y: auto;\n  padding: 4px 0;\n  scrollbar-width: none;\n}\n\n.gb-s-rail .gb-srail-stack::-webkit-scrollbar {\n  display: none;\n}\n\n.gb-s-rail .gb-s-mark {\n  margin-bottom: 6px;\n}\n\n.gb-s-rail .gb-sdot {\n  right: 2px;\n  bottom: 2px;\n  box-shadow: 0 0 0 2px var(--gb-sidebar);\n}\n\n/* ------------------------------------------------------ header breadcrumb */\n\n.gb-scrumb {\n  display: inline-flex;\n  flex: none;\n  align-items: center;\n  gap: 5px;\n  max-width: 220px;\n  height: 28px;\n  margin-inline-end: 6px;\n  padding: 0 10px 0 7px;\n  border: 1px solid var(--gb-line);\n  border-radius: var(--gb-radius-pill);\n  background: var(--gb-surface);\n  color: var(--gb-fg-2);\n  font-family: var(--gb-font);\n  font-size: var(--gb-label);\n  font-weight: 500;\n  line-height: 16px;\n  cursor: pointer;\n  white-space: nowrap;\n  transition: background-color 0.14s ease, color 0.14s ease, border-color 0.14s ease;\n}\n\n.gb-scrumb:hover {\n  border-color: var(--gb-line-strong);\n  background: var(--gb-surface-2);\n  color: var(--gb-fg);\n}\n\n.gb-scrumb svg {\n  flex: none;\n}\n\n.gb-scrumb-name {\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n/* --------------------------------------------------- shell.leading opener */\n\n.gb-slead {\n  display: inline-flex;\n  align-items: center;\n  gap: 2px;\n}\n\n.gb-slead-toggle {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 30px;\n  height: 30px;\n  padding: 0;\n  border: 0;\n  border-radius: var(--gb-radius-sm);\n  background: transparent;\n  color: var(--gb-fg-2);\n  cursor: pointer;\n}\n\n.gb-slead-toggle:hover {\n  background: var(--gb-hover-strong);\n  color: var(--gb-fg);\n}\n\n/* ------------------------------------------------------------ room surface */\n\n/* Rooms own the whole centre column while a room is open. The layer is a\n   sibling of the frame inside the shell root, so no Conversation element is\n   restyled, hidden or unmounted. */\n/* The room surface is NOT the sidebar column: it is an overlay box that starts\n   at the centre column\'s left edge and fills the rest of the frame. It spells\n   out its own box + surface so nothing inherited from `.gb-s` (the column\n   width/padding) can shrink or punch a hole in it. */\n.gb-s.gb-sroom-layer {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 3;\n  display: flex;\n  flex-direction: column;\n  width: auto;\n  height: auto;\n  min-width: 0;\n  min-height: 0;\n  padding: 0;\n  overflow: hidden;\n  background: var(--gb-bg, #ffffff);\n  color: var(--gb-fg, #1c1c1c);\n}\n\n@keyframes gb-fade-in {\n  from { opacity: 0; }\n  to { opacity: 1; }\n}\n\n.gb-sroom-head {\n  display: flex;\n  flex: none;\n  align-items: center;\n  gap: 12px;\n  min-height: 56px;\n  padding: 10px 20px;\n  border-bottom: 1px solid var(--gb-line);\n}\n\n.gb-sroom-head h1 {\n  margin: 0;\n  color: var(--gb-fg);\n  font-size: 15px;\n  font-weight: 600;\n  letter-spacing: -0.01em;\n  line-height: 20px;\n}\n\n.gb-sroom-sub {\n  display: inline-flex;\n  align-items: center;\n  gap: 7px;\n  color: var(--gb-fg-2);\n  font-size: var(--gb-label);\n  line-height: 16px;\n}\n\n.gb-sroom-body {\n  display: flex;\n  flex: 1;\n  flex-direction: column;\n  min-height: 0;\n  width: 100%;\n  max-width: 760px;\n  margin: 0 auto;\n  padding: 0 20px;\n}\n\n.gb-sroom-layer .gb-chat {\n  display: flex;\n  flex: 1;\n  flex-direction: column;\n  min-height: 0;\n}\n\n.gb-sroom-layer .gb-transcript {\n  flex: 1;\n  min-height: 0;\n  overflow-y: auto;\n  padding: 18px 0 8px;\n}\n\n.gb-sroom-layer .gb-composer {\n  padding: 8px 0 16px;\n  background: var(--gb-bg);\n}\n\n.gb-sroom-actions {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  margin-inline-start: auto;\n}\n\n@media (max-width: 760px) {\n  .gb-sroom-head {\n    padding: 8px 14px;\n  }\n\n  .gb-sroom-body {\n    padding: 0 14px;\n  }\n}\n\n/* --------------------------------------------------------- reduced motion */\n\n@media (prefers-reduced-motion: reduce) {\n  .gb-s *,\n  .gb-s *::before,\n  .gb-s *::after,\n  .gb-s *,\n  .gb-s *::before,\n  .gb-s *::after {\n    animation-duration: 0.001ms !important;\n    animation-iteration-count: 1 !important;\n    transition-duration: 0.001ms !important;\n    scroll-behavior: auto !important;\n  }\n}\n\n/* Subtle motion and clearer keyboard focus in the desktop experience. */\n.gb-srow, .gb-snav, .gb-sfoot, .gb-s-primary, .gb-srail-item {\n  transition: background-color 160ms ease, color 160ms ease, box-shadow 160ms ease, transform 160ms ease;\n}\n.gb-srow:hover, .gb-snav:hover, .gb-sfoot:hover { transform: translateX(2px); }\n.gb-s-primary:hover { transform: translateY(-1px); box-shadow: 0 5px 14px rgba(0,0,0,.12); }\n.gb-s button:focus-visible, .gb-s input:focus-visible { outline: 2px solid #8b6fe8; outline-offset: 2px; }\n@media (prefers-reduced-motion: reduce) {\n  .gb-srow, .gb-snav, .gb-sfoot, .gb-s-primary, .gb-srail-item { transition: none; }\n  .gb-srow:hover, .gb-snav:hover, .gb-sfoot:hover, .gb-s-primary:hover { transform: none; }\n}\n\n/* GPT selection is shown on the welcome card, not on sidebar rows. */\n.gb-srow.is-active:has(> .gb-srow-main) { background-color: transparent; box-shadow: none; color: var(--gb-sidebar-fg); }\n.gb-srow.is-active:has(> .gb-srow-main):hover { background-color: var(--gb-hover); }\n';

  // work/plugin/package/src/client/bots/api.js
  var BASE = "/grokbot/api";
  var ApiError = class extends Error {
    /**
     * @param {string} message user-facing message
     * @param {number} status HTTP status (0 when the request never reached the host)
     * @param {unknown} payload parsed body when available
     */
    constructor(message, status, payload) {
      super(message);
      this.name = "ApiError";
      this.status = status;
      this.payload = payload;
    }
  };
  async function request(path, { method = "GET", body } = {}) {
    let response;
    try {
      const headers = { accept: "application/json" };
      if (body !== void 0) headers["content-type"] = "application/json";
      response = await fetch(BASE + path, {
        method,
        credentials: "same-origin",
        headers,
        body: body === void 0 ? void 0 : JSON.stringify(body)
      });
    } catch (cause) {
      throw new ApiError("Cannot reach the local bot service. Is the Grokbot host running?", 0, cause);
    }
    let raw = "";
    try {
      raw = await response.text();
    } catch {
      raw = "";
    }
    let payload = null;
    if (raw) {
      try {
        payload = JSON.parse(raw);
      } catch {
        payload = null;
      }
    }
    if (!response.ok) {
      const serverMessage = payload && typeof payload.error === "string" ? payload.error.trim() : "";
      const message = serverMessage || `Request failed (HTTP ${response.status}).`;
      throw new ApiError(message, response.status, payload);
    }
    if (payload === null) {
      throw new ApiError("The local bot service returned an unexpected response.", response.status, raw);
    }
    return payload;
  }
  function slugify(value) {
    return String(value || "").toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 48);
  }
  function normalizeBot(raw, index = 0) {
    if (!raw || typeof raw !== "object") return null;
    const name = typeof raw.name === "string" && raw.name.trim() ? raw.name.trim() : "Untitled bot";
    const id = typeof raw.id === "string" && raw.id.trim() ? raw.id.trim() : slugify(name) || `bot-${index + 1}`;
    const avatar = migrateLegacyAvatar(raw);
    return {
      id,
      name,
      color: avatar.color,
      avatarSet: avatar.avatarSet,
      emoji: typeof raw.emoji === "string" ? raw.emoji : void 0,
      instructions: typeof raw.instructions === "string" ? raw.instructions : "",
      tagline: typeof raw.tagline === "string" ? raw.tagline : "",
      createdAt: Number.isFinite(raw.createdAt) ? raw.createdAt : 0
    };
  }
  function normalizeBots(list) {
    if (!Array.isArray(list)) return null;
    const out = [];
    for (let i = 0; i < list.length; i += 1) {
      const bot = normalizeBot(list[i], i);
      if (bot) out.push(bot);
    }
    return out;
  }
  function normalizeMessage(raw, fallbackId) {
    if (!raw || typeof raw !== "object") return null;
    const role2 = raw.role === "user" || raw.role === "bot" || raw.role === "system" ? raw.role : "bot";
    const text = typeof raw.text === "string" ? raw.text : "";
    if (!text && role2 !== "system") return null;
    return {
      id: typeof raw.id === "string" && raw.id ? raw.id : fallbackId,
      role: role2,
      botId: typeof raw.botId === "string" ? raw.botId : void 0,
      text,
      ts: Number.isFinite(raw.ts) ? raw.ts : 0
    };
  }
  function normalizeRoom(raw, index = 0) {
    if (!raw || typeof raw !== "object") return null;
    const id = typeof raw.id === "string" && raw.id.trim() ? raw.id.trim() : `room-${index + 1}`;
    const name = typeof raw.name === "string" && raw.name.trim() ? raw.name.trim() : "Untitled room";
    const botIds = Array.isArray(raw.botIds) ? raw.botIds.filter((value) => typeof value === "string" && value) : [];
    const transcript = [];
    if (Array.isArray(raw.transcript)) {
      for (let i = 0; i < raw.transcript.length; i += 1) {
        const message = normalizeMessage(raw.transcript[i], `${id}-msg-${i}`);
        if (message) transcript.push(message);
      }
    }
    const pending = (() => {
      if (!raw.pending || typeof raw.pending !== "object" || typeof raw.pending.botId !== "string" || !raw.pending.botId) return void 0;
      return {
        botId: raw.pending.botId,
        botIds: Array.isArray(raw.pending.botIds) ? raw.pending.botIds.filter((value) => typeof value === "string" && value) : [],
        question: typeof raw.pending.question === "string" ? raw.pending.question : "",
        createdAt: Number.isFinite(raw.pending.createdAt) ? raw.pending.createdAt : 0
      };
    })();
    return {
      id,
      name,
      botIds,
      transcript,
      createdAt: Number.isFinite(raw.createdAt) ? raw.createdAt : 0,
      ...pending ? { pending } : {}
    };
  }
  function normalizeRooms(list) {
    if (!Array.isArray(list)) return null;
    const out = [];
    for (let i = 0; i < list.length; i += 1) {
      const room = normalizeRoom(list[i], i);
      if (room) out.push(room);
    }
    return out;
  }
  function normalizeState(payload) {
    const source = payload && typeof payload === "object" ? payload : {};
    return {
      version: Number.isFinite(source.version) ? source.version : 1,
      bots: normalizeBots(source.bots) || [],
      rooms: normalizeRooms(source.rooms) || [],
      model: source.model && typeof source.model === "object" ? source.model : null
    };
  }
  var api = {
    getState() {
      return request("/state");
    },
    /** @param {object} bot BotDraft; omit `id` to create. */
    saveBot(bot) {
      return request("/bots", { method: "POST", body: { bot } });
    },
    deleteBot(id) {
      return request("/bots/delete", { method: "POST", body: { id } });
    },
    createRoom(name, botIds) {
      return request("/rooms", { method: "POST", body: { name, botIds } });
    },
    deleteRoom(id) {
      return request("/rooms/delete", { method: "POST", body: { id } });
    },
    sendRoom(roomId, text, botIds) {
      const body = { roomId, text };
      if (Array.isArray(botIds) && botIds.length) body.botIds = botIds;
      return request("/rooms/send", { method: "POST", body });
    },
    notifyAgent(kind, sessionName) {
      return request("/notify", { method: "POST", body: { kind, sessionName } });
    }
  };
  function respondersFor(room, bots, text) {
    const byId = new Map(bots.map((bot) => [bot.id, bot]));
    const roomBots = (room && Array.isArray(room.botIds) ? room.botIds : []).map((id) => byId.get(id)).filter(Boolean);
    if (!roomBots.length) return [];
    const value = String(text || "");
    const mentioned = roomBots.filter((bot) => {
      const name = bot.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      return new RegExp(`@\\s*${name}\\b`, "i").test(value);
    });
    if (mentioned.length) return mentioned;
    if (room && room.pending) {
      const queued = (Array.isArray(room.pending.botIds) ? room.pending.botIds : []).map((id) => byId.get(id)).filter(Boolean);
      if (queued.length) return queued;
      const asker = byId.get(room.pending.botId);
      if (asker) return [asker];
    }
    return roomBots;
  }

  // work/plugin/package/src/client/bots/components.jsx
  var import_react7 = __toESM(__require("react"), 1);

  // work/plugin/package/src/client/bots/live.js
  var import_react6 = __toESM(__require("react"), 1);
  var BOT_PRESET_PREFIX = "grokbot-";
  var ACTIVITY_LABELS = {
    idle: "Idle",
    working: "Working",
    reading: "Reading",
    writing: "Writing",
    thinking: "Thinking",
    waiting: "Waiting for you",
    error: "Needs attention"
  };
  var ACTIVITY_RANK = {
    waiting: 4,
    error: 3,
    working: 2,
    reading: 2,
    writing: 2,
    thinking: 2,
    idle: 0
  };
  function activityLabel(activity) {
    return ACTIVITY_LABELS[activity] || ACTIVITY_LABELS.idle;
  }
  function activityFromSession(status, snapshot) {
    if (snapshot && (snapshot.promptError || snapshot.lastAgentError)) return "error";
    if (status && status.pendingInteraction) return "waiting";
    if (status && status.running || snapshot && snapshot.running) return "working";
    return "idle";
  }
  function rank(activity) {
    return Object.prototype.hasOwnProperty.call(ACTIVITY_RANK, activity) ? ACTIVITY_RANK[activity] : 0;
  }
  function bestSessionActivity(current, next) {
    if (!current) return next;
    if (rank(next.activity) > rank(current.activity)) return next;
    if (rank(next.activity) === rank(current.activity) && next.updatedAt > current.updatedAt) return next;
    return current;
  }
  function deriveBotActivities(bots, sessionsState, statuses) {
    const result = /* @__PURE__ */ new Map();
    if (!Array.isArray(bots) || !bots.length) return result;
    if (!sessionsState || !sessionsState.byId) return result;
    const known = new Set(bots.map((bot) => bot && bot.id).filter(Boolean));
    const projections = sessionsState.projectionsBySession || {};
    const best = /* @__PURE__ */ new Map();
    for (const sessionId of Object.keys(sessionsState.byId)) {
      const summary = sessionsState.byId[sessionId];
      const projection = projections[sessionId];
      const preset = projection && projection.values ? projection.values.agentPreset : void 0;
      if (typeof preset !== "string" || !preset.startsWith(BOT_PRESET_PREFIX)) continue;
      const botId = preset.slice(BOT_PRESET_PREFIX.length);
      if (!known.has(botId)) continue;
      const status = statuses && typeof statuses.get === "function" ? statuses.get(sessionId) : void 0;
      let activity = "idle";
      if (status && status.pendingInteraction) activity = "waiting";
      else if (status && status.running || summary && summary.running) activity = "working";
      const next = { activity, sessionId, updatedAt: summary && summary.updatedAt || 0 };
      best.set(botId, bestSessionActivity(best.get(botId), next));
    }
    for (const [botId, info] of best) result.set(botId, info);
    return result;
  }
  function botActivity(activities, botId) {
    const info = activities && typeof activities.get === "function" ? activities.get(botId) : null;
    return info && info.activity ? info.activity : "idle";
  }
  function useNoSessionList() {
    return null;
  }
  function useNoSessionStatus() {
    return null;
  }
  function useNoSessionSnapshot() {
    return void 0;
  }
  function useBotActivities(bots, useSessions, useSessionStatus) {
    const readSessions = typeof useSessions === "function" ? useSessions : useNoSessionList;
    const readStatuses = typeof useSessionStatus === "function" ? useSessionStatus : useNoSessionStatus;
    const sessionsState = readSessions((state) => state);
    const statuses = readStatuses((state) => state);
    return import_react6.default.useMemo(
      () => deriveBotActivities(bots, sessionsState, statuses),
      [bots, sessionsState, statuses]
    );
  }
  function useOwnSessionActivity(props) {
    const readStatus = props && typeof props.useSessionStatus === "function" ? props.useSessionStatus : useNoSessionStatus;
    const readSnapshot = props && typeof props.useSession === "function" ? props.useSession : useNoSessionSnapshot;
    const sessionId = props ? props.sessionId : void 0;
    const status = readStatus((map) => map && sessionId !== void 0 ? map.get(sessionId) : void 0);
    const snapshot = readSnapshot((value) => value);
    return activityFromSession(status, snapshot);
  }

  // work/plugin/package/src/client/bots/components.jsx
  var import_jsx_runtime4 = __require("react/jsx-runtime");
  function Icon({ name, size = 18, className = "" }) {
    const paths = ICONS[name] || ICONS.spark;
    return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      "svg",
      {
        className: `gb-icon ${className}`.trim(),
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "1.7",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        "aria-hidden": "true",
        focusable: "false",
        children: paths
      }
    );
  }
  var ICONS = {
    search: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_jsx_runtime4.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("circle", { cx: "10.8", cy: "10.8", r: "6.3" }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: "m16 16 4.4 4.4" })
    ] }),
    spark: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_jsx_runtime4.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: "M12 4l1.6 4.4L18 10l-4.4 1.6L12 16l-1.6-4.4L6 10l4.4-1.6L12 4Z" }) }),
    plus: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: "M12 5v14M5 12h14" }),
    close: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: "M6 6l12 12M18 6L6 18" }),
    back: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: "M15 5l-7 7 7 7" }),
    chevronRight: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: "M9 5l7 7-7 7" }),
    chat: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: "M20 12a7.5 7.5 0 0 1-7.5 7.5H6l-3 2.4.7-4A7.5 7.5 0 0 1 4.5 12 7.5 7.5 0 0 1 12 4.5 7.5 7.5 0 0 1 20 12Z" }),
    allChats: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_jsx_runtime4.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("rect", { x: "4", y: "4.5", width: "16", height: "15", rx: "3" }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: "M8 9h8M8 12.5h8M8 16h4" })
    ] }),
    edit: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_jsx_runtime4.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: "M4 20h4l10-10a2.1 2.1 0 0 0-3-3L5 17v3Z" }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: "M13.5 6.5l3 3" })
    ] }),
    trash: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_jsx_runtime4.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: "M4 7h16M9 7V5h6v2M6.5 7l.9 13h9.2l.9-13" }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: "M10 11v6M14 11v6" })
    ] }),
    rooms: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_jsx_runtime4.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("circle", { cx: "9", cy: "8.5", r: "3" }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("circle", { cx: "16.5", cy: "9.5", r: "2.4" }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: "M3.5 19a5.5 5.5 0 0 1 11 0M14 14.6a4.2 4.2 0 0 1 6.5 3.6" })
    ] }),
    send: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: "M12 19V5M5 12l7-7 7 7" }),
    retry: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_jsx_runtime4.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: "M20 12a8 8 0 1 1-2.3-5.6" }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: "M20 4v4h-4" })
    ] }),
    check: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: "M5 12.5l4.5 4.5L19 7.5" }),
    arrowUp: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: "M12 19V5M5 12l7-7 7 7" }),
    hash: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_jsx_runtime4.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: "M9 3.5L7.5 20.5M16.5 3.5L15 20.5M3.5 9h17M3 15h17" }) }),
    alert: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_jsx_runtime4.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: "M12 4l9 16H3l9-16Z" }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: "M12 10v4M12 17.2v.1" })
    ] }),
    users: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_jsx_runtime4.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("circle", { cx: "9", cy: "8.5", r: "3" }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: "M3.5 19a5.5 5.5 0 0 1 11 0" }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: "M15.5 6.6a3 3 0 0 1 0 5.8M17 14.6a5.5 5.5 0 0 1 3.5 4.4" })
    ] }),
    upload: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_jsx_runtime4.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: "M12 16V4M7.5 8.5 12 4l4.5 4.5" }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: "M4 15.5V19a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 20 19v-3.5" })
    ] }),
    image: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_jsx_runtime4.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("rect", { x: "3.5", y: "4.5", width: "17", height: "15", rx: "2.5" }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("circle", { cx: "9", cy: "10", r: "1.6" }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: "m4.5 17 4.6-4.4a1.8 1.8 0 0 1 2.5 0l2.3 2.2 1.7-1.6a1.8 1.8 0 0 1 2.5 0l2.4 2.4" })
    ] }),
    settings: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_jsx_runtime4.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("circle", { cx: "12", cy: "12", r: "3" }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: "M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1 1.56V21a2 2 0 1 1-4 0v-.09A1.7 1.7 0 0 0 9 19.35a1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.64 15a1.7 1.7 0 0 0-1.56-1H3a2 2 0 1 1 0-4h.09A1.7 1.7 0 0 0 4.65 9a1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 9 4.64h.08A1.7 1.7 0 0 0 10 3.09V3a2 2 0 1 1 4 0v.09a1.7 1.7 0 0 0 1 1.56 1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.36 9v.08a1.7 1.7 0 0 0 1.55 1H21a2 2 0 1 1 0 4h-.09a1.7 1.7 0 0 0-1.51 1Z" })
    ] }),
    plugins: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_jsx_runtime4.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("rect", { x: "4", y: "4", width: "6.5", height: "6.5", rx: "1.6" }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("rect", { x: "13.5", y: "4", width: "6.5", height: "6.5", rx: "1.6" }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("rect", { x: "4", y: "13.5", width: "6.5", height: "6.5", rx: "1.6" }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: "M16.75 13.5v6.5M13.5 16.75H20" })
    ] }),
    panel: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_jsx_runtime4.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("rect", { x: "3.5", y: "4.5", width: "17", height: "15", rx: "2.5" }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: "M9.5 4.5v15" }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: "M6 8.5h1M6 12h1M6 15.5h1" })
    ] }),
    folder: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_jsx_runtime4.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: "M3.5 7.2A2.2 2.2 0 0 1 5.7 5h3.1l1.7 2h7.8a2.2 2.2 0 0 1 2.2 2.2v7.6A2.2 2.2 0 0 1 18.3 19H5.7a2.2 2.2 0 0 1-2.2-2.2V7.2Z" }) })
  };
  function Spinner({ size = 16, className = "" }) {
    return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      "span",
      {
        className: `gb-spinner ${className}`.trim(),
        style: { width: size, height: size },
        "aria-hidden": "true"
      }
    );
  }
  function TypingDots() {
    return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("span", { className: "gb-typing", "aria-hidden": "true", children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("i", {}),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("i", {}),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("i", {})
    ] });
  }
  function VisuallyHidden({ children }) {
    return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      "span",
      {
        style: {
          position: "absolute",
          width: 1,
          height: 1,
          padding: 0,
          margin: -1,
          overflow: "hidden",
          clip: "rect(0 0 0 0)",
          whiteSpace: "nowrap",
          border: 0
        },
        children
      }
    );
  }
  function StackedAvatars({ bots, size = 30, max = 3, className = "" }) {
    const all = Array.isArray(bots) ? bots.filter(Boolean) : [];
    const shown = all.slice(0, max);
    const rest = all.length - shown.length;
    if (!shown.length) return null;
    return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("span", { className: `gb-stack ${className}`.trim(), "aria-hidden": "true", children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(BotAvatarStack, { bots: shown, size, max }),
      rest > 0 ? /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("span", { className: "gb-stack-rest", children: [
        "+",
        rest
      ] }) : null
    ] });
  }
  function ToastStack({ toasts, onDismiss, raised = false }) {
    if (!toasts.length) return null;
    return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: `gb-toasts${raised ? " gb-toasts--raised" : ""}`, role: "status", "aria-live": "polite", children: toasts.map((toast) => /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: `gb-toast gb-toast--${toast.tone || "info"}`, children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Icon, { name: toast.tone === "error" ? "alert" : toast.tone === "success" ? "check" : "spark", size: 15 }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "gb-toast-text", children: toast.message }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("button", { type: "button", className: "gb-toast-close", "aria-label": "Dismiss notification", onClick: () => onDismiss(toast.id), children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Icon, { name: "close", size: 13 }) })
    ] }, toast.id)) });
  }
  function useFocusTrap(ref, active) {
    import_react7.default.useEffect(() => {
      if (!active || !ref.current) return void 0;
      const node = ref.current;
      const previous = typeof document !== "undefined" ? document.activeElement : null;
      const selector = [
        "a[href]",
        "button:not([disabled])",
        "textarea:not([disabled])",
        "input:not([disabled])",
        "select:not([disabled])",
        '[tabindex]:not([tabindex="-1"])'
      ].join(",");
      const focusable = () => Array.from(node.querySelectorAll(selector)).filter(
        (element) => element.offsetParent !== null || element === document.activeElement
      );
      const preferred = node.querySelector("[data-autofocus]");
      const first = preferred || focusable()[0];
      if (first && typeof first.focus === "function") first.focus();
      else if (typeof node.focus === "function") node.focus();
      const onKeyDown = (event) => {
        if (event.key !== "Tab") return;
        const list = focusable();
        if (!list.length) return;
        const index = list.indexOf(document.activeElement);
        if (event.shiftKey) {
          if (index <= 0) {
            event.preventDefault();
            list[list.length - 1].focus();
          }
        } else if (index === list.length - 1 || index === -1) {
          event.preventDefault();
          list[0].focus();
        }
      };
      node.addEventListener("keydown", onKeyDown);
      return () => {
        node.removeEventListener("keydown", onKeyDown);
        if (previous && typeof previous.focus === "function" && document.contains(previous)) {
          try {
            previous.focus();
          } catch {
          }
        }
      };
    }, [ref, active]);
  }
  function ConfirmDialog({ title, description, confirmLabel = "Delete", busy = false, onConfirm, onClose }) {
    const sheetRef = import_react7.default.useRef(null);
    useFocusTrap(sheetRef, true);
    const onScrimMouseDown = (event) => {
      if (event.target === event.currentTarget && !busy) onClose();
    };
    return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "gb-scrim", onMouseDown: onScrimMouseDown, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
      "div",
      {
        className: "gb-sheet gb-sheet--confirm",
        role: "alertdialog",
        "aria-modal": "true",
        "aria-labelledby": "gb-confirm-title",
        "aria-describedby": "gb-confirm-desc",
        ref: sheetRef,
        onMouseDown: (event) => event.stopPropagation(),
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("h2", { id: "gb-confirm-title", children: title }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { id: "gb-confirm-desc", children: description }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "gb-sheet-foot", children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("button", { type: "button", className: "gb-btn gb-btn--secondary", onClick: onClose, disabled: busy, children: "Cancel" }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("button", { type: "button", className: "gb-btn gb-btn--danger", onClick: onConfirm, disabled: busy, children: [
              busy ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Spinner, { size: 14 }) : null,
              confirmLabel
            ] })
          ] })
        ]
      }
    ) });
  }
  var BotsErrorBoundary = class extends import_react7.default.Component {
    constructor(props) {
      super(props);
      this.state = { error: null };
    }
    static getDerivedStateFromError(error) {
      return { error };
    }
    componentDidCatch(error, info) {
      console.error("[grokbot-ui] bots UI crashed:", error, info);
    }
    render() {
      if (!this.state.error) return this.props.children;
      return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "gb-crash", role: "alert", children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Icon, { name: "alert", size: 18 }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("strong", { children: "Bots hit a snag." }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { children: "The rest of the app is untouched. Reload the panel to try again." })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("button", { type: "button", className: "gb-btn gb-btn--secondary gb-btn--sm", onClick: () => this.setState({ error: null }), children: "Reload panel" })
      ] });
    }
  };

  // work/plugin/package/src/client/bots/SettingsNotice.jsx
  var React7 = __toESM(__require("react"), 1);
  var import_jsx_runtime5 = __require("react/jsx-runtime");
  function SettingsNotice({ onOpenPlugins, onClose }) {
    const sheetRef = React7.useRef(null);
    const closeRef = React7.useRef(null);
    React7.useEffect(() => {
      const previous = typeof document !== "undefined" ? document.activeElement : null;
      if (closeRef.current && typeof closeRef.current.focus === "function") closeRef.current.focus();
      const onKeyDown = (event) => {
        if (event.key === "Escape") {
          event.preventDefault();
          event.stopPropagation();
          onClose();
          return;
        }
        if (event.key !== "Tab") return;
        const node2 = sheetRef.current;
        if (!node2) return;
        const list = Array.from(node2.querySelectorAll('button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'));
        if (!list.length) return;
        const index = list.indexOf(document.activeElement);
        if (event.shiftKey) {
          if (index <= 0) {
            event.preventDefault();
            list[list.length - 1].focus();
          }
        } else if (index === list.length - 1 || index === -1) {
          event.preventDefault();
          list[0].focus();
        }
      };
      const node = sheetRef.current;
      if (node) node.addEventListener("keydown", onKeyDown);
      return () => {
        if (node) node.removeEventListener("keydown", onKeyDown);
        if (previous && typeof previous.focus === "function" && document.contains(previous)) {
          try {
            previous.focus({ preventScroll: true });
          } catch {
          }
        }
      };
    }, [onClose]);
    const onScrimMouseDown = (event) => {
      if (event.target === event.currentTarget) onClose();
    };
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "gb-scrim", onMouseDown: onScrimMouseDown, children: /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
      "div",
      {
        className: "gb-sheet gb-sheet--notice",
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": "gb-settings-title",
        "aria-describedby": "gb-settings-body",
        "data-settings-notice": "true",
        ref: sheetRef,
        onMouseDown: (event) => event.stopPropagation(),
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "gb-sheet-head", children: [
            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("h2", { id: "gb-settings-title", children: [
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Icon, { name: "settings", size: 16 }),
              " Settings"
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
              "button",
              {
                type: "button",
                className: "gb-sheet-close",
                "aria-label": "Close settings notice",
                onClick: onClose,
                ref: closeRef,
                children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Icon, { name: "close", size: 15 })
              }
            )
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("p", { className: "gb-notice-body", id: "gb-settings-body", children: [
            "The full settings dialog cannot open from the Grokbot sidebar in this DSH build \u2014 its panel is owned by the native sidebar, which this plugin replaces. Everything it exposes is reachable from",
            " ",
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("strong", { children: "Plugins \u2192 Built-in plugin settings" }),
            "."
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("ul", { className: "gb-notice-list", children: [
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("li", { children: "Built-in plugin settings: subagent, web search, agent loop and shell options." }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("li", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("kbd", { children: "Ctrl+/" }),
              " reviews or assigns keyboard shortcuts."
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "gb-sheet-foot", children: [
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("button", { type: "button", className: "gb-btn gb-btn--secondary", onClick: onClose, children: "Close" }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("button", { type: "button", className: "gb-btn gb-btn--primary", onClick: onOpenPlugins, "data-settings-go": "true", children: "Open Plugins \u2192 Built-in plugin settings" })
          ] })
        ]
      }
    ) });
  }

  // work/plugin/package/src/client/bots/AvatarStudio.jsx
  var import_react8 = __toESM(__require("react"), 1);
  var import_jsx_runtime6 = __require("react/jsx-runtime");
  var MAX_IMAGE_ATTEMPTS = [0.92, 0.86, 0.78, 0.7, 0.6, 0.5];
  function paletteEntryFor(hex) {
    if (!hex) return null;
    const wanted = hex.toLowerCase();
    return BOT_COLOR_LIST.find((entry) => entry.hex.toLowerCase() === wanted) || BOT_COLOR_LIST.find((entry) => entry.previousHex && entry.previousHex.toLowerCase() === wanted) || null;
  }
  function normalizeLookValue(value, avatarSet) {
    const parsed = parseBotAvatarValue(value);
    if (avatarSet === "rakazo" && parsed.kind === "shape") {
      return normalizeHexColor(parsed.color) || DEFAULT_BOT_AVATAR_COLOR;
    }
    return value;
  }
  function baseColorFor(parsed, lastColor) {
    if (parsed.kind === "image" || parsed.kind === "other") return lastColor || DEFAULT_BOT_AVATAR_COLOR;
    return normalizeHexColor(parsed.color || "") || lastColor || DEFAULT_BOT_AVATAR_COLOR;
  }
  function fileToImage(file) {
    return new Promise((resolve, reject) => {
      if (!file || !file.type || !file.type.startsWith("image/")) {
        reject(new Error("That file is not an image. Choose a PNG, JPG, GIF or WebP."));
        return;
      }
      const reader = new FileReader();
      reader.onerror = () => reject(new Error("Could not read that image."));
      reader.onload = () => {
        const src = typeof reader.result === "string" ? reader.result : "";
        if (!src) {
          reject(new Error("Could not read that image."));
          return;
        }
        const image = new Image();
        image.onerror = () => reject(new Error("Could not decode that image."));
        image.onload = () => resolve(image);
        image.src = src;
      };
      reader.readAsDataURL(file);
    });
  }
  function imageToAvatarValue(image) {
    const size = 256;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const context = canvas.getContext("2d");
    if (!context) throw new Error("This browser cannot process images.");
    context.save();
    context.beginPath();
    context.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
    context.clip();
    const minDim = Math.min(image.width, image.height) || 1;
    const sourceX = (image.width - minDim) / 2;
    const sourceY = (image.height - minDim) / 2;
    context.drawImage(image, sourceX, sourceY, minDim, minDim, 0, 0, size, size);
    context.restore();
    let dataUrl = "";
    let webpSupported = false;
    for (const quality of MAX_IMAGE_ATTEMPTS) {
      dataUrl = canvas.toDataURL("image/webp", quality);
      if (dataUrl.startsWith("data:image/webp")) {
        webpSupported = true;
        if (dataUrl.length <= BOT_AVATAR_VALUE_MAX_LENGTH) return dataUrl;
      } else {
        break;
      }
    }
    if (!webpSupported) dataUrl = canvas.toDataURL("image/png");
    if (dataUrl.length > BOT_AVATAR_VALUE_MAX_LENGTH) {
      throw new Error(
        `That image is too large once cropped (${Math.round(dataUrl.length / 1e3)}k characters; the limit is ${Math.round(
          BOT_AVATAR_VALUE_MAX_LENGTH / 1e3
        )}k). Try a smaller or simpler image.`
      );
    }
    return dataUrl;
  }
  function AvatarStudio({
    value = DEFAULT_BOT_AVATAR_COLOR,
    avatarSet = "organic",
    onValueChange,
    onAvatarSetChange,
    identity,
    name,
    status,
    activity = "idle",
    size = 92,
    disabled = false
  }) {
    const [tab, setTab] = import_react8.default.useState("bot");
    const [dragOver, setDragOver] = import_react8.default.useState(false);
    const [imageError, setImageError] = import_react8.default.useState(null);
    const [processing, setProcessing] = import_react8.default.useState(false);
    const fileInputRef = import_react8.default.useRef(null);
    const mountedRef = import_react8.default.useRef(true);
    const lastColorRef = import_react8.default.useRef(DEFAULT_BOT_AVATAR_COLOR);
    import_react8.default.useEffect(() => {
      mountedRef.current = true;
      return () => {
        mountedRef.current = false;
      };
    }, []);
    const parsed = parseBotAvatarValue(value);
    const isImage = parsed.kind === "image";
    const baseColor = baseColorFor(parsed, lastColorRef.current);
    if (!isImage) lastColorRef.current = baseColor;
    const selectedPalette = isImage ? null : paletteEntryFor(baseColor);
    const currentHex = isImage ? DEFAULT_BOT_AVATAR_COLOR : baseColor;
    const shapeIndex = parsed.kind === "shape" ? parsed.shapeIndex : null;
    const isPlainColor = !isImage && parsed.kind !== "shape";
    const chooseShape = (index) => {
      if (disabled || typeof onValueChange !== "function") return;
      setImageError(null);
      onValueChange(shapeAvatarValue(currentHex, index));
    };
    const chooseColor = (entry) => {
      if (disabled || typeof onValueChange !== "function") return;
      setImageError(null);
      const hex = normalizeHexColor(entry.hex) || entry.hex;
      if (shapeIndex !== null && avatarSet === "organic") onValueChange(shapeAvatarValue(hex, shapeIndex));
      else onValueChange(hex);
    };
    const chooseDefault = () => {
      if (disabled) return;
      setImageError(null);
      if (typeof onValueChange === "function") onValueChange(currentHex);
    };
    const chooseSet = (nextSet) => {
      if (disabled || !onAvatarSetChange || nextSet === avatarSet) return;
      onAvatarSetChange(nextSet);
      const nextValue = normalizeLookValue(value, nextSet);
      if (nextValue !== value && typeof onValueChange === "function") onValueChange(nextValue);
    };
    const resetLook = () => {
      if (disabled) return;
      setImageError(null);
      if (typeof onValueChange === "function") onValueChange(currentHex);
    };
    const applyImage = import_react8.default.useCallback(
      async (file) => {
        if (disabled || !file) return;
        setProcessing(true);
        setImageError(null);
        try {
          const image = await fileToImage(file);
          const dataUrl = imageToAvatarValue(image);
          if (!mountedRef.current) return;
          if (typeof onValueChange === "function") onValueChange(dataUrl);
        } catch (error) {
          if (!mountedRef.current) return;
          setImageError(error && error.message ? error.message : "Could not use that image.");
        } finally {
          if (mountedRef.current) setProcessing(false);
        }
      },
      [disabled, onValueChange]
    );
    const onDrop = (event) => {
      event.preventDefault();
      setDragOver(false);
      const file = event.dataTransfer && event.dataTransfer.files ? event.dataTransfer.files[0] : null;
      if (file) void applyImage(file);
    };
    const onPaste = (event) => {
      const items = event.clipboardData && event.clipboardData.items;
      if (!items) return;
      for (let index = 0; index < items.length; index += 1) {
        const item = items[index];
        if (!item || !item.type || !item.type.startsWith("image/")) continue;
        const file = typeof item.getAsFile === "function" ? item.getAsFile() : null;
        if (file) {
          event.preventDefault();
          void applyImage(file);
          break;
        }
      }
    };
    return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
      "section",
      {
        className: "gb-as",
        "data-testid": "avatar-studio",
        "aria-label": "Avatar Studio",
        onPaste,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "gb-as-preview", children: [
            /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
              "button",
              {
                type: "button",
                className: "gb-as-preview-btn",
                "data-testid": "avatar-studio-trigger",
                "aria-label": "Customize bot avatar",
                disabled,
                title: "Customize avatar",
                onClick: () => setTab("bot"),
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
                    BotAvatar,
                    {
                      color: value,
                      avatarSet,
                      identity,
                      activity,
                      size,
                      label: name ? `${name} avatar preview` : "Bot avatar preview"
                    }
                  ),
                  /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "gb-as-preview-pencil", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Icon, { name: "edit", size: 13 }) })
                ]
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "gb-as-preview-text", children: [
              /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("strong", { children: name && name.trim() ? name.trim() : "New bot" }),
              /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { children: status || (avatarSet === "rakazo" ? "Rakazo mascot" : "Original shape") })
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "gb-as-tabbar", children: [
            /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "gb-as-tabs", role: "tablist", "aria-label": "Avatar source", children: [
              /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
                "button",
                {
                  type: "button",
                  role: "tab",
                  id: "gb-as-tab-bot",
                  "aria-selected": tab === "bot",
                  "aria-controls": "gb-as-panel-bot",
                  className: `gb-as-tab${tab === "bot" ? " gb-as-tab--active" : ""}`,
                  onClick: () => setTab("bot"),
                  disabled,
                  children: "Bot"
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
                "button",
                {
                  type: "button",
                  role: "tab",
                  id: "gb-as-tab-upload",
                  "aria-selected": tab === "upload",
                  "aria-controls": "gb-as-panel-upload",
                  className: `gb-as-tab${tab === "upload" ? " gb-as-tab--active" : ""}`,
                  onClick: () => setTab("upload"),
                  disabled,
                  children: "Upload"
                }
              )
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("button", { type: "button", className: "gb-as-reset", onClick: resetLook, disabled, children: "Reset" })
          ] }),
          tab === "bot" ? /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
            "div",
            {
              className: "gb-as-panel",
              id: "gb-as-panel-bot",
              role: "tabpanel",
              "aria-labelledby": "gb-as-tab-bot",
              "data-testid": "avatar-studio-bot-tab",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "gb-as-field", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "gb-as-label", children: "Icon set" }),
                  /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "gb-as-set", role: "group", "aria-label": "Icon set", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
                      "button",
                      {
                        type: "button",
                        className: `gb-as-set-btn${avatarSet === "organic" ? " gb-as-set-btn--active" : ""}`,
                        "aria-pressed": avatarSet === "organic",
                        onClick: () => chooseSet("organic"),
                        disabled,
                        children: "Original"
                      }
                    ),
                    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
                      "button",
                      {
                        type: "button",
                        className: `gb-as-set-btn${avatarSet === "rakazo" ? " gb-as-set-btn--active" : ""}`,
                        "aria-pressed": avatarSet === "rakazo",
                        onClick: () => chooseSet("rakazo"),
                        disabled,
                        children: "Rakazo"
                      }
                    )
                  ] })
                ] }),
                avatarSet === "organic" ? /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "gb-as-field", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "gb-as-field-head", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "gb-as-label", children: "Shape" }),
                    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
                      "button",
                      {
                        type: "button",
                        className: `gb-as-default${isPlainColor ? " gb-as-default--active" : ""}`,
                        "data-testid": "avatar-studio-default",
                        "aria-pressed": isPlainColor,
                        onClick: chooseDefault,
                        disabled,
                        children: "Default"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "gb-shape-grid gb-as-shape-grid", role: "group", "aria-label": "Organic shapes", children: SHIPPED_SHAPE_KEYS.map((key, index) => /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
                    "button",
                    {
                      type: "button",
                      className: `gb-tile gb-as-shape${shapeIndex === index ? " gb-tile--active gb-as-shape--active" : ""}`,
                      "aria-label": SHIPPED_SHAPE_LABELS[key] || key,
                      "aria-pressed": shapeIndex === index,
                      title: SHIPPED_SHAPE_LABELS[key] || key,
                      onClick: () => chooseShape(index),
                      disabled,
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
                          BotAvatar,
                          {
                            color: shapeAvatarValue(currentHex, index),
                            avatarSet: "organic",
                            identity,
                            size: 34,
                            animated: false,
                            label: `${SHIPPED_SHAPE_LABELS[key] || key} shape`
                          }
                        ),
                        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "gb-tile-label gb-as-shape-label", children: SHIPPED_SHAPE_LABELS[key] || key })
                      ]
                    },
                    key
                  )) })
                ] }) : null,
                /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "gb-as-field", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "gb-as-label", children: "Colour" }),
                  /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "gb-color-grid gb-as-color-grid", role: "group", "aria-label": "Avatar colour", children: BOT_COLOR_LIST.map((entry) => {
                    const selected = selectedPalette ? selectedPalette.id === entry.id : currentHex.toLowerCase() === entry.hex.toLowerCase();
                    return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
                      "button",
                      {
                        type: "button",
                        className: `gb-color gb-as-color${selected ? " gb-color--active gb-as-color--active" : ""}`,
                        "aria-label": `Colour ${entry.name} ${entry.hex}`,
                        "aria-pressed": selected,
                        title: entry.name,
                        onClick: () => chooseColor(entry),
                        disabled,
                        children: [
                          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
                            "span",
                            {
                              className: "gb-color-dot gb-as-color-dot",
                              style: { backgroundColor: entry.hex },
                              "aria-hidden": "true"
                            }
                          ),
                          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "gb-color-label gb-as-color-label", children: entry.name.split(" ").slice(-1)[0] })
                        ]
                      },
                      entry.id
                    );
                  }) })
                ] })
              ]
            }
          ) : null,
          tab === "upload" ? /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
            "div",
            {
              className: "gb-as-panel",
              id: "gb-as-panel-upload",
              role: "tabpanel",
              "aria-labelledby": "gb-as-tab-upload",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
                  "button",
                  {
                    type: "button",
                    className: `gb-as-upload${dragOver ? " gb-as-upload--over" : ""}`,
                    "aria-label": "Image upload area",
                    onClick: () => {
                      if (fileInputRef.current) fileInputRef.current.click();
                    },
                    onDragOver: (event) => {
                      event.preventDefault();
                      setDragOver(true);
                    },
                    onDragLeave: () => setDragOver(false),
                    onDrop,
                    disabled: disabled || processing,
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
                        "input",
                        {
                          ref: fileInputRef,
                          type: "file",
                          accept: "image/*",
                          className: "gb-as-file",
                          "aria-label": "Choose an image file",
                          onChange: (event) => {
                            const file = event.target.files && event.target.files[0];
                            if (file) void applyImage(file);
                            event.target.value = "";
                          },
                          hidden: true
                        }
                      ),
                      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "gb-as-upload-icon", "aria-hidden": "true", children: processing ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Spinner, { size: 18 }) : /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Icon, { name: "upload", size: 18 }) }),
                      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { className: "gb-as-upload-text", children: processing ? "Preparing your image\u2026" : "Drag, drop, or paste an image" }),
                      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "gb-as-upload-choose", children: "Choose file" })
                    ]
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { className: "gb-as-hint", children: "Square images crop best. We centre-crop into a circle at 256\xD7256." })
              ]
            }
          ) : null,
          imageError ? /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "gb-as-error", role: "alert", children: [
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Icon, { name: "alert", size: 15 }),
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { children: imageError }),
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
              "button",
              {
                type: "button",
                className: "gb-iconbtn",
                "aria-label": "Dismiss image error",
                onClick: () => setImageError(null),
                children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Icon, { name: "close", size: 13 })
              }
            )
          ] }) : null
        ]
      }
    );
  }
  function AvatarStudioDialog({ bot, activity = "idle", onClose, onSave }) {
    const initial = import_react8.default.useMemo(() => migrateLegacyAvatar(bot), [bot]);
    const [value, setValue] = import_react8.default.useState(() => normalizeLookValue(avatarValueForBot(bot), initial.avatarSet));
    const [avatarSet, setAvatarSet] = import_react8.default.useState(() => initial.avatarSet);
    const [error, setError] = import_react8.default.useState(null);
    const [saving, setSaving] = import_react8.default.useState(false);
    const sheetRef = import_react8.default.useRef(null);
    useFocusTrap(sheetRef, true);
    const close = () => {
      if (!saving) onClose();
    };
    const save = async () => {
      if (saving) return;
      setError(null);
      setSaving(true);
      try {
        await onSave({ color: value, avatarSet });
        setSaving(false);
        onClose();
      } catch (saveError) {
        setError(saveError && saveError.message ? saveError.message : "Could not save this avatar.");
        setSaving(false);
      }
    };
    const onScrimMouseDown = (event) => {
      if (event.target === event.currentTarget && !saving) onClose();
    };
    return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "gb-scrim", onMouseDown: onScrimMouseDown, children: /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
      "div",
      {
        className: "gb-sheet gb-sheet--studio gb-as-sheet",
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": "gb-avatar-studio-title",
        ref: sheetRef,
        onMouseDown: (event) => event.stopPropagation(),
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("header", { className: "gb-sheet-head", children: [
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("h2", { id: "gb-avatar-studio-title", children: "Avatar Studio" }),
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
              "button",
              {
                type: "button",
                className: "gb-sheet-close",
                "aria-label": "Close Avatar Studio",
                onClick: close,
                disabled: saving,
                children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Icon, { name: "close", size: 17 })
              }
            )
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
            AvatarStudio,
            {
              value,
              avatarSet,
              onValueChange: setValue,
              onAvatarSetChange: setAvatarSet,
              identity: bot.id,
              name: bot.name,
              status: bot.tagline || "Local agent",
              activity,
              size: 104,
              disabled: saving
            }
          ),
          error ? /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "gb-as-error", role: "alert", children: [
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Icon, { name: "alert", size: 15 }),
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { children: error })
          ] }) : null,
          /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("footer", { className: "gb-sheet-foot", children: [
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("button", { type: "button", className: "gb-btn gb-btn--secondary", onClick: close, disabled: saving, children: "Cancel" }),
            /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("button", { type: "button", className: "gb-btn gb-btn--primary", onClick: save, disabled: saving, children: [
              saving ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Spinner, { size: 14 }) : /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Icon, { name: "check", size: 15 }),
              "Done"
            ] })
          ] })
        ]
      }
    ) });
  }

  // work/plugin/package/src/client/bots/BotDialog.jsx
  var import_react9 = __toESM(__require("react"), 1);
  var import_jsx_runtime7 = __require("react/jsx-runtime");
  function BotDialog({ mode, bot, onClose, onSave }) {
    const editing = mode === "edit" && bot;
    const seededRef = import_react9.default.useRef(null);
    if (!seededRef.current) seededRef.current = seededAvatarLook("new-bot");
    const seeded = seededRef.current;
    const [name, setName] = import_react9.default.useState(editing ? bot.name : "");
    const [tagline, setTagline] = import_react9.default.useState(editing ? bot.tagline || "" : "");
    const [value, setValue] = import_react9.default.useState(
      () => editing ? normalizeLookValue(avatarValueForBot(bot), migrateLegacyAvatar(bot).avatarSet) : seeded.color
    );
    const [avatarSet, setAvatarSet] = import_react9.default.useState(
      () => editing ? migrateLegacyAvatar(bot).avatarSet : seeded.avatarSet
    );
    const [instructions, setInstructions] = import_react9.default.useState(editing ? bot.instructions || "" : "");
    const [error, setError] = import_react9.default.useState(null);
    const [submitting, setSubmitting] = import_react9.default.useState(false);
    const sheetRef = import_react9.default.useRef(null);
    useFocusTrap(sheetRef, true);
    const previewName = name.trim() || "New GPT";
    const previewTitle = tagline.trim() || "Local agent";
    const submit = async (event) => {
      if (event) event.preventDefault();
      if (submitting) return;
      const trimmedName = name.trim();
      const trimmedInstructions = instructions.trim();
      if (!trimmedName) {
        setError("Give this GPT a name.");
        return;
      }
      if (!trimmedInstructions) {
        setError("Add instructions so the GPT knows what to do.");
        return;
      }
      setError(null);
      setSubmitting(true);
      const draft = {
        name: trimmedName,
        tagline: tagline.trim(),
        color: value,
        avatarSet,
        instructions: trimmedInstructions
      };
      if (editing) {
        draft.id = bot.id;
        if (bot.createdAt) draft.createdAt = bot.createdAt;
      }
      try {
        await onSave(draft);
      } catch (err) {
        setError(err && err.message ? err.message : "Could not save this GPT.");
        setSubmitting(false);
        return;
      }
      setSubmitting(false);
    };
    const onScrimMouseDown = (event) => {
      if (event.target === event.currentTarget && !submitting) onClose();
    };
    return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "gb-scrim", onMouseDown: onScrimMouseDown, children: /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(
      "div",
      {
        className: "gb-sheet gb-sheet--editor",
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": "gb-bot-editor-title",
        ref: sheetRef,
        onMouseDown: (event) => event.stopPropagation(),
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("header", { className: "gb-sheet-head", children: [
            /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("h2", { id: "gb-bot-editor-title", children: editing ? "Edit GPT" : "New GPT" }),
            /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("button", { type: "button", className: "gb-sheet-close", onClick: onClose, "aria-label": "Close", disabled: submitting, children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Icon, { name: "close", size: 17 }) })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("form", { className: "gb-form", onSubmit: submit, noValidate: true, children: [
            /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
              AvatarStudio,
              {
                value,
                avatarSet,
                onValueChange: setValue,
                onAvatarSetChange: setAvatarSet,
                identity: editing ? bot.id : "grokbot-new-bot",
                name: previewName,
                status: previewTitle,
                activity: "idle",
                size: 88,
                disabled: submitting
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "gb-form-row", children: [
              /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("label", { className: "gb-field", children: [
                /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { className: "gb-label", children: "Name" }),
                /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
                  "input",
                  {
                    className: "gb-input",
                    "data-autofocus": "true",
                    value: name,
                    maxLength: 48,
                    placeholder: "Ken",
                    autoComplete: "off",
                    spellCheck: false,
                    onChange: (event) => setName(event.target.value),
                    disabled: submitting
                  }
                )
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("label", { className: "gb-field", children: [
                /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { className: "gb-label", children: "Title" }),
                /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
                  "input",
                  {
                    className: "gb-input",
                    value: tagline,
                    maxLength: 140,
                    placeholder: "Senior engineer",
                    onChange: (event) => setTagline(event.target.value),
                    disabled: submitting
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("label", { className: "gb-field", children: [
              /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { className: "gb-label", children: "Instructions" }),
              /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
                "textarea",
                {
                  className: "gb-textarea",
                  value: instructions,
                  rows: 3,
                  maxLength: 8e3,
                  placeholder: "Describe the bot's expertise, tone and how it should respond. This becomes its persona.",
                  onChange: (event) => setInstructions(event.target.value),
                  disabled: submitting
                }
              )
            ] }),
            error ? /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "gb-form-error", role: "alert", children: [
              /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Icon, { name: "alert", size: 15 }),
              /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { children: error })
            ] }) : null,
            /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("footer", { className: "gb-sheet-foot", children: [
              /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("button", { type: "button", className: "gb-btn gb-btn--secondary", onClick: onClose, disabled: submitting, children: "Cancel" }),
              /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("button", { type: "submit", className: "gb-btn gb-btn--primary", disabled: submitting, children: [
                submitting ? /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Spinner, { size: 14 }) : null,
                editing ? "Save" : "Create GPT"
              ] })
            ] })
          ] })
        ]
      }
    ) });
  }

  // work/plugin/package/src/client/bots/Rooms.jsx
  var import_react10 = __toESM(__require("react"), 1);
  var import_jsx_runtime8 = __require("react/jsx-runtime");
  function CreateRoomDialog({ bots, initialBotIds, onClose, onCreate }) {
    const [name, setName] = import_react10.default.useState("");
    const [selected, setSelected] = import_react10.default.useState(() => {
      const seed = Array.isArray(initialBotIds) ? initialBotIds : [];
      return new Set(seed.filter((id) => bots.some((bot) => bot.id === id)));
    });
    const [error, setError] = import_react10.default.useState(null);
    const [submitting, setSubmitting] = import_react10.default.useState(false);
    const sheetRef = import_react10.default.useRef(null);
    useFocusTrap(sheetRef, true);
    const toggle = (id) => {
      setSelected((previous) => {
        const next = new Set(previous);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        return next;
      });
    };
    const submit = async (event) => {
      if (event) event.preventDefault();
      if (submitting) return;
      const trimmed = name.trim();
      if (!trimmed) {
        setError("Name the room first.");
        return;
      }
      if (selected.size === 0) {
        setError("Pick at least one bot for this room.");
        return;
      }
      setError(null);
      setSubmitting(true);
      try {
        await onCreate({ name: trimmed, botIds: Array.from(selected) });
      } catch (err) {
        setError(err && err.message ? err.message : "Could not create the room.");
        setSubmitting(false);
      }
    };
    const onScrimMouseDown = (event) => {
      if (event.target === event.currentTarget && !submitting) onClose();
    };
    return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "gb-scrim", onMouseDown: onScrimMouseDown, children: /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(
      "div",
      {
        className: "gb-sheet gb-sheet--room",
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": "gb-room-sheet-title",
        ref: sheetRef,
        onMouseDown: (event) => event.stopPropagation(),
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("header", { className: "gb-sheet-head", children: [
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("h2", { id: "gb-room-sheet-title", children: "New room" }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("button", { type: "button", className: "gb-sheet-close", onClick: onClose, "aria-label": "Close", disabled: submitting, children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(Icon, { name: "close", size: 17 }) })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("form", { className: "gb-form", onSubmit: submit, noValidate: true, children: [
            /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "gb-room-preview", children: [
              /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
                StackedAvatars,
                {
                  bots: Array.from(selected).map((id) => bots.find((bot) => bot.id === id)).filter(Boolean),
                  size: 34,
                  max: 3
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { className: "gb-hint", children: selected.size === 0 ? "Pick the bots who join this room." : `${selected.size} bot${selected.size === 1 ? "" : "s"} selected` })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("label", { className: "gb-field", children: [
              /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { className: "gb-label", children: "Room name" }),
              /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
                "input",
                {
                  className: "gb-input",
                  "data-autofocus": "true",
                  value: name,
                  maxLength: 60,
                  placeholder: "Launch brainstorm",
                  autoComplete: "off",
                  onChange: (event) => setName(event.target.value),
                  disabled: submitting
                }
              )
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "gb-field", children: [
              /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { className: "gb-label", children: "Bots" }),
              bots.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("p", { className: "gb-hint", children: "Create a bot first \u2014 rooms need at least one member." }) : /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "gb-picklist", role: "group", "aria-label": "Choose bots", children: bots.map((bot) => {
                const active = selected.has(bot.id);
                return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(
                  "button",
                  {
                    type: "button",
                    className: `gb-pickrow${active ? " gb-pickrow--active" : ""}`,
                    "aria-pressed": active,
                    onClick: () => toggle(bot.id),
                    disabled: submitting,
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(BotAvatar, { bot, size: 32, animated: false }),
                      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { className: "gb-pickrow-name", children: bot.name }),
                      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { className: "gb-pickrow-check", "aria-hidden": "true", children: active ? /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(Icon, { name: "check", size: 14 }) : null })
                    ]
                  },
                  bot.id
                );
              }) })
            ] }),
            error ? /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "gb-form-error", role: "alert", children: [
              /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(Icon, { name: "alert", size: 15 }),
              /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { children: error })
            ] }) : null,
            /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("footer", { className: "gb-sheet-foot", children: [
              /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("button", { type: "button", className: "gb-btn gb-btn--secondary", onClick: onClose, disabled: submitting, children: "Cancel" }),
              /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("button", { type: "submit", className: "gb-btn gb-btn--primary", disabled: submitting || bots.length === 0, children: [
                submitting ? /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(Spinner, { size: 14 }) : null,
                "Create room"
              ] })
            ] })
          ] })
        ]
      }
    ) });
  }
  function RoomChat({ room, bots, onRoomUpdate, onBusyChange }) {
    const [text, setText] = import_react10.default.useState("");
    const [sending, setSending] = import_react10.default.useState(false);
    const [error, setError] = import_react10.default.useState(null);
    const [failedText, setFailedText] = import_react10.default.useState(null);
    const [optimistic, setOptimistic] = import_react10.default.useState(null);
    const [typingBots, setTypingBots] = import_react10.default.useState([]);
    const transcriptRef = import_react10.default.useRef(null);
    const inputRef = import_react10.default.useRef(null);
    const byId = import_react10.default.useMemo(() => new Map(bots.map((bot) => [bot.id, bot])), [bots]);
    const roomBots = import_react10.default.useMemo(
      () => (room.botIds || []).map((id) => byId.get(id)).filter(Boolean),
      [room.botIds, byId]
    );
    const transcript = Array.isArray(room.transcript) ? room.transcript : [];
    const messages = optimistic ? transcript.concat(optimistic) : transcript;
    const pendingBot = room.pending ? byId.get(room.pending.botId) : null;
    import_react10.default.useEffect(() => {
      const node = transcriptRef.current;
      if (node) node.scrollTop = node.scrollHeight;
    }, [room.id, messages.length, sending, typingBots.length]);
    import_react10.default.useEffect(() => {
      const node = inputRef.current;
      if (!node) return;
      node.style.height = "auto";
      node.style.height = `${Math.min(node.scrollHeight, 140)}px`;
    }, [text]);
    import_react10.default.useEffect(() => {
      if (inputRef.current) inputRef.current.focus();
    }, [room.id]);
    import_react10.default.useEffect(() => {
      if (typeof onBusyChange === "function") onBusyChange(sending);
      return () => {
        if (typeof onBusyChange === "function") onBusyChange(false);
      };
    }, [sending, onBusyChange]);
    const send = async (value) => {
      const trimmed = String(value || "").trim();
      if (!trimmed || sending) return;
      setSending(true);
      setError(null);
      setFailedText(null);
      setText("");
      setTypingBots(respondersFor(room, bots, trimmed));
      const optimisticMessage = { id: `pending-${Date.now()}`, role: "user", text: trimmed, ts: Date.now() };
      setOptimistic(optimisticMessage);
      try {
        const payload = await api.sendRoom(room.id, trimmed);
        const nextRoom = normalizeRoom(payload && payload.room);
        if (nextRoom && nextRoom.id) {
          onRoomUpdate(nextRoom);
        } else {
          const replies = payload && Array.isArray(payload.replies) ? payload.replies : [];
          const fallback = normalizeRoom({
            ...room,
            transcript: transcript.concat({ id: `local-${Date.now()}`, role: "user", text: trimmed, ts: Date.now() }, ...replies)
          });
          if (!fallback) throw new Error("The room reply was malformed.");
          onRoomUpdate(fallback);
        }
      } catch (err) {
        setError(err && err.message ? err.message : "Could not send that message.");
        setFailedText(trimmed);
      } finally {
        setSending(false);
        setTypingBots([]);
        setOptimistic(null);
        if (inputRef.current) inputRef.current.focus();
      }
    };
    const insertMention = (bot) => {
      setText((previous) => {
        const base = previous && !/\s$/.test(previous) && previous.length ? `${previous} ` : previous;
        return `${base || ""}@${bot.name} `;
      });
      if (inputRef.current) inputRef.current.focus();
    };
    const onComposerKeyDown = (event) => {
      if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
        event.preventDefault();
        send(text);
      }
    };
    return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "gb-chat", children: [
      /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "gb-transcript", ref: transcriptRef, role: "log", "aria-live": "polite", "aria-relevant": "additions", children: [
        messages.length === 0 && !sending ? /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "gb-chat-empty", children: [
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(StackedAvatars, { bots: roomBots, size: 40, max: 3 }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("h3", { children: "Start the conversation" }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("p", { children: roomBots.length ? `${roomBots.map((bot) => bot.name).join(", ")} ${roomBots.length === 1 ? "is" : "are"} in this room. Mention someone with @ to direct the reply \u2014 bots can ping each other with @Name and ask you for approval with @user.` : "This room has no bots yet." })
        ] }) : null,
        messages.map((message) => /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(MessageRow, { message, byId, bots: roomBots }, message.id)),
        sending ? (typingBots.length ? typingBots : roomBots.slice(0, 1)).map((bot) => /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "gb-msg gb-msg--bot", children: [
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
            BotAvatar,
            {
              bot: bot || { id: "grokbot-typing", name: "Bot", color: "#A97EFE", avatarSet: "rakazo" },
              size: 28,
              activity: "writing"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "gb-msg-body", children: [
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { className: "gb-msg-name", children: bot ? bot.name : "Bots" }),
            /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "gb-typing-bubble", children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(TypingDots, {}) })
          ] })
        ] }, `typing-${bot ? bot.id : "bot"}`)) : null
      ] }),
      error ? /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "gb-chat-error", role: "alert", children: [
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(Icon, { name: "alert", size: 15 }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { children: error }),
        failedText ? /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("button", { type: "button", className: "gb-btn gb-btn--secondary gb-btn--sm", onClick: () => send(failedText), disabled: sending, children: "Retry" }) : null,
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("button", { type: "button", className: "gb-iconbtn", "aria-label": "Dismiss error", onClick: () => setError(null), children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(Icon, { name: "close", size: 14 }) })
      ] }) : null,
      room.pending && !sending ? /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "gb-waiting", role: "status", children: [
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(Icon, { name: "spark", size: 14 }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { children: pendingBot ? `${pendingBot.name} is waiting for your answer \u2014 reply to resume the room` : "The room is waiting for your answer \u2014 reply to resume" })
      ] }) : null,
      /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "gb-composer", children: [
        roomBots.length ? /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "gb-mentions", role: "group", "aria-label": "Mention a bot", children: [
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { className: "gb-mentions-label", children: "Mention" }),
          roomBots.map((bot) => /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(
            "button",
            {
              type: "button",
              className: "gb-mention",
              onClick: () => insertMention(bot),
              "aria-label": `Mention ${bot.name}`,
              children: [
                "@",
                bot.name
              ]
            },
            bot.id
          ))
        ] }) : null,
        /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "gb-composer-pill", children: [
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
            "textarea",
            {
              ref: inputRef,
              className: "gb-composer-input",
              value: text,
              rows: 1,
              placeholder: `Message ${room.name}\u2026`,
              "aria-label": `Message ${room.name}`,
              onChange: (event) => setText(event.target.value),
              onKeyDown: onComposerKeyDown,
              disabled: sending
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
            "button",
            {
              type: "button",
              className: "gb-send",
              "aria-label": "Send message",
              title: "Send message (Enter)",
              disabled: sending || !text.trim(),
              onClick: () => send(text),
              children: sending ? /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(Spinner, { size: 15 }) : /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(Icon, { name: "arrowUp", size: 17 })
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("p", { className: "gb-composer-hint", children: "Enter to send \xB7 Shift+Enter for a new line \xB7 @Name pings a bot \xB7 @user is how bots ask you" })
      ] })
    ] });
  }
  function escapeRegExp(value) {
    return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }
  function renderRoomText(text, bots) {
    const names = [
      ...(Array.isArray(bots) ? bots : []).map((bot) => bot && typeof bot.name === "string" ? bot.name : "").filter(Boolean),
      // Bots ask the user with @user; highlight it like a bot ping.
      "user"
    ].sort((left, right) => right.length - left.length);
    if (!names.length) return text;
    let pattern;
    try {
      pattern = new RegExp(`(@(?:${names.map(escapeRegExp).join("|")}))(?![\\p{L}\\p{N}_])`, "giu");
    } catch {
      return text;
    }
    const parts = [];
    let last = 0;
    for (const match of text.matchAll(pattern)) {
      if (typeof match.index !== "number") continue;
      if (match.index > last) parts.push(text.slice(last, match.index));
      parts.push(
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { className: "gb-mention gb-mention--inline", children: match[0] }, `${match.index}-${match[0]}`)
      );
      last = match.index + match[0].length;
    }
    if (!parts.length) return text;
    if (last < text.length) parts.push(text.slice(last));
    return parts;
  }
  function MessageRow({ message, byId, bots }) {
    if (!message || typeof message !== "object") return null;
    const text = typeof message.text === "string" ? message.text : "";
    if (!text) return null;
    if (message.role === "system") {
      return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "gb-msg gb-msg--system", children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { children: text }) });
    }
    if (message.role === "user") {
      return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "gb-msg gb-msg--user", children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "gb-bubble gb-bubble--user", children: renderRoomText(text, bots) }) });
    }
    const bot = byId.get(message.botId) || { id: message.botId || "bot", name: "Bot" };
    return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "gb-msg gb-msg--bot", children: [
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(BotAvatar, { bot, size: 28, activity: "idle" }),
      /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "gb-msg-body", children: [
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { className: "gb-msg-name", children: bot.name }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "gb-msg-text", children: renderRoomText(text, bots) })
      ] })
    ] });
  }

  // work/plugin/package/src/client/bots/RoomSurface.jsx
  var import_react11 = __toESM(__require("react"), 1);
  var import_jsx_runtime9 = __require("react/jsx-runtime");
  function RoomSurface({ registry, frameEl }) {
    const nav = registry.useNav();
    const data = registry.useBots();
    const busy = registry.useBusy();
    const room = nav.roomId ? data.rooms.find((candidate) => candidate.id === nav.roomId) || null : null;
    const layerRef = import_react11.default.useRef(null);
    import_react11.default.useEffect(() => {
      if (!room) return void 0;
      const frame = frameEl();
      const node = layerRef.current;
      if (!frame || !node) return void 0;
      const measure = () => {
        node.style.left = `${sidebarTrack(frame)}px`;
      };
      measure();
      let observer2 = null;
      if (typeof ResizeObserver === "function") {
        observer2 = new ResizeObserver(measure);
        observer2.observe(frame);
      }
      return () => {
        if (observer2) observer2.disconnect();
      };
    }, [frameEl, room]);
    if (!room) return null;
    const bots = data.bots;
    const byId = new Map(bots.map((bot) => [bot.id, bot]));
    const members = (room.botIds || []).map((id) => byId.get(id)).filter(Boolean);
    const replying = busy && busy.roomId === room.id && busy.busy;
    const updateRoom = (next) => {
      const normalized = normalizeRoom(next);
      if (!normalized) return;
      registry.bots.updateRoom(normalized);
    };
    return /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(
      "div",
      {
        ref: layerRef,
        className: "gb-s gb-sroom-layer",
        role: "region",
        "aria-label": `${room.name} group chat`,
        "data-grokbot-room": room.id,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("header", { className: "gb-sroom-head", children: [
            /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { style: { minWidth: 0 }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("h1", { children: room.name }),
              /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("span", { className: "gb-sroom-sub", children: [
                /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(StackedAvatars, { bots: members, size: 18, max: 3 }),
                members.length === 1 ? "1 bot" : `${members.length} bots`,
                replying ? " \xB7 replying\u2026" : room.pending ? " \xB7 waiting for you" : ""
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: "gb-sroom-actions", children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
              "button",
              {
                type: "button",
                className: "gb-s-iconbtn",
                "aria-label": "Close group chat",
                title: "Close group chat",
                onClick: () => registry.nav.dispatch({ type: "close-room" }),
                children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(Icon, { name: "close", size: 16 })
              }
            ) })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: "gb-sroom-body", children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
            RoomChat,
            {
              room,
              bots,
              onRoomUpdate: updateRoom,
              onBusyChange: (value) => registry.busy.set({ roomId: room.id, busy: !!value })
            }
          ) })
        ]
      }
    );
  }
  function sidebarTrack(frame) {
    try {
      const columns = window.getComputedStyle(frame).gridTemplateColumns || "";
      const first = parseFloat(String(columns).trim().split(/\s+/)[0] || "");
      return Number.isFinite(first) ? first : 0;
    } catch {
      return 0;
    }
  }

  // work/plugin/package/src/client/bots/BotsRoot.jsx
  var import_jsx_runtime10 = __require("react/jsx-runtime");
  function notifyBotsChanged() {
    try {
      window.dispatchEvent(new CustomEvent("grokbot:bots-changed"));
    } catch {
    }
  }
  function findFrame() {
    const column = document.querySelector('[data-slot="sidebar"]');
    if (column && column.parentElement) {
      const grid = column.parentElement.parentElement;
      if (grid) return grid;
    }
    return null;
  }
  function BotsRoot({ ctx, registry, ...slotProps }) {
    const dataState = registry.useBots();
    const dialogsState = registry.useDialogs();
    const { toasts } = registry.useToasts();
    const mountedRef = import_react12.default.useRef(true);
    import_react12.default.useEffect(() => {
      mountedRef.current = true;
      return () => {
        mountedRef.current = false;
      };
    }, []);
    const botsStore = registry.botsStore;
    const load = import_react12.default.useCallback(
      async ({ quiet = false } = {}) => {
        const current = botsStore.getState();
        if (!quiet) {
          botsStore.set({ status: current.status === "ready" ? "ready" : "loading", error: null });
        }
        try {
          const payload = await api.getState();
          const next = normalizeState(payload);
          if (!mountedRef.current) return null;
          botsStore.set({ status: "ready", bots: next.bots, rooms: next.rooms, model: next.model, error: null });
          return next;
        } catch (error) {
          if (!mountedRef.current) return null;
          const message = error && error.message ? error.message : "Could not reach the local bot service.";
          botsStore.set({ status: botsStore.getState().status === "ready" ? "ready" : "error", error: message });
          if (!quiet) registry.toast(message, "error");
          return null;
        }
      },
      [botsStore, registry]
    );
    registry.reload = load;
    import_react12.default.useEffect(() => {
      void load();
      const onVisible = () => {
        if (!document.hidden) void load({ quiet: true });
      };
      document.addEventListener("visibilitychange", onVisible);
      return () => document.removeEventListener("visibilitychange", onVisible);
    }, []);
    const useSessions = typeof slotProps.useSessions === "function" ? slotProps.useSessions : () => null;
    const useSessionStatus = typeof slotProps.useSessionStatus === "function" ? slotProps.useSessionStatus : () => null;
    const sessionsState = useSessions((state) => state);
    const sessionStatusSnapshot = useSessionStatus((snapshot) => snapshot);
    const previousSessionSnapshot = import_react12.default.useRef(null);
    const notificationFailureLogged = import_react12.default.useRef(false);
    const notifyNative = import_react12.default.useCallback(
      (kind, sessionId) => {
        const session = sessionsState && sessionsState.byId ? sessionsState.byId[sessionId] : null;
        const sessionName = session && session.displayTitle ? session.displayTitle : "Agent";
        void api.notifyAgent(kind, sessionName).catch((error) => {
          if (notificationFailureLogged.current) return;
          notificationFailureLogged.current = true;
          console.warn("[grokbot-ui] Could not deliver an Omarchy desktop notification", error);
        });
      },
      [sessionsState]
    );
    import_react12.default.useEffect(() => {
      if (!sessionStatusSnapshot || typeof sessionStatusSnapshot.forEach !== "function") return;
      const previous = previousSessionSnapshot.current;
      const current = new Map(sessionStatusSnapshot);
      previousSessionSnapshot.current = { statuses: current, sessionsState };
      for (const [sessionId, status] of current) {
        const before = previous ? previous.statuses.get(sessionId) : void 0;
        const pending = status && status.pendingInteraction;
        if (pending && (!before || !before.pendingInteraction || before.pendingInteraction.key !== pending.key)) {
          if (pending.kind === "approval" || pending.kind === "question") notifyNative(pending.kind, sessionId);
        }
        const previousSummary = previous && previous.sessionsState && previous.sessionsState.byId ? previous.sessionsState.byId[sessionId] : null;
        const currentSummary = sessionsState && sessionsState.byId ? sessionsState.byId[sessionId] : null;
        const wasRunning = before && typeof before.running === "boolean" ? before.running : previousSummary && previousSummary.running;
        const isRunning = status && typeof status.running === "boolean" ? status.running : currentSummary && currentSummary.running;
        const finished = wasRunning === true && isRunning === false && !pending || previous && !before && status && status.completionUnread && !pending;
        if (finished) notifyNative("finished", sessionId);
      }
    }, [sessionStatusSnapshot, sessionsState, notifyNative]);
    const bots = dataState.bots;
    const rooms = dataState.rooms;
    const afterBots = import_react12.default.useCallback(
      (payload) => {
        const nextBots = normalizeBots(payload && payload.bots);
        if (nextBots) botsStore.set({ bots: nextBots });
        notifyBotsChanged();
        void load({ quiet: true });
      },
      [botsStore, load]
    );
    const saveBot = import_react12.default.useCallback(
      async (draft) => {
        const payload = await api.saveBot(draft);
        afterBots(payload);
        registry.dialogs.dispatch({ type: "close-bot-dialog" });
        registry.toast(draft && draft.id ? "GPT saved." : "GPT created.", "success");
        if (payload && typeof payload.warning === "string" && payload.warning) registry.toast(payload.warning, "error");
      },
      [afterBots, registry]
    );
    const saveBotAvatar = import_react12.default.useCallback(
      async (bot, patch) => {
        const draft = {
          id: bot.id,
          name: bot.name,
          tagline: bot.tagline || "",
          instructions: bot.instructions || "",
          color: patch.color,
          avatarSet: patch.avatarSet
        };
        if (bot.createdAt) draft.createdAt = bot.createdAt;
        const payload = await api.saveBot(draft);
        afterBots(payload);
        registry.toast("Look updated.", "success");
        if (payload && typeof payload.warning === "string" && payload.warning) registry.toast(payload.warning, "error");
      },
      [afterBots, registry]
    );
    const deleteBot = import_react12.default.useCallback(
      async (bot) => {
        registry.dialogs.dispatch({ type: "busy", busy: true });
        try {
          const payload = await api.deleteBot(bot.id);
          afterBots(payload);
          registry.dialogs.dispatch({ type: "close-confirm" });
          registry.dialogs.dispatch({ type: "close-studio" });
          registry.toast(`${bot.name} deleted.`, "success");
        } catch (error) {
          registry.toast(error && error.message ? error.message : "Could not delete this GPT.", "error");
        } finally {
          if (mountedRef.current) registry.dialogs.dispatch({ type: "busy", busy: false });
        }
      },
      [afterBots, registry]
    );
    const createRoom = import_react12.default.useCallback(
      async ({ name, botIds }) => {
        const payload = await api.createRoom(name, botIds);
        const nextRooms = normalizeRooms(payload && payload.rooms);
        const created = normalizeRoom(payload && payload.room);
        if (nextRooms) botsStore.set({ rooms: nextRooms });
        const room = created || (nextRooms && nextRooms.length ? nextRooms[nextRooms.length - 1] : null);
        registry.dialogs.dispatch({ type: "close-room-dialog" });
        if (room) {
          registry.nav.dispatch({ type: "open-room", roomId: room.id });
        } else {
          registry.nav.dispatch({ type: "select-section", section: "rooms" });
        }
        registry.toast("Group chat created.", "success");
        void load({ quiet: true });
      },
      [botsStore, registry, load]
    );
    const deleteRoom = import_react12.default.useCallback(
      async (room) => {
        registry.dialogs.dispatch({ type: "busy", busy: true });
        try {
          const payload = await api.deleteRoom(room.id);
          const nextRooms = normalizeRooms(payload && payload.rooms);
          if (nextRooms) botsStore.set({ rooms: nextRooms });
          registry.dialogs.dispatch({ type: "close-confirm" });
          registry.toast(`${room.name} deleted.`, "success");
          void load({ quiet: true });
        } catch (error) {
          registry.toast(error && error.message ? error.message : "Could not delete this group chat.", "error");
        } finally {
          if (mountedRef.current) registry.dialogs.dispatch({ type: "busy", busy: false });
        }
      },
      [botsStore, registry, load]
    );
    const dialogsRef = import_react12.default.useRef(dialogsState);
    dialogsRef.current = dialogsState;
    import_react12.default.useEffect(() => {
      const onKeyDown = (event) => {
        if (event.key !== "Escape") return;
        const current = dialogsRef.current;
        const top = current.confirm ? { type: "close-confirm" } : current.studio ? { type: "close-studio" } : current.botDialog ? { type: "close-bot-dialog" } : current.roomDialog ? { type: "close-room-dialog" } : null;
        if (!top) return;
        event.preventDefault();
        event.stopPropagation();
        registry.dialogs.dispatch(top);
      };
      window.addEventListener("keydown", onKeyDown, true);
      return () => window.removeEventListener("keydown", onKeyDown, true);
    }, [registry]);
    const botDialog = dialogsState.botDialog;
    const dialogBot = botDialog && botDialog.botId ? bots.find((bot) => bot.id === botDialog.botId) || null : null;
    const studio = dialogsState.studio;
    const studioBot = studio ? bots.find((bot) => bot.id === studio.botId) || null : null;
    const confirm = dialogsState.confirm;
    const confirmBot = confirm && confirm.kind === "bot" ? bots.find((bot) => bot.id === confirm.id) || null : null;
    const confirmRoom = confirm && confirm.kind === "room" ? rooms.find((room) => room.id === confirm.id) || null : null;
    const activities = useBotActivities(bots, slotProps.useSessions, slotProps.useSessionStatus);
    const frame = typeof document !== "undefined" ? findFrame() : null;
    const dismissToast = (id) => registry.toastStore.dismiss(id);
    const openPluginsFromSettings = () => {
      registry.dialogs.dispatch({ type: "close-settings" });
      try {
        if (ctx && ctx.layout && typeof ctx.layout.selectPanel === "function") {
          ctx.layout.selectPanel("plugins");
          return;
        }
        throw new Error("Panels are not available yet.");
      } catch (error) {
        registry.toast(error && error.message ? error.message : "The Plugins panel is not available yet.", "error");
      }
    };
    return /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(import_jsx_runtime10.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("style", { "data-grokbot-bots": "true", children: styles_default + sidebar_default }),
      /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(BotsErrorBoundary, { children: [
        frame ? import_react_dom.default.createPortal(/* @__PURE__ */ (0, import_jsx_runtime10.jsx)(RoomSurface, { registry, frameEl: findFrame }), frame) : null,
        botDialog ? /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
          BotDialog,
          {
            mode: botDialog.mode,
            bot: dialogBot,
            onClose: () => registry.dialogs.dispatch({ type: "close-bot-dialog" }),
            onSave: saveBot
          }
        ) : null,
        dialogsState.roomDialog ? /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
          CreateRoomDialog,
          {
            bots,
            initialBotIds: dialogsState.roomDialog.botIds,
            onClose: () => registry.dialogs.dispatch({ type: "close-room-dialog" }),
            onCreate: createRoom
          }
        ) : null,
        studioBot ? /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
          AvatarStudioDialog,
          {
            bot: studioBot,
            activity: botActivity(activities, studioBot.id),
            onClose: () => registry.dialogs.dispatch({ type: "close-studio" }),
            onSave: (patch) => saveBotAvatar(studioBot, patch)
          }
        ) : null,
        confirm && (confirmBot || confirmRoom) ? /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
          ConfirmDialog,
          {
            title: confirmBot ? `Delete ${confirmBot.name}?` : `Delete ${confirmRoom.name}?`,
            description: confirmBot ? `The GPT and its agent preset are removed. Its past chats stay in "All chats" under "${confirmBot.id} (deleted)".` : "The group chat and its transcript are removed. The assistants themselves stay.",
            confirmLabel: "Delete",
            busy: dialogsState.busy,
            onConfirm: () => confirmBot ? deleteBot(confirmBot) : deleteRoom(confirmRoom),
            onClose: () => registry.dialogs.dispatch({ type: "close-confirm" })
          }
        ) : null,
        dialogsState.settingsNotice ? /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
          SettingsNotice,
          {
            onOpenPlugins: openPluginsFromSettings,
            onClose: () => registry.dialogs.dispatch({ type: "close-settings" })
          }
        ) : null,
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(ToastStack, { toasts, onDismiss: dismissToast, raised: ctx ? true : false })
      ] })
    ] });
  }

  // work/plugin/package/src/client/bots/GptSettings.jsx
  var import_react13 = __toESM(__require("react"), 1);
  var import_jsx_runtime11 = __require("react/jsx-runtime");
  function GptSettings({ registry, close }) {
    const data = registry.useBots();
    const go = (action) => {
      close();
      window.setTimeout(() => registry.dialogs.dispatch(action), 0);
    };
    return /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "dsh-gpt-settings", children: [
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("style", { children: `
      .dsh-gpt-settings { max-width: 680px; padding: 4px 4px 24px; color: var(--dsw-alias-label-primary, #222); }
      .dsh-gpt-settings h2 { margin: 0 0 7px; font-size: 23px; letter-spacing: -.02em; }
      .dsh-gpt-settings p { margin: 0; color: var(--dsw-alias-label-caption, #777); font-size: 13px; line-height: 1.5; }
      .dsh-gpt-settings-head { display:flex; gap:16px; align-items:flex-start; justify-content:space-between; flex-wrap:wrap; }
      .dsh-gpt-settings button { cursor:pointer; font:inherit; }
      .dsh-gpt-create { border:0; border-radius:10px; padding:9px 14px; background:var(--dsw-alias-label-primary,#222); color:var(--dsw-alias-bg-base,#fff); font-weight:600!important; }
      .dsh-gpt-settings-list { display:grid; gap:8px; margin-top:24px; }
      .dsh-gpt-settings-row { display:flex; align-items:center; gap:12px; padding:12px; border:1px solid var(--dsw-alias-border-l4,rgba(128,128,128,.2)); border-radius:13px; }
      .dsh-gpt-settings-info { flex:1; min-width:0; display:flex; flex-direction:column; gap:3px; }
      .dsh-gpt-settings-info strong { overflow:hidden; text-overflow:ellipsis; font-size:14px; }
      .dsh-gpt-settings-info small { color:var(--dsw-alias-label-caption,#777); font-size:12px; }
      .dsh-gpt-action { border:1px solid var(--dsw-alias-border-l4,rgba(128,128,128,.2)); border-radius:8px; padding:7px 10px; color:inherit; background:transparent; font-size:12px!important; }
      .dsh-gpt-action--delete { color:#c43f4d; }
      .dsh-gpt-empty { padding:22px; border:1px dashed var(--dsw-alias-border-l4,rgba(128,128,128,.25)); border-radius:13px; }
      .dsh-gpt-settings button:focus-visible { outline:2px solid #8b6fe8; outline-offset:2px; }
      @media(max-width:650px) { .dsh-gpt-settings-row { flex-wrap:wrap; } }
    ` }),
      /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "dsh-gpt-settings-head", children: [
        /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("h2", { children: "Your GPTs" }),
          /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("p", { children: "Create a GPT, change its instructions or look, or remove one." })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("button", { className: "dsh-gpt-create", onClick: () => go({ type: "edit-bot", botId: null }), children: "+ New GPT" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("div", { className: "dsh-gpt-settings-list", children: data.status === "loading" || data.status === "idle" ? /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("p", { children: "Loading GPTs\u2026" }) : data.bots.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("p", { className: "dsh-gpt-empty", children: "No GPTs yet. Create one to get started." }) : data.bots.map((bot) => /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "dsh-gpt-settings-row", children: [
        /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(BotAvatar, { bot, size: 36, activity: "idle" }),
        /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("span", { className: "dsh-gpt-settings-info", children: [
          /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("strong", { children: bot.name }),
          /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("small", { children: bot.tagline || "GPT" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("button", { className: "dsh-gpt-action", "aria-label": `Edit ${bot.name}`, onClick: () => go({ type: "edit-bot", botId: bot.id }), children: "Edit" }),
        /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("button", { className: "dsh-gpt-action dsh-gpt-action--delete", "aria-label": `Delete ${bot.name}`, onClick: () => go({ type: "confirm-delete-bot", botId: bot.id }), children: "Delete" })
      ] }, bot.id)) })
    ] });
  }
  function GptSettingsIcon({ size = 16 }) {
    return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(Icon, { name: "spark", size });
  }

  // work/plugin/package/src/client/bots/GrokDictation.jsx
  var import_react14 = __toESM(__require("react"), 1);
  var import_jsx_runtime12 = __require("react/jsx-runtime");
  function RecordingWaveform({ stream }) {
    const bars = import_react14.default.useRef(null);
    import_react14.default.useEffect(() => {
      if (!stream) return;
      let audio, frame;
      try {
        audio = new AudioContext();
        const source = audio.createMediaStreamSource(stream);
        const analyser = audio.createAnalyser();
        analyser.fftSize = 256;
        analyser.smoothingTimeConstant = 0.7;
        source.connect(analyser);
        const data = new Uint8Array(analyser.frequencyBinCount);
        const draw = () => {
          analyser.getByteFrequencyData(data);
          const nodes = bars.current?.children || [];
          for (let i = 0; i < nodes.length; i++) {
            const bin = 2 + Math.floor(i * 28 / nodes.length);
            const level = Math.max(data[bin], data[bin + 1]) / 255;
            nodes[i].style.transform = `scaleY(${Math.max(0.16, level)})`;
          }
          frame = requestAnimationFrame(draw);
        };
        draw();
      } catch {
      }
      return () => {
        cancelAnimationFrame(frame);
        audio?.close().catch(() => {
        });
      };
    }, [stream]);
    return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("span", { className: "dsh-dictation-wave", ref: bars, "aria-hidden": "true", children: Array.from({ length: 15 }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("span", {}, i)) });
  }
  function GrokDictation({ inputActions, locked }) {
    const [phase, setPhase] = import_react14.default.useState("idle");
    const [message, setMessage] = import_react14.default.useState("");
    const [pending, setPending] = import_react14.default.useState("");
    const capture = import_react14.default.useRef(null);
    const mounted = import_react14.default.useRef(true);
    import_react14.default.useEffect(() => () => {
      mounted.current = false;
      const current = capture.current;
      if (current) {
        current.cancelled = true;
        current.controller?.abort();
        if (current.recorder && current.recorder.state !== "inactive") current.recorder.stop();
        current.stream?.getTracks().forEach((track) => track.stop());
      }
    }, []);
    const start = async () => {
      if (!inputActions || phase !== "idle") return;
      setMessage("");
      const current = { cancelled: false, chunks: [], span: inputActions.captureInsertion(), controller: new AbortController() };
      capture.current = current;
      setPhase("requesting");
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        if (current.cancelled || !mounted.current) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }
        current.stream = stream;
        const options = MediaRecorder.isTypeSupported("audio/webm;codecs=opus") ? { mimeType: "audio/webm;codecs=opus", audioBitsPerSecond: 32e3 } : { audioBitsPerSecond: 32e3 };
        const recorder = new MediaRecorder(stream, options);
        current.recorder = recorder;
        recorder.ondataavailable = (event) => {
          if (event.data.size) current.chunks.push(event.data);
        };
        recorder.onerror = () => {
          current.cancelled = true;
          stream.getTracks().forEach((track) => track.stop());
          if (mounted.current) {
            setMessage("Recording failed. Please try again.");
            setPhase("idle");
          }
        };
        recorder.onstop = async () => {
          stream.getTracks().forEach((track) => track.stop());
          if (current.cancelled || !mounted.current) return;
          setPhase("transcribing");
          try {
            const blob = new Blob(current.chunks, { type: recorder.mimeType || "audio/webm" });
            if (!blob.size) throw new Error("No audio was recorded. Please try again.");
            if (blob.size > 7e5) throw new Error("Recording is too long. Please try a shorter recording.");
            const data = new Uint8Array(await blob.arrayBuffer());
            let binary = "";
            for (let i = 0; i < data.length; i += 16384) binary += String.fromCharCode(...data.subarray(i, i + 16384));
            const response = await fetch("/grokbot/api/transcribe", { method: "POST", headers: { "content-type": "application/json", "x-dsh-dictation": "1" }, body: JSON.stringify({ audio: btoa(binary), type: blob.type }), signal: current.controller.signal });
            const result = await response.json().catch(() => ({}));
            if (!response.ok) throw new Error(result.error || "Transcription failed. Please try again.");
            if (!mounted.current || current.cancelled) return;
            if (!result.text?.trim()) throw new Error("No speech was recognised. Please try again.");
            if (!inputActions.insertText(result.text, current.span)) {
              setPending(result.text);
              setMessage("Your draft changed while recording. Insert the transcript when ready.");
            } else setMessage("");
            setPhase("idle");
          } catch (error) {
            if (mounted.current && !current.cancelled) {
              setMessage(error?.message || "Transcription failed. Please try again.");
              setPhase("idle");
            }
          }
        };
        recorder.start();
        current.timer = window.setTimeout(() => {
          if (recorder.state === "recording") recorder.stop();
        }, 12e4);
        setPhase("recording");
      } catch (error) {
        if (mounted.current && !current.cancelled) {
          setMessage(error?.name === "NotAllowedError" ? "Microphone access was denied. Check macOS microphone permissions." : "Microphone unavailable. Check its permissions and try again.");
          setPhase("idle");
        }
      }
    };
    const stop = () => {
      const current = capture.current;
      if (!current?.recorder) return;
      window.clearTimeout(current.timer);
      if (current.recorder.state !== "inactive") current.recorder.stop();
    };
    const cancel = () => {
      const current = capture.current;
      if (current) {
        current.cancelled = true;
        window.clearTimeout(current.timer);
        current.controller.abort();
        if (current.recorder?.state !== "inactive") current.recorder?.stop();
        current.stream?.getTracks().forEach((track) => track.stop());
      }
      setPhase("idle");
      setMessage("");
    };
    return /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("span", { className: "dsh-dictation-wrap", children: [
      message && /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("span", { className: "dsh-dictation-message", role: "status", children: [
        message,
        pending && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("button", { type: "button", onClick: () => {
          if (inputActions.insertText(pending, inputActions.captureInsertion())) {
            setPending("");
            setMessage("");
          }
        }, children: "Insert" })
      ] }),
      phase === "recording" ? /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(import_jsx_runtime12.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("button", { type: "button", className: "dsh-dictation-cancel", "aria-label": "Cancel recording", onClick: cancel, children: "\xD7" }),
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(RecordingWaveform, { stream: capture.current?.stream }),
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("button", { type: "button", className: "dsh-apple-dictation is-recording", "aria-label": "Stop recording and transcribe", title: "Stop recording and transcribe", onClick: stop, children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("span", { className: "dsh-dictation-stop" }) })
      ] }) : phase === "transcribing" || phase === "requesting" ? /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(import_jsx_runtime12.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("span", { className: "dsh-dictation-status", role: "status", children: phase === "requesting" ? "Starting\u2026" : "Transcribing\u2026" }),
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("button", { type: "button", className: "dsh-dictation-cancel", "aria-label": "Cancel dictation", onClick: cancel, children: "\xD7" })
      ] }) : /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("button", { type: "button", className: "dsh-apple-dictation", disabled: locked || !inputActions, "aria-label": "Start dictation with Grok", title: "Dictate with Grok STT (audio sent to OpenRouter)", onMouseDown: (event) => event.preventDefault(), onClick: start, children: /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("svg", { width: "19", height: "19", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.7", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: [
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("rect", { x: "9", y: "3", width: "6", height: "12", rx: "3" }),
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("path", { d: "M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v3M9 21h6" })
      ] }) })
    ] });
  }

  // work/plugin/package/src/client/bots/Sidebar.jsx
  var import_react17 = __toESM(__require("react"), 1);

  // work/plugin/package/src/client/bots/MediaLibrary.jsx
  var import_react15 = __toESM(__require("react"), 1);
  var import_react_dom2 = __require("react-dom");
  var import_jsx_runtime13 = __require("react/jsx-runtime");
  var css = `.dsh-media-backdrop{position:fixed;inset:0;z-index:20000;background:#0008;display:grid;place-items:center;padding:20px}.dsh-media-dialog{width:min(1040px,100%);height:min(760px,90vh);background:var(--dsw-alias-bg-base,#fff);color:var(--dsw-alias-label-primary,#222);border-radius:18px;box-shadow:0 20px 60px #0004;display:flex;flex-direction:column;font:14px system-ui;overflow:hidden}.dsh-media-head{padding:22px 26px 14px;display:flex;align-items:flex-start;justify-content:space-between;gap:10px}.dsh-media-head h2{font-size:22px;margin:0 0 5px}.dsh-media-head p{margin:0;color:var(--dsw-alias-label-caption,#777);font-size:13px}.dsh-media-dialog button{font:inherit;cursor:pointer;color:inherit}.dsh-media-close{border:0;background:transparent;border-radius:8px;font-size:25px!important;padding:3px 10px}.dsh-media-filters{display:flex;gap:7px;padding:0 26px 14px}.dsh-media-filters button{border:1px solid #8884;border-radius:18px;background:transparent;padding:7px 14px}.dsh-media-filters button[aria-pressed=true]{background:var(--dsw-alias-label-primary,#222);color:var(--dsw-alias-bg-base,#fff)}.dsh-media-content{overflow:auto;padding:10px 26px 28px;flex:1}.dsh-media-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:15px}.dsh-media-item{border:1px solid #8883;border-radius:13px;overflow:hidden;margin:0;min-width:0}.dsh-media-preview{display:block;width:100%;aspect-ratio:1;object-fit:cover;background:#8881}.dsh-media-item video{object-fit:contain;background:#111}.dsh-media-audio{min-height:190px;display:flex;align-items:center;padding:12px;box-sizing:border-box;background:#8881}.dsh-media-audio audio{width:100%;min-width:0}.dsh-media-item figcaption{display:flex;justify-content:space-between;align-items:center;gap:4px;padding:10px;font-size:12px;color:var(--dsw-alias-label-caption,#777)}.dsh-media-item a{color:inherit;text-decoration:none;border:1px solid #8885;padding:6px 9px;border-radius:7px}.dsh-media-empty{padding:32px;color:var(--dsw-alias-label-caption,#777);text-align:center}@media(max-width:550px){.dsh-media-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}.dsh-media-head,.dsh-media-content{padding-left:14px;padding-right:14px}}`;
  function MediaLibrary({ onClose }) {
    const [items, setItems] = import_react15.default.useState([]), [filter, setFilter] = import_react15.default.useState("all"), [state, setState] = import_react15.default.useState("loading");
    import_react15.default.useEffect(() => {
      const abort = new AbortController();
      fetch("/grokbot/api/media/list", { signal: abort.signal }).then((r) => {
        if (!r.ok) throw Error();
        return r.json();
      }).then((data) => {
        setItems(data.items || []);
        setState("ready");
      }).catch((e) => {
        if (e.name !== "AbortError") setState("error");
      });
      return () => abort.abort();
    }, []);
    import_react15.default.useEffect(() => {
      const fn = (e) => {
        if (e.key === "Escape") onClose();
      };
      document.addEventListener("keydown", fn);
      return () => document.removeEventListener("keydown", fn);
    }, [onClose]);
    const filtered = items.filter((x) => filter === "all" || x.type === filter);
    return (0, import_react_dom2.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { className: "dsh-media-backdrop", onClick: onClose, children: /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("section", { className: "dsh-media-dialog", role: "dialog", "aria-modal": "true", "aria-label": "Media library", onClick: (e) => e.stopPropagation(), children: [
      /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("style", { children: css }),
      /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: "dsh-media-head", children: [
        /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("h2", { children: "Media library" }),
          /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("p", { children: "Your generated images, videos and audio, all in one place." })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("button", { type: "button", className: "dsh-media-close", "aria-label": "Close media library", onClick: onClose, children: "\xD7" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { className: "dsh-media-filters", children: [["all", "All"], ["image", "Images"], ["video", "Videos"], ["audio", "Audio"]].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("button", { type: "button", "aria-pressed": filter === id, onClick: () => setFilter(id), children: label }, id)) }),
      /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { className: "dsh-media-content", children: state === "loading" ? /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("p", { className: "dsh-media-empty", children: "Loading your media\u2026" }) : state === "error" ? /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("p", { className: "dsh-media-empty", role: "alert", children: "Couldn\u2019t load your media. Please try again." }) : !filtered.length ? /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("p", { className: "dsh-media-empty", children: [
        "No ",
        filter === "all" ? "media" : filter === "audio" ? "audio" : filter + "s",
        " yet."
      ] }) : /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { className: "dsh-media-grid", children: filtered.map((item) => {
        const url = `/grokbot/api/media/file?type=${item.type}&id=${encodeURIComponent(item.file)}`;
        return /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("figure", { className: "dsh-media-item", children: [
          item.type === "image" ? /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("img", { className: "dsh-media-preview", src: url, loading: "lazy", alt: "Generated image" }) : item.type === "video" ? /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("video", { className: "dsh-media-preview", src: url, controls: true, preload: "metadata", "aria-label": "Generated video" }) : /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { className: "dsh-media-audio", children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("audio", { src: url, controls: true, preload: "metadata", "aria-label": "Generated speech" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("figcaption", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("span", { children: [
              item.type === "image" ? "Image" : item.type === "video" ? "Video" : "Audio",
              " \xB7 ",
              new Date(item.createdAt).toLocaleDateString()
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("a", { href: url, download: item.file, "aria-label": `Save ${item.type}`, children: "Save" })
          ] })
        ] }, item.file);
      }) }) })
    ] }) }), document.body);
  }

  // work/plugin/package/src/client/bots/nav-context.js
  var import_react16 = __toESM(__require("react"), 1);

  // work/plugin/package/src/client/bots/nav.js
  var BOT_PRESET_PREFIX2 = "grokbot-";
  var SECTIONS = Object.freeze(["assistants", "rooms", "chats"]);
  function initialNavState() {
    return {
      section: "assistants",
      botId: null,
      roomId: null,
      sessionId: null,
      query: ""
    };
  }
  function isSection(value) {
    return typeof value === "string" && SECTIONS.includes(value);
  }
  function nullableString(value) {
    return typeof value === "string" && value ? value : null;
  }
  function normalizeNavState(raw) {
    const base = initialNavState();
    if (!raw || typeof raw !== "object") return base;
    return {
      section: isSection(raw.section) ? raw.section : base.section,
      botId: nullableString(raw.botId),
      roomId: nullableString(raw.roomId),
      sessionId: nullableString(raw.sessionId),
      query: typeof raw.query === "string" ? raw.query : ""
    };
  }
  var hasWindow = () => typeof window !== "undefined";
  var REDUCERS = {
    /** Show a section without changing the expanded bot/room. */
    "select-section": (state, { section }) => isSection(section) ? { ...state, section, query: "" } : state,
    /**
     * Click a bot row.
     *
     * - a different bot always expands that bot's chat list;
     * - the already-expanded bot collapses its list (a second click), and the
     *   Session shown in the main column is NOT changed.
     */
    "toggle-bot": (state, { botId }) => {
      const id = nullableString(botId);
      if (!id) return state;
      if (state.section === "assistants" && state.botId === id) {
        return { ...state, botId: null };
      }
      return { ...state, section: "assistants", botId: id };
    },
    /** Explicitly expand one bot (breadcrumb, "New chat with X"). */
    "open-bot": (state, { botId }) => {
      const id = nullableString(botId);
      if (!id) return state;
      return { ...state, section: "assistants", botId: id };
    },
    /** Collapse the inline chat list but keep the selection. */
    "collapse-bot": (state) => state.section === "assistants" && state.botId !== null ? { ...state, botId: null } : state,
    /** A Session row was activated: keep the owner's list open, mark the selection. */
    "select-session": (state, { sessionId }) => {
      const id = nullableString(sessionId);
      return { ...state, sessionId: id, roomId: null };
    },
    /**
     * The retention-derived selection changed (the user can also start chats from
     * the main column). The section is NOT forced: opening a chat from a bot list
     * must leave that list on screen while the main column swaps.
     */
    "sync-session": (state, { sessionId }) => {
      const id = nullableString(sessionId);
      return id === state.sessionId ? state : { ...state, sessionId: id, roomId: null };
    },
    /** Open a room in the main column (clears the room highlight only via `close-room`). */
    "open-room": (state, { roomId }) => {
      const id = nullableString(roomId);
      if (!id) return state;
      return { ...state, roomId: id, section: "rooms", botId: null };
    },
    "close-room": (state) => state.roomId === null ? state : { ...state, roomId: null },
    "set-query": (state, { query }) => {
      const next = typeof query === "string" ? query : "";
      return next === state.query ? state : { ...state, query: next };
    }
  };
  function navReducer(state, action) {
    if (!action || typeof action !== "object") return state;
    const reducer = REDUCERS[action.type];
    if (!reducer) return state;
    const current = normalizeNavState(state);
    const next = normalizeNavState(reducer(current, action));
    return sameState(current, next) ? state : next;
  }
  function createNavStore(initial) {
    let state = normalizeNavState(initial);
    const listeners = /* @__PURE__ */ new Set();
    const store2 = {
      getState() {
        return state;
      },
      subscribe(listener) {
        if (typeof listener !== "function") return () => {
        };
        listeners.add(listener);
        return () => listeners.delete(listener);
      },
      dispatch(action) {
        const next = navReducer(state, action);
        if (next === state) return state;
        const previous = state;
        state = next;
        for (const listener of Array.from(listeners)) {
          try {
            listener(state, previous);
          } catch {
          }
        }
        return state;
      },
      /** Replace the whole state (used once by the restore-from-sessionStorage effect). */
      replace(next) {
        const normalized = normalizeNavState(next);
        if (sameState(normalized, state)) return state;
        state = normalized;
        for (const listener of Array.from(listeners)) {
          try {
            listener(state);
          } catch {
          }
        }
        return state;
      }
    };
    return store2;
  }
  function sameState(a, b) {
    return a.section === b.section && a.botId === b.botId && a.roomId === b.roomId && a.sessionId === b.sessionId && a.query === b.query;
  }
  function botIdForPreset(preset) {
    if (typeof preset !== "string" || !preset.startsWith(BOT_PRESET_PREFIX2)) return null;
    const id = preset.slice(BOT_PRESET_PREFIX2.length);
    return id ? id : null;
  }
  function presetForSession(sessionsState, sessionId) {
    if (!sessionsState || !sessionId) return void 0;
    const projections = sessionsState.projectionsBySession || {};
    const projection = projections[sessionId];
    const fromProjection = projection && projection.values ? projection.values.agentPreset : void 0;
    if (typeof fromProjection === "string" && fromProjection) return fromProjection;
    const summary = sessionsState.byId ? sessionsState.byId[sessionId] : void 0;
    const fromSummary = summary && summary.projectionValues ? summary.projectionValues.agentPreset : void 0;
    return typeof fromSummary === "string" && fromSummary ? fromSummary : void 0;
  }
  function sessionRows(sessionsState) {
    if (!sessionsState || !Array.isArray(sessionsState.ids) || !sessionsState.byId) return [];
    const rows = [];
    for (const id of sessionsState.ids) {
      const summary = sessionsState.byId[id];
      if (!summary) continue;
      rows.push({
        ...summary,
        id,
        agentPreset: presetForSession(sessionsState, id)
      });
    }
    return rows.sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
  }
  function splitSessions(sessionsState, botIds, statusMap) {
    const known = new Set((Array.isArray(botIds) ? botIds : []).filter(Boolean));
    const rows = sessionRows(sessionsState);
    const byBot = /* @__PURE__ */ new Map();
    const orphans = /* @__PURE__ */ new Map();
    const others = [];
    const activity = /* @__PURE__ */ new Map();
    for (const row of rows) {
      const botId = botIdForPreset(row.agentPreset);
      if (botId === null) {
        others.push(row);
        continue;
      }
      if (known.has(botId)) {
        const list = byBot.get(botId);
        if (list) list.push(row);
        else byBot.set(botId, [row]);
      } else {
        const list = orphans.get(botId);
        if (list) list.push(row);
        else orphans.set(botId, [row]);
      }
      const status = statusMap && typeof statusMap.get === "function" ? statusMap.get(row.id) : void 0;
      const running = status && typeof status.running === "boolean" ? status.running : !!row.running;
      const rank2 = running ? 2 : row.blank ? 0 : 1;
      const best = activity.get(botId);
      if (!best || rank2 > best.rank || rank2 === best.rank && (row.updatedAt || 0) > (best.row.updatedAt || 0)) {
        activity.set(botId, { rank: rank2, row, sessionId: row.id, updatedAt: row.updatedAt || 0 });
      }
    }
    return { byBot, orphans, others, all: rows, activity };
  }
  function botTone(split, statusMap, botId) {
    const info = split && split.activity ? split.activity.get(botId) : null;
    if (!info) return "idle";
    const status = statusMap && typeof statusMap.get === "function" ? statusMap.get(info.sessionId) : void 0;
    if (status && status.pendingInteraction) return "waiting";
    const running = status && typeof status.running === "boolean" ? status.running : !!info.row.running;
    return running ? "working" : "idle";
  }
  function sessionLabel(row) {
    if (!row) return "New chat";
    if (row.title && String(row.title).trim()) return String(row.title).trim();
    if (row.displayTitle && String(row.displayTitle).trim()) return String(row.displayTitle).trim();
    return row.blank ? "New chat" : "Untitled chat";
  }
  function relativeTime(timestamp, now = Date.now()) {
    const value = Number(timestamp);
    if (!Number.isFinite(value) || value <= 0) return "";
    const delta = Math.max(0, now - value);
    const minute = 6e4;
    const hour = 60 * minute;
    const day = 24 * hour;
    if (delta < minute) return "now";
    if (delta < hour) return `${Math.floor(delta / minute)}m`;
    if (delta < day) return `${Math.floor(delta / hour)}h`;
    if (delta < 7 * day) return `${Math.floor(delta / day)}d`;
    try {
      return new Intl.DateTimeFormat(void 0, { month: "short", day: "numeric" }).format(new Date(value));
    } catch {
      return "";
    }
  }
  function workspaceLabel(workspace) {
    if (!workspace || typeof workspace !== "object") return { name: "Workspace", detail: "Choose a workspace" };
    const name = typeof workspace.name === "string" && workspace.name.trim() || typeof workspace.label === "string" && workspace.label.trim() || typeof workspace.title === "string" && workspace.title.trim() || basename(workspace.path) || "Workspace";
    const path = typeof workspace.path === "string" ? workspace.path : "";
    return { name, detail: path || "Choose a workspace" };
  }
  function basename(value) {
    if (typeof value !== "string" || !value) return "";
    const parts = value.replace(/[/\\]+$/, "").split(/[/\\]/);
    return parts[parts.length - 1] || "";
  }
  var NAV_STORAGE_KEY = "grokbot-ui:sidebar:v1";
  function restoreNavState(storage) {
    try {
      const target = storage || (hasWindow() ? window.sessionStorage : null);
      if (!target) return null;
      const raw = target.getItem(NAV_STORAGE_KEY);
      if (!raw) return null;
      return normalizeNavState(JSON.parse(raw));
    } catch {
      return null;
    }
  }
  function persistNavState(state, storage) {
    try {
      const target = storage || (hasWindow() ? window.sessionStorage : null);
      if (!target) return false;
      target.setItem(NAV_STORAGE_KEY, JSON.stringify(normalizeNavState(state)));
      return true;
    } catch {
      return false;
    }
  }

  // work/plugin/package/src/client/bots/nav-context.js
  function useNavState(store2) {
    const subscribe = import_react16.default.useCallback((listener) => store2.subscribe(listener), [store2]);
    const getSnapshot = import_react16.default.useCallback(() => store2.getState(), [store2]);
    return import_react16.default.useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
  }
  function createSidebarNav(initial) {
    return createNavStore(initial);
  }

  // work/plugin/package/src/client/bots/Sidebar.jsx
  var import_jsx_runtime14 = __require("react/jsx-runtime");
  var BRAND_BOT = Object.freeze({ id: "grokbot-launcher", name: "Bots", color: "#A97EFE", avatarSet: "rakazo" });
  var NOTHING = null;
  function RailItem({ label, hint, active = false, onClick, children, opener }) {
    return /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("span", { className: "gb-srail", children: [
      /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
        "button",
        {
          type: "button",
          className: `gb-srail-item${active ? " is-active" : ""}`,
          "aria-label": label,
          onClick,
          "data-sidebar-opener": opener || void 0,
          children
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("span", { className: "gb-stip", role: "presentation", "aria-hidden": "true", children: [
        label,
        hint ? /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("kbd", { className: "gb-sfoot-kbd", children: hint }) : null
      ] })
    ] });
  }
  function MenuItem({ children, onSelect, danger = false }) {
    return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
      "button",
      {
        type: "button",
        className: `gb-sitem${danger ? " gb-sitem--danger" : ""}`,
        onClick: (event) => {
          event.stopPropagation();
          onSelect();
        },
        children
      }
    );
  }
  function ChatRow({ row, tone, active, onOpen }) {
    const label = sessionLabel(row);
    const meta = relativeTime(row.updatedAt);
    return /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(
      "button",
      {
        type: "button",
        className: `gb-srow gb-schat${active ? " is-active" : ""}`,
        "aria-current": active ? "page" : void 0,
        onClick: () => onOpen(row),
        title: label,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { className: "gb-schat-mark", "aria-hidden": "true", children: tone === "working" ? /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("i", { className: "gb-schat-dot" }) : /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(Icon, { name: "chat", size: 12 }) }),
          /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("span", { className: "gb-srow-copy", children: [
            /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { className: "gb-srow-title", children: label }),
            meta && !row.blank ? /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { className: "gb-srow-sub", children: meta }) : null
          ] })
        ]
      }
    );
  }
  function GrokbotSidebar(props) {
    const [mediaOpen, setMediaOpen] = import_react17.default.useState(false);
    const {
      registry,
      collapsed = false,
      drawer = false,
      openSession,
      startSession,
      toggleSidebar,
      selectPanel,
      openSettings,
      openWorkspace,
      closeDrawer
    } = props;
    const useSessions = typeof props.useSessions === "function" ? props.useSessions : () => NOTHING;
    const useSessionStatus = typeof props.useSessionStatus === "function" ? props.useSessionStatus : () => null;
    const useWorkspaces = typeof props.useWorkspaces === "function" ? props.useWorkspaces : () => null;
    const usePanelInfo = typeof props.usePanelInfo === "function" ? props.usePanelInfo : () => null;
    const sessionsState = useSessions((state) => state);
    const statusMap = useSessionStatus((state) => state);
    const workspacesState = useWorkspaces((state) => state);
    const panelInfo = usePanelInfo((info) => info);
    const nav = useNavState(registry.nav);
    import_react17.default.useEffect(() => {
      if (nav.section === "rooms") registry.nav.dispatch({ type: "select-section", section: "assistants" });
      if (nav.roomId) registry.nav.dispatch({ type: "close-room" });
    }, [nav.section, nav.roomId, registry]);
    const data = registry.useBots();
    const work = registry.useBusy();
    const bots = data.bots;
    const rooms = data.rooms;
    const split = import_react17.default.useMemo(() => splitSessions(sessionsState, bots.map((bot) => bot.id)), [sessionsState, bots]);
    const retainedId = import_react17.default.useMemo(
      () => split.all.find((row) => row.retainedBy && (row.retainedBy.mainView || 0) > 0)?.id || null,
      [split.all]
    );
    const activeSessionId = retainedId || nav.sessionId;
    const sessionRow = activeSessionId ? split.all.find((row) => row.id === activeSessionId) || null : null;
    const activeBotId = sessionRow ? botIdForPreset(sessionRow.agentPreset) : null;
    const selectedBotId = activeBotId;
    import_react17.default.useEffect(() => {
      if (retainedId && retainedId !== nav.sessionId) {
        registry.nav.dispatch({ type: "sync-session", sessionId: retainedId });
      }
    }, [retainedId, nav.sessionId, registry]);
    const room = nav.roomId ? rooms.find((candidate) => candidate.id === nav.roomId) || null : null;
    import_react17.default.useEffect(() => {
      if (nav.roomId && !room) registry.nav.dispatch({ type: "close-room" });
    }, [nav.roomId, room, registry]);
    const needle = nav.query.trim().toLowerCase();
    const matches = import_react17.default.useCallback(
      (...values) => !needle || values.some((value) => String(value || "").toLowerCase().includes(needle)),
      [needle]
    );
    const visibleBots = needle ? bots.filter((bot) => matches(bot.name, bot.tagline)) : bots;
    const visibleRooms = needle ? rooms.filter((candidate) => matches(candidate.name)) : rooms;
    const panelId = panelInfo ? panelInfo.activePanelId : null;
    const pluginsOpen = panelId === "plugins";
    const revealConversation = import_react17.default.useCallback(() => {
      if (!panelId || !openSession) return;
      try {
        selectPanel(null);
      } catch {
      }
    }, [panelId, openSession, selectPanel]);
    const openChat = import_react17.default.useCallback(
      (row) => {
        if (!row || !openSession) return;
        if (registry.nav.getState().roomId) registry.nav.dispatch({ type: "close-room" });
        registry.nav.dispatch({ type: "select-session", sessionId: row.id });
        try {
          openSession(row.id);
        } catch (error) {
          registry.toast(error && error.message ? error.message : "Could not open that chat.", "error");
        }
      },
      [openSession, registry]
    );
    const newChat = import_react17.default.useCallback(
      (bot) => {
        if (!startSession) return;
        try {
          if (nav.roomId) registry.nav.dispatch({ type: "close-room" });
          registry.nav.dispatch({ type: "open-bot", botId: bot.id });
          startSession(void 0, { agentPreset: `grokbot-${bot.id}` });
          closeDrawer();
        } catch (error) {
          registry.toast(error && error.message ? error.message : `Could not start a chat with ${bot.name}.`, "error");
        }
      },
      [startSession, registry, closeDrawer]
    );
    const activateBot = import_react17.default.useCallback((bot) => {
      if (!startSession) return;
      try {
        if (nav.roomId) registry.nav.dispatch({ type: "close-room" });
        revealConversation();
        if (selectedBotId === bot.id) {
          registry.nav.dispatch({ type: "collapse-bot" });
          startSession(void 0, { agentPreset: "standard" });
        } else {
          registry.nav.dispatch({ type: "open-bot", botId: bot.id });
          startSession(void 0, { agentPreset: `grokbot-${bot.id}` });
        }
        closeDrawer();
      } catch (error) {
        registry.toast(error?.message || "Could not switch chats.", "error");
      }
    }, [nav.roomId, registry, selectedBotId, startSession, closeDrawer, revealConversation]);
    const openRoom = import_react17.default.useCallback(
      (target) => {
        revealConversation();
        registry.nav.dispatch({ type: "open-room", roomId: target.id });
        closeDrawer();
      },
      [revealConversation, registry, closeDrawer]
    );
    const newSession = import_react17.default.useCallback(() => {
      if (!startSession) return;
      try {
        if (registry.nav.getState().roomId) registry.nav.dispatch({ type: "close-room" });
        registry.nav.dispatch({ type: "collapse-bot" });
        revealConversation();
        startSession(void 0, { agentPreset: "standard" });
        closeDrawer();
      } catch (error) {
        registry.toast(error && error.message ? error.message : "Could not start a new chat.", "error");
      }
    }, [startSession, registry, closeDrawer, revealConversation]);
    const onPlugins = import_react17.default.useCallback(() => {
      if (!selectPanel) return;
      try {
        selectPanel("plugins");
        closeDrawer();
      } catch {
        registry.toast("The Plugins panel is not available yet.", "error");
      }
    }, [selectPanel, registry, closeDrawer]);
    const onSettings = import_react17.default.useCallback(() => {
      let opened = false;
      try {
        opened = typeof openSettings === "function" && openSettings();
      } catch {
      }
      closeDrawer();
      if (!opened) registry.dialogs.dispatch({ type: "open-settings" });
    }, [openSettings, registry, closeDrawer]);
    const onWorkspace = import_react17.default.useCallback(() => {
      if (typeof openWorkspace !== "function" || !openWorkspace()) {
        registry.toast("Workspaces are not available right now.", "error");
      }
    }, [openWorkspace, registry]);
    const columnRef = import_react17.default.useRef(null);
    useDrawerBehaviour({ drawer, collapsed, columnRef, onClose: toggleSidebar });
    const ws = workspaceLabel(currentWorkspace(workspacesState, sessionRow));
    if (collapsed && drawer) return null;
    if (collapsed) {
      return /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "gb-s gb-s-rail", "aria-label": "dsh", ref: columnRef, children: [
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("style", { "data-grokbot-sidebar": "true", children: styles_default + sidebar_default }),
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(RailItem, { label: "Open sidebar (Ctrl+B)", opener: "toggle", onClick: () => toggleSidebar && toggleSidebar(), children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { className: "gb-s-mark", children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(BotAvatar, { bot: BRAND_BOT, size: 24 }) }) }),
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(RailItem, { label: "New chat", onClick: newSession, children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(Icon, { name: "plus", size: 18 }) }),
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "gb-srail-stack", children: bots.slice(0, 8).map((bot) => {
          const tone = botTone(split, statusMap, bot.id);
          return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
            RailItem,
            {
              label: tone === "idle" ? bot.name : `${bot.name} \xB7 ${activityLabel(tone)}`,
              active: selectedBotId === bot.id,
              onClick: () => {
                activateBot(bot);
                if (typeof toggleSidebar === "function") toggleSidebar();
              },
              children: /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("span", { className: "gb-srow-avatar", children: [
                /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(BotAvatar, { bot, size: 26 }),
                /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("i", { className: `gb-sdot gb-sdot--${tone}`, "aria-hidden": "true" })
              ] })
            },
            bot.id
          );
        }) }),
        mediaOpen && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(MediaLibrary, { onClose: () => setMediaOpen(false) }),
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(RailItem, { label: "Media library", onClick: () => setMediaOpen(true), children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { "aria-hidden": "true", children: "\u25A7" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(RailItem, { label: "Settings", onClick: onSettings, children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(Icon, { name: "settings", size: 18 }) })
      ] });
    }
    const sections = [
      { id: "chats", label: "All chats", count: split.others.filter((row) => !row.blank).length, icon: "allChats" }
    ];
    return /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(
      "div",
      {
        className: "gb-s",
        "aria-label": "dsh",
        ref: columnRef,
        role: drawer ? "dialog" : void 0,
        "aria-modal": drawer ? true : void 0,
        tabIndex: drawer ? -1 : void 0,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("style", { "data-grokbot-sidebar": "true", children: styles_default + sidebar_default }),
          /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "gb-s-brand", children: [
            /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { className: "gb-s-brandmark", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(BotAvatar, { bot: BRAND_BOT, size: 26 }) }),
            /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { className: "gb-s-wordmark", children: "dsh" }),
            drawer ? /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("button", { type: "button", className: "gb-s-close", "aria-label": "Close sidebar", onClick: () => toggleSidebar && toggleSidebar(), children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(Icon, { name: "close", size: 16 }) }) : null
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("button", { type: "button", className: "gb-s-primary", onClick: newSession, children: [
            /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(Icon, { name: "plus", size: 16 }),
            /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { children: "New chat" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("label", { className: "gb-s-search", children: [
            /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(Icon, { name: "search", size: 14 }),
            /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
              "input",
              {
                type: "search",
                value: nav.query,
                placeholder: nav.section === "chats" ? "Search chats" : nav.section === "rooms" ? "Search group chats" : "Search GPTs",
                "aria-label": nav.section === "chats" ? "Search chats" : nav.section === "rooms" ? "Search group chats" : "Search GPTs",
                onChange: (event) => registry.nav.dispatch({ type: "set-query", query: event.target.value }),
                onKeyDown: (event) => {
                  if (event.key === "Escape" && nav.query) {
                    event.preventDefault();
                    event.stopPropagation();
                    registry.nav.dispatch({ type: "set-query", query: "" });
                  }
                }
              }
            )
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "gb-s-section", "aria-label": "Chat navigation", children: sections.map((section) => /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(
            "button",
            {
              type: "button",
              "aria-pressed": nav.section === section.id,
              className: `gb-snav${nav.section === section.id ? " is-active" : ""}`,
              onClick: () => {
                if (section.id !== "rooms" && nav.roomId) registry.nav.dispatch({ type: "close-room" });
                registry.nav.dispatch({ type: "select-section", section: nav.section === section.id ? "assistants" : section.id });
              },
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { className: "gb-snav-icon", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(Icon, { name: section.icon, size: 15 }) }),
                /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { className: "gb-snav-label", children: section.label }),
                /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { className: "gb-s-label-count", children: section.count })
              ]
            },
            section.id
          )) }),
          /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "gb-s-scroll", children: [
            data.error ? /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "gb-serr", role: "status", children: [
              /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("strong", { children: "Bots are offline" }),
              data.error,
              /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("button", { type: "button", className: "gb-snew", onClick: () => registry.reload(), children: [
                /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(Icon, { name: "retry", size: 13 }),
                " Try again"
              ] })
            ] }) : null,
            true ? /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
              BotSection,
              {
                bots: visibleBots,
                allBots: bots,
                split,
                statusMap,
                activeSessionId,
                selectedBotId,
                expandedId: nav.botId,
                needle,
                loading: data.status === "loading" || data.status === "idle",
                registry,
                onActivate: activateBot,
                onChat: openChat,
                onNewChat: newChat
              }
            ) : null,
            nav.section === "chats" ? /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
              AllChats,
              {
                others: split.others,
                orphans: split.orphans,
                activeSessionId,
                needle,
                onChat: openChat
              }
            ) : null
          ] }),
          mediaOpen && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(MediaLibrary, { onClose: () => setMediaOpen(false) }),
          /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "gb-s-foot", children: [
            /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("button", { type: "button", className: "gb-sws", onClick: onWorkspace, title: `${ws.name} \u2014 ${ws.detail}`, children: [
              /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(Icon, { name: "folder", size: 14 }),
              /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("span", { className: "gb-sws-name", children: [
                "Workspace: ",
                ws.name
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(Icon, { name: "chevronRight", size: 13 })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("button", { type: "button", className: "gb-sfoot", onClick: () => setMediaOpen(true), children: [
              /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { "aria-hidden": "true", style: { width: 16, textAlign: "center", fontSize: 18 }, children: "\u25A7" }),
              /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { children: "Media library" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(
              "button",
              {
                type: "button",
                className: `gb-sfoot${pluginsOpen ? " is-active" : ""}`,
                "aria-current": pluginsOpen ? "page" : void 0,
                onClick: onPlugins,
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(Icon, { name: "plugins", size: 16 }),
                  /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { children: "Plugins" })
                ]
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(
              "button",
              {
                type: "button",
                className: "gb-sfoot",
                onClick: onSettings,
                title: "Settings",
                "aria-haspopup": "dialog",
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(Icon, { name: "settings", size: 16 }),
                  /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { children: "Settings" })
                ]
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(
              "button",
              {
                type: "button",
                className: "gb-sfoot",
                onClick: () => registry.dialogs.dispatch({ type: "edit-bot", botId: null }),
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(Icon, { name: "plus", size: 16 }),
                  /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { children: "New GPT" })
                ]
              }
            )
          ] })
        ]
      }
    );
  }
  function BotSection({ bots, allBots, split, statusMap, activeSessionId, selectedBotId, expandedId, needle, loading, registry, onActivate, onChat, onNewChat }) {
    if (loading && !allBots.length) {
      return /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "gb-slist-empty", "aria-busy": "true", children: [
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(Spinner, { size: 13 }),
        " Loading GPTs\u2026"
      ] });
    }
    if (!allBots.length) return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "gb-slist-empty", children: "No GPTs yet \u2014 create one below." });
    if (!bots.length) return /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "gb-slist-empty", children: [
      "No GPT matches \u201C",
      needle,
      "\u201D."
    ] });
    return bots.map((bot) => /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
      BotItem,
      {
        bot,
        chats: (split.byBot.get(bot.id) || []).filter((row) => !row.blank),
        tone: botTone(split, statusMap, bot.id),
        statusMap,
        activeSessionId,
        selected: selectedBotId === bot.id,
        expanded: expandedId === bot.id,
        registry,
        onActivate,
        onChat,
        onNewChat
      },
      bot.id
    ));
  }
  function BotItem({ bot, chats, tone, statusMap, activeSessionId, selected, expanded, registry, onActivate, onChat, onNewChat }) {
    const [menuOpen, setMenuOpen] = import_react17.default.useState(false);
    const rowRef = import_react17.default.useRef(null);
    import_react17.default.useEffect(() => {
      if (!menuOpen) return void 0;
      const onDocDown = (event) => {
        if (rowRef.current && rowRef.current.contains(event.target)) return;
        setMenuOpen(false);
      };
      const onKey = (event) => {
        if (event.key === "Escape") setMenuOpen(false);
      };
      document.addEventListener("mousedown", onDocDown, true);
      document.addEventListener("keydown", onKey, true);
      return () => {
        document.removeEventListener("mousedown", onDocDown, true);
        document.removeEventListener("keydown", onKey, true);
      };
    }, [menuOpen]);
    const menu = (type, extra) => {
      setMenuOpen(false);
      registry.dialogs.dispatch({ type, ...extra });
    };
    return /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { ref: rowRef, children: [
      /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: `gb-srow${selected ? " is-active" : ""}${menuOpen ? " is-channel" : ""}`, children: [
        /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(
          "button",
          {
            type: "button",
            className: "gb-srow-avatar gb-srow-avatar-btn gb-as-trigger",
            "aria-label": `${bot.name} \u2014 more actions`,
            title: "More actions",
            "aria-haspopup": "menu",
            onClick: () => setMenuOpen((open) => !open),
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(BotAvatar, { bot, size: 26, activity: tone === "waiting" ? "waiting" : tone === "working" ? "writing" : "idle" }),
              /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { className: `gb-sdot gb-sdot--${tone}`, "aria-hidden": "true" })
            ]
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
          "button",
          {
            type: "button",
            className: "gb-srow-main",
            "aria-expanded": expanded,
            "aria-pressed": selected,
            onClick: () => onActivate(bot),
            title: bot.tagline ? `${bot.name} \u2014 ${bot.tagline}` : bot.name,
            children: /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("span", { className: "gb-srow-copy", children: [
              /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { className: "gb-srow-title", children: bot.name }),
              /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { className: "gb-srow-sub", children: tone === "idle" ? bot.tagline && bot.tagline.toLowerCase() !== "assistant" ? bot.tagline : "GPT" : activityLabel(tone) })
            ] })
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { className: "gb-srow-chevron", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(Icon, { name: "chevronRight", size: 14 }) })
      ] }),
      menuOpen ? /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "gb-smenu", role: "menu", "aria-label": `${bot.name} actions`, children: [
        /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(MenuItem, { onSelect: () => menu("edit-bot", { botId: bot.id }), children: [
          /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(Icon, { name: "edit", size: 14 }),
          " Edit GPT"
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(MenuItem, { onSelect: () => menu("avatar-studio", { botId: bot.id }), children: [
          /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(Icon, { name: "image", size: 14 }),
          " Change look"
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(MenuItem, { danger: true, onSelect: () => menu("confirm-delete-bot", { botId: bot.id }), children: [
          /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(Icon, { name: "trash", size: 14 }),
          " Delete GPT"
        ] })
      ] }) : null,
      expanded ? /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "gb-slist", children: [
        /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("button", { type: "button", className: "gb-snew", onClick: () => onNewChat(bot), children: [
          /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(Icon, { name: "plus", size: 13 }),
          " New chat with ",
          bot.name
        ] }),
        chats.length ? chats.map((row) => /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
          ChatRow,
          {
            row,
            tone: rowTone(statusMap, row),
            active: row.id === activeSessionId,
            onOpen: onChat
          },
          row.id
        )) : /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "gb-slist-empty", children: [
          "No chats with ",
          bot.name,
          " yet"
        ] })
      ] }) : null
    ] });
  }
  function AllChats({ others, orphans, activeSessionId, needle, onChat }) {
    const [collapsedGroups, setCollapsedGroups] = import_react17.default.useState({});
    const groups = import_react17.default.useMemo(() => {
      const byLabel = /* @__PURE__ */ new Map();
      for (const row of others.filter((item) => !item.blank)) {
        const label = row.workspaceName || basenameOf(row.cwd) || "Ungrouped";
        const group = byLabel.get(label);
        if (group) group.rows.push(row);
        else byLabel.set(label, { label, rows: [row] });
      }
      return Array.from(byLabel.values()).sort((a, b) => (b.rows[0].updatedAt || 0) - (a.rows[0].updatedAt || 0));
    }, [others]);
    const orphanGroups = import_react17.default.useMemo(
      () => Array.from(orphans.entries()).map(([botId, rows]) => ({ label: `${botId} (deleted)`, rows: rows.filter((row) => !row.blank) })).filter((group) => group.rows.length),
      [orphans]
    );
    const all = groups.concat(orphanGroups);
    const total = all.reduce((sum, group) => sum + group.rows.length, 0);
    if (!total) return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "gb-slist-empty", children: "No chats yet." });
    const isOpen = (label) => collapsedGroups[label] !== true;
    const toggle = (label) => setCollapsedGroups((previous) => ({ ...previous, [label]: previous[label] !== true }));
    const renderRows = (rows) => {
      const visible = needle ? rows.filter((row) => `${sessionLabel(row)} ${row.cwd || ""}`.toLowerCase().includes(needle)) : rows;
      if (!visible.length) return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "gb-slist-empty", children: "No chat matches your search." });
      return visible.slice(0, 40).map((row) => /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(ChatRow, { row, tone: rowTone(null, row), active: row.id === activeSessionId, onOpen: onChat }, row.id));
    };
    return all.map((group) => /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(
        "button",
        {
          type: "button",
          className: "gb-slabel gb-sgrouphead",
          "aria-expanded": isOpen(group.label),
          onClick: () => toggle(group.label),
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { className: "gb-sgroup-name", children: group.label }),
            /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { className: "gb-s-label-count", children: group.rows.length })
          ]
        }
      ),
      isOpen(group.label) ? /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "gb-slist", children: renderRows(group.rows) }) : null
    ] }, group.label));
  }
  function basenameOf(value) {
    if (typeof value !== "string" || !value) return "";
    const parts = value.replace(/[/\\]+$/, "").split(/[/\\]/);
    return parts[parts.length - 1] || "";
  }
  function rowTone(statusMap, row) {
    const status = statusMap && typeof statusMap.get === "function" ? statusMap.get(row.id) : void 0;
    if (status && status.pendingInteraction) return "waiting";
    if (status && typeof status.running === "boolean") return status.running ? "working" : "idle";
    return row && row.running ? "working" : "idle";
  }
  function currentWorkspace(workspacesState, sessionRow) {
    const items = workspacesState && Array.isArray(workspacesState.items) ? workspacesState.items : [];
    if (!items.length) return null;
    const sessionWorkspaceId = sessionRow && sessionRow.workspaceId;
    if (sessionWorkspaceId) {
      const match = items.find((item) => item.workspaceId === sessionWorkspaceId);
      if (match) return match;
    }
    if (sessionRow && sessionRow.cwd) {
      const match = items.find((item) => item.path === sessionRow.cwd);
      if (match) return match;
    }
    return items.slice().sort((a, b) => String(b.updatedAt || "").localeCompare(String(a.updatedAt || "")))[0];
  }
  var FOCUSABLE = [
    "a[href]",
    "button:not([disabled])",
    "textarea:not([disabled])",
    "input:not([disabled])",
    "select:not([disabled])",
    '[tabindex]:not([tabindex="-1"])'
  ].join(",");
  function useDrawerBehaviour({ drawer, collapsed, columnRef, onClose }) {
    const closeRef = import_react17.default.useRef(onClose);
    closeRef.current = onClose;
    const openerRef = import_react17.default.useRef(null);
    import_react17.default.useEffect(() => {
      if (!drawer) return void 0;
      const capture = () => {
        const node = document.querySelector('[data-sidebar-opener="leading"], [data-sidebar-opener="toggle"]');
        if (node) openerRef.current = node;
      };
      capture();
      const onPointerDown = (event) => {
        const target = event.target;
        const opener = target && target.closest && target.closest("[data-sidebar-opener]");
        if (opener) openerRef.current = opener;
        else capture();
      };
      document.addEventListener("pointerdown", onPointerDown, true);
      return () => document.removeEventListener("pointerdown", onPointerDown, true);
    }, [drawer]);
    import_react17.default.useEffect(() => {
      if (!drawer || collapsed) return void 0;
      const node = columnRef.current;
      if (!node) return void 0;
      if (!openerRef.current) {
        const fallback = document.querySelector('[data-sidebar-opener="leading"], [data-sidebar-opener="toggle"]');
        if (fallback) openerRef.current = fallback;
      }
      const focusables = () => Array.from(node.querySelectorAll(FOCUSABLE)).filter(
        (element) => element.offsetParent !== null || element === document.activeElement
      );
      const first = focusables()[0];
      if (first && typeof first.focus === "function") first.focus({ preventScroll: true });
      else if (typeof node.focus === "function") node.focus({ preventScroll: true });
      const onKeyDown = (event) => {
        if (event.key === "Escape") {
          if (document.querySelector(".gb-scrim")) return;
          event.preventDefault();
          event.stopPropagation();
          if (typeof closeRef.current === "function") closeRef.current();
          return;
        }
        if (event.key !== "Tab") return;
        const list = focusables();
        if (!list.length) return;
        const index = list.indexOf(document.activeElement);
        if (event.shiftKey) {
          if (index <= 0) {
            event.preventDefault();
            list[list.length - 1].focus();
          }
        } else if (index === list.length - 1 || index === -1) {
          event.preventDefault();
          list[0].focus();
        }
      };
      node.addEventListener("keydown", onKeyDown);
      return () => {
        node.removeEventListener("keydown", onKeyDown);
        const opener = openerRef.current;
        const restore = () => {
          if (!opener || !document.contains(opener)) return;
          if (typeof opener.focus !== "function") return;
          try {
            opener.focus({ preventScroll: true });
          } catch {
          }
        };
        const raf = typeof requestAnimationFrame === "function" ? requestAnimationFrame(restore) : null;
        const timer = setTimeout(restore, 0);
        void raf;
        void timer;
      };
    }, [drawer, collapsed, columnRef]);
  }

  // work/plugin/package/src/client/bots/registry.js
  var import_react18 = __toESM(__require("react"), 1);
  function createDataStore() {
    let state = { status: "idle", bots: [], rooms: [], model: null, error: null, revision: 0 };
    const listeners = /* @__PURE__ */ new Set();
    const publish2 = (next) => {
      const merged = { ...state, ...next };
      if (merged.revision === state.revision) merged.revision = state.revision + 1;
      state = merged;
      for (const listener of Array.from(listeners)) {
        try {
          listener();
        } catch {
        }
      }
    };
    return {
      getState: () => state,
      subscribe(listener) {
        listeners.add(listener);
        return () => listeners.delete(listener);
      },
      set(patch) {
        publish2(patch);
      },
      updateRoom(room) {
        if (!room || !room.id) return;
        publish2({ rooms: state.rooms.map((candidate) => candidate.id === room.id ? room : candidate) });
      }
    };
  }
  function createDialogStore() {
    let state = {
      botDialog: null,
      // { mode: 'create' | 'edit', botId }
      roomDialog: null,
      // { botIds: string[] }
      studio: null,
      // { botId }
      confirm: null,
      // { kind: 'bot'|'room', id }
      detail: null,
      // { botId }
      settingsNotice: false,
      // the footer Settings affordance (see SettingsNotice.jsx)
      busy: false
    };
    const listeners = /* @__PURE__ */ new Set();
    const publish2 = (next) => {
      state = next;
      for (const listener of Array.from(listeners)) {
        try {
          listener();
        } catch {
        }
      }
    };
    return {
      getState: () => state,
      subscribe(listener) {
        listeners.add(listener);
        return () => listeners.delete(listener);
      },
      dispatch(action) {
        if (!action || typeof action.type !== "string") return;
        switch (action.type) {
          case "edit-bot":
            publish2({ ...state, studio: null, confirm: null, detail: null, botDialog: { mode: action.botId ? "edit" : "create", botId: action.botId || null } });
            break;
          case "create-room":
            publish2({ ...state, roomDialog: { botIds: Array.isArray(action.botIds) ? action.botIds : [] } });
            break;
          case "avatar-studio":
            publish2({ ...state, botDialog: null, confirm: null, studio: { botId: action.botId } });
            break;
          case "confirm-delete-bot":
            publish2({ ...state, confirm: { kind: "bot", id: action.botId } });
            break;
          case "confirm-delete-room":
            publish2({ ...state, confirm: { kind: "room", id: action.roomId } });
            break;
          case "close-bot-dialog":
            publish2({ ...state, botDialog: null });
            break;
          case "close-room-dialog":
            publish2({ ...state, roomDialog: null });
            break;
          case "close-studio":
            publish2({ ...state, studio: null });
            break;
          case "close-confirm":
            publish2({ ...state, confirm: null });
            break;
          case "open-settings":
            publish2({ ...state, settingsNotice: true });
            break;
          case "close-settings":
            publish2({ ...state, settingsNotice: false });
            break;
          case "busy":
            publish2({ ...state, busy: !!action.busy });
            break;
          case "close-all":
            publish2({ botDialog: null, roomDialog: null, studio: null, confirm: null, detail: null, settingsNotice: false, busy: state.busy });
            break;
          default:
            break;
        }
      }
    };
  }
  function createBusyStore() {
    let state = { roomId: null, busy: false };
    const listeners = /* @__PURE__ */ new Set();
    return {
      getState: () => state,
      subscribe(listener) {
        listeners.add(listener);
        return () => listeners.delete(listener);
      },
      set(next) {
        const merged = { ...state, ...next };
        if (merged.roomId === state.roomId && merged.busy === state.busy) return;
        state = merged;
        for (const listener of Array.from(listeners)) {
          try {
            listener();
          } catch {
          }
        }
      }
    };
  }
  function createToastStore() {
    let state = { toasts: [] };
    let seq = 0;
    const listeners = /* @__PURE__ */ new Set();
    const publish2 = () => {
      for (const listener of Array.from(listeners)) {
        try {
          listener();
        } catch {
        }
      }
    };
    return {
      getState: () => state,
      subscribe(listener) {
        listeners.add(listener);
        return () => listeners.delete(listener);
      },
      push(message, tone = "info", ttl) {
        if (!message) return null;
        const id = ++seq;
        state = { toasts: [...state.toasts.slice(-2), { id, message, tone }] };
        publish2();
        window.setTimeout(
          () => {
            state = { toasts: state.toasts.filter((toast) => toast.id !== id) };
            publish2();
          },
          typeof ttl === "number" ? ttl : tone === "error" ? 6e3 : 3600
        );
        return id;
      },
      dismiss(id) {
        state = { toasts: state.toasts.filter((toast) => toast.id !== id) };
        publish2();
      }
    };
  }
  function hookFor(store2) {
    return function useStore(selector) {
      const subscribe = import_react18.default.useCallback((listener) => store2.subscribe(listener), [store2]);
      const getSnapshot = import_react18.default.useCallback(() => store2.getState(), [store2]);
      const snapshot = import_react18.default.useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
      return typeof selector === "function" ? selector(snapshot) : snapshot;
    };
  }
  function createRegistry(ctx) {
    const nav = createSidebarNav(restoreNavState() || null);
    const botsStore = createDataStore();
    const dialogs = createDialogStore();
    const busy = createBusyStore();
    const toastStore = createToastStore();
    let lastSaved = null;
    nav.subscribe((state) => {
      try {
        const serialized = JSON.stringify(state);
        if (serialized === lastSaved) return;
        lastSaved = serialized;
        persistNavState(normalizeNavState(state));
      } catch {
      }
    });
    const registry = {
      ctx,
      nav,
      botsStore,
      dialogs,
      busy,
      toastStore,
      useNav: null,
      useBots: null,
      useDialogs: null,
      useBusy: null,
      useBusyWatch: null,
      useToasts: null,
      bots: {
        updateRoom: (room) => botsStore.updateRoom(room)
      },
      toast: (message, tone) => toastStore.push(message, tone),
      reload: () => {
      },
      notify: () => {
      }
    };
    registry.useNav = hookFor(nav);
    registry.useBots = hookFor(botsStore);
    registry.useDialogs = hookFor(dialogs);
    registry.useBusy = hookFor(busy);
    registry.useToasts = hookFor(toastStore);
    return registry;
  }

  // work/plugin/package/src/client/bots/chrome-state.js
  var EMPTY_CHROME = Object.freeze({ botId: null, botName: null, sessionId: null, roomId: null, section: "assistants", open: false });
  function createChromeStore() {
    let state = EMPTY_CHROME;
    const listeners = /* @__PURE__ */ new Set();
    const same = (a, b) => a.botId === b.botId && a.botName === b.botName && a.sessionId === b.sessionId && a.roomId === b.roomId && a.section === b.section && a.open === b.open;
    return {
      getState: () => state,
      subscribe(listener) {
        listeners.add(listener);
        return () => listeners.delete(listener);
      },
      set(next) {
        const merged = { ...EMPTY_CHROME, ...next };
        if (same(state, merged)) return;
        state = Object.freeze(merged);
        for (const listener of Array.from(listeners)) {
          try {
            listener();
          } catch {
          }
        }
      }
    };
  }

  // work/plugin/package/src/client/bots/chrome.jsx
  var import_react19 = __toESM(__require("react"), 1);
  var import_jsx_runtime15 = __require("react/jsx-runtime");
  function LeadingOpener({ registry, toggleSidebar }) {
    const open = () => {
      if (typeof toggleSidebar === "function") toggleSidebar();
    };
    return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("div", { className: "gb-s gb-slead", children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
      "button",
      {
        type: "button",
        className: "gb-slead-toggle",
        "aria-label": "Open Grokbot sidebar",
        title: "Open Grokbot sidebar",
        "data-sidebar-opener": "leading",
        onClick: open,
        children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(Icon, { name: "panel", size: 18 })
      }
    ) });
  }

  // work/plugin/package/src/client/bots/services.js
  function runShortcut(shortcuts, commandId) {
    if (!shortcuts || !shortcuts.registry || typeof shortcuts.registry.invoke !== "function") return "unavailable";
    let modal = null;
    try {
      const modals = document.querySelectorAll("[data-shortcut-modal]");
      modal = modals.length ? modals[modals.length - 1].getAttribute("data-shortcut-modal") || "other" : null;
    } catch {
      modal = null;
    }
    try {
      shortcuts.registry.invoke(commandId, { region: "page", modal });
      return "invoked";
    } catch {
      return "failed";
    }
  }
  async function openWorkspaceById(workspace, workspaceId) {
    if (!workspace || typeof workspace.openWorkspace !== "function" || !workspaceId) return false;
    try {
      await workspace.openWorkspace(workspaceId);
      return true;
    } catch {
      return false;
    }
  }

  // work/plugin/package/src/client/bots/index.jsx
  var import_jsx_runtime16 = __require("react/jsx-runtime");
  var SIDEBAR_PRIORITY = -10;
  var LOG_PREFIX3 = "[grokbot-ui/bots]";
  function registerBots(ctx) {
    const registry = createRegistry(ctx);
    const chrome = createChromeStore();
    registry.chrome = chrome;
    const disposers = [];
    const register = (slot, id, options, component) => {
      try {
        const dispose = ctx.slots.inject(
          slot,
          () => ctx.slots.register({ name: slot, id, ...options }, component)
        );
        if (typeof dispose === "function") disposers.push(dispose);
      } catch (error) {
        console.warn(`${LOG_PREFIX3} could not register ${slot}`, error);
      }
    };
    const getWorkspace = () => {
      try {
        return ctx.uiWorkspace || null;
      } catch {
        return null;
      }
    };
    const getLayout = () => {
      try {
        return ctx.layout || null;
      } catch {
        return null;
      }
    };
    const getShortcuts = () => {
      try {
        return ctx.shortcuts || null;
      } catch {
        return null;
      }
    };
    const revealConversation = () => {
      const layout = getLayout();
      if (!layout || typeof layout.selectPanel !== "function") return;
      let active = null;
      try {
        active = layout.panelInfo ? layout.panelInfo.getSnapshot().activePanelId : null;
      } catch {
        active = null;
      }
      if (!active) return;
      try {
        layout.selectPanel(null);
      } catch {
      }
    };
    const openSession = (sessionId) => {
      const workspace = getWorkspace();
      if (!workspace || typeof workspace.openSession !== "function") {
        throw new Error("Session navigation is not available yet.");
      }
      if (registry.nav.getState().roomId) registry.nav.dispatch({ type: "close-room" });
      workspace.openSession(sessionId);
    };
    const startSession = (workspaceId, options) => {
      const workspace = getWorkspace();
      if (!workspace || typeof workspace.startSession !== "function") {
        throw new Error("Chat is not available yet \u2014 the workspace UI is still loading.");
      }
      if (registry.nav.getState().roomId) registry.nav.dispatch({ type: "close-room" });
      workspace.startSession(workspaceId, options);
    };
    const selectPanel = (panelId) => {
      const layout = getLayout();
      if (!layout || typeof layout.selectPanel !== "function") throw new Error("Panels are not available yet.");
      layout.selectPanel(panelId);
    };
    const toggleSidebar = () => {
      const layout = getLayout();
      if (!layout || typeof layout.toggleSidebar !== "function") return;
      layout.toggleSidebar();
    };
    const openSettings = () => {
      return runShortcut(getShortcuts(), "settings.open") === "invoked";
    };
    const openWorkspace = () => {
      const workspace = getWorkspace();
      if (!workspace) return false;
      let target = null;
      try {
        const snapshot = ctx.workspaces && ctx.workspaces.list ? ctx.workspaces.list.getSnapshot() : null;
        const items = snapshot && Array.isArray(snapshot.items) ? snapshot.items : [];
        target = items.length ? items[0].workspaceId : null;
      } catch {
        target = null;
      }
      if (typeof workspace.openWorkspace === "function" && target) {
        void openWorkspaceById(workspace, target).then((ok) => {
          if (!ok) registry.toast("Could not open that workspace.", "error");
        });
        return true;
      }
      if (typeof workspace.startSession === "function") {
        try {
          workspace.startSession();
          return true;
        } catch {
          return false;
        }
      }
      return false;
    };
    const closeDrawer = () => {
      let isDrawer = false;
      try {
        const frame = document.querySelector("[data-sidebar-drawer]");
        isDrawer = !!frame;
      } catch {
        isDrawer = false;
      }
      if (isDrawer && typeof toggleSidebar === "function") toggleSidebar();
    };
    const shared = {
      openSession,
      startSession,
      selectPanel,
      toggleSidebar,
      openSettings,
      openWorkspace,
      closeDrawer,
      revealConversation
    };
    register("conversation.input.right", "dsh-grok-dictation", { order: 90 }, GrokDictation);
    register("settings.section", "dsh-gpts", { order: 12, label: () => "GPTs" }, (props) => /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(GptSettings, { registry, ...props }));
    register("settings.section.icon", "dsh-gpts", {}, GptSettingsIcon);
    try {
      const dispose = ctx.slots.inject(
        "sidebar",
        () => ctx.slots.register(
          // NO `children`: re-declaring the native child seats would race
          // ui-plugin-manager (it registers `sidebar.panellist` unconditionally).
          { name: "sidebar", priority: SIDEBAR_PRIORITY },
          (props) => /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(GrokbotSidebar, { registry, ...shared, ...props })
        )
      );
      if (typeof dispose === "function") disposers.push(dispose);
    } catch (error) {
      console.warn(`${LOG_PREFIX3} could not take over the sidebar`, error);
    }
    register("shell.leading", "grokbot-leading", { priority: SIDEBAR_PRIORITY }, (props) => /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(LeadingOpener, { registry, toggleSidebar, ...props }));
    register("shell.overlay", "grokbot-shell", { order: 10 }, (props) => /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(BotsRoot, { ctx, registry, ...props }));
    const publishChrome = () => {
      const state = registry.nav.getState();
      const bots = registry.botsStore.getState().bots;
      const bot = state.botId ? bots.find((candidate) => candidate.id === state.botId) || null : null;
      chrome.set({
        ...EMPTY_CHROME,
        botId: state.botId,
        botName: bot ? bot.name : state.botId,
        sessionId: state.sessionId,
        roomId: state.roomId,
        section: state.section,
        open: state.section === "assistants" && !!state.botId
      });
    };
    disposers.push(registry.nav.subscribe(publishChrome));
    disposers.push(registry.botsStore.subscribe(publishChrome));
    publishChrome();
    return {
      registry,
      dispose: () => {
        for (let index = disposers.length - 1; index >= 0; index -= 1) {
          try {
            disposers[index]();
          } catch (error) {
            console.warn(`${LOG_PREFIX3} disposer failed`, error);
          }
        }
      }
    };
  }

  // work/plugin/package/src/client/identity/index.jsx
  var import_react21 = __toESM(__require("react"), 1);
  var import_jsx_runtime17 = __require("react/jsx-runtime");
  var API_STATE = "/grokbot/api/state";
  var PRESET_PREFIX = "grokbot-";
  var store = {
    bots: [],
    byPreset: /* @__PURE__ */ new Map(),
    loadedAt: 0,
    loading: null,
    listeners: /* @__PURE__ */ new Set()
  };
  function publish() {
    for (const listener of store.listeners) {
      try {
        listener();
      } catch {
      }
    }
  }
  function indexBots(bots) {
    const byPreset = /* @__PURE__ */ new Map();
    for (const bot of Array.isArray(bots) ? bots : []) {
      if (!bot || typeof bot.id !== "string") continue;
      byPreset.set(PRESET_PREFIX + bot.id, bot);
    }
    store.bots = Array.isArray(bots) ? bots : [];
    store.byPreset = byPreset;
    store.loadedAt = Date.now();
  }
  function refreshBotIdentity(force = false) {
    if (store.loading) return store.loading;
    if (!force && Date.now() - store.loadedAt < 8e3) return Promise.resolve(store.bots);
    store.loading = fetch(API_STATE, { headers: { accept: "application/json" } }).then((response) => response.ok ? response.json() : Promise.reject(new Error(String(response.status)))).then((data) => {
      indexBots(data?.bots);
      publish();
      return store.bots;
    }).catch(() => store.bots).finally(() => {
      store.loading = null;
    });
    return store.loading;
  }
  function useBotStore() {
    const [, setRevision] = import_react21.default.useState(0);
    import_react21.default.useEffect(() => {
      const listener = () => setRevision((value) => value + 1);
      store.listeners.add(listener);
      refreshBotIdentity();
      return () => {
        store.listeners.delete(listener);
      };
    }, []);
    return store;
  }
  function botForPreset(preset) {
    if (typeof preset !== "string" || !preset.startsWith(PRESET_PREFIX)) return null;
    return store.byPreset.get(preset) || null;
  }
  function activityTone(activity) {
    if (activity === "working" || activity === "reading" || activity === "writing" || activity === "thinking") return "working";
    if (activity === "waiting") return "waiting";
    if (activity === "error") return "error";
    return "idle";
  }
  function BotHeaderChip(props) {
    const identity = useBotStore();
    const preset = props.useProjection?.("agentPreset");
    const bot = botForPreset(preset) || identity.byPreset.get(preset) || null;
    const activity = useOwnSessionActivity(props);
    if (!bot) return null;
    const tone = activityTone(activity);
    return /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("div", { className: "gb-idchip", title: `${bot.name} \xB7 local bot \xB7 ${activityLabel(activity)}`, children: [
      /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(BotAvatar, { bot, size: 26, activity }),
      /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("span", { className: "gb-idchip-name", children: bot.name }),
      /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("span", { className: `gb-idchip-dot gb-idchip-dot--${tone}`, "aria-hidden": "true" }),
      /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(VisuallyHidden, { children: activityLabel(activity) })
    ] });
  }
  function HeroBrandMark({ ctx, registry }) {
    const identity = useBotStore();
    const source = ctx.sessions?.list;
    const subscribe = import_react21.default.useCallback((fn) => source ? source.subscribe(fn) : () => {
    }, [source]);
    const getSnapshot = import_react21.default.useCallback(() => source ? source.getSnapshot() : null, [source]);
    const sessions = import_react21.default.useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
    const bots = identity.bots.filter((bot) => bot.id !== "memo").slice(0, 5);
    const rows = sessionRows(sessions);
    const active = rows.find((row) => row.retainedBy && (row.retainedBy.mainView || 0) > 0);
    const activeBotId = active ? botIdForPreset(active.agentPreset) : null;
    const recent = rows.filter((row) => !row.blank).slice(0, 3);
    const start = (bot) => {
      try {
        if (activeBotId === bot.id) {
          registry.nav.dispatch({ type: "collapse-bot" });
          ctx.uiWorkspace.startSession(void 0, { agentPreset: "standard" });
        } else {
          registry.nav.dispatch({ type: "open-bot", botId: bot.id });
          ctx.uiWorkspace.startSession(void 0, { agentPreset: `grokbot-${bot.id}` });
        }
      } catch (error) {
        registry.toast(error?.message || "Could not start a chat.", "error");
      }
    };
    const openPptx = () => {
      try {
        registry.nav.dispatch({ type: "collapse-bot" });
        ctx.uiWorkspace.startSession(void 0, { agentPreset: "standard", prompt: "/pptx ", whenDraftExists: "append" });
      } catch (error) {
        registry.toast(error?.message || "Could not open the PPTX skill.", "error");
      }
    };
    const open = (row) => {
      try {
        registry.nav.dispatch({ type: "select-session", sessionId: row.id });
        ctx.uiWorkspace.openSession(row.id);
      } catch (error) {
        registry.toast(error?.message || "Could not open that chat.", "error");
      }
    };
    return /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("span", { className: "dsh-welcome", children: [
      /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("span", { className: "dsh-welcome-title", children: "Welcome to dsh" }),
      /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("span", { className: "dsh-welcome-copy", children: "Pick a GPT or start something new below." }),
      bots.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("span", { className: "dsh-welcome-section", children: [
        /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("span", { className: "dsh-welcome-label", children: "YOUR GPTs" }),
        /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("span", { className: "dsh-welcome-bots", children: bots.map((bot) => /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("button", { type: "button", className: "dsh-welcome-bot", "aria-pressed": activeBotId === bot.id, onClick: () => start(bot), children: [
          /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(BotAvatar, { bot, size: 32, activity: "idle" }),
          /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("span", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("strong", { children: bot.name }),
            /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("small", { children: bot.tagline && bot.tagline.toLowerCase() !== "assistant" ? bot.tagline : "GPT" })
          ] })
        ] }, bot.id)) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("span", { className: "dsh-welcome-section", children: [
        /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("span", { className: "dsh-welcome-label", children: "SKILLS" }),
        /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("span", { className: "dsh-welcome-bots", children: /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("button", { type: "button", className: "dsh-welcome-bot dsh-welcome-skill", onClick: openPptx, children: [
          /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("span", { className: "dsh-skill-icon", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("svg", { width: "21", height: "21", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round", strokeLinejoin: "round", children: [
            /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("path", { d: "M6 3.5h8l4 4V20a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1Z" }),
            /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("path", { d: "M14 3.5V8h4M8.5 12h6.5M8.5 15h6.5M8.5 18h4" })
          ] }) }),
          /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("span", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("strong", { children: "PPTX" }),
            /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("small", { children: "Spanish lesson slides" })
          ] })
        ] }) })
      ] }),
      recent.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("span", { className: "dsh-welcome-section", children: [
        /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("span", { className: "dsh-welcome-label", children: "RECENT CHATS" }),
        /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("span", { className: "dsh-welcome-recent", children: recent.map((row) => /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("button", { type: "button", className: "dsh-welcome-chat", onClick: () => open(row), children: [
          /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("span", { children: sessionLabel(row) }),
          /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("small", { children: relativeTime(row.updatedAt) })
        ] }, row.id)) })
      ] })
    ] });
  }
  function BotBackCrumb(props) {
    const identity = useBotStore();
    const chrome = props.registry && props.registry.chrome ? useChromeStore(props.registry.chrome) : null;
    const preset = props.useProjection?.("agentPreset");
    const sessionId = props.sessionId;
    const botId = botIdForPreset(preset) || null;
    const bot = botId ? identity.byPreset.get(`grokbot-${botId}`) || null : null;
    if (!bot || !props.registry) return null;
    if (chrome && chrome.open && chrome.botId === botId && chrome.sessionId === sessionId) return null;
    const back = () => {
      const nav = props.registry.nav;
      if (nav.getState().roomId) nav.dispatch({ type: "close-room" });
      if (sessionId) nav.dispatch({ type: "select-session", sessionId });
      nav.dispatch({ type: "open-bot", botId });
    };
    return /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)(
      "button",
      {
        type: "button",
        className: "grok-crumb",
        onClick: back,
        title: `All chats with ${bot.name}`,
        "aria-label": `All chats with ${bot.name}`,
        "data-grokbot-breadcrumb": "true",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", focusable: "false", children: /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("path", { d: "M15 5l-7 7 7 7" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("span", { className: "grok-crumb-name", children: bot.name })
        ]
      }
    );
  }
  function useChromeStore(store2) {
    const subscribe = import_react21.default.useCallback((listener) => store2.subscribe(listener), [store2]);
    const getSnapshot = import_react21.default.useCallback(() => store2.getState(), [store2]);
    return import_react21.default.useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
  }
  var STYLES = `
.gb-idchip{display:inline-flex;align-items:center;gap:7px;height:28px;padding:0 10px 0 3px;margin-inline-end:4px;border:1px solid var(--dsw-alias-border-l2,rgba(0,0,0,.1));border-radius:999px;background:var(--dsw-alias-bg-layer-1,transparent);color:var(--dsw-alias-label-primary,#111);font-size:12px;font-weight:600;letter-spacing:-.01em;cursor:default;user-select:none;white-space:nowrap}
.gb-idchip-name{max-width:120px;overflow:hidden;text-overflow:ellipsis}
.gb-idchip-dot{width:6px;height:6px;border-radius:50%;background:#9aa0a6;box-shadow:0 0 0 2px var(--dsw-alias-bg-layer-1,#fff)}
.gb-idchip-dot--working{background:#2bb673}
.gb-idchip-dot--waiting{background:#f5a623}
.gb-idchip-dot--error{background:#ff3e51}
.gb-idchip-dot--idle{background:var(--dsw-alias-label-tertiary,#9aa0a6)}
.grok-crumb{display:inline-flex;align-items:center;gap:4px;max-width:190px;height:28px;margin-inline-end:6px;padding:0 10px 0 7px;border:1px solid var(--dsw-alias-border-l2,rgba(0,0,0,.1));border-radius:999px;background:var(--dsw-alias-bg-layer-1,transparent);color:var(--dsw-alias-label-secondary,#5c5c5c);font:inherit;font-size:12px;font-weight:600;white-space:nowrap;cursor:pointer}
.grok-crumb:hover{background:var(--dsw-alias-interactive-bg-hover,rgba(0,0,0,.05));color:var(--dsw-alias-label-primary,#111)}
.grok-crumb svg{flex:none}
.grok-crumb-name{overflow:hidden;text-overflow:ellipsis}
.gb-hero-cluster{display:inline-flex;align-items:center;justify-content:center}
.gb-hero-cluster-item{display:inline-flex;margin-inline-start:-12px;filter:drop-shadow(0 2px 6px rgba(0,0,0,.12))}
.gb-hero-cluster-item:first-child{margin-inline-start:0}
/* The welcome lives in the existing hero seat, keeping the native composer mounted. */
[class*="_headline"]:has(.dsh-welcome) { display:block; width:100%; }
[class*="_headline"]:has(.dsh-welcome) [class*="_titleGroup"] { display:none; }
[class*="_headline"]:has(.dsh-welcome) [class*="_fishHitbox"] { display:block; width:100%; }
div:has(> span > .dsh-welcome) { display:block; width:100%; }
div:has(> span > .dsh-welcome) > span:has(> .dsh-welcome) { display:block; width:100%; }
div:has(> span > .dsh-welcome) > span:not(:has(> .dsh-welcome)) { display:none; }
.dsh-welcome { display:flex; flex-direction:column; align-items:stretch; width:100%; text-align:left; font-family:inherit; font-size:14px; line-height:1.35; color:var(--dsw-alias-label-primary,#1c1c1c); }
.dsh-welcome-kicker,.dsh-welcome-label { color:var(--dsw-alias-label-caption,#777); font-size:10px; font-weight:700; letter-spacing:.12em; }
.dsh-welcome-title { margin-top:8px; font-size:30px; line-height:1.15; font-weight:700; letter-spacing:-.035em; }
.dsh-welcome-copy { margin-top:6px; color:var(--dsw-alias-label-caption,#777); font-size:13px; font-weight:400; }
.dsh-welcome-section { display:block; margin-top:19px; }
.dsh-welcome-label { display:block; margin-bottom:8px; }
.dsh-welcome-bots { display:flex; gap:7px; overflow-x:auto; padding:2px 2px 5px; }
.dsh-welcome-bot,.dsh-welcome-chat { border:1px solid var(--dsw-alias-border-l4,rgba(128,128,128,.2)); background:var(--dsw-alias-interactive-bg-hover,rgba(128,128,128,.06)); color:inherit; cursor:pointer; transition:transform .16s ease,box-shadow .16s ease; }
.dsh-welcome-bot { display:flex; flex:0 0 auto; align-items:center; gap:8px; padding:7px 10px; border-radius:14px; text-align:left; }
.dsh-skill-icon { display:grid!important; place-items:center; width:32px; height:32px; border-radius:10px; background:color-mix(in srgb, #a97efe 20%, transparent); color:#7756c7; flex:none; }
.dsh-welcome-bot span:not(.dsh-skill-icon) { display:flex; flex-direction:column; max-width:100px; }
.dsh-welcome-bot strong { font-size:12px; font-weight:650; }
.dsh-welcome-bot small,.dsh-welcome-chat small { color:var(--dsw-alias-label-caption,#777); font-size:11px; font-weight:400; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.dsh-welcome-recent { display:flex; flex-direction:column; gap:4px; }
.dsh-welcome-chat { display:flex; justify-content:space-between; align-items:center; gap:12px; padding:7px 10px; border-radius:9px; font-size:12px; text-align:left; }
.dsh-welcome-chat > span { overflow:hidden; white-space:nowrap; text-overflow:ellipsis; }
.dsh-welcome-bot[aria-pressed="true"] { background:color-mix(in srgb, #a97efe 20%, var(--dsw-alias-bg-base,#fff)); border-color:#8b6fe8; box-shadow:0 0 0 1px #8b6fe8; }
.dsh-welcome-bot:hover,.dsh-welcome-chat:hover { transform:translateY(-1px); box-shadow:0 5px 16px rgba(0,0,0,.08); }
.dsh-welcome button:focus-visible { outline:2px solid #8b6fe8; outline-offset:2px; }
@media (prefers-reduced-motion:reduce) { .dsh-welcome-bot,.dsh-welcome-chat { transition:none; } .dsh-welcome-bot[aria-pressed="true"] { background:color-mix(in srgb, #a97efe 20%, var(--dsw-alias-bg-base,#fff)); border-color:#8b6fe8; box-shadow:0 0 0 1px #8b6fe8; }
.dsh-welcome-bot:hover,.dsh-welcome-chat:hover { transform:none; } }
@media (max-height:700px) { .dsh-welcome-section { margin-top:10px; } .dsh-welcome-recent { max-height:66px; overflow:auto; } }

`;
  function installIdentity(ctx, registry) {
    ctx.effect(() => {
      const style = document.createElement("style");
      style.dataset.grokbotIdentity = "1";
      style.textContent = STYLES;
      document.head.appendChild(style);
      const timer = setInterval(() => {
        if (!document.hidden) refreshBotIdentity();
      }, 3e4);
      const onVisible = () => {
        if (!document.hidden) refreshBotIdentity(true);
      };
      const onBotsChanged = () => {
        refreshBotIdentity(true);
      };
      document.addEventListener("visibilitychange", onVisible);
      window.addEventListener("grokbot:bots-changed", onBotsChanged);
      return () => {
        clearInterval(timer);
        document.removeEventListener("visibilitychange", onVisible);
        window.removeEventListener("grokbot:bots-changed", onBotsChanged);
        style.remove();
      };
    });
    const register = (slot, id, component, order) => {
      try {
        const dispose = ctx.slots.inject(
          slot,
          () => ctx.slots.register({ name: slot, id, order }, component)
        );
        if (typeof dispose === "function") ctx.effect(() => dispose);
      } catch (error) {
        console.warn(`[grokbot-ui] could not register ${slot}`, error);
      }
    };
    register("conversation.hero.brand.mark", "grokbot-hero-mark", (props) => /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(HeroBrandMark, { ...props, ctx, registry }), -10);
    register("conversation.session.header.actions", "grokbot-session-badge", BotHeaderChip, 10);
    if (registry) {
      try {
        const dispose = ctx.slots.inject(
          "conversation.session.header.actions",
          () => ctx.slots.register(
            { name: "conversation.session.header.actions", id: "grokbot-back-crumb", order: 5 },
            (props) => /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(BotBackCrumb, { registry, ...props || {} })
          )
        );
        if (typeof dispose === "function") ctx.effect(() => dispose);
      } catch (error) {
        console.warn("[grokbot-ui] could not register the bot breadcrumb", error);
      }
    }
  }

  // work/plugin/package/src/client/index.jsx
  var inject = ["slots", "theme", "layout", "uiWorkspace", "sessions", "shortcuts"];
  function apply(ctx) {
    installTheme(ctx);
    installChrome(ctx);
    const bots = registerBots(ctx);
    try {
      installIdentity(ctx, bots ? bots.registry : null);
    } catch (error) {
      console.warn("[grokbot-ui] identity decorations skipped", error);
    }
  }
  return __toCommonJS(index_exports);
})();

return __grokbotEntry || {};
}});
