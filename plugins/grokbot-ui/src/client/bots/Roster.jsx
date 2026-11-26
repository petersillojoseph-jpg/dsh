/**
 * Roster presentation for the Grok Bot surface.
 *
 * The roster is the main object: flat rows with a large animated avatar, a
 * bold name, a one-line muted title, a live activity dot and a chevron. The
 * avatar itself opens the Avatar Studio; the rest of the row opens the bot.
 */
import React from 'react'
import { BotAvatar } from '../shared/avatar/index.jsx'
import { seededAvatarLook, shapeAvatarValue } from '../shared/avatar/model.js'
import { ActivityDot, Icon, Spinner, StackedAvatars, VisuallyHidden } from './components.jsx'
import { activityLabel } from './live.js'

function botSubtitle(bot) {
  if (bot.tagline && bot.tagline.trim()) return bot.tagline.trim()
  const instructions = (bot.instructions || '').replace(/\s+/g, ' ').trim()
  if (!instructions) return 'Local agent'
  return instructions.length > 90 ? `${instructions.slice(0, 89)}…` : instructions
}

function roomPreview(room, bots) {
  const transcript = Array.isArray(room.transcript) ? room.transcript : []
  for (let i = transcript.length - 1; i >= 0; i -= 1) {
    const message = transcript[i]
    if (!message || typeof message.text !== 'string' || !message.text.trim()) continue
    if (message.role === 'user') return `You: ${message.text}`
    if (message.role === 'bot') {
      const bot = bots.find((candidate) => candidate.id === message.botId)
      return `${bot ? bot.name : 'Bot'}: ${message.text}`
    }
    return message.text
  }
  return 'No messages yet'
}

export function BotRow({ bot, index, activity = 'idle', onOpen, onChat, onEdit, onDelete, onCustomize }) {
  const label = activityLabel(activity)
  return (
    <div className="gb-row" style={{ '--gb-row-index': index }}>
      <button
        type="button"
        className="gb-row-avatar gb-row-avatar-btn gb-as-trigger"
        aria-label={`Customize ${bot.name}'s avatar`}
        title="Customize avatar"
        onClick={() => onCustomize && onCustomize(bot)}
      >
        <BotAvatar
          bot={bot}
          size={44}
          activity={activity}
          title={`${bot.name} · ${label.toLowerCase()}`}
        />
        <span className="gb-as-trigger-pencil" aria-hidden="true">
          <Icon name="edit" size={11} />
        </span>
      </button>
      <button
        type="button"
        className="gb-row-main gb-row-main--split"
        onClick={() => onOpen(bot)}
        aria-label={`Open ${bot.name}`}
      >
        <span className="gb-row-text">
          <span className="gb-row-name">
            {bot.name}
            <ActivityDot activity={activity} className="gb-row-activity" />
            <VisuallyHidden> — {label}</VisuallyHidden>
          </span>
          <span className="gb-row-title">{botSubtitle(bot)}</span>
        </span>
      </button>
      <span className="gb-row-actions">
        <button
          type="button"
          className="gb-iconbtn"
          aria-label={`Chat with ${bot.name}`}
          title={`Chat with ${bot.name}`}
          onClick={() => onChat(bot)}
        >
          <Icon name="chat" size={16} />
        </button>
        <button
          type="button"
          className="gb-iconbtn"
          aria-label={`Edit ${bot.name}`}
          title={`Edit ${bot.name}`}
          onClick={() => onEdit(bot)}
        >
          <Icon name="edit" size={16} />
        </button>
        <button
          type="button"
          className="gb-iconbtn gb-iconbtn--danger"
          aria-label={`Delete ${bot.name}`}
          title={`Delete ${bot.name}`}
          onClick={() => onDelete(bot)}
        >
          <Icon name="trash" size={16} />
        </button>
      </span>
      <span className="gb-row-chevron" aria-hidden="true">
        <Icon name="chevronRight" size={16} />
      </span>
    </div>
  )
}

