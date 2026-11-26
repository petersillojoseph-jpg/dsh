/**
 * Avatar data model shared by the browser bundle and the host store.
 *
 * Adapted from Rakazo (Apache-2.0), packages/contracts/src/bots/bot-avatar.ts
 * and packages/core/src/avatars/bot-avatar-colors.ts. No dependencies: this
 * module is plain ESM so both `src/client` (bundled by esbuild) and
 * `src/host` (Node ESM) can import it.
 *
 * Persisted value semantics (one string per bot):
 *   - `#RRGGBB`                    solid colour (logo/organic renderer decides the body)
 *   - `#RRGGBB::shape_N`           one of the 8 shipped organic shapes
 *   - `data:image/webp;base64,...` uploaded, circle-cropped image
 *
 * A separate per-bot `avatarSet` field picks the renderer:
 *   - `organic` original Rakazo organic shapes (static at rest, morphs while working)
 *   - `rakazo`  animated Rakazo logo mascot
 */

/** The one bot palette: every picker offers it. */
export const BOT_COLOR_LIST = [
  { id: 'white', name: 'Staff White', hex: '#FFFFFF' },
  { id: 'violet', name: 'Executive Violet', hex: '#A97EFE', previousHex: '#8B5CF6' },
  { id: 'green', name: 'Emerald', hex: '#00C972', previousHex: '#10B981' },
  { id: 'orange', name: 'Forge Orange', hex: '#FF781C', previousHex: '#F97316' },
  { id: 'cyan', name: 'Cyber Cyan', hex: '#1CC3B0', previousHex: '#06B6D4' },
  { id: 'blue', name: 'Cobalt Blue', hex: '#2A92FE', previousHex: '#3B82F6' },
  { id: 'yellow', name: 'Amber Gold', hex: '#FFAF38', previousHex: '#EAB308' },
  { id: 'brown', name: 'Caramel Bronze', hex: '#A27952', previousHex: '#8D6E63' },
  { id: 'red', name: 'Crimson Red', hex: '#FF3E51', previousHex: '#EF4444' },
  { id: 'magenta', name: 'Neon Pink', hex: '#FF5EB1', previousHex: '#EC4899' },
  { id: 'gray', name: 'Slate Silver', hex: '#94A3B8', previousHex: '#64748B' },
]

export const BOT_COLORS = BOT_COLOR_LIST.map((color) => color.hex)

/** Shared identity color for Avatar Studio reset/fallback. */
export const DEFAULT_BOT_AVATAR_COLOR = '#A97EFE'

export const BOT_AVATAR_SETS = ['organic', 'rakazo']
export const DEFAULT_NEW_BOT_AVATAR_SET = 'rakazo'

export const BOT_AVATAR_VALUE_MAX_LENGTH = 200000

export const SHIPPED_SHAPE_KEYS = [
  'hex',
  'wedge',
  'squircle',
  'tablet',
  'pebble',
  'blob',
  'teardrop',
  'cloud',
]
export const SHIPPED_SHAPE_LABELS = {
  hex: 'Hex',
  wedge: 'Wedge',
  squircle: 'Squircle',
  tablet: 'Tablet',
  pebble: 'Pebble',
  blob: 'Blob',
  teardrop: 'Teardrop',
  cloud: 'Cloud',
}

const LEGACY_COLOR_TO_ID = {
  // previous plugin palette ids
  black: 'gray',
  brown: 'brown',
  red: 'red',
  orange: 'orange',
  amber: 'yellow',
  green: 'green',
  teal: 'cyan',
  blue: 'blue',
  purple: 'violet',
  pink: 'magenta',
  gray: 'gray',
  cream: 'white',
  white: 'white',
  // xAI/Grok-era ids used by older docs
  violet: 'violet',
  mint: 'green',
  gold: 'yellow',
  yellow: 'yellow',
  rose: 'magenta',
  cyan: 'cyan',
  slate: 'gray',
}

const LEGACY_HEX_TO_ID = {
  '#0a0a0a': 'gray',
  '#8b5e3c': 'brown',
  '#f03e3e': 'red',
  '#ff6b00': 'orange',
  '#ffb703': 'yellow',
  '#2bb673': 'green',
  '#12b5a5': 'cyan',
  '#2d8cff': 'blue',
  '#8b5cf6': 'violet',
  '#ff3d8b': 'magenta',
  '#9aa0a6': 'gray',
  '#e8e0d0': 'white',
  // palette previousHex values
  '#10b981': 'green',
  '#f97316': 'orange',
  '#06b6d4': 'cyan',
  '#3b82f6': 'blue',
  '#eab308': 'yellow',
  '#8d6e63': 'brown',
  '#ef4444': 'red',
  '#ec4899': 'magenta',
  '#64748b': 'gray',
}

