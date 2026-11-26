/**
 * Grokbot UI — Rakazo product palette (web/Electron values).
 *
 * A per-mode override layer for the shipped DSH `--dsw-*` roles, derived
 * verbatim from Rakazo's `packages/ui-tokens/src/tokens.css` (the web palette
 * merged from `webLightTokens` / `webDarkTokens` in `src/index.ts`). Rakazo's
 * semantic names follow the shadcn convention, so each slot maps onto the DSH
 * alias that means the same thing:
 *
 *   Rakazo              → DSH role(s)
 *   background          → --dsw-alias-bg-base
 *   dialog              → --dsw-alias-bg-layer-1
 *   card                → --dsw-alias-bg-layer-2 / -3, bg-module-platform
 *   popover             → --dsw-alias-bg-overlay, menu-surface-fill
 *   foreground          → --dsw-alias-label-primary
 *   muted-foreground    → --dsw-alias-label-secondary
 *   faint-foreground    → --dsw-alias-label-tertiary / label-caption
 *   border / input      → --dsw-alias-border-l1 … -l4
 *   sidebar*            → --dsw-specific-sidebar-*
 *   chat-user*          → --dsw-specific-bubble / -bubble-highlight
 *   overlay             → --dsw-alias-bg-mask-1
 *   scrollbar*          → --dsw-alias-scrollbar-*
 *   status-working/unread → --dsw-alias-state-business-primary
 *   working-dot         → --dsw-alias-state-success-secondary
 *   destructive/success/warning → --dsw-alias-state-error/success/warn-*
 *
 * Radii are the derived scale from `--radius: 0.75rem` (sm −4, md −2, lg base,
 * xl +4, 2xl +8) mapped onto the DSH radius roles. Typography follows
 * `packages/ui-web/src/styles.css`: system font stack and its one type scale,
 * mapped onto the DSH composite font tokens so app chrome, markdown and the
 * plugin's own surfaces all read from the same sizes. The plugin only overrides
 * tokens — the user's system / light / dark preference is never written.
 *
 * @module @local/grokbot-ui/theme-tokens
 */

/** Rakazo web font stack (`--font-sans`). */
export const FONT_SANS = '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'

/** Rakazo monospace stack (`--font-mono`). */
export const FONT_MONO =
  'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'

/** Base radius (`--radius: 0.75rem`) plus the derived sm/md/lg/xl/2xl scale. */
export const RADII = Object.freeze({
  xs: '4px',
  sm: '8px', // calc(12px - 4px)
  md: '10px', // calc(12px - 2px)
  lg: '12px', // base
  xl: '16px', // calc(12px + 4px)
  '2xl': '20px', // calc(12px + 8px)
})

/** Rakazo web light palette, exact upstream values. */
const LIGHT = Object.freeze({
  background: '#ffffff',
  dialog: '#ffffff',
  foreground: '#1c1c1c',
  card: '#f2f2f2',
  cardForeground: '#1c1c1c',
  popover: '#ffffff',
  popoverForeground: '#1c1c1c',
  glassFill: '#ffffff',
  glassStroke: '#14141416',
  primary: '#1c1c1c',
  primaryForeground: '#fcfcfc',
  primaryHover: '#363636',
  primaryDisabled: '#1c1c1c26',
  secondary: '#1c1c1c0f',
  secondaryForeground: '#1c1c1c',
  chatUser: '#1c1c1c',
  chatUserForeground: '#ffffff',
  muted: '#f2f2f2',
  mutedForeground: '#1c1c1cad',
  faintForeground: '#1c1c1c8f',
  accent: '#1c1c1c0f',
  accentForeground: '#1c1c1c',
  destructive: '#cd2834',
  destructiveFill: '#e72e3b',
  destructiveForeground: '#ffffff',
  border: '#1c1c1c1f',
  input: '#1c1c1c3d',
  ring: '#1e86fc',
  sidebar: '#f5f5f5',
  sidebarForeground: '#1c1c1c',
  sidebarBorder: '#1c1c1c1f',
  sidebarAccent: '#1c1c1c14',
  sidebarAccentForeground: '#1c1c1c',
  link: '#0b6dd3',
  success: '#00854a',
  warning: '#aa6300',
  statusWorking: '#0b6dd3',
  unread: '#0b6dd3',
  workingDot: '#10ab61',
  overlay: '#00000080',
  scrollbar: '#1c1c1c3d',
  scrollbarHover: '#1c1c1c85',
})

