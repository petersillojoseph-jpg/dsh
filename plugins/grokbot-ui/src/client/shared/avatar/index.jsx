/**
 * Grokbot UI avatar engine — the ported Rakazo avatar sets.
 *
 * Adapted from Rakazo (Apache-2.0), https://github.com/elie222/rakazo
 *   packages/ui-web/src/bot-avatar.tsx (BotAvatar, BotShapePreview)
 *   packages/ui-web/src/group-avatar.tsx (stacked avatars)
 *   packages/contracts/src/bots/bot-avatar.ts (avatar value semantics)
 *
 * Rendering rules:
 *   - `data:image/...` value  -> circle-cropped <img> + working ring
 *   - `#hex::shape_N` value   -> one of the 8 shipped organic shapes
 *   - `avatarSet === 'rakazo'` -> animated logo mascot
 *   - otherwise               -> seeded organic body + bar eyes
 *
 * The stylesheet is imported as text (esbuild `text` loader) and injected once at
 * module load, so the plugin stays a self-contained bundle with no Tailwind and no
 * external assets. All React state is limited to a short crossfade; motion lives in
 * CSS keyframes and pauses when offscreen/hidden or under reduced motion.
 */
import React, { memo, useMemo } from 'react'
import cssText from './avatar.css'
import { LogoAvatar } from './logo.jsx'
import { OrganicAvatar } from './organic.jsx'
import {
  BOT_AVATAR_SETS,
  BOT_COLOR_LIST,
  BOT_COLORS,
  DEFAULT_BOT_AVATAR_COLOR,
  DEFAULT_NEW_BOT_AVATAR_SET,
  SHIPPED_SHAPE_KEYS,
  SHIPPED_SHAPE_LABELS,
  avatarValueForBot,
  botAvatarColorHex,
  isBotAvatarValue,
  migrateLegacyAvatar,
  normalizeHexColor,
  parseBotAvatarValue,
  resolveBotAvatarSet,
  resolvePersonaColorDef,
  seededAvatarLook,
  shapeAvatarValue,
} from './model.js'
import {
  BOT_EYE_COLOR,
  botEyeTone,
  contrastRatio,
  logoAvatarEyeInk,
  logoAvatarPaint,
} from './logo-art.js'
import {
  LOGO_AVATAR_ACTIVITIES,
  isWorkingActivity,
  logoAvatarTraits,
  normalizeLogoActivity,
  seededLogoAvatarColor,
} from './traits.js'
import {
  ORGANIC_AVATAR_EYES,
  ORGANIC_AVATAR_VIEWBOX,
  SHIPPED_BOT_AVATAR_EYES,
  SHIPPED_BOT_AVATAR_SHAPES,
  SHIPPED_BOT_AVATAR_VIEWBOX,
  organicAvatarPath,
} from './organic-path.js'

/* -------------------------------------------------------------------------- */
/* Stylesheet injection                                                      */
/* -------------------------------------------------------------------------- */

function injectAvatarStyles() {
  if (typeof document === 'undefined') return
  const parent = document.head || document.documentElement
  if (!parent) return
  let element = document.querySelector('style[data-grokbot-avatar]')
  if (!element) {
    element = document.createElement('style')
    element.setAttribute('data-grokbot-avatar', '')
    parent.appendChild(element)
  }
  if (!element.textContent) element.textContent = cssText
}

injectAvatarStyles()

/* -------------------------------------------------------------------------- */
/* Activity helpers                                                          */
/* -------------------------------------------------------------------------- */

const WORKING_STATUSES = new Set([
  'running',
  'working',
  'busy',
  'queued',
  'active',
  'streaming',
  'composing',
  'waiting',
  'waiting_input',
  'waiting_takeover',
])

const WAITING_STATUSES = new Set(['waiting', 'waiting_input', 'waiting_takeover', 'awaiting_user'])

/** True when a session/run status implies the bot is doing something. */
export function isWorkingStatus(status) {
  return WORKING_STATUSES.has(String(status || '').toLowerCase())
}

/** Map a DSH run status onto an avatar activity (unknown statuses stay idle). */
export function statusToActivity(status) {
  const value = String(status || '').toLowerCase()
  if (value === 'failed' || value === 'error') return 'error'
  if (WAITING_STATUSES.has(value)) return 'waiting'
  if (WORKING_STATUSES.has(value)) return 'working'
  return 'idle'
}

/* -------------------------------------------------------------------------- */
/* BotAvatar                                                                 */
/* -------------------------------------------------------------------------- */

/**
 * One bot avatar.
 *
 * @param {object} props
 * @param {object} [props.bot] bot record; its `color`/`avatarSet` are used when not overridden
 * @param {string} [props.color] explicit stored avatar value (`#hex`, `#hex::shape_N`, data image)
 * @param {'organic'|'rakazo'} [props.avatarSet]
 * @param {string} [props.identity] stable identity for seeded traits (defaults to the bot id)
 * @param {string} [props.activity] idle|working|reading|writing|thinking|waiting|error
 * @param {number} [props.size]
 * @param {string} [props.status] run/session status; used for the working ring and pose fallback
 * @param {boolean} [props.animated]
 * @param {string} [props.className]
 * @param {string} [props.title]
 * @param {string} [props.label] accessible name
 */
