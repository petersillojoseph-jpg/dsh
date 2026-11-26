import { randomUUID } from 'node:crypto'
import { mkdir, readFile, writeFile, realpath } from 'node:fs/promises'
import { join, resolve, sep } from 'node:path'
import { homedir } from 'node:os'
import { setTimeout as delay } from 'node:timers/promises'
export const MODEL='alibaba/wan-3.0'
export const defaults={resolution:'480p',duration:5}
export async function readSettings(dir){try{const x=JSON.parse(await readFile(join(dir,'settings.json'),'utf8'));return {resolution:['480p','720p','1080p'].includes(x.resolution)?x.resolution:defaults.resolution,duration:Number.isInteger(x.duration)&&x.duration>=2&&x.duration<=30?x.duration:defaults.duration}}catch{return {...defaults}}}
export async function saveSettings(dir,settings){if(!['480p','720p','1080p'].includes(settings.resolution)||!Number.isInteger(settings.duration)||settings.duration<2||settings.duration>30)throw Error('Choose a supported resolution and length.');await mkdir(dir,{recursive:true,mode:0o700});await writeFile(join(dir,'settings.json'),JSON.stringify(settings),{mode:0o600})}
async function referenceImage(path){
  if(typeof path!=='string'||!path.startsWith('/'))throw Error('The reference image must be an attached image path.')
  const actual=await realpath(path).catch(()=>null);if(!actual)throw Error('The reference image could not be found.')
  const roots=[join(homedir(),'.dsh','attachments'),join(homedir(),'.dsh','cache','attachments'),join(homedir(),'Applications','DeepSeek Harness Runtime','dsh-image-generation','data','images')]
  let allowed=false;for(const root of roots){const real=await realpath(root).catch(()=>null);if(real&&(actual===real||actual.startsWith(real+sep)))allowed=true}
  if(!allowed)throw Error('Attach the image to your message first, then ask to animate it.')
  const bytes=await readFile(actual);if(bytes.length>8_000_000)throw Error('The reference image is too large (maximum 8 MB).')
  let mime;if(bytes.subarray(0,3).equals(Buffer.from([0xff,0xd8,0xff])))mime='image/jpeg';else if(bytes.subarray(0,8).equals(Buffer.from([0x89,0x50,0x4e,0x47,0x0d,0x0a,0x1a,0x0a])))mime='image/png';else if(bytes.toString('ascii',0,4)==='RIFF'&&bytes.toString('ascii',8,12)==='WEBP')mime='image/webp';else throw Error('The reference image must be PNG, JPEG, or WebP.')
  return `data:${mime};base64,${bytes.toString('base64')}`
}
function safeJob(id){return typeof id==='string'&&/^[A-Za-z0-9_-]{1,200}$/.test(id)}
async function request(fetcher,url,options){let r;try{r=await fetcher(url,options)}catch(e){if(options.signal?.aborted)throw e;throw Error('Could not reach OpenRouter. The video job may still be running; check OpenRouter before retrying.')};if(!r.ok){if(r.status===401||r.status===403)throw Error('OpenRouter rejected the API key or access to Wan 3.0.');if(r.status===402)throw Error('OpenRouter reports insufficient credit for video generation.');if(r.status===429)throw Error('OpenRouter is rate-limiting video generation. Please try again later.');if(r.status===404)throw Error(options.method==='POST'?'OpenRouter reports no available endpoint for Wan 3.0. No video job was accepted; do not retry automatically.':'OpenRouter could not find the existing video job. Check OpenRouter before retrying.');const details=await r.json().catch(()=>null);const msg=typeof details?.error?.message==='string'?details.error.message.replaceAll(options.headers?.authorization?.slice(7)||'\u0000','[redacted]').slice(0,350).replace(/[\r\n]/g,' '):'';throw Error(`OpenRouter video request failed (error ${r.status})${msg?`: ${msg}`:'.'}`)}return r}
export async function generateVideo({prompt,referencePath,aspectRatio,durationSeconds,credentials,dir,signal,fetcher=fetch,pollDelay=10000}){
  if(typeof prompt!=='string'||!prompt.trim()||prompt.length>12000)throw Error('Please provide a video description up to 12,000 characters.')
  const aspect=['21:9','16:9','4:3','1:1','3:4','9:16'].includes(aspectRatio)?aspectRatio:'16:9'
  const key=(await credentials.resolve('OPENROUTER_API_KEY'))?.value;if(!key)throw Error('Add your OpenRouter API key in Settings → Models before generating videos.')
  const settings=await readSettings(dir);const resolution=settings.resolution
  const duration=Number.isInteger(durationSeconds)&&durationSeconds>=2&&durationSeconds<=30?durationSeconds:settings.duration
  const body={model:MODEL,prompt:prompt.trim(),duration,resolution,aspect_ratio:aspect}
  if(referencePath)body.frame_images=[{type:'image_url',image_url:{url:await referenceImage(referencePath)},frame_type:'first_frame'}]
  const headers={authorization:`Bearer ${key}`,'content-type':'application/json'}
  const created=await (await request(fetcher,'https://openrouter.ai/api/v1/videos',{method:'POST',headers,body:JSON.stringify(body),signal})).json()
  if(!safeJob(created.id))throw Error('OpenRouter returned an invalid video job ID. Check OpenRouter before trying again.')
  const jobId=created.id,base=`https://openrouter.ai/api/v1/videos/${encodeURIComponent(jobId)}`
  // Persist the accepted job before polling so it can be recovered without submitting again.
  const jobs=join(dir,'jobs');await mkdir(jobs,{recursive:true,mode:0o700});await writeFile(join(jobs,`${jobId}.json`),JSON.stringify({jobId,createdAt:Date.now(),model:MODEL}),{mode:0o600})
  let status=created
  for(let i=0;i<90;i++){
    if(status.status==='completed')break
    if(['failed','cancelled','expired'].includes(status.status))throw Error(`Video generation ${status.status}.`)
    await delay(pollDelay,undefined,{signal});status=await(await request(fetcher,base,{headers:{authorization:`Bearer ${key}`},signal})).json()
  }
  if(status.status!=='completed')throw Error('Video is taking longer than expected. Check OpenRouter for the existing job before trying again.')
  const response=await request(fetcher,`${base}/content?index=0`,{headers:{authorization:`Bearer ${key}`},signal})
  const length=Number(response.headers.get('content-length'));if(length>100_000_000)throw Error('The video is too large to save.')
  const bytes=Buffer.from(await response.arrayBuffer());if(bytes.length<12||bytes.length>100_000_000||bytes.toString('ascii',4,8)!=='ftyp')throw Error('OpenRouter returned an unsupported video file.')
  const file=`${randomUUID()}.mp4`;const out=join(dir,'videos');await mkdir(out,{recursive:true,mode:0o700});await writeFile(join(out,file),bytes,{mode:0o600,flag:'wx'})
  await writeFile(join(jobs,`${jobId}.json`),JSON.stringify({jobId,model:MODEL,file,status:'completed'}),{mode:0o600})
  return {file,model:MODEL,cost:Number.isFinite(status.usage?.cost)?String(status.usage.cost):'',duration,resolution}
}