/** Rakazo web dark palette, exact upstream values. */
const DARK = Object.freeze({
  background: '#0a0a0a',
  dialog: '#161616',
  foreground: '#f5f5f5',
  card: '#232323',
  cardForeground: '#f5f5f5',
  popover: '#232323',
  popoverForeground: '#f5f5f5',
  glassFill: '#2c2c2e',
  glassStroke: '#fcfcfc26',
  primary: '#f5f5f5',
  primaryForeground: '#121212',
  primaryHover: '#dbdbdb',
  primaryDisabled: '#f5f5f521',
  secondary: '#f5f5f50a',
  secondaryForeground: '#f5f5f5',
  chatUser: '#3e3e3e',
  chatUserForeground: '#f5f5f5',
  muted: '#232323',
  mutedForeground: '#f5f5f5a8',
  faintForeground: '#f5f5f58a',
  accent: '#f5f5f51a',
  accentForeground: '#f5f5f5',
  destructive: '#ff6463',
  destructiveFill: '#cf2b35',
  destructiveForeground: '#ffffff',
  border: '#f5f5f51a',
  input: '#f5f5f538',
  ring: '#1884fc',
  sidebar: '#0a0a0a',
  sidebarForeground: '#f5f5f5',
  sidebarBorder: '#f5f5f50f',
  sidebarAccent: '#f5f5f514',
  sidebarAccentForeground: '#f5f5f5',
  link: '#4d9bff',
  success: '#00ba69',
  warning: '#e28600',
  statusWorking: '#4d9bff',
  unread: '#4d9bff',
  workingDot: '#0e9f5a',
  overlay: '#000000b2',
  scrollbar: '#f5f5f538',
  scrollbarHover: '#f5f5f580',
})

/** Pick the light/dark upstream value for one role. */
function pair(light, dark) {
  return { light, dark }
}

/** Same value in both color schemes (typography, radii, shadows). */
function both(value) {
  return { light: value, dark: value }
}

