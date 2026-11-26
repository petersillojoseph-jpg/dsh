import { randomUUID } from 'node:crypto'
import { mkdir, readFile, writeFile, realpath } from 'node:fs/promises'
import { join, sep } from 'node:path'
import { homedir } from 'node:os'

export const MODELS = {
  'bytedance-seed/seedream-5-0-flash': 'Seedream 5.0 Flash',
  'openai/gpt-image-2.5-flare': 'GPT Image 2.5 Flare',
  'google/gemini-3.1-flash-image': 'Nano Banana 2',
}
export const DEFAULT_MODEL = 'bytedance-seed/seedream-5-0-flash'
export async function readSettings(dir) {
  try { const data = JSON.parse(await readFile(join(dir,'settings.json'),'utf8')); return {model: Object.hasOwn(MODELS,data.model) ? data.model : DEFAULT_MODEL} }
  catch { return {model:DEFAULT_MODEL} }
}
export async function saveSettings(dir, model) {
  if (!Object.hasOwn(MODELS,model)) throw new Error('Please select an available image model.')
  await mkdir(dir,{recursive:true,mode:0o700})
  await writeFile(join(dir,'settings.json'),JSON.stringify({model}),{mode:0o600})
}
function imageType(buffer) {
  if (buffer.length>=8 && buffer.subarray(0,8).equals(Buffer.from([0x89,0x50,0x4e,0x47,0x0d,0x0a,0x1a,0x0a]))) return 'png'
  if (buffer.length>=3 && buffer[0]===0xff && buffer[1]===0xd8 && buffer[2]===0xff) return 'jpg'
  if (buffer.length>=12 && buffer.toString('ascii',0,4)==='RIFF' && buffer.toString('ascii',8,12)==='WEBP') return 'webp'
  return null
}
export async function referenceData(reference, dir) {
  if(typeof reference !== 'string' || !reference.trim()) throw new Error('Attach an image to your message and say how you want it edited.')
  let path=reference
  if (/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\.(png|jpg|webp)$/.test(reference)) path=join(dir,'images',reference)
  if(!path.startsWith('/')) throw new Error('Attach an image to your message first.')
  const actual=await realpath(path).catch(()=>null)
  if(!actual) throw new Error('The reference image could not be found. Please attach it again.')
  const roots=[join(homedir(),'.dsh','attachments'),join(homedir(),'.dsh','cache','attachments'),join(dir,'images')]
  let allowed=false
  for(const root of roots){const real=await realpath(root).catch(()=>null);if(real && actual.startsWith(real+sep)) allowed=true}
  if(!allowed) throw new Error('Please attach the image to your message before editing it.')
  const bytes=await readFile(actual)
  if(bytes.length>8_000_000)throw new Error('The reference image is too large (maximum 8 MB).')
  const ext=imageType(bytes);if(!ext)throw new Error('The reference must be a PNG, JPEG, or WebP image.')
  return `data:${ext==='jpg'?'image/jpeg':`image/${ext}`};base64,${bytes.toString('base64')}`
}
export async function generateImage({prompt, reference, credentials, dir, signal, fetcher=fetch}) {
  if (typeof prompt!=='string' || !prompt.trim() || prompt.length>12000) throw new Error('Image description must be between 1 and 12,000 characters.')
  const key=(await credentials.resolve('OPENROUTER_API_KEY'))?.value
  if (!key) throw new Error('Add your OpenRouter API key in Settings → Models before generating images.')
  const {model}=await readSettings(dir)
  const payload={model,prompt:prompt.trim(),n:1}
  if(reference) payload.input_references=[{type:'image_url',image_url:{url:await referenceData(reference,dir)}}]
  let response
  try { response=await fetcher('https://openrouter.ai/api/v1/images',{method:'POST',headers:{authorization:`Bearer ${key}`,'content-type':'application/json'},body:JSON.stringify(payload),signal}) }
  catch (error) { if (signal?.aborted) throw error; throw new Error('Could not reach OpenRouter. Check your internet connection and try again.') }
  if (!response.ok) {
    if(response.status===401||response.status===403) throw new Error('OpenRouter rejected the API key or access to the image model.')
    if(response.status===402) throw new Error('OpenRouter reports insufficient credit to generate an image.')
    if(response.status===429) throw new Error('OpenRouter is rate-limiting image generation. Try again shortly.')
    throw new Error(`OpenRouter could not generate the image (error ${response.status}).`)
  }
  const result=await response.json()
  const data=result?.data?.[0]?.b64_json
  if (typeof data!=='string' || data.length>28_000_000 || !/^[A-Za-z0-9+/]*={0,2}$/.test(data)) throw new Error('OpenRouter returned an unsupported image response.')
  const bytes=Buffer.from(data,'base64'); const ext=imageType(bytes)
  if (!ext || bytes.length>20_000_000 || bytes.toString('base64')!==data) throw new Error('OpenRouter returned an invalid image.')
  const file=`${randomUUID()}.${ext}`
  const imageDir=join(dir,'images');await mkdir(imageDir,{recursive:true,mode:0o700});await writeFile(join(imageDir,file),bytes,{mode:0o600,flag:'wx'})
  const cost=Number.isFinite(result?.usage?.cost) && result.usage.cost>=0 ? result.usage.cost.toString() : ''
  return {file,model,modelName:MODELS[model],cost}
}