export function RoomRow({ room, bots, onOpen, onDelete }) {
  const memberBots = (room.botIds || []).map((id) => bots.find((bot) => bot.id === id)).filter(Boolean)
  const memberLabel = memberBots.length === 1 ? '1 bot' : `${memberBots.length} bots`
  return (
    <div className="gb-row gb-row--room">
      <button type="button" className="gb-row-main" onClick={() => onOpen(room)} aria-label={`Open room ${room.name}`}>
        <span className="gb-row-avatar gb-row-avatar--stack">
          <StackedAvatars bots={memberBots} size={30} max={3} />
        </span>
        <span className="gb-row-text">
          <span className="gb-row-name">{room.name}</span>
          <span className="gb-row-title">
            <span className="gb-row-meta">{memberLabel}</span>
            <span className="gb-row-sep" aria-hidden="true">·</span>
            {roomPreview(room, bots)}
          </span>
        </span>
      </button>
      <span className="gb-row-actions">
        <button
          type="button"
          className="gb-iconbtn gb-iconbtn--danger"
          aria-label={`Delete room ${room.name}`}
          title="Delete room"
          onClick={() => onDelete(room)}
        >
          <Icon name="trash" size={16} />
        </button>
      </span>
      <span className="gb-row-chevron" aria-hidden="true">
        <Icon name="chevronRight" size={16} />
      </span>
    </div>
  )
}

export function RosterSkeleton({ rows = 4 }) {
  return (
    <div className="gb-roster" aria-hidden="true">
      {Array.from({ length: rows }, (_, index) => (
        <div key={index} className="gb-row gb-row--skeleton">
          <div className="gb-skel gb-skel--avatar" />
          <div className="gb-skel-lines">
            <div className="gb-skel gb-skel--line" />
            <div className="gb-skel gb-skel--line gb-skel--short" />
          </div>
        </div>
      ))}
    </div>
  )
}

function emptyBot(id) {
  const look = seededAvatarLook(id)
  return {
    id,
    name: 'Empty',
    color: shapeAvatarValue(look.color, look.shapeIndex),
    avatarSet: look.avatarSet,
  }
}

const EMPTY_CLUSTER = [emptyBot('grokbot-empty-1'), emptyBot('grokbot-empty-2'), emptyBot('grokbot-empty-3')]

export function EmptyBots({ onCreate }) {
  return (
    <div className="gb-empty">
      <span className="gb-empty-cluster" aria-hidden="true">
        {EMPTY_CLUSTER.map((spec, index) => (
          <span key={spec.id} className="gb-empty-cluster-item" style={{ '--gb-cluster-index': index }}>
            <BotAvatar bot={spec} size={64} activity="idle" />
          </span>
        ))}
      </span>
      <h2>No bots yet</h2>
      <p>Create a bot with its own animated avatar and instructions. It runs locally with your workspace tools.</p>
      <button type="button" className="gb-btn gb-btn--primary" onClick={onCreate}>
        <Icon name="plus" size={15} />
        New bot
      </button>
    </div>
  )
}

export function EmptyRooms({ onCreate }) {
  return (
    <div className="gb-empty">
      <span className="gb-empty-cluster gb-empty-cluster--soft" aria-hidden="true">
        <span className="gb-empty-mark">
          <Icon name="rooms" size={22} />
        </span>
      </span>
      <h2>No rooms yet</h2>
      <p>Bring a few bots into a room and they will talk with you — and with each other.</p>
      <button type="button" className="gb-btn gb-btn--primary" onClick={onCreate}>
        <Icon name="plus" size={15} />
        New room
      </button>
    </div>
  )
}

export function ErrorState({ message, onRetry, retrying }) {
  return (
    <div className="gb-empty" role="alert">
      <span className="gb-empty-mark gb-empty-mark--error" aria-hidden="true">
        <Icon name="alert" size={22} />
      </span>
      <h2>Could not load bots</h2>
      <p>{message || 'The local bot service did not answer.'}</p>
      <button type="button" className="gb-btn gb-btn--secondary" onClick={onRetry} disabled={retrying}>
        {retrying ? <Spinner size={14} /> : <Icon name="retry" size={15} />}
        Retry
      </button>
    </div>
  )
}
