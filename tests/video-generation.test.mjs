import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdtemp, readFile, rm } from 'node:fs/promises'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { generateVideo, readSettings, saveSettings } from '../video-plugin/src/generate.js'
const credential={resolve:async name=>{assert.equal(name,'OPENROUTER_API_KEY');return {value:'test-key'}}}
test('submits one job, polls and saves a completed video',async()=>{const dir=await mkdtemp(join(tmpdir(),'dsh-video-'));try{let calls=[];const bytes=Buffer.concat([Buffer.from([0,0,0,24]),Buffer.from('ftypisom'),Buffer.alloc(30)])
const fetcher=async(url,opt)=>{calls.push(url);assert.equal(opt.headers.authorization,'Bearer test-key');if(calls.length===1){const data=JSON.parse(opt.body);assert.equal(data.model,'alibaba/wan-3.0');assert.equal(data.duration,5);assert.equal(data.resolution,'480p');return Response.json({id:'job-test',status:'pending'},{status:202})}if(calls.length===2)return Response.json({status:'completed',usage:{cost:0.25}});return new Response(bytes,{headers:{'content-type':'video/mp4'}})}
const result=await generateVideo({prompt:'A waving hand',credentials:credential,dir,fetcher,pollDelay:1,signal:new AbortController().signal});assert.equal(calls.length,3);assert.equal(result.cost,'0.25');assert.deepEqual(await readFile(join(dir,'videos',result.file)),bytes);assert.equal(JSON.parse(await readFile(join(dir,'jobs','job-test.json'),'utf8')).status,'completed');assert.deepEqual(await readSettings(dir),{duration:5,resolution:'480p'});await saveSettings(dir,{resolution:'720p',duration:10});assert.equal((await readSettings(dir)).duration,10);await assert.rejects(saveSettings(dir,{resolution:'4K',duration:5}))
}finally{await rm(dir,{recursive:true,force:true})}})
test('never downloads or retries a failed job',async()=>{const dir=await mkdtemp(join(tmpdir(),'dsh-video-'));try{let n=0;const fetcher=async()=>{n++;return n===1?Response.json({id:'abc',status:'pending'}):Response.json({status:'failed'})};await assert.rejects(generateVideo({prompt:'test',credentials:credential,dir,fetcher,pollDelay:1,signal:new AbortController().signal}),/failed/);assert.equal(n,2)}finally{await rm(dir,{recursive:true,force:true})}})
test('rejects invalid or absent credentials before submission',async()=>{await assert.rejects(generateVideo({prompt:'test',credentials:{resolve:async()=>null},dir:tmpdir()}),/API key/)})
