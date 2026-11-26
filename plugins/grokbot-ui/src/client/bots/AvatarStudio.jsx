/**
 * Avatar Studio — the bot look editor.
 *
 * Two presentations share one controlled panel:
 *   - `AvatarStudio` is embedded in the create/edit bot sheet.
 *   - `AvatarStudioDialog` is opened by clicking a bot avatar in the roster or
 *     the bot detail sheet and saves through the same host API.
 *
 * The panel edits the persisted avatar value (`#hex`, `#hex::shape_N` or a
 * `data:image/...` URL) plus the per-bot `avatarSet` (`organic` | `rakazo`).
 * Everything is plain React + inline SVG; image uploads are centre-cropped to
 * a circle, resized to 256x256 and exported as a webp data URL (png fallback),
 * rejecting anything over the shared 200k-character cap.
 */
import React from 'react'
import {
  BOT_COLOR_LIST,
  BOT_AVATAR_VALUE_MAX_LENGTH,
  DEFAULT_BOT_AVATAR_COLOR,
  SHIPPED_SHAPE_KEYS,
  SHIPPED_SHAPE_LABELS,
  avatarValueForBot,
  migrateLegacyAvatar,
  normalizeHexColor,
  parseBotAvatarValue,
  shapeAvatarValue,
} from '../shared/avatar/model.js'
import { BotAvatar } from '../shared/avatar/index.jsx'
import { Icon, Spinner, useFocusTrap } from './components.jsx'

const MAX_IMAGE_ATTEMPTS = [0.92, 0.86, 0.78, 0.7, 0.6, 0.5]

function paletteEntryFor(hex) {
  if (!hex) return null
  const wanted = hex.toLowerCase()
  return (
    BOT_COLOR_LIST.find((entry) => entry.hex.toLowerCase() === wanted) ||
    BOT_COLOR_LIST.find((entry) => entry.previousHex && entry.previousHex.toLowerCase() === wanted) ||
    null
  )
}

/**
 * Rakazo-set bots persist a plain colour: the mascot renderer ignores an
 * organic shape suffix, so strip it when a bot is switched to that set.
 */
export function normalizeLookValue(value, avatarSet) {
  const parsed = parseBotAvatarValue(value)
  if (avatarSet === 'rakazo' && parsed.kind === 'shape') {
    return normalizeHexColor(parsed.color) || DEFAULT_BOT_AVATAR_COLOR
  }
  return value
}

/** The colour a shape/colour action should build on. */
function baseColorFor(parsed, lastColor) {
  if (parsed.kind === 'image' || parsed.kind === 'other') return lastColor || DEFAULT_BOT_AVATAR_COLOR
  return normalizeHexColor(parsed.color || '') || lastColor || DEFAULT_BOT_AVATAR_COLOR
}

function fileToImage(file) {
  return new Promise((resolve, reject) => {
    if (!file || !file.type || !file.type.startsWith('image/')) {
      reject(new Error('That file is not an image. Choose a PNG, JPG, GIF or WebP.'))
      return
    }
    const reader = new FileReader()
    reader.onerror = () => reject(new Error('Could not read that image.'))
    reader.onload = () => {
      const src = typeof reader.result === 'string' ? reader.result : ''
      if (!src) {
        reject(new Error('Could not read that image.'))
        return
      }
      const image = new Image()
      image.onerror = () => reject(new Error('Could not decode that image.'))
      image.onload = () => resolve(image)
      image.src = src
    }
    reader.readAsDataURL(file)
  })
}