/** Legacy shape ids from the previous clay system mapped onto the shipped set. */
export const LEGACY_SHAPE_TO_KEY = {
  circle: 'squircle',
  capsule: 'tablet',
  triangle: 'wedge',
  hexagon: 'hex',
  droplet: 'teardrop',
  pebble: 'pebble',
  squircle: 'squircle',
  cloud: 'cloud',
  blob: 'blob',
  hex: 'hex',
  wedge: 'wedge',
  tablet: 'tablet',
  teardrop: 'teardrop',
}

export function resolveBotAvatarSet(value) {
  return value === 'organic' ? 'organic' : value === 'rakazo' ? 'rakazo' : DEFAULT_NEW_BOT_AVATAR_SET
}

export function shippedHash(value) {
  let hash = 2166136261
  const text = String(value ?? '')
  for (let index = 0; index < text.length; index += 1) {
    hash = Math.imul(hash ^ text.charCodeAt(index), 16777619)
  }
  return hash >>> 0
}

export function shippedRandom(seed) {
  let value = seed >>> 0
  return () => {
    value = (value + 1831565813) | 0
    let next = Math.imul(value ^ (value >>> 15), 1 | value)
    next = (next + Math.imul(next ^ (next >>> 7), 61 | next)) ^ next
    return ((next ^ (next >>> 14)) >>> 0) / 4294967296
  }
}

const HEX_COLOR = /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/
const SHAPE_SUFFIX = /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})::shape_\d+$/
const DATA_IMAGE = /^data:image\/(?:png|jpeg|webp|gif);base64,[A-Za-z0-9+/]+={0,2}$/

/** @typedef {{kind:'image', imageUrl:string}|{kind:'shape',color:string,shapeIndex:number}|{kind:'color',color:string}|{kind:'other',raw:string}} ParsedAvatar */

/** @param {string} raw @returns {ParsedAvatar} */
export function parseBotAvatarValue(raw) {
  const value = typeof raw === 'string' ? raw : ''
  if (value.startsWith('data:image/')) return { kind: 'image', imageUrl: value }
  if (value.includes('::shape_')) {
    const parts = value.split('::shape_')
    const color = parts[0] || DEFAULT_BOT_AVATAR_COLOR
    const rawShape = parts[1] ?? '0'
    const parsedShape = /^\d+$/.test(rawShape) ? Number(rawShape) : 0
    return {
      kind: 'shape',
      color,
      shapeIndex: Number.isSafeInteger(parsedShape) ? parsedShape % SHIPPED_SHAPE_KEYS.length : 0,
    }
  }
  if (HEX_COLOR.test(value)) return { kind: 'color', color: value }
  return { kind: 'other', raw: value }
}

export function isBotAvatarValue(raw) {
  if (typeof raw !== 'string' || !raw || raw.length > BOT_AVATAR_VALUE_MAX_LENGTH) return false
  return HEX_COLOR.test(raw) || SHAPE_SUFFIX.test(raw) || DATA_IMAGE.test(raw)
}

export function normalizeHexColor(raw) {
  if (typeof raw !== 'string') return ''
  const value = raw.trim()
  if (!HEX_COLOR.test(value)) return ''
  return `#${expandHex(value).toUpperCase()}`
}

function expandHex(hex) {
  const clean = hex.replace('#', '')
  if (clean.length === 3) return clean.split('').map((c) => c + c).join('')
  return clean
}

/** `<hex>::shape_N`, normalised to the 8 shipped shapes. */
export function shapeAvatarValue(color, shapeIndex) {
  const count = SHIPPED_SHAPE_KEYS.length
  const index = Number.isFinite(shapeIndex) ? ((Math.trunc(shapeIndex) % count) + count) % count : 0
  return `${normalizeHexColor(color) || DEFAULT_BOT_AVATAR_COLOR}::shape_${index}`
}

/**
 * Resolve a palette definition from an id, a palette name, a hex (current or
 * previous) or an arbitrary custom hex (Rakazo keeps custom colours renderable).
 */
