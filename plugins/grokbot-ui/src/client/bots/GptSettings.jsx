import React from 'react'
import { BotAvatar } from '../shared/avatar/index.jsx'
import { Icon } from './components.jsx'

export function GptSettings({ registry, close }) {
  const data = registry.useBots()
  const go = (action) => {
    close()
    // Let the Settings modal release focus before opening the GPT dialog.
    window.setTimeout(() => registry.dialogs.dispatch(action), 0)
  }
  return <div className="dsh-gpt-settings">
    <style>{`
      .dsh-gpt-settings { max-width: 680px; padding: 4px 4px 24px; color: var(--dsw-alias-label-primary, #222); }
      .dsh-gpt-settings h2 { margin: 0 0 7px; font-size: 23px; letter-spacing: -.02em; }
      .dsh-gpt-settings p { margin: 0; color: var(--dsw-alias-label-caption, #777); font-size: 13px; line-height: 1.5; }
      .dsh-gpt-settings-head { display:flex; gap:16px; align-items:flex-start; justify-content:space-between; flex-wrap:wrap; }
      .dsh-gpt-settings button { cursor:pointer; font:inherit; }
      .dsh-gpt-create { border:0; border-radius:10px; padding:9px 14px; background:var(--dsw-alias-label-primary,#222); color:var(--dsw-alias-bg-base,#fff); font-weight:600!important; }
      .dsh-gpt-settings-list { display:grid; gap:8px; margin-top:24px; }
      .dsh-gpt-settings-row { display:flex; align-items:center; gap:12px; padding:12px; border:1px solid var(--dsw-alias-border-l4,rgba(128,128,128,.2)); border-radius:13px; }
      .dsh-gpt-settings-info { flex:1; min-width:0; display:flex; flex-direction:column; gap:3px; }
      .dsh-gpt-settings-info strong { overflow:hidden; text-overflow:ellipsis; font-size:14px; }
      .dsh-gpt-settings-info small { color:var(--dsw-alias-label-caption,#777); font-size:12px; }
      .dsh-gpt-action { border:1px solid var(--dsw-alias-border-l4,rgba(128,128,128,.2)); border-radius:8px; padding:7px 10px; color:inherit; background:transparent; font-size:12px!important; }
      .dsh-gpt-action--delete { color:#c43f4d; }
      .dsh-gpt-empty { padding:22px; border:1px dashed var(--dsw-alias-border-l4,rgba(128,128,128,.25)); border-radius:13px; }
      .dsh-gpt-settings button:focus-visible { outline:2px solid #8b6fe8; outline-offset:2px; }
      @media(max-width:650px) { .dsh-gpt-settings-row { flex-wrap:wrap; } }
    `}</style>
    <div className="dsh-gpt-settings-head"><div><h2>Your GPTs</h2><p>Create a GPT, change its instructions or look, or remove one.</p></div><button className="dsh-gpt-create" onClick={() => go({type:'edit-bot', botId:null})}>+ New GPT</button></div>
    <div className="dsh-gpt-settings-list">
      {data.status === 'loading' || data.status === 'idle' ? <p>Loading GPTs…</p> : data.bots.length === 0 ? <p className="dsh-gpt-empty">No GPTs yet. Create one to get started.</p> : data.bots.map(bot => <div className="dsh-gpt-settings-row" key={bot.id}>
        <BotAvatar bot={bot} size={36} activity="idle" /><span className="dsh-gpt-settings-info"><strong>{bot.name}</strong><small>{bot.tagline || 'GPT'}</small></span>
        <button className="dsh-gpt-action" aria-label={`Edit ${bot.name}`} onClick={() => go({type:'edit-bot', botId:bot.id})}>Edit</button>
        <button className="dsh-gpt-action dsh-gpt-action--delete" aria-label={`Delete ${bot.name}`} onClick={() => go({type:'confirm-delete-bot', botId:bot.id})}>Delete</button>
      </div>)}
    </div>
  </div>
}
export function GptSettingsIcon({size=16}) { return <Icon name="spark" size={size} /> }
