/**
 * Rakazo logo-avatar vector art — adapted for the Grokbot UI plugin.
 *
 * Adapted from Rakazo (Apache-2.0), https://github.com/elie222/rakazo
 *   packages/core/src/avatars/logo-avatar-art.ts
 *   packages/core/src/avatars/bot-avatar-colors.ts (colour + eye-ink helpers)
 *   packages/ui-tokens/src/index.ts (botEyeColor)
 *
 * The silhouette is a smooth cubic fit to the canonical mascot; no raster image
 * or external asset is embedded. Every helper here is pure and deterministic so
 * it can run during render without scheduling work.
 */

export const LOGO_AVATAR_VIEWBOX = '0 0 100 100'

/** The body (and the eyes on it) sits this far down its plate. */
export const LOGO_AVATAR_BODY_Y = 9

/** Oval eyes, in the body's own coordinates. */
export const LOGO_AVATAR_EYES = {
  width: 10.4,
  height: 16,
  leftCx: 40.5,
  rightCx: 59.5,
  cy: 40,
}

/** The ink of a drawn bot's eyes (Rakazo's botEyeColor), the same in both themes. */
export const BOT_EYE_COLOR = '#101014'

/** Smooth cubic fit to the canonical silhouette. */
export const LOGO_BODY_PATH =
  'M-1.759 76.330C0.959 69.782 7.117 63.647 10.602 56.566C14.086 49.486 14.898 41.460 17.063 33.747C19.227 26.034 22.744 18.634 28.465 13.175C34.186 7.716 42.110 4.197 50.032 4.183C57.954 4.169 65.874 7.660 71.581 13.121C77.288 18.582 80.783 26.014 82.945 33.732C85.107 41.449 85.935 49.451 89.402 56.543C92.869 63.634 98.975 69.814 101.767 76.305L108 108H-8Z'
export const LOGO_LEFT_HAND_PATH = 'M-2 74C7 68 22 75 26 83C31 93 26 102 19 107H-2Z'
export const LOGO_RIGHT_HAND_PATH = 'M102 73C92 68 78 75 74 83C69 93 74 102 81 107H102Z'

function expandHex(hex) {
  const clean = String(hex || '').replace('#', '')
  if (clean.length === 3) {
    return clean
      .split('')
      .map((character) => character + character)
      .join('')
  }
  return clean
}

function parseRgb(hex) {
  const clean = expandHex(hex)
  const value = Number.parseInt(clean.slice(0, 6) || 'ffffff', 16)
  if (!Number.isFinite(value)) return [255, 255, 255]
  return [(value >> 16) & 255, (value >> 8) & 255, value & 255]
}

/** WCAG relative luminance for a `#rgb` / `#rrggbb` colour. */
export function relativeLuminance(hex) {
  const rgb = parseRgb(hex).map((channel) => {
    const value = channel / 255
    return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]
}

/** WCAG contrast ratio between two hex colours. */
export function contrastRatio(a, b) {
  const [high, low] = [relativeLuminance(a), relativeLuminance(b)].sort((x, y) => y - x)
  return (high + 0.05) / (low + 0.05)
}

/**
 * Shared vector paint palette used by the web SVG body. The photographic grain of
 * the upstream artwork is intentionally simplified; the directional lighting and
 * rim highlights are kept.
 */
export function logoAvatarPaint(hex, originalOrange = false) {
  const full = hex.length === 4 ? `#${[...hex.slice(1)].map((character) => character + character).join('')}` : hex
  const raw = originalOrange ? '#ff7b08' : full
  const rgb = [1, 3, 5].map((index) => Number.parseInt(raw.slice(index, index + 2), 16))
  const shade = (factor) =>
    `#${rgb
      .map((value) =>
        Math.max(0, Math.min(255, Math.round(value * factor)))
          .toString(16)
          .padStart(2, '0'),
      )
      .join('')}`
  return {
    base: shade(1),
    light: shade(1.12),
    mid: shade(1),
    shadow: shade(0.8),
    edge: shade(0.96),
    deep: shade(0.55),
    flank: originalOrange ? '#c14d08' : shade(0.58),
    contact: originalOrange ? '#961b00' : shade(0.42),
    rim: originalOrange
      ? '#fff1dc'
      : `#${rgb
          .map((value) => Math.round(value + (255 - value) * 0.9).toString(16).padStart(2, '0'))
          .join('')}`,
  }
}

/** Shared directional surface lighting for the vector body. */
export const LOGO_AVATAR_LIGHTING = {
  body: { cx: '57%', cy: '30%', r: '76%' },
  flank: {
    gradientUnits: 'userSpaceOnUse',
    cx: 0,
    cy: 0,
    r: 1,
    gradientTransform: 'matrix(45 0 0 44 0 32)',
  },
  crown: {
    gradientUnits: 'userSpaceOnUse',
    cx: 0,
    cy: 0,
    r: 1,
    gradientTransform: 'matrix(34 0 0 33 57 23.5)',
    peak: 0.28,
    shoulder: 0.12,
  },
  leftHand: { cx: '60%', cy: '35%', r: '76%' },
  rightHand: { cx: '40%', cy: '35%', r: '76%' },
  leftContact: {
    gradientUnits: 'userSpaceOnUse',
    cx: 0,
    cy: 0,
    r: 1,
    gradientTransform: 'matrix(7.5 0 0 17 24.5 91)',
  },
  rightContact: {
    gradientUnits: 'userSpaceOnUse',
    cx: 0,
    cy: 0,
    r: 1,
    gradientTransform: 'matrix(7.5 0 0 17 75.5 91)',
  },
  rimUpper: {
    gradientUnits: 'userSpaceOnUse',
    cx: 0,
    cy: 0,
    r: 1.1,
    gradientTransform: 'matrix(35.3494 0 0 45.3948 50.0193 49.4219)',
  },
  rimLeftTrim: {
    gradientUnits: 'userSpaceOnUse',
    cx: 0,
    cy: 0,
    r: 1,
    gradientTransform: 'matrix(8.4 0 0 10.5 36 19)',
  },
  rimLeft: {
    gradientUnits: 'userSpaceOnUse',
    cx: 0,
    cy: 0,
    r: 1.1,
    gradientTransform: 'matrix(66.2501 0 0 63.0879 -50 30.676)',
  },
  rimRight: {
    gradientUnits: 'userSpaceOnUse',
    cx: 0,
    cy: 0,
    r: 1.1,
    gradientTransform: 'matrix(66.2472 0 0 63.3467 150 30.5562)',
  },
  handLight: { leftPeak: 0.15, rightPeak: 0.24, radius: '62%' },
}

/** `page` means the eye is the page's own colour; otherwise pick a contrasting ink. */
export function botEyeTone(bodyHex) {
  if (contrastRatio(bodyHex, '#FFFFFF') < 2.4) return 'dark'
  if (contrastRatio(bodyHex, '#000000') < 2) return 'light'
  return 'page'
}

/**
 * Eye ink for the logo mascot. The palette is bright enough for Rakazo's dark ink
 * on every colour; a custom dark body falls back to a light ink that contrasts in
 * both themes.
 */
export function logoAvatarEyeInk(bodyColor) {
  if (contrastRatio(bodyColor, BOT_EYE_COLOR) >= 3.5) return BOT_EYE_COLOR
  return '#F5F5F5'
}
