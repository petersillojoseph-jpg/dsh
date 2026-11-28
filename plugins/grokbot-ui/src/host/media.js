import { readdir, stat } from 'node:fs/promises'
import { createReadStream, existsSync } from 'node:fs'
import { join, dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { homedir } from 'node:os'
import { jsonResponse } from './http.js'
const runtime=join(homedir(),'Applications','DeepSeek Harness Runtime')
const plugins=resolve(dirname(fileURLToPath(import.meta.url)),'../../..')
const dirs=process.platform === 'darwin' && !existsSync(join(plugins,'image-generation','package.json')) ? {image:join(runtime,'dsh-image-generation','data','images'),video:join(runtime,'dsh-video-generation','data','videos'),audio:join(runtime,'dsh-speech-generation','data','audio')} : {image:join(plugins,'image-generation','data','images'),video:join(plugins,'video-generation','data','videos'),audio:join(plugins,'speech-generation','data','audio')}
const valid={image:/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\.(png|jpg|webp)$/,video:/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\.mp4$/,audio:/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\.mp3$/}
const mime={png:'image/png',jpg:'image/jpeg',webp:'image/webp',mp4:'video/mp4',mp3:'audio/mpeg'}
export async function listMedia(){
 const out=[]
 for(const type of ['image','video','audio']){
  const files=await readdir(dirs[type]).catch(e=>{if(e.code==='ENOENT')return [];throw e})
  await Promise.all(files.filter(f=>valid[type].test(f)).map(async file=>{const info=await stat(join(dirs[type],file)).catch(()=>null);if(info?.isFile())out.push({type,file,createdAt:info.birthtimeMs||info.mtimeMs})}))
 }
 return out.sort((a,b)=>b.createdAt-a.createdAt)
}
export function mediaRoutes(){return [
 {kind:'exact',path:'/grokbot/api/media/list',resource:async()=>jsonResponse({items:await listMedia()})},
 {kind:'exact',path:'/grokbot/api/media/file',handler:async(req,res)=>{try{
  if(req.method!=='GET'&&req.method!=='HEAD'){res.writeHead(405);return res.end()}
  const url=new URL(req.url,'http://localhost'),type=url.searchParams.get('type'),file=url.searchParams.get('id')||''
  if(!Object.hasOwn(dirs,type)||!valid[type].test(file)){res.writeHead(404);return res.end()}
  const path=join(dirs[type],file),info=await stat(path);if(!info.isFile()){res.writeHead(404);return res.end()};const size=info.size
  let start=0,end=size-1,status=200;const range=req.headers.range
  if(range){const m=/^bytes=(\d*)-(\d*)$/.exec(range);if(!m||(!m[1]&&!m[2])){res.writeHead(416,{'content-range':`bytes */${size}`});return res.end()};if(!m[1])start=Math.max(size-Number(m[2]),0);else {start=Number(m[1]);if(m[2])end=Math.min(Number(m[2]),size-1)}if(start>=size||start>end){res.writeHead(416,{'content-range':`bytes */${size}`});return res.end()}status=206}
  const headers={'content-type':mime[file.split('.').pop()],'content-length':String(end-start+1),'accept-ranges':'bytes','cache-control':'private, max-age=31536000, immutable','x-content-type-options':'nosniff'};if(status===206)headers['content-range']=`bytes ${start}-${end}/${size}`;res.writeHead(status,headers);if(req.method==='HEAD')return res.end();createReadStream(path,{start,end}).on('error',()=>res.destroy()).pipe(res)
 }catch{if(!res.headersSent)res.writeHead(404);res.end()}}},
]}
