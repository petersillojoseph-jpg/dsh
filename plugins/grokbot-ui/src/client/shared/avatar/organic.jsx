/**
 * Organic ("Original") avatars — the eight shipped shapes and the seeded organic
 * bodies, with Rakazo's bar eyes.
 *
 * Adapted from Rakazo (Apache-2.0), https://github.com/elie222/rakazo
 *   packages/ui-web/src/bot-avatar.tsx (OrganicAvatar)
 *   packages/core/src/avatars/avatar-shape.ts
 *   packages/core/src/avatars/bot-avatar-shapes.ts
 *   packages/ui-web/src/styles.css (organic working animations)
 *
 * The body is static at rest. While a bot is working the working body crossfades in
 * and plays its family's morph/float animation plus a colour glow. Offscreen,
 * hidden and reduced-motion avatars hold still (SMIL is paused or never emitted).
 */
import React, { memo, useEffect, useMemo } from 'react'
import { BOT_EYE_COLOR, botEyeTone } from './logo-art.js'
import { useAvatarMotionVisibility, useCursorGaze, useReducedMotion } from './hooks.js'
import {
  ORGANIC_AVATAR_EYES,
  ORGANIC_AVATAR_VIEWBOX,
  SHIPPED_BOT_AVATAR_EYES,
  SHIPPED_BOT_AVATAR_VIEWBOX,
  avatarEyeRects,
  organicAvatarPath,
  shippedBotAvatarShapePath,
} from './organic-path.js'
import { avatarIdentitySeed, organicAvatarEyeTilt } from './traits.js'

/** Eyes are cut-outs in the page colour unless the body is nearly white or black. */
export function organicEyeFill(color) {
  const tone = botEyeTone(color)
  if (tone === 'dark') return BOT_EYE_COLOR
  if (tone === 'light') return '#F5F5F5'
  return 'var(--gb-avatar-page-bg, #ffffff)'
}

/** The pair of rounded bar eyes every organic body wears. */
export function BarEyes({ eyes, fill }) {
  return avatarEyeRects(eyes).map((rect) => (
    <rect key={rect.x} {...rect} style={{ fill }} />
  ))
}

/**
 * One organic avatar.
 *
 * @param {object} props
 * @param {string} props.color resolved `#hex` body colour
 * @param {string} [props.identity] stable identity (bot id) for the body family/eye tilt
 * @param {number} [props.shapeIndex] one of the 8 shipped shapes; omitted = seeded organic body
 * @param {number} [props.size]
 * @param {boolean} [props.isWorking]
 * @param {boolean} [props.animated]
 * @param {string} [props.className]
 * @param {string} [props.label]
 */
export const OrganicAvatar = memo(function OrganicAvatar({
  color,
  identity = '',
  shapeIndex,
  size = 36,
  isWorking = false,
  animated = true,
  className = '',
  label,
}) {
  const reducedMotion = useReducedMotion()
  const canMove = Boolean(animated) && size >= 24
  const { ref, visible } = useAvatarMotionVisibility(canMove)
  useCursorGaze(ref, canMove && visible && !reducedMotion)
  const seed = useMemo(
    () => avatarIdentitySeed(identity || color || 'avatar'),
    [identity, color],
  )
  const shipped = shapeIndex !== undefined && shapeIndex !== null
  const eyeTilt = organicAvatarEyeTilt(seed)
  const family = seed % 10
  const eyes = shipped ? SHIPPED_BOT_AVATAR_EYES : ORGANIC_AVATAR_EYES
  const viewBox = shipped ? SHIPPED_BOT_AVATAR_VIEWBOX : ORGANIC_AVATAR_VIEWBOX
  const shapeA = useMemo(
    () => (shipped ? shippedBotAvatarShapePath(shapeIndex) : organicAvatarPath(seed)),
    [shipped, shapeIndex, seed],
  )
  const shapeB = useMemo(
    () => (shipped ? null : organicAvatarPath(seed, 0.42)),
    [shipped, seed],
  )
  const duration = `${4.8 + (seed % 24) / 10}s`
  const eyeFill = organicEyeFill(color)
  const morphing = canMove && isWorking && Boolean(shapeB) && !reducedMotion
  const paused = !visible || reducedMotion

  useEffect(() => {
    const element = ref.current
    if (!element) return
    // jsdom and non-SMIL browsers have no SMIL clock; these are optional.
    if (paused) element.pauseAnimations?.()
    else element.unpauseAnimations?.()
  }, [ref, paused])

  return (
    <svg
      ref={ref}
      viewBox={viewBox}
      width={size}
      height={size}
      role={label ? 'img' : undefined}
      aria-label={label || undefined}
      aria-hidden={label ? undefined : 'true'}
      className={`rakazo-organic-avatar gb-avatar ${className}`.trim()}
      data-working={isWorking ? 'true' : 'false'}
      data-paused={paused ? 'true' : 'false'}
      data-motion={canMove && !reducedMotion ? 'true' : 'false'}
      data-shape-family={family}
      data-eye-pattern={seed % 4}
      data-organic={shipped ? 'shipped' : 'seeded'}
      style={{ width: size, height: size, flex: 'none' }}
    >
      {['idle', 'working'].map((mode) => (
        <path
          key={mode}
          className={`rakazo-organic-avatar-body rakazo-organic-avatar-body-${mode}`}
          d={shapeA}
          fill={color}
          style={{
            '--rakazo-organic-path': `path("${shapeA}")`,
            filter:
              mode === 'working'
                ? `drop-shadow(0 0 ${Math.round(size * 0.16)}px ${color})`
                : 'drop-shadow(0 2px 3px rgba(0,0,0,.34))',
          }}
        >
          {morphing && mode === 'working' ? (
            <animate
              attributeName="d"
              values={`${shapeA};${shapeB};${shapeA}`}
              dur={duration}
              repeatCount="indefinite"
            />
          ) : null}
        </path>
      ))}
      <g transform={`rotate(${eyeTilt})`}>
        {['idle', 'working'].map((mode) => (
          <g key={mode} className={`rakazo-organic-avatar-eyes rakazo-organic-avatar-eyes-${mode}`}>
            <g className="rakazo-organic-avatar-gaze">
              <BarEyes eyes={eyes} fill={eyeFill} />
            </g>
          </g>
        ))}
      </g>
    </svg>
  )
})
