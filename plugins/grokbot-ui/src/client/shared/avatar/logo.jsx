/**
 * The animated Rakazo logo-avatar mascot.
 *
 * Adapted from Rakazo (Apache-2.0), https://github.com/elie222/rakazo
 *   packages/ui-web/src/logo-avatar.tsx
 *   packages/ui-web/src/logo-avatar-body.tsx
 *   packages/ui-web/src/logo-avatar.css (see ./avatar.css)
 *   packages/ui-web/src/hooks/use-logo-avatar-layers.ts (see ./hooks.js)
 *
 * Motion is CSS-only: authored keyframes on the body, gaze, eyelids and task cues,
 * synchronised to one continuous clock. The only React state is the short
 * outgoing/incoming layer crossfade. No per-frame state, no JS animation loop.
 */
import React, { memo, useMemo } from 'react'
import {
  LOGO_AVATAR_BODY_Y,
  LOGO_AVATAR_EYES,
  LOGO_AVATAR_LIGHTING as lighting,
  LOGO_AVATAR_VIEWBOX,
  LOGO_BODY_PATH,
  LOGO_LEFT_HAND_PATH,
  LOGO_RIGHT_HAND_PATH,
  logoAvatarEyeInk,
  logoAvatarPaint,
} from './logo-art.js'
import { useAvatarMotionVisibility, useCursorGaze, useLogoAvatarLayers } from './hooks.js'
import { parseBotAvatarValue } from './model.js'
import { logoAvatarTraits, normalizeLogoActivity } from './traits.js'

const EYES = LOGO_AVATAR_EYES

/**
 * One mascot avatar.
 *
 * @param {object} props
 * @param {string} [props.activity] idle|working|reading|writing|thinking|waiting|error
 *   (`computer` is accepted and drawn as working, never as a screen-control cue)
 * @param {number} [props.size] rendered size in CSS px
 * @param {string} [props.avatarValue] stored avatar value (used for its colour)
 * @param {string} [props.identity] stable identity (bot id) for seeded traits
 * @param {string} [props.label] accessible name; omitted means decorative
 * @param {boolean} [props.motion] allow animation (default true; small/static rules still apply)
 * @param {string} [props.className]
 */
