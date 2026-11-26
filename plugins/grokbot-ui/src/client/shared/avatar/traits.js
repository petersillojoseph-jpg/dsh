/**
 * Deterministic avatar identity + motion traits.
 *
 * Adapted from Rakazo (Apache-2.0), https://github.com/elie222/rakazo
 *   packages/core/src/avatars/logo-avatar-traits.ts
 *   packages/core/src/avatars/avatar-shape.ts (identity seed / organic family)
 *   packages/core/src/avatars/logo-avatar-activity.ts (activity vocabulary)
 *
 * Traits are evaluated once from a stable identity (the bot id) and never from
 * `useId`, mount order or `Math.random`, so every render of a bot — roster row,
 * chat header, avatar studio preview — uses the same colour, blink rhythm and
 * gaze phase. Nothing here starts a clock.
 */
import { BOT_COLORS, resolvePersonaColorDef, shippedHash, shippedRandom } from './model.js'

/** Every supported motion track completes whole cycles in this export interval. */
export const LOGO_AVATAR_LOOP_MS = 24000

/** Slow activity periods are divisors of the 24s export interval. */
const SLOW_PERIODS = [4000, 4800, 6000]
/** Typing cadence: three tempo classes so a room of bots does not tap in unison. */
const WRITING_PERIODS = [1200, 1500, 2000]

/** The activity vocabulary the renderer understands (no VM/computer use). */
export const LOGO_AVATAR_ACTIVITIES = [
  'idle',
  'working',
  'reading',
  'writing',
  'thinking',
  'waiting',
  'error',
]

/**
 * Map any activity from a call site onto a supported pose. `computer` (a Rakazo
 * activity tied to screen control, which this plugin does not have) renders as
 * generic `working` — never as a monitor/pointer task cue.
 */
export function normalizeLogoActivity(activity) {
  if (activity === 'computer') return 'working'
  return LOGO_AVATAR_ACTIVITIES.includes(activity) ? activity : 'idle'
}

/** True for every activity that shows a bot doing something (not idle/error). */
export function isWorkingActivity(activity) {
  const value = normalizeLogoActivity(activity)
  return value === 'working' || value === 'reading' || value === 'writing' || value === 'thinking'
}

/** Waiting is the only activity that needs attention (Rakazo's needsAttention). */
export function logoAvatarNeedsAttention(activity) {
  return activity === 'waiting'
}

/** A saved bot id supplies the colour seed; this stream never advances motion clocks. */
export function seededLogoAvatarColor(identity) {
  const random = shippedRandom(shippedHash(`logo-avatar/color/v1/${identity}`))
  return BOT_COLORS[Math.floor(random() * BOT_COLORS.length)] || BOT_COLORS[0]
}

/**
 * Evaluate once per identity, never on an animation frame or from React's useId.
 * The returned object feeds the CSS variables (blink loop, per-activity periods)
 * and the seeded colour/eye ink.
 */
export function logoAvatarTraits(identity, color) {
  const random = shippedRandom(shippedHash(`logo-avatar/v2/${identity}`))
  const blinkVariant = random() < 0.5 ? 'three' : 'four'
  const blinkMs = LOGO_AVATAR_LOOP_MS
  const blinkDelayMs = -Math.round(random() * blinkMs * 1000) / 1000
  const tempo = Math.floor(random() * 3)
  const phase = random()
  const side = random() > 0.5 ? 1 : -1
  const energy = 0.92 + random() * 0.16
  const colorDef = resolvePersonaColorDef(identity, color || seededLogoAvatarColor(identity))
  return {
    color: colorDef.hex,
    originalOrange: colorDef.id === 'orange',
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
      thinking: 6000,
      waiting: SLOW_PERIODS[tempo],
      error: SLOW_PERIODS[tempo],
    },
  }
}

/* -------------------------------------------------------------------------- */
/* Organic (original) avatar identity                                        */
/* -------------------------------------------------------------------------- */

/** Stable non-negative seed from an identity string (Rakazo's avatarIdentitySeed). */
export function avatarIdentitySeed(identity) {
  const text = String(identity ?? '')
  let hash = 0
  for (let index = 0; index < text.length; index += 1) {
    hash = (hash << 5) - hash + text.charCodeAt(index)
    hash |= 0
  }
  return Math.abs(hash)
}

/** Degrees the organic face leans, so bots sharing a body still differ. */
export function organicAvatarEyeTilt(seed) {
  return (seed % 9) - 4
}

/** Organic bodies come in this many families; the seed picks one. */
export const ORGANIC_AVATAR_FAMILY_COUNT = 10

/** The body with two upper lobes, a central notch and a pointed bottom. */
export const ORGANIC_AVATAR_HEART_FAMILY = 6

/** The organic body family every client draws for this identity (a bot's id). */
export function organicAvatarFamily(identity) {
  return avatarIdentitySeed(identity) % ORGANIC_AVATAR_FAMILY_COUNT
}

/** Families 2 and 8 are both round blobs, so they count as one look. */
export function organicAvatarLook(family) {
  return family === 8 ? 2 : family
}

/** The distinct organic bodies a new bot can get: every look except the heart. */
export const ORGANIC_AVATAR_LOOKS = [
  ...new Set(
    Array.from({ length: ORGANIC_AVATAR_FAMILY_COUNT }, (_, family) => family)
      .filter((family) => family !== ORGANIC_AVATAR_HEART_FAMILY)
      .map(organicAvatarLook),
  ),
]

/** A stable identity whose organic body is the given family, for previews before an id exists. */
export function organicAvatarSampleIdentity(family) {
  for (let index = 0; ; index += 1) {
    const identity = `look-${family}-${index}`
    if (organicAvatarFamily(identity) === family) return identity
  }
}
