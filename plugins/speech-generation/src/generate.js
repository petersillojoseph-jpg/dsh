import { randomUUID } from 'node:crypto'
import { mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
export async function generateSpeech({text,credentials,dir,signal,fetcher=fetch}) {
 if(typeof text!=='string'||!text.trim()||Buffer.byteLength(text,'utf8')>30000)throw Error('Speech text must be between 1 and 30,000 bytes. For longer recordings, split the text into sections.')
 const key=(await credentials.resolve('OPENROUTER_API_KEY'))?.value
 if(!key)throw Error('Add your OpenRouter API key in Settings → Models before generating speech.')
 let response
 try{response=await fetcher('https://openrouter.ai/api/v1/audio/speech',{method:'POST',headers:{authorization:`Bearer ${key}`,'content-type':'application/json'},body:JSON.stringify({model:'fish-audio/drama-3',input:text.trim(),response_format:'mp3'}),signal})}catch(e){if(signal?.aborted)throw e;throw Error('Could not reach OpenRouter. Check your internet connection and try again.')}
 if(!response.ok){if(response.status===402)throw Error('OpenRouter reports insufficient credit to generate speech.');if(response.status===401||response.status===403)throw Error('OpenRouter rejected access to the speech model or API key.');if(response.status===429)throw Error('OpenRouter is rate-limiting speech generation. Try again shortly.');const detail=await response.text().catch(()=>'');let message='';try{message=JSON.parse(detail)?.error?.message||''}catch{};throw Error(`OpenRouter could not generate speech (error ${response.status})${message?': '+message.slice(0,250):'.'}`)}
 const type=response.headers.get('content-type')||'';if(type.includes('json')||type.includes('text/'))throw Error('OpenRouter returned an unexpected response instead of audio.')
 const bytes=Buffer.from(await response.arrayBuffer());if(bytes.length<16||bytes.length>50_000_000||!(bytes.subarray(0,3).toString()==='ID3'||(bytes[0]===0xff&&(bytes[1]&0xe0)===0xe0)))throw Error('OpenRouter returned invalid MP3 audio.')
 const file=`${randomUUID()}.mp3`;await mkdir(join(dir,'audio'),{recursive:true,mode:0o700});await writeFile(join(dir,'audio',file),bytes,{mode:0o600,flag:'wx'});return {file,model:'fish-audio/drama-3'}
}