/** Alpha tint of a `#rrggbb` ink, as `rgba()` so it composes with any surface. */
function tint(hex, alpha) {
  const value = hex.replace('#', '')
  const r = Number.parseInt(value.slice(0, 2), 16)
  const g = Number.parseInt(value.slice(2, 4), 16)
  const b = Number.parseInt(value.slice(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

/** Semantic role accessor for the two upstream palettes. */
const role = (name) => pair(LIGHT[name], DARK[name])

/** Rakazo type scale (`--text-*` in packages/ui-web/src/styles.css). */
export const TYPE_SCALE = Object.freeze({
  caption: '11px/16px',
  label: '12px/16px',
  bodySm: '13px/18px',
  body: '14px/20px',
  bodyLg: '15px/22px',
  heading3: '17px/24px',
  heading2: '22px/28px',
  heading1: '26px/32px',
  display: '32px/40px',
})

/** Composite family-preserving font value at a scale step. */
function font(sizeAndLineHeight) {
  return both(`${sizeAndLineHeight} var(--dsw-font-family)`)
}

/**
 * Theme token overrides as `{ light, dark }` pairs, accepted by
 * `ctx.theme.overrideTokens('@local/grokbot-ui', …)`.
 */
export const TOKEN_OVERRIDES = Object.freeze({
  // ---- typography ----------------------------------------------------------
  // One system stack and one type scale, like Rakazo's web client. Composite
  // DSH font tokens keep their role markers (weight) where the shipped role
  // has one and step onto the Rakazo sizes.
  '--dsw-font-family': both(FONT_SANS),
  '--dsw-font-family-brand': both(FONT_SANS),
  '--dsw-font-base-16': font(TYPE_SCALE.bodyLg), // body-lg 15/22
  '--dsw-font-s-14': font(TYPE_SCALE.body), // body 14/20
  '--dsw-font-xs-13': font(TYPE_SCALE.bodySm), // body-sm 13/18
  '--dsw-font-xxs-12': font(TYPE_SCALE.label), // label 12/16
  '--dsw-font-xxxs-11': font(TYPE_SCALE.caption), // caption 11/16 (+.005em in CSS)
  '--dsw-font-m-18': both(`500 ${TYPE_SCALE.heading3} var(--dsw-font-family)`),
  '--dsw-font-l-20': both(`500 ${TYPE_SCALE.heading2} var(--dsw-font-family)`),
  '--dsw-font-xl-24': both(`600 ${TYPE_SCALE.heading1} var(--dsw-font-family)`),
  '--dsw-font-markdown-base': both(`15px / 22px var(--dsw-font-family)`), // body-lg
  '--dsw-font-markdown-h1': both(`600 26px / 32px var(--dsw-font-family)`),
  '--dsw-font-markdown-h2': both(`600 22px / 28px var(--dsw-font-family)`),
  '--dsw-font-markdown-h3': both(`600 17px / 24px var(--dsw-font-family)`),
  '--dsw-font-markdown-h4': both(`600 15px / 22px var(--dsw-font-family)`),
  '--dsw-font-markdown-small': font(TYPE_SCALE.bodySm),
  '--dsw-font-markdown-table': font(TYPE_SCALE.bodySm),
  '--dsw-font-markdown-code': both(`13px / 20px ${FONT_MONO}`),
  '--dsw-font-markdown-code-block': both(`13px / 20px ${FONT_MONO}`),
  '--dsw-font-markdown-code-block-small': both(`12px / 18px ${FONT_MONO}`),

  // ---- radii (Rakazo --radius: 12px base with derived steps) ---------------
  '--dsw-radius-xs': both(RADII.xs),
  '--dsw-radius-sm': both(RADII.sm),
  '--dsw-radius-md': both(RADII.md),
  '--dsw-radius-lg': both(RADII.lg),
  '--dsw-radius-xl': both(RADII.xl),
  '--dsw-radius-panel': both(RADII['2xl']),

  // ---- focus ring ----------------------------------------------------------
  '--dsw-focus-ring-color': role('ring'),
  '--dsw-focus-ring-width': both('2px'),

  // ---- canvas & layers -----------------------------------------------------
  '--dsw-alias-bg-base': role('background'),
  '--dsw-alias-bg-document-preview': role('muted'),
  '--dsw-alias-bg-document-selection': pair(tint(LIGHT.ring, 0.18), tint(DARK.ring, 0.26)),
  '--dsw-alias-bg-layer-1': role('dialog'),
  '--dsw-alias-bg-layer-2': role('card'),
  '--dsw-alias-bg-layer-3': role('muted'),
  '--dsw-alias-bg-mask-1': role('overlay'), // dialog backdrop
  '--dsw-alias-bg-mask-2': pair('#0000003d', '#00000066'),
  '--dsw-alias-bg-mask-3': pair('#000000b3', '#000000d9'),
  '--dsw-alias-bg-mask-drop': pair('#ffffffeb', '#2c2c2ee6'), // glass-fill, made opaque enough to read
  '--dsw-alias-bg-mask-photo': both('#000000d9'),
  '--dsw-alias-bg-module-platform': role('card'),
  '--dsw-alias-bg-multi-select': role('muted'),
  '--dsw-alias-bg-overlay': role('popover'),
  '--dsw-alias-bg-skeleton': role('secondary'),

  // ---- hairlines -----------------------------------------------------------
  '--dsw-alias-border-inverted': role('border'),
  '--dsw-alias-border-inverted2': role('input'),
  '--dsw-alias-border-l1': role('sidebarBorder'),
  '--dsw-alias-border-l2': role('border'),
  '--dsw-alias-border-l2-darkmode-thin': role('border'),
  '--dsw-alias-border-l3': role('input'),
  '--dsw-alias-border-l4': role('input'),

  // ---- brand & buttons -----------------------------------------------------
  '--dsw-alias-brand-primary': role('primary'),
  '--dsw-alias-brand-primary-invert': role('primaryForeground'),
  '--dsw-alias-brand-primary-new-colorprimary-new-color': role('ring'),
  '--dsw-alias-brand-text': role('foreground'),
  '--dsw-alias-button-contrast-fill': role('primary'),
  '--dsw-alias-button-elevated-fill': role('popover'),
  '--dsw-alias-button-floating-fill': role('glassFill'),
  '--dsw-alias-button-floating-hover': pair('#f2f2f2', '#333335'),
  '--dsw-alias-button-ghost-active-border': role('input'),
  '--dsw-alias-button-ghost-active-fill': role('secondary'),
  '--dsw-alias-button-ghost-active-hover': role('accent'),
  '--dsw-alias-button-info-fill': role('ring'),
  '--dsw-alias-button-info-hover': role('link'),
  '--dsw-alias-button-primary-dimmed': role('primaryDisabled'),
  '--dsw-alias-button-primary-fill': role('primary'),
  '--dsw-alias-button-primary-hover': role('primaryHover'),
  '--dsw-alias-button-tool-bar-fill': role('secondary'),
  '--dsw-alias-button-tool-bar-fill-invisible': pair('#1c1c1c08', '#f5f5f508'),
  '--dsw-alias-button-tool-bar-hover': role('accent'),

  // ---- typography roles ----------------------------------------------------
  '--dsw-alias-label-caption': role('faintForeground'),
  '--dsw-alias-label-deep-diving': role('foreground'),
  '--dsw-alias-label-deep-diving-shimmer': pair(tint(LIGHT.foreground, 0.35), tint(DARK.foreground, 0.35)),
  '--dsw-alias-label-dimmed': role('primaryDisabled'),
  '--dsw-alias-label-document-preview': role('mutedForeground'),
  '--dsw-alias-label-primary': role('foreground'),
  '--dsw-alias-label-primary-bluish': role('foreground'),
  '--dsw-alias-label-primary-dimmed': role('mutedForeground'),
  '--dsw-alias-label-primary-foreground': role('primaryForeground'),
  '--dsw-alias-label-primary-inverted': role('primaryForeground'),
  '--dsw-alias-label-secondary': role('mutedForeground'),
  '--dsw-alias-label-shimmer': pair(tint(LIGHT.foreground, 0.3), tint(DARK.foreground, 0.4)),
  '--dsw-alias-label-tertiary': role('faintForeground'),
  '--dsw-alias-link': role('link'),

  // ---- markdown & code -----------------------------------------------------
  '--dsw-alias-markdown-citation': role('muted'),
  '--dsw-alias-markdown-code-block': role('card'),
  '--dsw-alias-markdown-code-block-banner': role('muted'),
  '--dsw-alias-markdown-code-segment-selected': role('background'),
  '--dsw-alias-markdown-code-segment-unselected': role('muted'),
  '--dsw-alias-markdown-inline-code': role('muted'),
  '--dsw-alias-markdown-placeholder': role('card'),
  '--dsw-alias-markdown-tag': role('muted'),

  // ---- menus & overlays ----------------------------------------------------
  '--dsw-alias-menu-group-header-fill': role('sidebar'),
  '--dsw-alias-menu-icon': role('mutedForeground'),
  '--dsw-menu-surface-fill': role('popover'),
  '--dsw-specific-menu': role('popover'),

  // ---- scrollbars ----------------------------------------------------------
  '--dsw-alias-scrollbar-bg-l1': role('scrollbar'),
  '--dsw-alias-scrollbar-bg-l2': role('scrollbar'),
  '--dsw-alias-scrollbar-hover-l1': role('scrollbarHover'),
  '--dsw-alias-scrollbar-hover-l2': role('scrollbarHover'),

  // ---- states --------------------------------------------------------------
  '--dsw-alias-state-business-primary': role('statusWorking'),
  '--dsw-alias-state-business-tertiary': pair(tint(LIGHT.statusWorking, 0.12), tint(DARK.statusWorking, 0.16)),
  '--dsw-alias-state-done-primary': role('mutedForeground'),
  '--dsw-alias-state-error-primary': role('destructive'),
  '--dsw-alias-state-error-secondary': role('destructiveFill'),
  '--dsw-alias-state-idle-primary': role('secondary'),
  '--dsw-alias-state-success-primary': role('success'),
  '--dsw-alias-state-success-secondary': role('workingDot'),
  '--dsw-alias-state-success-tertiary': pair(tint(LIGHT.success, 0.1), tint(DARK.success, 0.14)),
  '--dsw-alias-state-warn-label': role('warning'),
  '--dsw-alias-state-warn-primary': role('warning'),
  '--dsw-alias-state-warn-secondary': role('warning'),
  '--dsw-alias-state-warn-tertiary': pair(tint(LIGHT.warning, 0.1), tint(DARK.warning, 0.16)),

  // ---- component surfaces --------------------------------------------------
  '--dsw-alias-switch-thumb': pair('#ffffff', '#f5f5f5'),
  '--dsw-alias-toast-bg': pair('#1c1c1c', '#232323'),
  '--dsw-alias-toast-label': pair('#ffffff', '#f5f5f5'),
  '--dsw-alias-tooltip-bg': pair('#1c1c1c', '#2c2c2e'),
  '--dsw-alias-tooltip-key-bg': pair('#ffffff29', '#ffffff24'),
  '--dsw-alias-turn-trigger-bg': role('secondary'),
  '--dsw-alias-turn-trigger-bg-hover': role('accent'),
  '--dsw-alias-interactive-bg-active': role('sidebarAccent'),
  '--dsw-alias-interactive-bg-hover-accent': pair(tint(LIGHT.ring, 0.1), tint(DARK.ring, 0.18)),
  '--dsw-alias-interactive-bg-hover-danger': pair(tint(LIGHT.destructive, 0.07), tint(DARK.destructive, 0.14)),
  '--dsw-alias-interactive-bg-hover-solid': role('muted'),
  '--dsw-alias-interactive-bg-hover': role('accent'),
  '--dsw-alias-settings-card-fill': role('dialog'),
  '--dsw-alias-settings-card-stroke': role('border'),
  '--dsw-alias-onboarding-accent': role('ring'),
  '--dsw-alias-onboarding-card-fill': role('dialog'),
  '--dsw-alias-onboarding-checkbox-border': role('input'),
  '--dsw-alias-onboarding-secondary-fill': role('muted'),

  // ---- diffs & files -------------------------------------------------------
  '--dsw-alias-code-diff-added': pair(tint(LIGHT.success, 0.1), tint(DARK.success, 0.12)),
  '--dsw-alias-code-diff-deleted': pair(tint(LIGHT.destructive, 0.08), tint(DARK.destructive, 0.14)),
  '--dsw-alias-file-diff-added-bg': pair('#e9f7ee', '#12251a'),
  '--dsw-alias-file-diff-added-gutter': pair('#f0faf3', '#0e1c14'),
  '--dsw-alias-file-diff-added-marker': pair(LIGHT.success, DARK.success),
  '--dsw-alias-file-diff-deleted-bg': pair('#fdecea', '#2a1314'),
  '--dsw-alias-file-diff-deleted-gutter': pair('#fef2f0', '#1e0e10'),
  '--dsw-alias-file-diff-deleted-marker': pair(LIGHT.destructive, DARK.destructive),

  // ---- illustrations (empty states / pickers) ------------------------------
  '--dsw-alias-illustration-background': role('muted'),
  '--dsw-alias-illustration-backing': role('card'),
  '--dsw-alias-illustration-detail': role('faintForeground'),
  '--dsw-alias-illustration-inset': role('background'),
  '--dsw-alias-illustration-shadow': role('background'),
  '--dsw-alias-illustration-surface': role('muted'),

  // ---- component surface aliases (specific layer) --------------------------
  '--dsw-specific-bubble': role('chatUser'),
  '--dsw-specific-bubble-highlight': pair('#363636', '#4a4a4a'),
  '--dsw-specific-input-major': role('popover'),
  '--dsw-specific-login-input': role('muted'),
  '--dsw-specific-selector': role('muted'),
  '--dsw-specific-sidebar-fill': role('sidebar'),
  '--dsw-specific-sidebar-nav-item-active': role('sidebarAccent'),
  '--dsw-specific-sidebar-nav-item-active-accent': role('accent'),
  '--dsw-specific-tip': role('muted'),

  // ---- elevation -----------------------------------------------------------
  // Rakazo's shadcn shadows: quiet, short-throw; the dark theme keeps its
  // hairlines legible by deepening the ambient shadow.
  '--dsw-elevation-stroke-color': role('border'),
  '--dsw-shadow-lv1': pair('0 1px 2px 0 #0000000a', '0 1px 2px 0 #00000066'),
  '--dsw-shadow-lv2': pair(
    '0 4px 12px 0 #00000008, 0 1px 3px 0 #0000000a',
    '0 4px 12px 0 #00000055, 0 1px 3px 0 #00000066',
  ),
  '--dsw-shadow-lv3': pair(
    '0 12px 32px 0 #00000014, 0 2px 8px 0 #0000000a',
    '0 12px 32px 0 #00000080, 0 2px 8px 0 #00000066',
  ),
  '--dsw-elevation-soft': pair(
    '0 0 0 .5px #1c1c1c1f, 0 4px 16px 0 #00000008, 0 0 24px 0 #00000008',
    '0 0 0 .5px #f5f5f51a, 0 4px 16px 0 #00000055, 0 0 24px 0 #00000055',
  ),
  '--dsw-elevation-panel': pair(
    '0 0 0 .5px #1c1c1c1f, 0 3px 8px 0 #00000008, 0 0 16px 0 #00000005',
    '0 0 0 .5px #f5f5f51a, 0 3px 8px 0 #00000055, 0 0 16px 0 #00000044',
  ),
  '--dsw-elevation-prominent': pair(
    '0 0 0 .5px #1c1c1c1f, 0 3px 8px 0 #0000000a, 0 0 20px 0 #0000000d',
    '0 0 0 .5px #f5f5f51a, 0 3px 8px 0 #00000066, 0 0 20px 0 #00000066',
  ),
})

/** Number of overridden token roles, for diagnostics. */
export const TOKEN_COUNT = Object.keys(TOKEN_OVERRIDES).length