export const LogoAvatar = memo(function LogoAvatar({
  activity = 'idle',
  size = 38,
  avatarValue,
  identity,
  label,
  motion = true,
  className = '',
}) {
  const instanceId = React.useId().replace(/[^a-zA-Z0-9_-]/g, '')
  const parsed = useMemo(
    () => (avatarValue ? parseBotAvatarValue(avatarValue) : null),
    [avatarValue],
  )
  const traits = useMemo(
    () =>
      logoAvatarTraits(
        identity || (parsed && 'color' in parsed ? parsed.color : 'default'),
        parsed && 'color' in parsed ? parsed.color : undefined,
      ),
    [identity, parsed],
  )
  const activityPose = normalizeLogoActivity(activity)
  const canMove = motion && size >= 24
  const { ref, visible, reducedMotion } = useAvatarMotionVisibility(canMove)
  useCursorGaze(ref, canMove && visible && !reducedMotion)
  const { layers, finish } = useLogoAvatarLayers(
    ref,
    activityPose,
    canMove && visible && !reducedMotion,
    canMove,
  )
  const eyeInk = logoAvatarEyeInk(traits.color)

  return (
    <svg
      ref={ref}
      viewBox={LOGO_AVATAR_VIEWBOX}
      width={size}
      height={size}
      className={`rakazo-logo-avatar gb-avatar ${className}`.trim()}
      data-activity={activityPose}
      data-working={activityPose !== 'idle' && activityPose !== 'error' ? 'true' : 'false'}
      data-vector-body="true"
      data-motion={canMove ? 'true' : 'false'}
      data-small={size < 24 ? 'true' : 'false'}
      data-compact={size <= 38 ? 'true' : 'false'}
      data-paused={visible && !reducedMotion ? 'false' : 'true'}
      data-color={traits.color}
      role={label ? 'img' : undefined}
      aria-label={label || undefined}
      aria-hidden={label ? undefined : 'true'}
      style={{
        '--logo-task-stroke': Math.max(2.4, 100 / Math.max(1, size)),
        '--logo-blink-name': `logo-avatar-blink-${traits.blinkVariant}`,
        '--logo-blink-duration': `${traits.blinkMs}ms`,
        '--logo-blink-delay': `${traits.blinkDelayMs}ms`,
        '--logo-breathe-duration': `${traits.periods.working}ms`,
        '--logo-hand-duration': `${traits.periods.working * 2}ms`,
        '--logo-side': traits.side,
      }}
    >
      <defs>
        <clipPath id={`logo-plate-${instanceId}`}>
          <rect width="100" height="100" rx="23" />
        </clipPath>
        <linearGradient id={`logo-eye-${instanceId}`} x2="0.8" y2="1">
          <stop stopColor={eyeInk} stopOpacity="0.8" />
          <stop offset="0.35" stopColor={eyeInk} />
          <stop offset="1" stopColor={eyeInk} />
        </linearGradient>
      </defs>
      <g clipPath={`url(#logo-plate-${instanceId})`}>
        <rect className="logo-avatar-plate" width="100" height="100" rx="23" />
        {layers.map((layer) => {
          const period = traits.periods[layer.activity] || traits.periods.idle
          return (
            <g
              key={layer.key}
              className="logo-avatar-layer"
              data-logo-layer={layer.key}
              data-activity={layer.activity}
              data-entering={layer.entering ? 'true' : 'false'}
              data-outgoing={layer.outgoing ? 'true' : 'false'}
              style={{
                '--logo-move-duration': `${period}ms`,
                '--logo-move-delay': `${-Math.round(period * traits.phase * 1000) / 1000}ms`,
                '--logo-exit-from': layer.opacity,
              }}
              onAnimationEnd={(event) => {
                if (event.target === event.currentTarget) {
                  finish(layer.key, event.animationName)
                }
              }}
            >
              <g className="logo-avatar-body">
                <g transform={`translate(0 ${LOGO_AVATAR_BODY_Y})`}>
                  <LogoAvatarBody
                    id={`${instanceId}-${layer.key}`}
                    color={traits.color}
                    originalOrange={traits.originalOrange}
                  />
                  <g className="logo-avatar-gaze">
                    <g className="logo-avatar-scan">
                      {[EYES.leftCx, EYES.rightCx].map((x, index) => (
                        <g
                          className={`logo-avatar-eye-lid logo-avatar-eye-${index}`}
                          key={x}
                          style={{ transformOrigin: `${x}px ${EYES.cy}px` }}
                        >
                          <g
                            className="logo-avatar-eye"
                            style={{ transformOrigin: `${x}px ${EYES.cy}px` }}
                          >
                            <ellipse
                              cx={x}
                              cy={EYES.cy}
                              rx={EYES.width / 2}
                              ry={EYES.height / 2}
                              fill={`url(#logo-eye-${instanceId})`}
                            />
                            <ellipse
                              className="logo-avatar-glint"
                              cx={x - 1.2}
                              cy={EYES.cy - 3.6}
                              rx="1.4"
                              ry="2.2"
                            />
                          </g>
                        </g>
                      ))}
                    </g>
                  </g>
                </g>
                <LogoAvatarTask activity={layer.activity} id={`${instanceId}-${layer.key}`} />
              </g>
            </g>
          )
        })}
      </g>
      <rect
        className="logo-avatar-outline"
        x="0.5"
        y="0.5"
        width="99"
        height="99"
        rx="22.5"
      />
    </svg>
  )
})

/** Small illustrative task cues. They illustrate the activity, not live telemetry. */
function LogoAvatarTask({ activity, id }) {
  if (activity === 'reading') {
    return (
      <g className="logo-avatar-task logo-avatar-book">
        <defs>
          <clipPath id={`book-pages-${id}`} clipPathUnits="userSpaceOnUse">
            <path
              className="logo-avatar-safe-area"
              d="M26 79Q37 75 47 80V91Q37 87 26 91ZM53 80Q63 75 74 79V91Q63 87 53 91Z"
              fill="white"
              stroke="none"
            />
          </clipPath>
        </defs>
        <path
          className="logo-avatar-task-surface"
          d="M22 76Q36 71 50 77Q64 71 78 76V96Q64 91 50 97Q36 91 22 96Z"
        />
        <path d="M50 77V97" />
        <g className="logo-avatar-task-ink" clipPath={`url(#book-pages-${id})`}>
          <path d="M28 84H43M57 84H72" opacity="0.8" />
          <path className="logo-avatar-page-cursor logo-avatar-action logo-avatar-task-detail" d="M27 81.5H36" />
        </g>
      </g>
    )
  }
  if (activity === 'writing') {
    return (
      <g className="logo-avatar-task logo-avatar-keyboard">
        <defs>
          <clipPath id={`keyboard-bed-${id}`} clipPathUnits="userSpaceOnUse">
            <rect
              className="logo-avatar-safe-area"
              x="26"
              y="78"
              width="48"
              height="16"
              rx="1"
              fill="white"
              stroke="none"
            />
          </clipPath>
        </defs>
        <rect className="logo-avatar-task-surface" x="22" y="75" width="56" height="22" rx="3" />
        <g className="logo-avatar-task-ink" clipPath={`url(#keyboard-bed-${id})`}>
          <path className="logo-avatar-key-left logo-avatar-action" d="M29 82H35M40 82H46" />
          <path className="logo-avatar-key-right logo-avatar-action" d="M54 82H60M65 82H71" />
          <path d="M36 90H64" opacity="0.85" />
        </g>
      </g>
    )
  }
  return null
}

