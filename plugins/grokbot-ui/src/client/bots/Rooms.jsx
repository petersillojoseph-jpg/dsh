/**
 * Rooms: the create-room sheet and the group-chat surface (the room list
 * itself lives in the sidebar).
 * Same flat Grok language as the bot roster — hairlines, quiet surfaces,
 * black/white message bubbles, no glow.
 */
import React from 'react'
import { BotAvatar } from '../shared/avatar/index.jsx'
import { Icon, Spinner, StackedAvatars, TypingDots, useFocusTrap } from './components.jsx'
import { api, normalizeRoom, respondersFor } from './api.js'

export function CreateRoomDialog({ bots, initialBotIds, onClose, onCreate }) {
  const [name, setName] = React.useState('')
  const [selected, setSelected] = React.useState(() => {
    const seed = Array.isArray(initialBotIds) ? initialBotIds : []
    return new Set(seed.filter((id) => bots.some((bot) => bot.id === id)))
  })
  const [error, setError] = React.useState(null)
  const [submitting, setSubmitting] = React.useState(false)
  const sheetRef = React.useRef(null)
  useFocusTrap(sheetRef, true)

  const toggle = (id) => {
    setSelected((previous) => {
      const next = new Set(previous)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const submit = async (event) => {
    if (event) event.preventDefault()
    if (submitting) return
    const trimmed = name.trim()
    if (!trimmed) {
      setError('Name the room first.')
      return
    }
    if (selected.size === 0) {
      setError('Pick at least one bot for this room.')
      return
    }
    setError(null)
    setSubmitting(true)
    try {
      await onCreate({ name: trimmed, botIds: Array.from(selected) })
    } catch (err) {
      setError(err && err.message ? err.message : 'Could not create the room.')
      setSubmitting(false)
    }
  }

  const onScrimMouseDown = (event) => {
    if (event.target === event.currentTarget && !submitting) onClose()
  }

  return (
    <div className="gb-scrim" onMouseDown={onScrimMouseDown}>
      <div
        className="gb-sheet gb-sheet--room"
        role="dialog"
        aria-modal="true"
        aria-labelledby="gb-room-sheet-title"
        ref={sheetRef}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="gb-sheet-head">
          <h2 id="gb-room-sheet-title">New room</h2>
          <button type="button" className="gb-sheet-close" onClick={onClose} aria-label="Close" disabled={submitting}>
            <Icon name="close" size={17} />
          </button>
        </header>

        <form className="gb-form" onSubmit={submit} noValidate>
          <div className="gb-room-preview">
            <StackedAvatars
              bots={(Array.from(selected)
                .map((id) => bots.find((bot) => bot.id === id))
                .filter(Boolean))}
              size={34}
              max={3}
            />
            <span className="gb-hint">
              {selected.size === 0 ? 'Pick the bots who join this room.' : `${selected.size} bot${selected.size === 1 ? '' : 's'} selected`}
            </span>
          </div>

          <label className="gb-field">
            <span className="gb-label">Room name</span>
            <input
              className="gb-input"
              data-autofocus="true"
              value={name}
              maxLength={60}
              placeholder="Launch brainstorm"
              autoComplete="off"
              onChange={(event) => setName(event.target.value)}
              disabled={submitting}
            />
          </label>

          <div className="gb-field">
            <span className="gb-label">Bots</span>
            {bots.length === 0 ? (
              <p className="gb-hint">Create a bot first — rooms need at least one member.</p>
            ) : (
              <div className="gb-picklist" role="group" aria-label="Choose bots">
                {bots.map((bot) => {
                  const active = selected.has(bot.id)
                  return (
                    <button
                      key={bot.id}
                      type="button"
                      className={`gb-pickrow${active ? ' gb-pickrow--active' : ''}`}
                      aria-pressed={active}
                      onClick={() => toggle(bot.id)}
                      disabled={submitting}
                    >
                      <BotAvatar bot={bot} size={32} animated={false} />
                      <span className="gb-pickrow-name">{bot.name}</span>
                      <span className="gb-pickrow-check" aria-hidden="true">
                        {active ? <Icon name="check" size={14} /> : null}
                      </span>
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          {error ? (
            <div className="gb-form-error" role="alert">
              <Icon name="alert" size={15} />
              <span>{error}</span>
            </div>
          ) : null}

          <footer className="gb-sheet-foot">
            <button type="button" className="gb-btn gb-btn--secondary" onClick={onClose} disabled={submitting}>
              Cancel
            </button>
            <button type="submit" className="gb-btn gb-btn--primary" disabled={submitting || bots.length === 0}>
              {submitting ? <Spinner size={14} /> : null}
              Create room
            </button>
          </footer>
        </form>
      </div>
    </div>
  )
}

export function RoomChat({ room, bots, onRoomUpdate, onBusyChange }) {
  const [text, setText] = React.useState('')
  const [sending, setSending] = React.useState(false)
  const [error, setError] = React.useState(null)
  const [failedText, setFailedText] = React.useState(null)
  const [optimistic, setOptimistic] = React.useState(null)
  const [typingBots, setTypingBots] = React.useState([])
  const transcriptRef = React.useRef(null)
  const inputRef = React.useRef(null)

  const byId = React.useMemo(() => new Map(bots.map((bot) => [bot.id, bot])), [bots])
  const roomBots = React.useMemo(
    () => (room.botIds || []).map((id) => byId.get(id)).filter(Boolean),
    [room.botIds, byId],
  )
  const transcript = Array.isArray(room.transcript) ? room.transcript : []
  const messages = optimistic ? transcript.concat(optimistic) : transcript
  const pendingBot = room.pending ? byId.get(room.pending.botId) : null

  React.useEffect(() => {
    const node = transcriptRef.current
    if (node) node.scrollTop = node.scrollHeight
  }, [room.id, messages.length, sending, typingBots.length])

  React.useEffect(() => {
    const node = inputRef.current
    if (!node) return
    node.style.height = 'auto'
    node.style.height = `${Math.min(node.scrollHeight, 140)}px`
  }, [text])

  React.useEffect(() => {
    if (inputRef.current) inputRef.current.focus()
  }, [room.id])

  // Report the room reply lifecycle upward so header avatars can show activity.
  React.useEffect(() => {
    if (typeof onBusyChange === 'function') onBusyChange(sending)
    return () => {
      if (typeof onBusyChange === 'function') onBusyChange(false)
    }
  }, [sending, onBusyChange])

  const send = async (value) => {
    const trimmed = String(value || '').trim()
    if (!trimmed || sending) return
    setSending(true)
    setError(null)
    setFailedText(null)
    setText('')
    setTypingBots(respondersFor(room, bots, trimmed))
    const optimisticMessage = { id: `pending-${Date.now()}`, role: 'user', text: trimmed, ts: Date.now() }
    setOptimistic(optimisticMessage)
    try {
      const payload = await api.sendRoom(room.id, trimmed)
      const nextRoom = normalizeRoom(payload && payload.room)
      if (nextRoom && nextRoom.id) {
        onRoomUpdate(nextRoom)
      } else {
        const replies = payload && Array.isArray(payload.replies) ? payload.replies : []
        const fallback = normalizeRoom({
          ...room,
          transcript: transcript.concat({ id: `local-${Date.now()}`, role: 'user', text: trimmed, ts: Date.now() }, ...replies),
        })
        if (!fallback) throw new Error('The room reply was malformed.')
        onRoomUpdate(fallback)
      }
    } catch (err) {
      setError(err && err.message ? err.message : 'Could not send that message.')
      setFailedText(trimmed)
    } finally {
      setSending(false)
      setTypingBots([])
      setOptimistic(null)
      if (inputRef.current) inputRef.current.focus()
    }
  }

  const insertMention = (bot) => {
    setText((previous) => {
      const base = previous && !/\s$/.test(previous) && previous.length ? `${previous} ` : previous
      return `${base || ''}@${bot.name} `
    })
    if (inputRef.current) inputRef.current.focus()
  }

  const onComposerKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault()
      send(text)
    }
  }

  return (
    <div className="gb-chat">
      <div className="gb-transcript" ref={transcriptRef} role="log" aria-live="polite" aria-relevant="additions">
        {messages.length === 0 && !sending ? (
          <div className="gb-chat-empty">
            <StackedAvatars bots={roomBots} size={40} max={3} />
            <h3>Start the conversation</h3>
            <p>
              {roomBots.length
                ? `${roomBots.map((bot) => bot.name).join(', ')} ${roomBots.length === 1 ? 'is' : 'are'} in this room. Mention someone with @ to direct the reply — bots can ping each other with @Name and ask you for approval with @user.`
                : 'This room has no bots yet.'}
            </p>
          </div>
        ) : null}

        {messages.map((message) => (
          <MessageRow key={message.id} message={message} byId={byId} bots={roomBots} />
        ))}

        {sending
          ? (typingBots.length ? typingBots : roomBots.slice(0, 1)).map((bot) => (
              <div key={`typing-${bot ? bot.id : 'bot'}`} className="gb-msg gb-msg--bot">
                <BotAvatar
                  bot={bot || { id: 'grokbot-typing', name: 'Bot', color: '#A97EFE', avatarSet: 'rakazo' }}
                  size={28}
                  activity="writing"
                />
                <div className="gb-msg-body">
                  <span className="gb-msg-name">{bot ? bot.name : 'Bots'}</span>
                  <div className="gb-typing-bubble">
                    <TypingDots />
                  </div>
                </div>
              </div>
            ))
          : null}
      </div>

      {error ? (
        <div className="gb-chat-error" role="alert">
          <Icon name="alert" size={15} />
          <span>{error}</span>
          {failedText ? (
            <button type="button" className="gb-btn gb-btn--secondary gb-btn--sm" onClick={() => send(failedText)} disabled={sending}>
              Retry
            </button>
          ) : null}
          <button type="button" className="gb-iconbtn" aria-label="Dismiss error" onClick={() => setError(null)}>
            <Icon name="close" size={14} />
          </button>
        </div>
      ) : null}

      {room.pending && !sending ? (
        <div className="gb-waiting" role="status">
          <Icon name="spark" size={14} />
          <span>
            {pendingBot
              ? `${pendingBot.name} is waiting for your answer — reply to resume the room`
              : 'The room is waiting for your answer — reply to resume'}
          </span>
        </div>
      ) : null}

      <div className="gb-composer">
        {roomBots.length ? (
          <div className="gb-mentions" role="group" aria-label="Mention a bot">
            <span className="gb-mentions-label">Mention</span>
            {roomBots.map((bot) => (
              <button
                key={bot.id}
                type="button"
                className="gb-mention"
                onClick={() => insertMention(bot)}
                aria-label={`Mention ${bot.name}`}
              >
                @{bot.name}
              </button>
            ))}
          </div>
        ) : null}
        <div className="gb-composer-pill">
          <textarea
            ref={inputRef}
            className="gb-composer-input"
            value={text}
            rows={1}
            placeholder={`Message ${room.name}…`}
            aria-label={`Message ${room.name}`}
            onChange={(event) => setText(event.target.value)}
            onKeyDown={onComposerKeyDown}
            disabled={sending}
          />
          <button
            type="button"
            className="gb-send"
            aria-label="Send message"
            title="Send message (Enter)"
            disabled={sending || !text.trim()}
            onClick={() => send(text)}
          >
            {sending ? <Spinner size={15} /> : <Icon name="arrowUp" size={17} />}
          </button>
        </div>
        <p className="gb-composer-hint">Enter to send · Shift+Enter for a new line · @Name pings a bot · @user is how bots ask you</p>
      </div>
    </div>
  )
}

/** Escape a bot name for a mention regex. */
function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/** Render @Name pings in room text as inline mention chips. */
function renderRoomText(text, bots) {
  const names = [
    ...(Array.isArray(bots) ? bots : [])
      .map((bot) => (bot && typeof bot.name === 'string' ? bot.name : ''))
      .filter(Boolean),
    // Bots ask the user with @user; highlight it like a bot ping.
    'user',
  ].sort((left, right) => right.length - left.length)
  if (!names.length) return text
  let pattern
  try {
    pattern = new RegExp(`(@(?:${names.map(escapeRegExp).join('|')}))(?![\\p{L}\\p{N}_])`, 'giu')
  } catch {
    return text
  }
  const parts = []
  let last = 0
  for (const match of text.matchAll(pattern)) {
    if (typeof match.index !== 'number') continue
    if (match.index > last) parts.push(text.slice(last, match.index))
    parts.push(
      <span key={`${match.index}-${match[0]}`} className="gb-mention gb-mention--inline">
        {match[0]}
      </span>,
    )
    last = match.index + match[0].length
  }
  if (!parts.length) return text
  if (last < text.length) parts.push(text.slice(last))
  return parts
}

function MessageRow({ message, byId, bots }) {
  if (!message || typeof message !== 'object') return null
  const text = typeof message.text === 'string' ? message.text : ''
  if (!text) return null

  if (message.role === 'system') {
    return (
      <div className="gb-msg gb-msg--system">
        <span>{text}</span>
      </div>
    )
  }

  if (message.role === 'user') {
    return (
      <div className="gb-msg gb-msg--user">
        <div className="gb-bubble gb-bubble--user">{renderRoomText(text, bots)}</div>
      </div>
    )
  }

  const bot = byId.get(message.botId) || { id: message.botId || 'bot', name: 'Bot' }
  return (
    <div className="gb-msg gb-msg--bot">
      <BotAvatar bot={bot} size={28} activity="idle" />
      <div className="gb-msg-body">
        <span className="gb-msg-name">{bot.name}</span>
        <div className="gb-msg-text">{renderRoomText(text, bots)}</div>
      </div>
    </div>
  )
}