export function resolvePersonaColorDef(identity, explicitColor) {
  if (explicitColor) {
    const clean = String(explicitColor).trim().toLowerCase()
    const byId = BOT_COLOR_LIST.find((c) => c.id === clean || c.name.toLowerCase() === clean)
    if (byId) return byId
    const byHex = BOT_COLOR_LIST.find(
      (c) =>
        c.hex.toLowerCase() === clean ||
        (c.previousHex && c.previousHex.toLowerCase() === clean),
    )
    if (byHex) return byHex
    const normalized = normalizeHexColor(explicitColor)
    if (normalized) return { id: 'custom', name: 'Custom', hex: normalized }
  }
  const seed = (shippedHash(identity) ^ Math.imul(1, 2654435769)) >>> 0
  const index = Math.floor(shippedRandom((seed ^ 2654435769) >>> 0)() * BOT_COLOR_LIST.length)
  return BOT_COLOR_LIST[index % BOT_COLOR_LIST.length] ?? BOT_COLOR_LIST[0]
}

/** Which palette colour a stored avatar value resolves to (images use violet). */
export function botAvatarColorHex(bot) {
  const parsed = parseBotAvatarValue(bot?.color)
  if (parsed.kind === 'image' || parsed.kind === 'other') return DEFAULT_BOT_AVATAR_COLOR
  return resolvePersonaColorDef(bot?.id || parsed.color, parsed.color).hex
}

/** Palette id for legacy color ids, old hexes and current palette entries. */
export function legacyColorValue(raw) {
  if (typeof raw !== 'string' || !raw.trim()) return DEFAULT_BOT_AVATAR_COLOR
  const clean = raw.trim()
  const byId = LEGACY_COLOR_TO_ID[clean.toLowerCase()]
  if (byId) {
    const def = BOT_COLOR_LIST.find((c) => c.id === byId)
    if (def) return def.hex
  }
  const byOldHex = LEGACY_HEX_TO_ID[clean.toLowerCase()]
  if (byOldHex) {
    const def = BOT_COLOR_LIST.find((c) => c.id === byOldHex)
    if (def) return def.hex
  }
  const direct = normalizeHexColor(clean)
  if (direct) {
    const byHex = BOT_COLOR_LIST.find(
      (c) =>
        c.hex.toLowerCase() === direct.toLowerCase() ||
        (c.previousHex && c.previousHex.toLowerCase() === direct.toLowerCase()),
    )
    return byHex ? byHex.hex : direct
  }
  const byName = BOT_COLOR_LIST.find((c) => c.name.toLowerCase() === clean.toLowerCase())
  return byName ? byName.hex : DEFAULT_BOT_AVATAR_COLOR
}

/**
 * Convert a legacy `{ color, shape, face }` bot to the new avatar value.
 * `face` has no equivalent in Rakazo; the shape keeps the closest shipped
 * silhouette and `avatarSet` defaults to organic (the legacy look was shape
 * based). Idempotent when the bot is already migrated.
 */
export function migrateLegacyAvatar(bot) {
  const source = bot && typeof bot === 'object' ? bot : {}
  const color = legacyColorValue(source.color)
  const shapeKey = LEGACY_SHAPE_TO_KEY[String(source.shape || '').toLowerCase()]
  const hasNewValue = isBotAvatarValue(source.color)
  const avatarSet =
    source.avatarSet === 'rakazo' || source.avatarSet === 'organic'
      ? source.avatarSet
      : 'organic'
  if (hasNewValue) return { color: source.color, avatarSet: source.avatarSet || avatarSet }
  if (shapeKey) {
    return { color: shapeAvatarValue(color, SHIPPED_SHAPE_KEYS.indexOf(shapeKey)), avatarSet }
  }
  return { color, avatarSet }
}

/** The canonical stored avatar value for a bot (tolerates old rows). */
export function avatarValueForBot(bot) {
  if (!bot || typeof bot !== 'object') return DEFAULT_BOT_AVATAR_COLOR
  if (isBotAvatarValue(bot.color)) return bot.color
  return migrateLegacyAvatar(bot).color
}

/** A seeded look for a bot that has no id yet (Avatar Studio preview). */
export function seededAvatarLook(seedText) {
  const seed = shippedHash(`avatar-studio/look/v1/${seedText || 'new-bot'}`)
  const random = shippedRandom(seed)
  const color = BOT_COLOR_LIST[Math.floor(random() * BOT_COLOR_LIST.length)]
  const shapeIndex = Math.floor(random() * SHIPPED_SHAPE_KEYS.length)
  return {
    color: color ? color.hex : DEFAULT_BOT_AVATAR_COLOR,
    shapeIndex,
    avatarSet: DEFAULT_NEW_BOT_AVATAR_SET,
  }
}