/** Centre-crop the image to a circle, resize to 256x256, export webp (png fallback). */
function imageToAvatarValue(image) {
  const size = 256
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const context = canvas.getContext('2d')
  if (!context) throw new Error('This browser cannot process images.')
  context.save()
  context.beginPath()
  context.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2)
  context.clip()
  const minDim = Math.min(image.width, image.height) || 1
  const sourceX = (image.width - minDim) / 2
  const sourceY = (image.height - minDim) / 2
  context.drawImage(image, sourceX, sourceY, minDim, minDim, 0, 0, size, size)
  context.restore()

  let dataUrl = ''
  let webpSupported = false
  for (const quality of MAX_IMAGE_ATTEMPTS) {
    dataUrl = canvas.toDataURL('image/webp', quality)
    if (dataUrl.startsWith('data:image/webp')) {
      webpSupported = true
      if (dataUrl.length <= BOT_AVATAR_VALUE_MAX_LENGTH) return dataUrl
    } else {
      break
    }
  }
  if (!webpSupported) dataUrl = canvas.toDataURL('image/png')
  if (dataUrl.length > BOT_AVATAR_VALUE_MAX_LENGTH) {
    throw new Error(
      `That image is too large once cropped (${Math.round(dataUrl.length / 1000)}k characters; the limit is ${Math.round(
        BOT_AVATAR_VALUE_MAX_LENGTH / 1000,
      )}k). Try a smaller or simpler image.`,
    )
  }
  return dataUrl
}

/**
 * Controlled studio panel.
 *
 * @param {object} props
 * @param {string} props.value persisted avatar value
 * @param {'organic'|'rakazo'} props.avatarSet
 * @param {(value: string) => void} props.onValueChange
 * @param {(set: 'organic'|'rakazo') => void} props.onAvatarSetChange
 * @param {string} [props.identity] bot id (stable traits) or preview seed
 * @param {string} [props.name] bot name shown in the preview
 * @param {string} [props.status] short status line under the name
 * @param {string} [props.activity] avatar activity for the preview
 * @param {number} [props.size] preview diameter
 * @param {boolean} [props.disabled]
 */
