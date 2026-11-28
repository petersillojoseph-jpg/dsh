/**
 * Avatar motion hooks — a plain-React port of Rakazo's shared hooks.
 *
 * Adapted from Rakazo (Apache-2.0), https://github.com/elie222/rakazo
 *   packages/ui-web/src/hooks/use-avatar-motion-visibility.ts
 *   packages/ui-web/src/hooks/use-logo-avatar-layers.ts
 *
 * Motion is driven by CSS animations; cursor gaze updates SVG custom properties
 * directly so pointer tracking never causes React renders. These hooks:
 *  - share visibility and pointer listeners across avatar instances,
 *  - keep a continuous elapsed-time clock across activity changes,
 *  - crossfade pose layers without a frame loop.
 * Pointer updates are coalesced per frame; React state is not updated per frame.
 */
import { useCallback, useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from 'react'

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

const gazeTargets = new Set()
let gazeListenerBound = false
let gazeFrame = null, gazePoint = null
function resetCursorGaze() {
  if (gazeFrame !== null) cancelAnimationFrame(gazeFrame)
  gazeFrame = null; gazePoint = null
  for (const element of gazeTargets) {
    if (!element.isConnected) { gazeTargets.delete(element); continue }
    element.style.setProperty('--avatar-gaze-x', '0px')
    element.style.setProperty('--avatar-gaze-y', '0px')
  }
}

function resetCursorGazeWhenHidden() {
  if (document.hidden) resetCursorGaze()
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

/** One global pointer listener updates visible avatar eyes without React renders. */
export function useCursorGaze(ref, enabled = true) {
  useEffect(() => {
    const element = ref.current
    if (!enabled || !element || typeof window === 'undefined') return undefined
    gazeTargets.add(element)
    if (!gazeListenerBound) {
      window.addEventListener('pointermove', updateCursorGaze, { passive: true })
      window.addEventListener('blur', resetCursorGaze)
      document.addEventListener('mouseleave', resetCursorGaze)
      document.addEventListener('visibilitychange', resetCursorGazeWhenHidden)
      gazeListenerBound = true
    }
    return () => {
      gazeTargets.delete(element)
      element.style.removeProperty('--avatar-gaze-x')
      element.style.removeProperty('--avatar-gaze-y')
      if (gazeTargets.size === 0 && gazeListenerBound) {
        window.removeEventListener('pointermove', updateCursorGaze)
        window.removeEventListener('blur', resetCursorGaze)
        document.removeEventListener('mouseleave', resetCursorGaze)
        document.removeEventListener('visibilitychange', resetCursorGazeWhenHidden)
        gazeListenerBound = false
      }
    }
  }, [ref, enabled])
}

function reducedMotionMedia() {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return null
  return window.matchMedia(REDUCED_MOTION_QUERY)
}

function subscribeReducedMotion(onChange) {
  const media = reducedMotionMedia()
  if (!media) return () => {}
  media.addEventListener('change', onChange)
  return () => media.removeEventListener('change', onChange)
}

/** Synchronous first read, so a reduced-motion visitor never sees a frame of motion. */
export function useReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => reducedMotionMedia()?.matches ?? false,
    () => false,
  )
}

/* -------------------------------------------------------------------------- */
/* Shared visibility watcher                                                 */
/* -------------------------------------------------------------------------- */

const watchers = new Map()
let observer
let reducedMotion
let visibilityBound = false

function notifyVisibility() {
  const reduced = reducedMotion?.matches ?? false
  const hidden = typeof document !== 'undefined' && document.hidden
  for (const watcher of watchers.values()) {
    watcher.notify(watcher.visible && !hidden, reduced)
  }
}

