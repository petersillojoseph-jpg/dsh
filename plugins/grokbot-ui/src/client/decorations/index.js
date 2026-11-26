/**
 * Grokbot UI — chrome installer.
 *
 * The product look is Rakazo's: this layer owns the two decorations the app
 * chrome needs and nothing more —
 *  - a small "Grokbot" identity in the sidebar brand seats (the animated
 *    Rakazo mascot plus a wordmark, shadowing the shipped brand at a lower
 *    rank), and
 *  - the Rakazo styling for the floating bot identity pill, the sidebar
 *    session avatar and the hero avatar cluster (all classes rendered by
 *    identity/index.jsx).
 *
 * No ambient aurora, overlays, or injected texture nodes. Missing slots or a
 * hostile DOM simply degrade to the plain app.
 *
 * @module @local/grokbot-ui/decorations
 */
import React from 'react'
import chromeCss from './chrome.css'
import { BotAvatar } from '../shared/avatar/index.jsx'

/** Brand mascot colour: Rakazo's Cobalt Blue (BOT_COLOR_LIST). */
const BRAND_AVATAR = Object.freeze({
  id: 'grokbot-brand',
  name: 'dsh',
  color: '#2a92fe',
  avatarSet: 'rakazo',
})

/** Diagnostics prefix. */
const LOG_PREFIX = '[grokbot-ui/chrome]'
/** Shadowing rank for single brand seats (the shipped brand sits at rank 0). */
const BRAND_PRIORITY = -10

const h = React.createElement

/**
 * Render the animated Rakazo mascot into `sidebar.brand.mark`.
 * @param {{ size?: number }} props - shell-supplied square edge in px.
 * @returns {React.ReactElement} brand mark.
 */
function GrokBrandMark(props) {
  const raw = props && typeof props.size === 'number' ? props.size : 20
  const edge = Math.min(48, Math.max(10, raw))
  return h(
    'span',
    { className: 'grok-brandmark', style: { width: `${edge}px`, height: `${edge}px` }, 'aria-hidden': 'true' },
    h(BotAvatar, { bot: BRAND_AVATAR, size: edge, animated: true, label: 'dsh' }),
  )
}

/**
 * Render the Grokbot wordmark into `sidebar.brand.name`.
 * @returns {React.ReactElement} brand name.
 */
function GrokBrandName() {
  return h('span', { className: 'grok-brandname' }, 'dsh')
}

/**
 * Register the decoration seats, swallowing unsupported-slot failures.
 * @param {object} ctx - client cordis context.
 * @returns {Array<() => void>} disposers for each successful registration.
 */
function registerSeats(ctx) {
  /** @type {Array<() => void>} */
  const disposers = []
  const slots = ctx && ctx.slots
  if (!slots || typeof slots.inject !== 'function' || typeof slots.register !== 'function') {
    console.warn(`${LOG_PREFIX} slot service unavailable; brand decoration skipped`)
    return disposers
  }

  const seats = [
    {
      key: 'sidebar.brand.mark',
      label: 'brand mark',
      component: GrokBrandMark,
      options: { name: 'sidebar.brand.mark', priority: BRAND_PRIORITY },
    },
    {
      key: 'sidebar.brand.name',
      label: 'brand name',
      component: GrokBrandName,
      options: { name: 'sidebar.brand.name', priority: BRAND_PRIORITY },
    },
  ]

  for (const seat of seats) {
    try {
      const dispose = slots.inject(seat.key, () => slots.register(seat.options, seat.component))
      if (typeof dispose === 'function') disposers.push(dispose)
    } catch (error) {
      console.warn(`${LOG_PREFIX} ${seat.label} slot registration failed`, error)
    }
  }

  return disposers
}

/**
 * Install the minimal chrome. Safe at any point after the client DOM exists.
 * @param {object} ctx - client cordis context exposing `effect` and `slots`.
 * @returns {() => void} composite disposer.
 */
export function installChrome(ctx) {
  /** @type {Array<() => void>} */
  const disposers = []

  try {
    const disposeStyle = ctx.effect(() => {
      if (typeof document === 'undefined') return () => {}
      const style = document.createElement('style')
      style.dataset.grokbotChrome = 'minimal'
      style.textContent = chromeCss
      document.head.appendChild(style)
      return () => {
        style.remove()
      }
    }, `${LOG_PREFIX}: chrome stylesheet`)
    if (typeof disposeStyle === 'function') disposers.push(disposeStyle)
  } catch (error) {
    console.warn(`${LOG_PREFIX} chrome stylesheet skipped`, error)
  }

  try {
    disposers.push(...registerSeats(ctx))
  } catch (error) {
    console.warn(`${LOG_PREFIX} seat registration skipped`, error)
  }

  return () => {
    for (let index = disposers.length - 1; index >= 0; index -= 1) {
      try {
        disposers[index]()
      } catch (error) {
        console.warn(`${LOG_PREFIX} disposer failed`, error)
      }
    }
  }
}

export default installChrome
