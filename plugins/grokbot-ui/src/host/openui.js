import { readFile } from 'node:fs/promises'
import { readJsonBody, sendError } from './http.js'
import { HttpError } from './store.js'

const prompt = JSON.parse(await readFile(new URL('./openui-prompt.json', import.meta.url), 'utf8'))
function guard(req) {
  if (req.method !== 'POST' || !req.headers.host || req.headers.origin !== `http://${req.headers.host}` || req.headers['x-dsh-openui'] !== '1') throw new HttpError(403, 'Request must come from dsh.')
}
export function openuiRoutes(ctx, log) {
  return [
    {kind:'exact', path:'/grokbot/api/openui/key', handler:async(req,res)=>{try {
      guard(req); const body=await readJsonBody(req, 8192)
      if (typeof body.key !== 'string' || !body.key.trim() || body.key.length > 2048) throw new HttpError(400,'Enter your OpenUI API key.')
      await ctx.credentials.set('THESYS_API_KEY',body.key.trim())
      res.writeHead(200, {'content-type':'application/json','cache-control':'no-store'}); res.end('{"ok":true}')
    } catch(error){sendError(res,error,log)}}},
    {kind:'exact', path:'/grokbot/api/openui/generate', handler:async(req,res)=>{let abort;try {
      guard(req); const body=await readJsonBody(req, 256*1024)
      if (!Array.isArray(body.messages) || body.messages.length<1 || body.messages.length>30 || body.messages.some(m=>!['user','assistant'].includes(m?.role)||typeof m.content!=='string'||m.content.length>30000)) throw new HttpError(400,'The request is too long or invalid.')
      const key=(await ctx.credentials.resolve('THESYS_API_KEY'))?.value
      if(!key) throw new HttpError(400,'Add your OpenUI API key to get started.')
      abort=new AbortController(); res.on('close',()=>abort.abort())
      const upstream=await fetch('https://api.thesys.dev/v1/embed/chat/completions',{method:'POST',headers:{Authorization:`Bearer ${key}`,'content-type':'application/json'},body:JSON.stringify({model:'google/gemini-3.5-flash-free',messages:[{role:'system',content:prompt},...body.messages],stream:true}),signal:abort.signal})
      if(!upstream.ok) throw new HttpError(400,upstream.status===401?'OpenUI rejected the API key. Check it and try again.':`OpenUI could not generate this interface (error ${upstream.status}).`)
      res.writeHead(200,{'content-type':'text/event-stream; charset=utf-8','cache-control':'no-store','x-content-type-options':'nosniff'})
      for await(const chunk of upstream.body) { if(res.destroyed) break; res.write(chunk) }
      if(!res.destroyed) res.end()
    }catch(error){if(!res.headersSent) sendError(res,error,log); else if(!res.destroyed) res.destroy(error)} finally {abort?.abort()}}},
  ]
}