export const BotAvatar = memo(function BotAvatar({
  bot,
  color,
  avatarSet,
  identity,
  activity,
  size = 36,
  status,
  animated = true,
  className = '',
  title,
  label,
}) {
  const rawValue = useMemo(() => {
    if (typeof color === 'string' && color) return color
    if (bot && typeof bot === 'object') return avatarValueForBot(bot)
    return DEFAULT_BOT_AVATAR_COLOR
  }, [color, bot])
  const parsed = useMemo(() => parseBotAvatarValue(rawValue), [rawValue])
  const valueIdentity =
    parsed.kind === 'color' || parsed.kind === 'shape' ? parsed.color : 'avatar'
  const effectiveIdentity = identity || bot?.id || bot?.name || valueIdentity
  const set = resolveBotAvatarSet(avatarSet ?? bot?.avatarSet)
  const pose = activity != null ? normalizeLogoActivity(activity) : statusToActivity(status)
  const working = isWorkingActivity(pose) || isWorkingStatus(status)
  const colorDef = useMemo(
    () =>
      resolvePersonaColorDef(
        effectiveIdentity,
        parsed.kind === 'image' ? undefined : parsed.kind === 'other' ? parsed.raw : parsed.color,
      ),
    [effectiveIdentity, parsed],
  )
  const accessibleLabel = label || title || (bot?.name ? `${bot.name} avatar` : undefined)

  if (parsed.kind === 'image') {
    return (
      <div
        className={`rakazo-bot-avatar gb-avatar ${className}`.trim()}
        data-working={working ? 'true' : 'false'}
        data-avatar-kind="image"
        style={{ width: size, height: size }}
        title={title}
        role={accessibleLabel ? 'img' : undefined}
        aria-label={accessibleLabel}
      >
        <div className="rakazo-bot-avatar-picture">
          <img src={parsed.imageUrl} alt="" draggable={false} />
        </div>
        <svg
          className="rakazo-bot-avatar-ring rakazo-bot-avatar-ring-working"
          style={{ inset: -4, width: size + 8, height: size + 8 }}
          viewBox="0 0 48 48"
          fill="none"
          aria-hidden="true"
        >
          <circle
            cx="24"
            cy="24"
            r="22"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeDasharray="45 80"
          />
        </svg>
      </div>
    )
  }

  if (parsed.kind === 'shape') {
    return (
      <OrganicAvatar
        color={colorDef.hex}
        identity={effectiveIdentity}
        shapeIndex={parsed.shapeIndex}
        size={size}
        isWorking={working}
        animated={animated}
        className={className}
        label={accessibleLabel}
      />
    )
  }

  if (set === 'rakazo') {
    return (
      <LogoAvatar
        activity={pose}
        size={size}
        avatarValue={colorDef.hex}
        identity={effectiveIdentity}
        label={accessibleLabel}
        motion={animated}
        className={className}
      />
    )
  }

  return (
    <OrganicAvatar
      color={colorDef.hex}
      identity={effectiveIdentity}
      size={size}
      isWorking={working}
      animated={animated}
      className={className}
      label={accessibleLabel}
    />
  )
})

/* -------------------------------------------------------------------------- */
/* Stacked avatars                                                           */
/* -------------------------------------------------------------------------- */

function StackedMember({ member, size }) {
  const bot = member.bot || null
  return (
    <BotAvatar
      bot={bot}
      color={bot ? undefined : member.color}
      avatarSet={member.avatarSet}
      identity={member.botId ?? member.name}
      activity={member.activity}
      status={member.status}
      size={size}
    />
  )
}

/**
 * A small stack of bot avatars (rooms, group headers).
 *
 * @param {object} props
 * @param {Array<object>} [props.bots] bot records
 * @param {Array<{bot?:object,botId?:string,name?:string,color?:string,avatarSet?:string,status?:string,activity?:string}>} [props.members]
 * @param {number} [props.size]
 * @param {string} [props.className]
 */
