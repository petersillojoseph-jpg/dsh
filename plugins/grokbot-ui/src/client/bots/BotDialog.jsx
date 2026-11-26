/**
 * Create / edit bot sheet with the inline Avatar Studio.
 *
 * The draft carries `color` (the persisted avatar value: `#hex`,
 * `#hex::shape_N` or a `data:image/...` URL) and `avatarSet`
 * (`organic` | `rakazo`); the legacy `shape`/`face` fields are gone.
 */
import React from 'react'
import { avatarValueForBot, migrateLegacyAvatar, seededAvatarLook } from '../shared/avatar/model.js'
import { AvatarStudio, normalizeLookValue } from './AvatarStudio.jsx'
import { Icon, Spinner, useFocusTrap } from './components.jsx'

export function BotDialog({ mode, bot, onClose, onSave }) {
  const editing = mode === 'edit' && bot
  const seededRef = React.useRef(null)
  if (!seededRef.current) seededRef.current = seededAvatarLook('new-bot')
  const seeded = seededRef.current

  const [name, setName] = React.useState(editing ? bot.name : '')
  const [tagline, setTagline] = React.useState(editing ? bot.tagline || '' : '')
  const [value, setValue] = React.useState(() =>
    editing
      ? normalizeLookValue(avatarValueForBot(bot), migrateLegacyAvatar(bot).avatarSet)
      : seeded.color,
  )
  const [avatarSet, setAvatarSet] = React.useState(() =>
    editing ? migrateLegacyAvatar(bot).avatarSet : seeded.avatarSet,
  )
  const [instructions, setInstructions] = React.useState(editing ? bot.instructions || '' : '')
  const [error, setError] = React.useState(null)
  const [submitting, setSubmitting] = React.useState(false)
  const sheetRef = React.useRef(null)

  useFocusTrap(sheetRef, true)

  const previewName = name.trim() || 'New GPT'
  const previewTitle = tagline.trim() || 'Local agent'

  const submit = async (event) => {
    if (event) event.preventDefault()
    if (submitting) return
    const trimmedName = name.trim()
    const trimmedInstructions = instructions.trim()
    if (!trimmedName) {
      setError('Give this GPT a name.')
      return
    }
    if (!trimmedInstructions) {
      setError('Add instructions so the GPT knows what to do.')
      return
    }
    setError(null)
    setSubmitting(true)
    const draft = {
      name: trimmedName,
      tagline: tagline.trim(),
      color: value,
      avatarSet,
      instructions: trimmedInstructions,
    }
    if (editing) {
      draft.id = bot.id
      if (bot.createdAt) draft.createdAt = bot.createdAt
    }
    try {
      await onSave(draft)
    } catch (err) {
      setError(err && err.message ? err.message : 'Could not save this GPT.')
      setSubmitting(false)
      return
    }
    setSubmitting(false)
  }

  const onScrimMouseDown = (event) => {
    if (event.target === event.currentTarget && !submitting) onClose()
  }

  return (
    <div className="gb-scrim" onMouseDown={onScrimMouseDown}>
      <div
        className="gb-sheet gb-sheet--editor"
        role="dialog"
        aria-modal="true"
        aria-labelledby="gb-bot-editor-title"
        ref={sheetRef}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="gb-sheet-head">
          <h2 id="gb-bot-editor-title">{editing ? 'Edit GPT' : 'New GPT'}</h2>
          <button type="button" className="gb-sheet-close" onClick={onClose} aria-label="Close" disabled={submitting}>
            <Icon name="close" size={17} />
          </button>
        </header>

        <form className="gb-form" onSubmit={submit} noValidate>
          <AvatarStudio
            value={value}
            avatarSet={avatarSet}
            onValueChange={setValue}
            onAvatarSetChange={setAvatarSet}
            identity={editing ? bot.id : 'grokbot-new-bot'}
            name={previewName}
            status={previewTitle}
            activity="idle"
            size={88}
            disabled={submitting}
          />

          <div className="gb-form-row">
            <label className="gb-field">
              <span className="gb-label">Name</span>
              <input
                className="gb-input"
                data-autofocus="true"
                value={name}
                maxLength={48}
                placeholder="Ken"
                autoComplete="off"
                spellCheck={false}
                onChange={(event) => setName(event.target.value)}
                disabled={submitting}
              />
            </label>
            <label className="gb-field">
              <span className="gb-label">Title</span>
              <input
                className="gb-input"
                value={tagline}
                maxLength={140}
                placeholder="Senior engineer"
                onChange={(event) => setTagline(event.target.value)}
                disabled={submitting}
              />
            </label>
          </div>

          <label className="gb-field">
            <span className="gb-label">Instructions</span>
            <textarea
              className="gb-textarea"
              value={instructions}
              rows={3}
              maxLength={8000}
              placeholder="Describe the bot's expertise, tone and how it should respond. This becomes its persona."
              onChange={(event) => setInstructions(event.target.value)}
              disabled={submitting}
            />
          </label>

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
            <button type="submit" className="gb-btn gb-btn--primary" disabled={submitting}>
              {submitting ? <Spinner size={14} /> : null}
              {editing ? 'Save' : 'Create GPT'}
            </button>
          </footer>
        </form>
      </div>
    </div>
  )
}
