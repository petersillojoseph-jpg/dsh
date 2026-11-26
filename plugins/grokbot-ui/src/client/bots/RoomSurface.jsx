/**
 * RoomSurface — the group-chat room shown over the main column.
 *
 * Rooms are host-side one-shot calls, not DSH Sessions, so they have no
 * `conversation` slot to live in. Re-declaring the `conversation` (or `main`)
 * key would race ui-conversation, so instead this renders ONE absolutely
 * positioned layer as the last child of the app frame (`.gb-sroom-layer`),
 * exactly where the native Conversation sits. The Conversation itself is never
 * hidden, restyled, unmounted or re-declared: while a room is open this layer
 * paints over it, and the sidebar (docked or drawer) stays on top of both.
 *
 * The centre column starts after the sidebar track, so the layer's `left`
 * follows the frame's resolved first grid column (re-measured on every frame
 * resize, i.e. every sidebar toggle/drag, which also animates, so the layer
 * moves with it).
 */
import React from 'react'
import { RoomChat } from './Rooms.jsx'
import { Icon, StackedAvatars } from './components.jsx'
import { normalizeRoom } from './api.js'

export function RoomSurface({ registry, frameEl }) {
  const nav = registry.useNav()
  const data = registry.useBots()
  const busy = registry.useBusy()
  const room = nav.roomId ? data.rooms.find((candidate) => candidate.id === nav.roomId) || null : null
  const layerRef = React.useRef(null)

  React.useEffect(() => {
    if (!room) return undefined
    const frame = frameEl()
    const node = layerRef.current
    if (!frame || !node) return undefined

    const measure = () => {
      node.style.left = `${sidebarTrack(frame)}px`
    }
    measure()

    let observer = null
    if (typeof ResizeObserver === 'function') {
      observer = new ResizeObserver(measure)
      observer.observe(frame)
    }
    return () => {
      if (observer) observer.disconnect()
    }
  }, [frameEl, room])

  if (!room) return null

  const bots = data.bots
  const byId = new Map(bots.map((bot) => [bot.id, bot]))
  const members = (room.botIds || []).map((id) => byId.get(id)).filter(Boolean)
  const replying = busy && busy.roomId === room.id && busy.busy

  const updateRoom = (next) => {
    const normalized = normalizeRoom(next)
    if (!normalized) return
    registry.bots.updateRoom(normalized)
  }

  return (
    <div
      ref={layerRef}
      className="gb-s gb-sroom-layer"
      role="region"
      aria-label={`${room.name} group chat`}
      data-grokbot-room={room.id}
    >
      <header className="gb-sroom-head">
        <div style={{ minWidth: 0 }}>
          <h1>{room.name}</h1>
          <span className="gb-sroom-sub">
            <StackedAvatars bots={members} size={18} max={3} />
            {members.length === 1 ? '1 bot' : `${members.length} bots`}
            {replying ? ' · replying…' : room.pending ? ' · waiting for you' : ''}
          </span>
        </div>
        <div className="gb-sroom-actions">
          <button
            type="button"
            className="gb-s-iconbtn"
            aria-label="Close group chat"
            title="Close group chat"
            onClick={() => registry.nav.dispatch({ type: 'close-room' })}
          >
            <Icon name="close" size={16} />
          </button>
        </div>
      </header>
      <div className="gb-sroom-body">
        <RoomChat
          room={room}
          bots={bots}
          onRoomUpdate={updateRoom}
          onBusyChange={(value) => registry.busy.set({ roomId: room.id, busy: !!value })}
        />
      </div>
    </div>
  )
}

/** Resolved width of the frame's first (sidebar) column. */
function sidebarTrack(frame) {
  try {
    const columns = window.getComputedStyle(frame).gridTemplateColumns || ''
    const first = parseFloat(String(columns).trim().split(/\s+/)[0] || '')
    return Number.isFinite(first) ? first : 0
  } catch {
    return 0
  }
}
