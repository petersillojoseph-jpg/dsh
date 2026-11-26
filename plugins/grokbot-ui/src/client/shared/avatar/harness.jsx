/**
 * Standalone visual harness for the avatar engine.
 * Built with ./build-harness.mjs to /tmp (file://), opened with Playwright.
 * Not part of the production client entry.
 */
import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  BOT_COLORS,
  BotAvatar,
  BotAvatarStack,
  LOGO_AVATAR_ACTIVITIES,
  SHIPPED_SHAPE_KEYS,
  seededLogoAvatarColor,
} from './index.jsx'

const IMAGE_AVATAR =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#FF781C"/><stop offset="1" stop-color="#A97EFE"/></linearGradient></defs><rect width="256" height="256" fill="url(#g)"/><circle cx="128" cy="104" r="46" fill="#ffffff" opacity=".92"/><path d="M40 256c8-58 44-88 88-88s80 30 88 88z" fill="#ffffff" opacity=".92"/></svg>`,
  )

const TRAIT_IDS = Array.from({ length: 16 }, (_, index) => `trait-bot-${index}`)

function Tile({ children, caption }) {
  return (
    <div className="tile">
      {children}
      <span className="caption">{caption}</span>
    </div>
  )
}

function App() {
  const [dark, setDark] = useState(
    typeof window !== 'undefined' &&
      new URLSearchParams(window.location.search).get('theme') === 'dark',
  )
  const [still, setStill] = useState(false)
  const [activity, setActivity] = useState('working')

  useEffect(() => {
    if (dark) document.body.setAttribute('data-ds-dark-theme', '')
    else document.body.removeAttribute('data-ds-dark-theme')
  }, [dark])

  return (
    <div className="page">
      <h1>Grokbot avatar engine</h1>
      <p className="meta">
        Ported Rakazo mascot + organic avatars. Motion is CSS/SMIL. The button simulates
        reduced motion by rendering with `animated={'{false}'}`; the real
        `prefers-reduced-motion` path is verified with Playwright's reducedMotion emulation.
      </p>

      <div className="controls" style={{ marginTop: 16 }}>
        <button type="button" aria-pressed={!dark} onClick={() => setDark(false)}>
          Light
        </button>
        <button type="button" aria-pressed={dark} onClick={() => setDark(true)}>
          Dark
        </button>
        <button type="button" aria-pressed={still} onClick={() => setStill((value) => !value)}>
          Reduced motion (static)
        </button>
      </div>

      <section>
        <h2>Mascot — sizes</h2>
        <div className="row centered">
          {[160, 96, 64, 48, 38, 32, 24, 20, 16].map((size) => (
            <Tile key={size} caption={`${size}px`}>
              <BotAvatar
                color="#A97EFE"
                avatarSet="rakazo"
                identity="size-demo"
                size={size}
                activity="idle"
                animated={!still}
                title={`Mascot ${size}px`}
              />
            </Tile>
          ))}
        </div>
      </section>

      <section>
        <h2>Mascot — activities</h2>
        <div className="row">
          {LOGO_AVATAR_ACTIVITIES.map((value) => (
            <Tile key={value} caption={value}>
              <BotAvatar
                color="#2A92FE"
                avatarSet="rakazo"
                identity={`activity-${value}`}
                size={84}
                activity={value}
                animated={!still}
                title={value}
              />
            </Tile>
          ))}
        </div>
      </section>

      <section>
        <h2>Live activity switch (crossfade + continuous clock)</h2>
        <div className="workbench">
          <BotAvatar
            color="#00C972"
            avatarSet="rakazo"
            identity="switcher-bot"
            size={132}
            activity={activity}
            animated={!still}
            title={`Switcher ${activity}`}
          />
          <div className="controls" style={{ marginBottom: 0 }}>
            {LOGO_AVATAR_ACTIVITIES.map((value) => (
              <button
                key={value}
                type="button"
                aria-pressed={activity === value}
                onClick={() => setActivity(value)}
              >
                {value}
              </button>
            ))}
            <button
              type="button"
              aria-pressed={activity === 'working'}
              onClick={() => setActivity('computer')}
            >
              computer → working
            </button>
          </div>
        </div>
      </section>

      <section>
        <h2>Deterministic identity traits (seeded colour + blink + phase)</h2>
        <div className="row">
          {TRAIT_IDS.map((id) => (
            <Tile key={id} caption={id.replace('trait-bot-', '#')}>
              <BotAvatar
                color={seededLogoAvatarColor(id)}
                avatarSet="rakazo"
                identity={id}
                size={62}
                activity={Number(id.split('-').pop()) % 3 === 0 ? 'working' : 'idle'}
                animated={!still}
              />
            </Tile>
          ))}
        </div>
      </section>

      <section>
        <h2>Organic — the 8 shipped shapes with bar eyes</h2>
        <div className="row">
          {SHIPPED_SHAPE_KEYS.map((key, index) => (
            <Tile key={key} caption={key}>
              <BotAvatar
                color={`${BOT_COLORS[index]}::shape_${index}`}
                avatarSet="organic"
                identity={`shape-${key}`}
                size={84}
                activity="idle"
                animated={!still}
                title={key}
              />
            </Tile>
          ))}
        </div>
      </section>

      <section>
        <h2>Organic — working morph + glow, seeded body families</h2>
        <div className="row">
          {BOT_COLORS.slice(0, 8).map((color, index) => (
            <Tile key={color} caption={`family ${index}`}>
              <BotAvatar
                color={color}
                avatarSet="organic"
                identity={`organic-family-${index}`}
                size={84}
                status="running"
                animated={!still}
              />
            </Tile>
          ))}
        </div>
        <div className="row" style={{ marginTop: 18 }}>
          {BOT_COLORS.slice(0, 8).map((color) => (
            <Tile key={`${color}-idle`} caption="idle">
              <BotAvatar
                color={color}
                avatarSet="organic"
                identity={`organic-idle-${color}`}
                size={62}
                activity="idle"
                animated={!still}
              />
            </Tile>
          ))}
        </div>
      </section>

      <section>
        <h2>Image avatars — circle crop + working ring</h2>
        <div className="row centered">
          <Tile caption="idle">
            <BotAvatar
              color={IMAGE_AVATAR}
              identity="image-idle"
              size={84}
              activity="idle"
              animated={!still}
            />
          </Tile>
          <Tile caption="working">
            <BotAvatar
              color={IMAGE_AVATAR}
              identity="image-working"
              size={84}
              status="running"
              animated={!still}
            />
          </Tile>
          <Tile caption="32px working">
            <BotAvatar
              color={IMAGE_AVATAR}
              identity="image-small"
              size={32}
              status="running"
              animated={!still}
            />
          </Tile>
        </div>
      </section>

      <section>
        <h2>Stacked avatars</h2>
        <div className="row centered">
          {[
            [
              { color: '#A97EFE', avatarSet: 'rakazo', botId: 'a' },
              { color: '#00C972', avatarSet: 'rakazo', botId: 'b' },
            ],
            [
              { color: '#FF781C', avatarSet: 'rakazo', botId: 'c' },
              { color: '#2A92FE', avatarSet: 'organic', botId: 'd' },
              { color: '#FF5EB1', avatarSet: 'rakazo', botId: 'e' },
            ],
            [
              { color: '#1CC3B0', avatarSet: 'rakazo', botId: 'f' },
              { color: '#FFAF38', avatarSet: 'organic', botId: 'g' },
              { color: '#FF3E51', avatarSet: 'rakazo', botId: 'h' },
              { color: '#94A3B8', avatarSet: 'rakazo', botId: 'i' },
            ],
          ].map((members, index) => (
            <Tile key={index} caption={`${members.length} bots`}>
              <BotAvatarStack members={members} size={48} />
            </Tile>
          ))}
          <Tile caption="3 bots, 64px">
            <BotAvatarStack
              members={[
                { color: '#FF781C', avatarSet: 'rakazo', botId: 'j' },
                { color: '#2A92FE', avatarSet: 'rakazo', botId: 'k' },
                { color: '#FF5EB1', avatarSet: 'organic', botId: 'l' },
              ]}
              size={64}
            />
          </Tile>
        </div>
      </section>

      <section>
        <h2>Small sizes — static below 24px, task cues hidden</h2>
        <div className="row centered">
          {[16, 20, 24, 32].map((size) => (
            <Tile key={`read-${size}`} caption={`reading ${size}px`}>
              <BotAvatar
                color="#FF781C"
                avatarSet="rakazo"
                identity="small-reading"
                size={size}
                activity="reading"
                animated={!still}
              />
            </Tile>
          ))}
        </div>
        <div className="row centered" style={{ marginTop: 16 }}>
          {[16, 20, 24, 32].map((size) => (
            <Tile key={`write-${size}`} caption={`writing ${size}px`}>
              <BotAvatar
                color="#1CC3B0"
                avatarSet="rakazo"
                identity="small-writing"
                size={size}
                activity="writing"
                animated={!still}
              />
            </Tile>
          ))}
        </div>
      </section>

      <section>
        <h2>Working organics at small sizes</h2>
        <div className="row centered">
          {[16, 20, 24, 28, 32].map((size) => (
            <Tile key={size} caption={`${size}px`}>
              <BotAvatar
                color="#FF3E51::shape_4"
                avatarSet="organic"
                identity="small-working"
                size={size}
                status="running"
                animated={!still}
              />
            </Tile>
          ))}
        </div>
      </section>
    </div>
  )
}

createRoot(document.getElementById('root')).render(<App />)
