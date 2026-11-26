import React from 'react'
import { Renderer, BuiltinActionType } from '@openuidev/react-lang'
import { openuiLibrary } from '@openuidev/react-ui'
import openuiStyles from '@openuidev/react-ui/styles/index.css'

const headers={'content-type':'application/json','x-dsh-openui':'1'}
export function OpenUIQuick() {
  const [open,setOpen]=React.useState(false), [draft,setDraft]=React.useState(''), [key,setKey]=React.useState('')
  const [messages,setMessages]=React.useState(()=>{try{return JSON.parse(localStorage.getItem('dsh-openui-history')||'[]')}catch{return []}})
  const [busy,setBusy]=React.useState(false),[error,setError]=React.useState(''),[showKey,setShowKey]=React.useState(false)
  const controller=React.useRef(null)
  React.useEffect(()=>{try{localStorage.setItem('dsh-openui-history',JSON.stringify(messages))}catch{}},[messages])
  const send=async(text)=>{
    if(busy || !text.trim()) return
    const history=[...messages,{role:'user',content:text.trim()}].slice(-28)
    setMessages([...history,{role:'assistant',content:''}]); setDraft('');setError('');setBusy(true)
    const abort=new AbortController();controller.current=abort
    try {
      const r=await fetch('/grokbot/api/openui/generate',{method:'POST',headers,body:JSON.stringify({messages:history}),signal:abort.signal})
      if(!r.ok){const data=await r.json().catch(()=>({})); if(data.error?.includes('API key'))setShowKey(true);throw Error(data.error||'Could not generate the interface.')}
      const reader=r.body.getReader(), decoder=new TextDecoder();let buffer='',output=''
      while(true){const {done,value}=await reader.read();if(done)break;buffer+=decoder.decode(value,{stream:true});let index
        while((index=buffer.indexOf('\n'))>=0){let line=buffer.slice(0,index).trim();buffer=buffer.slice(index+1);if(!line.startsWith('data:'))continue;let data=line.slice(5).trim();if(data==='[DONE]')continue;try{const chunk=JSON.parse(data);output+=chunk.choices?.[0]?.delta?.content||'';setMessages([...history,{role:'assistant',content:output}])}catch{}}
      }
      if(!output)throw Error('OpenUI returned an empty response. Please try again.')
    }catch(e){if(e.name!=='AbortError')setError(e.message||'Could not generate the interface.');setMessages(m=>m.at(-1)?.role==='assistant'&&!m.at(-1)?.content?m.slice(0,-1):m)}finally{setBusy(false);controller.current=null}
  }
  const saveKey=async()=>{try{setError('');const r=await fetch('/grokbot/api/openui/key',{method:'POST',headers,body:JSON.stringify({key})});const data=await r.json();if(!r.ok)throw Error(data.error);setKey('');setShowKey(false)}catch(e){setError(e.message||'Could not save key.')}}
  const action=(event)=>{if(event.type===BuiltinActionType.ContinueConversation){let text=event.humanFriendlyMessage||'Continue';if(event.formState)text+=`\nForm values: ${JSON.stringify(event.formState)}`;send(text)}else if(event.type===BuiltinActionType.OpenUrl){try{const u=new URL(String(event.params?.url));if(['https:','http:'].includes(u.protocol))window.open(u.href,'_blank','noopener,noreferrer')}catch{}}}
  return <><button type="button" className="dsh-openui-trigger" onClick={()=>setOpen(true)} title="Generate an interactive interface" aria-label="Generate interactive UI">✦</button>{open&&<div className="dsh-openui-backdrop" onClick={()=>setOpen(false)}><section className="dsh-openui-panel" role="dialog" aria-modal="true" aria-label="Interactive UI" onClick={e=>e.stopPropagation()}><style>{openuiStyles}</style><header><div><strong>Interactive UI</strong><small>Powered by OpenUI</small></div><div><button type="button" onClick={()=>setShowKey(!showKey)}>Setup</button><button type="button" aria-label="Close interactive UI" onClick={()=>setOpen(false)}>×</button></div></header>{showKey&&<div className="dsh-openui-setup"><p>Create an API key in the <a href="https://console.thesys.dev" target="_blank" rel="noreferrer">Thesys Console</a> and enter it here. Your key stays on this Mac.</p><input type="password" value={key} onChange={e=>setKey(e.target.value)} placeholder="OpenUI API key" autoComplete="off"/><button type="button" onClick={saveKey}>Save key</button><p>Requests use an OpenUI free model. OpenUI says free-model request data may be used for training.</p></div>}<div className="dsh-openui-messages">{!messages.length&&<p>Describe an interactive chart, quiz, form, or dashboard to create. Requests go to OpenUI; its free model may use request data for training.</p>}{messages.map((m,i)=>m.role==='user'?<div className="dsh-openui-user" key={i}>{m.content}</div>:<div className="dsh-openui-result" key={i}>{m.content?<Renderer response={m.content} library={openuiLibrary} isStreaming={busy&&i===messages.length-1} onAction={action}/>:<span>Creating…</span>}</div>)}{error&&<p className="dsh-openui-error" role="alert">{error}</p>}</div><form onSubmit={e=>{e.preventDefault();send(draft)}}><textarea value={draft} onChange={e=>setDraft(e.target.value)} placeholder="Describe what you’d like to create…" rows="2"/><div><button type="button" disabled={busy||!messages.length} onClick={()=>{if(window.confirm('Clear this interactive UI conversation?'))setMessages([])}}>Clear</button>{busy?<button type="button" onClick={()=>controller.current?.abort()}>Stop</button>:<button type="submit" disabled={!draft.trim()}>Generate</button>}</div></form></section></div>}</>
}
