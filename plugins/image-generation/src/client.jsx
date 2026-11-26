import React from 'react'
const models=[
  ['bytedance-seed/seedream-5-0-flash','Seedream 5.0 Flash','About US $0.018 per image'],
  ['openai/gpt-image-2.5-flare','GPT Image 2.5 Flare','Price varies with quality and request'],
  ['google/gemini-3.1-flash-image','Nano Banana 2','Price varies with resolution and request'],
]
function ImageSettings() {
 const [model,setModel]=React.useState(models[0][0]),[status,setStatus]=React.useState('')
 React.useEffect(()=>{fetch('/dsh-image/settings').then(r=>r.json()).then(d=>setModel(d.model)).catch(()=>setStatus('Could not load image settings.'))},[])
 const change=async(e)=>{const next=e.target.value;try{setStatus('Saving…');const r=await fetch('/dsh-image/settings',{method:'POST',headers:{'content-type':'application/json','x-dsh-images':'1'},body:JSON.stringify({model:next})});const d=await r.json();if(!r.ok)throw Error(d.error);setModel(next);setStatus('Saved')}catch(e){setStatus(e.message||'Could not save settings.')}}
 return <div className="dsh-image-settings"><style>{css}</style><h2>Image generation</h2><p>When you ask dsh to create an image, it uses your OpenRouter account. Each image is billed by OpenRouter.</p><label htmlFor="dsh-image-model">Image model</label><select id="dsh-image-model" value={model} onChange={change}>{models.map(([id,label])=><option value={id} key={id}>{label}</option>)}</select><p>{models.find(x=>x[0]===model)?.[2]}. Prices can change.</p><p role="status">{status}</p></div>
}
function ImageIcon(){return <span aria-hidden="true">◈</span>}
function validImage(meta) { return meta && typeof meta.file === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\.(png|jpg|webp)$/.test(meta.file) }
function ImageToolView({phase,block}) {
  if (phase !== 'result') return <div className="dsh-image-progress">Creating image…</div>
  if (block?.isError) return <div className="dsh-image-progress">{block?.content?.find(x=>x.type==='text')?.text || 'Could not create the image.'}</div>
  return null
}
function ImagesInChat({turn}) {
  const images = turn.data.get('dsh-generated-images') || []
  if (!images.length) return null
  return <div className="dsh-images-in-chat"><style>{css}</style>{images.filter(validImage).map(meta=>{
    const url=`/dsh-image/file?id=${encodeURIComponent(meta.file)}`
    return <figure className="dsh-image-card" key={meta.file}><img src={url} alt="Generated image" loading="lazy"/><figcaption><span>Generated image</span><a href={url} download={meta.file} aria-label="Save image" title="Save image">↓ <span>Save</span></a></figcaption></figure>
  })}</div>
}
const imagesDefinition={
  kind:'dsh-generated-images',
  match:event=> {
    if(event.type==='turn/start') return {id:String(event.data.turn),role:'start'}
    if(event.type==='tool/call' && ['generate_image','edit_image'].includes(event.data.name)) return {id:String(event.data.turn),role:'update'}
    if(event.type==='tool/result' && event.surfaceOp==='append') return {id:String(event.data.turn),role:'update'}
    return null
  },
  start:(_context,match)=>({turn:match.event.data.turn,calls:new Set(),images:[]}),
  update:(context,match)=>{
    if(match.event.type==='tool/call') {const calls=new Set(context.state.calls);calls.add(String(match.event.data.callId));return {...context.state,calls}}
    const data=match.event.data
    if(data.message?.isError || !context.state.calls.has(String(data.message?.source?.callId)) || !validImage(data.meta)) return context.state
    if(context.state.images.some(item=>item.file===data.meta.file)) return context.state
    return {...context.state,images:[...context.state.images,data.meta]}
  },
  buildLocationData:(context,scope,previous)=>{
    if(scope!=='turn'||!context.state) return null
    if(previous?.kind==='turn' && previous.turn===context.state.turn && previous.key==='dsh-generated-images' && previous.value===context.state.images) return previous
    return {kind:'turn',turn:context.state.turn,key:'dsh-generated-images',value:context.state.images}
  },
}
const css=`.dsh-image-settings{max-width:680px;padding:4px 4px 24px;color:var(--dsw-alias-label-primary,#222)}.dsh-image-settings h2{font-size:23px;margin:0 0 8px}.dsh-image-settings p{font-size:13px;line-height:1.5;color:var(--dsw-alias-label-caption,#777)}.dsh-image-settings label{display:block;font-weight:600;margin:24px 0 8px}.dsh-image-settings select{max-width:100%;padding:10px;border:1px solid #8886;border-radius:10px;background:var(--dsw-alias-bg-base,#fff);color:inherit;font:inherit}.dsh-images-in-chat{display:flex;flex-wrap:wrap;gap:12px;margin:12px 0 16px}.dsh-image-card{position:relative;margin:0;width:min(100%,512px);color:var(--dsw-alias-label-primary,#222);font:13px system-ui}.dsh-image-card img{width:100%;height:auto;max-height:640px;object-fit:contain;display:block;border-radius:16px}.dsh-image-card figcaption{display:flex;justify-content:space-between;align-items:center;margin-top:8px;color:var(--dsw-alias-label-caption,#777)}.dsh-image-card figcaption a{color:inherit;text-decoration:none;border:1px solid #8885;padding:7px 11px;border-radius:9px}.dsh-image-progress{color:var(--dsw-alias-label-caption,#777);font-size:13px}`
export const inject=['slots','uiConversation']
export function apply(ctx){
 ctx.uiConversation.events.register(imagesDefinition)
 ctx.slots.inject('conversation.chat.turnTail',()=>ctx.slots.register({name:'conversation.chat.turnTail',id:'dsh-generated-images',order:10},ImagesInChat))
 ctx.slots.inject('tool.call.toolview',()=>ctx.slots.register({name:'tool.call.toolview',key:'generate_image'},ImageToolView))
 ctx.slots.inject('tool.call.toolview',()=>ctx.slots.register({name:'tool.call.toolview',key:'edit_image'},ImageToolView))
 ctx.slots.inject('settings.section',()=>ctx.slots.register({name:'settings.section',id:'dsh-images',order:13,label:()=> 'Images'},ImageSettings))
 ctx.slots.inject('settings.section.icon',()=>ctx.slots.register({name:'settings.section.icon',id:'dsh-images'},ImageIcon))
}