function watch(element, notify) {
  if (!visibilityBound) {
    reducedMotion = reducedMotionMedia()
    reducedMotion?.addEventListener('change', notifyVisibility)
    if (typeof document !== 'undefined') {
      document.addEventListener('visibilitychange', notifyVisibility)
    }
    visibilityBound = true
  }
  if (!observer && typeof IntersectionObserver !== 'undefined') {
    observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const watcher = watchers.get(entry.target)
        if (watcher && watcher.visible !== entry.isIntersecting) {
          watcher.visible = entry.isIntersecting
          watcher.notify(
            watcher.visible && !document.hidden,
            reducedMotion?.matches ?? false,
          )
        }
      }
    })
  }
  watchers.set(element, { visible: true, notify })
  notify(!document.hidden, reducedMotion?.matches ?? false)
  observer?.observe(element)
  return () => {
    observer?.unobserve(element)
    watchers.delete(element)
    if (watchers.size === 0) {
      observer?.disconnect()
      observer = undefined
      document.removeEventListener('visibilitychange', notifyVisibility)
      reducedMotion?.removeEventListener('change', notifyVisibility)
      reducedMotion = undefined
      visibilityBound = false
    }
  }
}

/**
 * One observer and one visibility listener serve every moving avatar on the page.
 * Disabled subtrees never register, and paused avatars report `visible: false`.
 */
export function useAvatarMotionVisibility(enabled) {
  const ref = useRef(null)
  const [state, setState] = useState({ visible: true, reduced: false })
  useEffect(() => {
    const element = ref.current
    if (!enabled || !element) return undefined
    return watch(element, (visible, reduced) =>
      setState((previous) =>
        previous.visible === visible && previous.reduced === reduced
          ? previous
          : { visible, reduced },
      ),
    )
  }, [enabled])
  return { ref, visible: state.visible, reducedMotion: state.reduced }
}

/* -------------------------------------------------------------------------- */
/* Layer crossfade                                                           */
/* -------------------------------------------------------------------------- */

/**
 * Infinite CSS tracks share elapsed active time. A changed activity never restarts
 * that clock. Two continuing poses crossfade briefly, with an opacity transition
 * at the endpoints; no JavaScript runs on animation frames.
 */
export function useLogoAvatarLayers(ref, activity, running, animated) {
  const serial = useRef(0)
  const clock = useRef(null)
  const knownFades = useRef(new WeakSet())
  const [layers, setLayers] = useState([
    { key: 0, activity, entering: false, outgoing: false, opacity: 1 },
  ])
  useLayoutEffect(() => {
    const element = ref.current
    if (!element) return
    const current = layers[layers.length - 1]
    if (current.activity === activity) {
      if (!running && (layers.length > 1 || current.entering)) {
        setLayers([{ ...current, entering: false, outgoing: false, opacity: 1 }])
      }
      return
    }
    const key = running ? ++serial.current : current.key
    const next = { key, activity, entering: running, outgoing: false, opacity: 1 }
    const outgoing = running
      ? layers.flatMap((layer) => {
          // An interrupted transition must not extend an older exit's lifetime.
          if (layer.outgoing) return [layer]
          const target = element.querySelector(`[data-logo-layer="${layer.key}"]`)
          const opacity = target ? Number(getComputedStyle(target).opacity) : 0
          return opacity > 0 ? [{ ...layer, entering: false, outgoing: true, opacity }] : []
        })
      : []
    setLayers([...outgoing, next])
  }, [activity, layers, ref, running])

  useLayoutEffect(() => {
    const element = ref.current
    if (!element) return
    const now = Number(document.timeline?.currentTime ?? 0)
    const previous = clock.current
    const elapsed = previous
      ? previous.elapsed + (previous.running ? Math.max(0, now - previous.last) : 0)
      : 0
    clock.current = { last: now, elapsed, running }
    // Static avatars have no tracks to sync; skipping avoids a style flush per change.
    if (!animated) return
    for (const animation of element.getAnimations?.({ subtree: true }) ?? []) {
      if (animation.effect?.getTiming().iterations === Number.POSITIVE_INFINITY) {
        if (running) animation.startTime = now - elapsed
        else animation.currentTime = elapsed
      } else if (!knownFades.current.has(animation)) {
        animation.startTime = now
        knownFades.current.add(animation)
      }
    }
  }, [animated, layers, ref, running])

  const finish = useCallback((key, name) => {
    if (name === 'logo-avatar-layer-out') {
      setLayers((previous) => previous.filter((layer) => layer.key !== key))
    }
    if (name === 'logo-avatar-layer-in') {
      setLayers((previous) =>
        previous.map((layer) => (layer.key === key ? { ...layer, entering: false } : layer)),
      )
    }
  }, [])

  return { layers, finish }
}