export function AvatarStudio({
  value = DEFAULT_BOT_AVATAR_COLOR,
  avatarSet = 'organic',
  onValueChange,
  onAvatarSetChange,
  identity,
  name,
  status,
  activity = 'idle',
  size = 92,
  disabled = false,
}) {
  const [tab, setTab] = React.useState('bot')
  const [dragOver, setDragOver] = React.useState(false)
  const [imageError, setImageError] = React.useState(null)
  const [processing, setProcessing] = React.useState(false)
  const fileInputRef = React.useRef(null)
  const mountedRef = React.useRef(true)
  const lastColorRef = React.useRef(DEFAULT_BOT_AVATAR_COLOR)

  React.useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
    }
  }, [])

  const parsed = parseBotAvatarValue(value)
  const isImage = parsed.kind === 'image'
  const baseColor = baseColorFor(parsed, lastColorRef.current)
  if (!isImage) lastColorRef.current = baseColor
  const selectedPalette = isImage ? null : paletteEntryFor(baseColor)
  const currentHex = isImage ? DEFAULT_BOT_AVATAR_COLOR : baseColor
  const shapeIndex = parsed.kind === 'shape' ? parsed.shapeIndex : null
  const isPlainColor = !isImage && parsed.kind !== 'shape'

  const chooseShape = (index) => {
    if (disabled || typeof onValueChange !== 'function') return
    setImageError(null)
    onValueChange(shapeAvatarValue(currentHex, index))
  }

  const chooseColor = (entry) => {
    if (disabled || typeof onValueChange !== 'function') return
    setImageError(null)
    const hex = normalizeHexColor(entry.hex) || entry.hex
    if (shapeIndex !== null && avatarSet === 'organic') onValueChange(shapeAvatarValue(hex, shapeIndex))
    else onValueChange(hex)
  }

  const chooseDefault = () => {
    if (disabled) return
    setImageError(null)
    if (typeof onValueChange === 'function') onValueChange(currentHex)
  }

  const chooseSet = (nextSet) => {
    if (disabled || !onAvatarSetChange || nextSet === avatarSet) return
    onAvatarSetChange(nextSet)
    const nextValue = normalizeLookValue(value, nextSet)
    if (nextValue !== value && typeof onValueChange === 'function') onValueChange(nextValue)
  }

  const resetLook = () => {
    if (disabled) return
    setImageError(null)
    if (typeof onValueChange === 'function') onValueChange(currentHex)
  }

  const applyImage = React.useCallback(
    async (file) => {
      if (disabled || !file) return
      setProcessing(true)
      setImageError(null)
      try {
        const image = await fileToImage(file)
        const dataUrl = imageToAvatarValue(image)
        if (!mountedRef.current) return
        if (typeof onValueChange === 'function') onValueChange(dataUrl)
      } catch (error) {
        if (!mountedRef.current) return
        setImageError(error && error.message ? error.message : 'Could not use that image.')
      } finally {
        if (mountedRef.current) setProcessing(false)
      }
    },
    [disabled, onValueChange],
  )

  const onDrop = (event) => {
    event.preventDefault()
    setDragOver(false)
    const file = event.dataTransfer && event.dataTransfer.files ? event.dataTransfer.files[0] : null
    if (file) void applyImage(file)
  }

  const onPaste = (event) => {
    const items = event.clipboardData && event.clipboardData.items
    if (!items) return
    for (let index = 0; index < items.length; index += 1) {
      const item = items[index]
      if (!item || !item.type || !item.type.startsWith('image/')) continue
      const file = typeof item.getAsFile === 'function' ? item.getAsFile() : null
      if (file) {
        event.preventDefault()
        void applyImage(file)
        break
      }
    }
  }

  return (
    <section
      className="gb-as"
      data-testid="avatar-studio"
      aria-label="Avatar Studio"
      onPaste={onPaste}
    >
      <div className="gb-as-preview">
        <button
          type="button"
          className="gb-as-preview-btn"
          data-testid="avatar-studio-trigger"
          aria-label="Customize bot avatar"
          disabled={disabled}
          title="Customize avatar"
          onClick={() => setTab('bot')}
        >
          <BotAvatar
            color={value}
            avatarSet={avatarSet}
            identity={identity}
            activity={activity}
            size={size}
            label={name ? `${name} avatar preview` : 'Bot avatar preview'}
          />
          <span className="gb-as-preview-pencil" aria-hidden="true">
            <Icon name="edit" size={13} />
          </span>
        </button>
        <div className="gb-as-preview-text">
          <strong>{name && name.trim() ? name.trim() : 'New bot'}</strong>
          <span>{status || (avatarSet === 'rakazo' ? 'Rakazo mascot' : 'Original shape')}</span>
        </div>
      </div>

      <div className="gb-as-tabbar">
        <div className="gb-as-tabs" role="tablist" aria-label="Avatar source">
          <button
            type="button"
            role="tab"
            id="gb-as-tab-bot"
            aria-selected={tab === 'bot'}
            aria-controls="gb-as-panel-bot"
            className={`gb-as-tab${tab === 'bot' ? ' gb-as-tab--active' : ''}`}
            onClick={() => setTab('bot')}
            disabled={disabled}
          >
            Bot
          </button>
          <button
            type="button"
            role="tab"
            id="gb-as-tab-upload"
            aria-selected={tab === 'upload'}
            aria-controls="gb-as-panel-upload"
            className={`gb-as-tab${tab === 'upload' ? ' gb-as-tab--active' : ''}`}
            onClick={() => setTab('upload')}
            disabled={disabled}
          >
            Upload
          </button>
        </div>
        <button type="button" className="gb-as-reset" onClick={resetLook} disabled={disabled}>
          Reset
        </button>
      </div>

      {tab === 'bot' ? (
        <div
          className="gb-as-panel"
          id="gb-as-panel-bot"
          role="tabpanel"
          aria-labelledby="gb-as-tab-bot"
          data-testid="avatar-studio-bot-tab"
        >
          <div className="gb-as-field">
            <span className="gb-as-label">Icon set</span>
            <div className="gb-as-set" role="group" aria-label="Icon set">
              <button
                type="button"
                className={`gb-as-set-btn${avatarSet === 'organic' ? ' gb-as-set-btn--active' : ''}`}
                aria-pressed={avatarSet === 'organic'}
                onClick={() => chooseSet('organic')}
                disabled={disabled}
              >
                Original
              </button>
              <button
                type="button"
                className={`gb-as-set-btn${avatarSet === 'rakazo' ? ' gb-as-set-btn--active' : ''}`}
                aria-pressed={avatarSet === 'rakazo'}
                onClick={() => chooseSet('rakazo')}
                disabled={disabled}
              >
                Rakazo
              </button>
            </div>
          </div>

          {avatarSet === 'organic' ? (
            <div className="gb-as-field">
              <div className="gb-as-field-head">
                <span className="gb-as-label">Shape</span>
                <button
                  type="button"
                  className={`gb-as-default${isPlainColor ? ' gb-as-default--active' : ''}`}
                  data-testid="avatar-studio-default"
                  aria-pressed={isPlainColor}
                  onClick={chooseDefault}
                  disabled={disabled}
                >
                  Default
                </button>
              </div>
              <div className="gb-shape-grid gb-as-shape-grid" role="group" aria-label="Organic shapes">
                {SHIPPED_SHAPE_KEYS.map((key, index) => (
                  <button
                    key={key}
                    type="button"
                    className={`gb-tile gb-as-shape${shapeIndex === index ? ' gb-tile--active gb-as-shape--active' : ''}`}
                    aria-label={SHIPPED_SHAPE_LABELS[key] || key}
                    aria-pressed={shapeIndex === index}
                    title={SHIPPED_SHAPE_LABELS[key] || key}
                    onClick={() => chooseShape(index)}
                    disabled={disabled}
                  >
                    <BotAvatar
                      color={shapeAvatarValue(currentHex, index)}
                      avatarSet="organic"
                      identity={identity}
                      size={34}
                      animated={false}
                      label={`${SHIPPED_SHAPE_LABELS[key] || key} shape`}
                    />
                    <span className="gb-tile-label gb-as-shape-label">{SHIPPED_SHAPE_LABELS[key] || key}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          <div className="gb-as-field">
            <span className="gb-as-label">Colour</span>
            <div className="gb-color-grid gb-as-color-grid" role="group" aria-label="Avatar colour">
              {BOT_COLOR_LIST.map((entry) => {
                const selected = selectedPalette ? selectedPalette.id === entry.id : currentHex.toLowerCase() === entry.hex.toLowerCase()
                return (
                  <button
                    key={entry.id}
                    type="button"
                    className={`gb-color gb-as-color${selected ? ' gb-color--active gb-as-color--active' : ''}`}
                    aria-label={`Colour ${entry.name} ${entry.hex}`}
                    aria-pressed={selected}
                    title={entry.name}
                    onClick={() => chooseColor(entry)}
                    disabled={disabled}
                  >
                    <span
                      className="gb-color-dot gb-as-color-dot"
                      style={{ backgroundColor: entry.hex }}
                      aria-hidden="true"
                    />
                    <span className="gb-color-label gb-as-color-label">{entry.name.split(' ').slice(-1)[0]}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      ) : null}

      {tab === 'upload' ? (
        <div
          className="gb-as-panel"
          id="gb-as-panel-upload"
          role="tabpanel"
          aria-labelledby="gb-as-tab-upload"
        >
          <button
            type="button"
            className={`gb-as-upload${dragOver ? ' gb-as-upload--over' : ''}`}
            aria-label="Image upload area"
            onClick={() => {
              if (fileInputRef.current) fileInputRef.current.click()
            }}
            onDragOver={(event) => {
              event.preventDefault()
              setDragOver(true)
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={onDrop}
            disabled={disabled || processing}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="gb-as-file"
              aria-label="Choose an image file"
              onChange={(event) => {
                const file = event.target.files && event.target.files[0]
                if (file) void applyImage(file)
                event.target.value = ''
              }}
              hidden
            />
            <span className="gb-as-upload-icon" aria-hidden="true">
              {processing ? <Spinner size={18} /> : <Icon name="upload" size={18} />}
            </span>
            <p className="gb-as-upload-text">
              {processing ? 'Preparing your image…' : 'Drag, drop, or paste an image'}
            </p>
            <span className="gb-as-upload-choose">Choose file</span>
          </button>
          <p className="gb-as-hint">Square images crop best. We centre-crop into a circle at 256×256.</p>
        </div>
      ) : null}

      {imageError ? (
        <div className="gb-as-error" role="alert">
          <Icon name="alert" size={15} />
          <span>{imageError}</span>
          <button
            type="button"
            className="gb-iconbtn"
            aria-label="Dismiss image error"
            onClick={() => setImageError(null)}
          >
            <Icon name="close" size={13} />
          </button>
        </div>
      ) : null}
    </section>
  )
}

/**
 * Standalone Avatar Studio sheet: opened by clicking a bot avatar in the
 * roster or detail sheet, saved through the same `api.saveBot` draft path.
 *
 * @param {object} props
 * @param {object} props.bot normalized bot
 * @param {string} [props.activity] live activity for the preview
 * @param {() => void} props.onClose
 * @param {(patch: {color: string, avatarSet: 'organic'|'rakazo'}) => Promise<void>} props.onSave
 */
export function AvatarStudioDialog({ bot, activity = 'idle', onClose, onSave }) {
  const initial = React.useMemo(() => migrateLegacyAvatar(bot), [bot])
  const [value, setValue] = React.useState(() => normalizeLookValue(avatarValueForBot(bot), initial.avatarSet))
  const [avatarSet, setAvatarSet] = React.useState(() => initial.avatarSet)
  const [error, setError] = React.useState(null)
  const [saving, setSaving] = React.useState(false)
  const sheetRef = React.useRef(null)
  useFocusTrap(sheetRef, true)

  const close = () => {
    if (!saving) onClose()
  }

  const save = async () => {
    if (saving) return
    setError(null)
    setSaving(true)
    try {
      await onSave({ color: value, avatarSet })
      setSaving(false)
      onClose()
    } catch (saveError) {
      setError(saveError && saveError.message ? saveError.message : 'Could not save this avatar.')
      setSaving(false)
    }
  }

  const onScrimMouseDown = (event) => {
    if (event.target === event.currentTarget && !saving) onClose()
  }

  return (
    <div className="gb-scrim" onMouseDown={onScrimMouseDown}>
      <div
        className="gb-sheet gb-sheet--studio gb-as-sheet"
        role="dialog"
        aria-modal="true"
        aria-labelledby="gb-avatar-studio-title"
        ref={sheetRef}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="gb-sheet-head">
          <h2 id="gb-avatar-studio-title">Avatar Studio</h2>
          <button
            type="button"
            className="gb-sheet-close"
            aria-label="Close Avatar Studio"
            onClick={close}
            disabled={saving}
          >
            <Icon name="close" size={17} />
          </button>
        </header>

        <AvatarStudio
          value={value}
          avatarSet={avatarSet}
          onValueChange={setValue}
          onAvatarSetChange={setAvatarSet}
          identity={bot.id}
          name={bot.name}
          status={bot.tagline || 'Local agent'}
          activity={activity}
          size={104}
          disabled={saving}
        />

        {error ? (
          <div className="gb-as-error" role="alert">
            <Icon name="alert" size={15} />
            <span>{error}</span>
          </div>
        ) : null}

        <footer className="gb-sheet-foot">
          <button type="button" className="gb-btn gb-btn--secondary" onClick={close} disabled={saving}>
            Cancel
          </button>
          <button type="button" className="gb-btn gb-btn--primary" onClick={save} disabled={saving}>
            {saving ? <Spinner size={14} /> : <Icon name="check" size={15} />}
            Done
          </button>
        </footer>
      </div>
    </div>
  )
}