export const BotAvatarStack = memo(function BotAvatarStack({
  bots,
  members,
  size = 38,
  className = '',
}) {
  const list = useMemo(() => {
    if (Array.isArray(members) && members.length) return members
    if (Array.isArray(bots))
      return bots.map((bot) => ({
        bot,
        botId: bot?.id,
        name: bot?.name,
        status: bot?.status,
        activity: bot?.activity,
      }))
    return []
  }, [bots, members])

  const first = list[0]
  if (!first) {
    return (
      <div
        className={`rakazo-group-avatar gb-avatar ${className}`.trim()}
        style={{ width: size, height: size, flex: 'none' }}
        aria-hidden="true"
      >
        <svg
          style={{ width: Math.round(size * 0.48), height: Math.round(size * 0.48) }}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      </div>
    )
  }

  if (list.length === 1) {
    return (
      <div className="gb-avatar-stack-single" style={{ width: size, height: size, flex: 'none' }}>
        <StackedMember member={first} size={size} />
      </div>
    )
  }

  const pair = list.length === 2
  const miniSize = Math.round(size * (pair ? 0.65 : 0.54))
  const positions = pair
    ? [
        { top: 0, left: 0 },
        { right: 0, bottom: 0 },
      ]
    : [
        { top: 0, left: (size - miniSize) / 2 },
        { bottom: 0, left: 0 },
        { right: 0, bottom: 0 },
      ]
  // Two mini avatars for pairs, three for trios, two plus a +N badge beyond that
  // (matches Rakazo's GroupAvatar count).
  const visibleMembers = list.slice(0, pair || list.length === 3 ? list.length : 2)

  return (
    <div
      className={`rakazo-group-avatar gb-avatar ${className}`.trim()}
      style={{ width: size, height: size, flex: 'none' }}
    >
      {visibleMembers.map((member, index) => (
        <div
          key={member.botId ?? member.name ?? index}
          className="gb-avatar-stack-item"
          style={{ ...positions[index], zIndex: index + 1 }}
        >
          <StackedMember member={member} size={miniSize} />
        </div>
      ))}
      {list.length > 3 ? (
        <div
          className="gb-avatar-stack-more"
          style={{ width: miniSize, height: miniSize, right: 0, bottom: 0 }}
          aria-hidden="true"
        >
          {`+${list.length - 2}`}
        </div>
      ) : null}
    </div>
  )
})

/* -------------------------------------------------------------------------- */
/* Shape preview (Avatar Studio)                                             */
/* -------------------------------------------------------------------------- */

/**
 * One shape swatch for the Avatar Studio grid: a shipped shape when `shapeIndex`
 * is given, otherwise the seeded organic body of `identity`.
 */
export function BotShapePreview({
  shapeIndex,
  identity,
  color,
  size = 32,
  selected = false,
  onClick,
  label,
  className = '',
}) {
  const colorDef = resolvePersonaColorDef(identity || 'preview', color)
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label || (shapeIndex === undefined ? 'Organic shape' : SHIPPED_SHAPE_KEYS[((shapeIndex % SHIPPED_SHAPE_KEYS.length) + SHIPPED_SHAPE_KEYS.length) % SHIPPED_SHAPE_KEYS.length])}
      aria-pressed={selected}
      className={`gb-shape-preview${selected ? ' gb-shape-preview-selected' : ''} ${className}`.trim()}
    >
      <OrganicAvatar
        color={colorDef.hex}
        identity={identity || color || 'preview'}
        shapeIndex={shapeIndex}
        size={size}
        animated={false}
        isWorking={false}
      />
    </button>
  )
}

/* -------------------------------------------------------------------------- */
/* Public re-exports                                                         */
/* -------------------------------------------------------------------------- */

export { LogoAvatar, OrganicAvatar }
export {
  BOT_EYE_COLOR,
  botEyeTone,
  contrastRatio,
  logoAvatarEyeInk,
  logoAvatarPaint,
  avatarValueForBot,
  botAvatarColorHex,
  isBotAvatarValue,
  migrateLegacyAvatar,
  normalizeHexColor,
  parseBotAvatarValue,
  resolveBotAvatarSet,
  resolvePersonaColorDef,
  seededAvatarLook,
  shapeAvatarValue,
  BOT_AVATAR_SETS,
  BOT_COLOR_LIST,
  BOT_COLORS,
  DEFAULT_BOT_AVATAR_COLOR,
  DEFAULT_NEW_BOT_AVATAR_SET,
  SHIPPED_SHAPE_KEYS,
  SHIPPED_SHAPE_LABELS,
  LOGO_AVATAR_ACTIVITIES,
  isWorkingActivity,
  logoAvatarTraits,
  normalizeLogoActivity,
  seededLogoAvatarColor,
  ORGANIC_AVATAR_EYES,
  ORGANIC_AVATAR_VIEWBOX,
  SHIPPED_BOT_AVATAR_EYES,
  SHIPPED_BOT_AVATAR_SHAPES,
  SHIPPED_BOT_AVATAR_VIEWBOX,
  organicAvatarPath,
}

/** The shipped mascot shape paths in `SHIPPED_SHAPE_KEYS` order. */
export const BOT_MASCOT_SHAPES = SHIPPED_SHAPE_KEYS.map(
  (key) => SHIPPED_BOT_AVATAR_SHAPES[key],
)

export { avatarEyeRects } from './organic-path.js'
export {
  ORGANIC_AVATAR_FAMILY_COUNT,
  ORGANIC_AVATAR_LOOKS,
  organicAvatarEyeTilt,
  organicAvatarFamily,
  organicAvatarLook,
  organicAvatarSampleIdentity,
} from './traits.js'

export default BotAvatar