/**
 * The vector body, hands and rim lighting. Memoised: re-rendering the avatar for a
 * layer crossfade must not rebuild the ~30 gradient/mask definitions of the body.
 */
export const LogoAvatarBody = memo(function LogoAvatarBody({ id, color, originalOrange }) {
  const paint = logoAvatarPaint(color, originalOrange)
  return (
    <g className="logo-avatar-art">
      <defs>
        <clipPath id={`body-clip-${id}`}>
          <path d={LOGO_BODY_PATH} />
        </clipPath>
        <radialGradient id={`body-fill-${id}`} {...lighting.body}>
          <stop stopColor={paint.base} />
          <stop offset=".48" stopColor={paint.base} />
          <stop offset="1" stopColor={paint.edge} />
        </radialGradient>
        <radialGradient id={`body-shade-${id}`} {...lighting.flank}>
          <stop stopColor={paint.flank} stopOpacity=".94" />
          <stop offset=".4" stopColor={paint.flank} stopOpacity=".94" />
          <stop offset=".65" stopColor={paint.flank} stopOpacity=".76" />
          <stop offset=".85" stopColor={paint.flank} stopOpacity=".22" />
          <stop offset="1" stopColor={paint.flank} stopOpacity="0" />
        </radialGradient>
        <radialGradient
          id={`body-light-${id}`}
          gradientUnits={lighting.crown.gradientUnits}
          cx={lighting.crown.cx}
          cy={lighting.crown.cy}
          r={lighting.crown.r}
          gradientTransform={lighting.crown.gradientTransform}
        >
          <stop stopColor="white" stopOpacity={lighting.crown.peak} />
          <stop offset=".4" stopColor="white" stopOpacity={lighting.crown.shoulder} />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`hand-left-${id}`} {...lighting.leftHand}>
          <stop stopColor={paint.base} />
          <stop offset=".28" stopColor={paint.base} />
          <stop offset="1" stopColor={paint.shadow} />
        </radialGradient>
        <radialGradient id={`hand-right-${id}`} {...lighting.rightHand}>
          <stop stopColor={paint.base} />
          <stop offset=".28" stopColor={paint.base} />
          <stop offset="1" stopColor={paint.shadow} />
        </radialGradient>
        <radialGradient id={`hand-left-light-${id}`} {...lighting.leftHand} r={lighting.handLight.radius}>
          <stop stopColor="white" stopOpacity={lighting.handLight.leftPeak} />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`hand-right-light-${id}`} {...lighting.rightHand} r={lighting.handLight.radius}>
          <stop stopColor="white" stopOpacity={lighting.handLight.rightPeak} />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`hand-left-shadow-${id}`} {...lighting.leftContact}>
          <stop stopColor={paint.contact} stopOpacity=".72" />
          <stop offset=".45" stopColor={paint.contact} stopOpacity=".64" />
          <stop offset=".65" stopColor={paint.contact} stopOpacity=".3" />
          <stop offset=".9" stopColor={paint.contact} stopOpacity=".04" />
          <stop offset="1" stopColor={paint.contact} stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`hand-right-shadow-${id}`} {...lighting.rightContact}>
          <stop stopColor={paint.contact} stopOpacity=".72" />
          <stop offset=".45" stopColor={paint.contact} stopOpacity=".64" />
          <stop offset=".65" stopColor={paint.contact} stopOpacity=".3" />
          <stop offset=".9" stopColor={paint.contact} stopOpacity=".04" />
          <stop offset="1" stopColor={paint.contact} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`rim-direction-${id}`} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="100" y2="0">
          <stop stopColor="white" stopOpacity=".25" />
          <stop offset=".5" stopColor="white" stopOpacity=".72" />
          <stop offset="1" stopColor="white" />
        </linearGradient>
        <linearGradient id={`rim-lower-fade-${id}`} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="100">
          <stop stopColor="white" stopOpacity="0" />
          <stop offset=".36" stopColor="white" stopOpacity="0" />
          <stop offset=".58" stopColor="white" />
          <stop offset="1" stopColor="white" />
        </linearGradient>
        <linearGradient id={`rim-upper-cut-${id}`} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="100">
          <stop stopColor="black" stopOpacity="0" />
          <stop offset=".36" stopColor="black" stopOpacity="0" />
          <stop offset=".58" stopColor="black" />
          <stop offset="1" stopColor="black" />
        </linearGradient>
        <mask
          id={`rim-upper-mask-${id}`}
          maskUnits="userSpaceOnUse"
          style={{ maskType: 'luminance' }}
          x="0"
          y="0"
          width="100"
          height="110"
        >
          <rect width="100" height="110" fill={`url(#rim-direction-${id})`} />
          <rect width="100" height="110" fill={`url(#rim-upper-cut-${id})`} />
          <rect width="100" height="110" fill={`url(#rim-left-trim-${id})`} />
        </mask>
        <mask
          id={`rim-lower-mask-${id}`}
          maskUnits="userSpaceOnUse"
          style={{ maskType: 'luminance' }}
          x="0"
          y="0"
          width="100"
          height="110"
        >
          <rect width="100" height="110" fill={`url(#rim-lower-fade-${id})`} />
        </mask>
        <radialGradient id={`rim-left-trim-${id}`} {...lighting.rimLeftTrim}>
          <stop stopColor="black" stopOpacity=".6" />
          <stop offset=".9" stopColor="black" stopOpacity=".6" />
          <stop offset=".94" stopColor="black" stopOpacity=".5" />
          <stop offset=".965" stopColor="black" stopOpacity="0" />
          <stop offset="1" stopColor="black" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`rim-upper-${id}`} {...lighting.rimUpper}>
          <stop stopColor={paint.rim} stopOpacity="0" />
          <stop offset=".818" stopColor={paint.rim} stopOpacity="0" />
          <stop offset=".855" stopColor={paint.rim} stopOpacity=".035" />
          <stop offset=".882" stopColor={paint.rim} stopOpacity=".14" />
          <stop offset=".9" stopColor={paint.rim} stopOpacity=".42" />
          <stop offset=".918" stopColor={paint.rim} stopOpacity=".53" />
          <stop offset=".941" stopColor={paint.rim} stopOpacity=".2" />
          <stop offset=".973" stopColor={paint.rim} stopOpacity="0" />
          <stop offset="1" stopColor={paint.rim} stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`rim-left-${id}`} {...lighting.rimLeft}>
          <stop stopColor={paint.rim} stopOpacity="0" />
          <stop offset=".873" stopColor={paint.rim} stopOpacity="0" />
          <stop offset=".891" stopColor={paint.rim} stopOpacity=".22" />
          <stop offset=".912" stopColor={paint.rim} stopOpacity=".22" />
          <stop offset=".93" stopColor={paint.rim} stopOpacity=".1" />
          <stop offset=".955" stopColor={paint.rim} stopOpacity="0" />
          <stop offset="1" stopColor={paint.rim} stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`rim-right-${id}`} {...lighting.rimRight}>
          <stop stopColor={paint.rim} stopOpacity="0" />
          <stop offset=".873" stopColor={paint.rim} stopOpacity="0" />
          <stop offset=".891" stopColor={paint.rim} stopOpacity=".46" />
          <stop offset=".912" stopColor={paint.rim} stopOpacity=".46" />
          <stop offset=".93" stopColor={paint.rim} stopOpacity=".2" />
          <stop offset=".955" stopColor={paint.rim} stopOpacity="0" />
          <stop offset="1" stopColor={paint.rim} stopOpacity="0" />
        </radialGradient>
      </defs>
      <path d={LOGO_BODY_PATH} fill={`url(#body-fill-${id})`} />
      <path d={LOGO_BODY_PATH} fill={`url(#body-shade-${id})`} />
      <path d={LOGO_BODY_PATH} fill={`url(#body-light-${id})`} />
      <g clipPath={`url(#body-clip-${id})`}>
        <path d={LOGO_BODY_PATH} fill={`url(#rim-upper-${id})`} mask={`url(#rim-upper-mask-${id})`} />
        <g mask={`url(#rim-lower-mask-${id})`}>
          <path d={LOGO_BODY_PATH} fill={`url(#rim-left-${id})`} />
          <path d={LOGO_BODY_PATH} fill={`url(#rim-right-${id})`} />
        </g>
        <path d={LOGO_BODY_PATH} fill={`url(#hand-left-shadow-${id})`} />
        <path d={LOGO_BODY_PATH} fill={`url(#hand-right-shadow-${id})`} />
        <g className="logo-avatar-hand logo-avatar-hand-left" style={{ transformOrigin: '24px 82px' }}>
          <path d={LOGO_LEFT_HAND_PATH} fill={`url(#hand-left-${id})`} />
          <path d={LOGO_LEFT_HAND_PATH} fill={`url(#hand-left-light-${id})`} />
        </g>
        <g className="logo-avatar-hand logo-avatar-hand-right" style={{ transformOrigin: '76px 82px' }}>
          <path d={LOGO_RIGHT_HAND_PATH} fill={`url(#hand-right-${id})`} />
          <path d={LOGO_RIGHT_HAND_PATH} fill={`url(#hand-right-light-${id})`} />
        </g>
      </g>
    </g>
  )
})
