import { defineTool } from '@deepseek-ai/dsh-tools'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { readFile } from 'node:fs/promises'
import { generateImage, readSettings, saveSettings } from './src/generate.js'
const dir=join(dirname(fileURLToPath(import.meta.url)),'data')
const types={png:'image/png',jpg:'image/jpeg',webp:'image/webp'}
function json(res,status,data){res.writeHead(status,{'content-type':'application/json; charset=utf-8','cache-control':'no-store'});res.end(JSON.stringify(data))}
async function body(req){let chunks=[],n=0;for await(const c of req){n+=c.length;if(n>8192)throw Error('Request is too large.');chunks.push(c)}return JSON.parse(Buffer.concat(chunks).toString()||'{}')}
function sameOrigin(req){return req.headers.host && req.headers.origin===`http://${req.headers.host}` && req.headers['x-dsh-images']==='1'}
export const inject=['tools','credentials','webServer']
export function apply(ctx) {
  const definition=defineTool({
    name:'generate_image',
    description:'Create an image when the user asks you to draw, generate, illustrate, or make a picture. Use this tool automatically for image creation, including illustrations for lessons and presentations. It uses the image model selected in dsh settings and displays the resulting image in the chat. The prompt is sent to OpenRouter and the image provider. Only call it when the user asks for an image; do not claim an image was generated if the tool fails. To edit an existing image use the edit_image tool.',
    parameters:{prompt:{type:'string',required:true,description:'A detailed description of the image to generate. Include subject, visual style, desired text and aspect ratio if specified by the user.'}},
    timeoutMs:180000,
    output:{schema:{type:'object',additionalProperties:false,properties:{file:{type:'string',required:true},model:{type:'string',required:true},modelName:{type:'string',required:true},cost:{type:'string',required:true}}},
      render:(_args,value)=>[{type:'text',text:`Image generated with ${value.modelName}. The image and a Save image button are already visible in the chat. Reference ID for a later edit: ${value.file}. Tell the user it is ready; do not search for the image or call other tools to display or save it.`}],
      presentationMeta:(_args,value)=>value},
    execute:async(args,exec)=>generateImage({prompt:args.prompt,credentials:ctx.credentials,dir,signal:exec.signal}),
  })
  ctx.effect(()=>{
    const edit=defineTool({
      name:'edit_image', description:'Edit or transform an existing image when the user asks to change it. Call this tool directly with the original attachment path supplied in the conversation, or the exact reference ID returned by a previous image tool call. Do not copy the image to the workspace or use shell commands to prepare it. The image and instructions are sent to OpenRouter and the selected image model. If the user has not identified or attached an image, ask them which image to edit; never generate a new image instead.',
      parameters:{prompt:{type:'string',required:true,description:'Describe the requested edit, retaining unmentioned details.'},reference:{type:'string',required:true,description:'The supplied local path of the attached image, or the reference ID from a prior image tool result in this conversation.'}},
      timeoutMs:180000,output:{schema:{type:'object',additionalProperties:false,properties:{file:{type:'string',required:true},model:{type:'string',required:true},modelName:{type:'string',required:true},cost:{type:'string',required:true}}},render:(_args,value)=>[{type:'text',text:`Image edited with ${value.modelName}. The edited image and Save button are already visible in chat. Reference ID for a later edit: ${value.file}. Tell the user it is ready; do not search for the image or call other tools to display or save it.`}],presentationMeta:(_args,value)=>value},
      execute:async(args,exec)=>generateImage({prompt:args.prompt,reference:args.reference,credentials:ctx.credentials,dir,signal:exec.signal}),
    })
    const disposers=[ctx.tools.register(definition),ctx.tools.register(edit)]
    disposers.push(ctx.webServer.register({kind:'exact',path:'/dsh-image/settings',handler:async(req,res)=>{try{
      if(req.method==='GET')return json(res,200,await readSettings(dir))
      if(req.method!=='POST'||!sameOrigin(req))return json(res,403,{error:'Request must come from dsh.'})
      const value=await body(req);await saveSettings(dir,value.model);return json(res,200,{ok:true})
    }catch(error){return json(res,400,{error:error?.message||'Could not save settings.'})}}}))
    disposers.push(ctx.webServer.register({kind:'exact',path:'/dsh-image/file',handler:async(req,res)=>{try{
      if(req.method!=='GET'&&req.method!=='HEAD'){res.writeHead(405);return res.end()}
      const file=new URL(req.url,'http://localhost').searchParams.get('id')||''
      if(!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\.(png|jpg|webp)$/.test(file)){res.writeHead(404);return res.end()}
      const data=await readFile(join(dir,'images',file));res.writeHead(200,{'content-type':types[file.split('.').pop()],'cache-control':'private, max-age=31536000, immutable','x-content-type-options':'nosniff'});return res.end(req.method==='HEAD'?undefined:data)
    }catch{res.writeHead(404);res.end()}}}))
    return async()=>{for(const dispose of disposers)await dispose()}
  },'dsh-image-generation')
}
