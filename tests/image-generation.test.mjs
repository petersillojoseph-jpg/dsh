import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdtemp, readFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { generateImage, readSettings, saveSettings, DEFAULT_MODEL } from '../image-plugin/src/generate.js'
const credentials={resolve:async name=>{assert.equal(name,'OPENROUTER_API_KEY');return {value:'test-key'}}}
const png=Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jRZkAAAAASUVORK5CYII=','base64')
test('generates with the selected model and persists the image',async()=>{const dir=await mkdtemp(join(tmpdir(),'dsh-image-test-'));try{
  assert.equal((await readSettings(dir)).model,DEFAULT_MODEL)
  const fetcher=async(url,options)=>{assert.equal(url,'https://openrouter.ai/api/v1/images');assert.equal(options.headers.authorization,'Bearer test-key');assert.equal(JSON.parse(options.body).model,DEFAULT_MODEL);return new Response(JSON.stringify({data:[{b64_json:png.toString('base64')}],usage:{cost:0.018}}))}
  const result=await generateImage({prompt:'A red ball',credentials,dir,fetcher,signal:new AbortController().signal})
  assert.match(result.file,/\.png$/);assert.equal(result.cost,'0.018');assert.deepEqual(await readFile(join(dir,'images',result.file)),png)
  await saveSettings(dir,'openai/gpt-image-2.5-flare');assert.equal((await readSettings(dir)).model,'openai/gpt-image-2.5-flare')
  await assert.rejects(saveSettings(dir,'not-an-image-model'))
}finally{await rm(dir,{recursive:true,force:true})}})
test('rejects missing credentials and invalid image data',async()=>{const dir=await mkdtemp(join(tmpdir(),'dsh-image-test-'));try{
  await assert.rejects(generateImage({prompt:'test',credentials:{resolve:async()=>null},dir}),/API key/)
  await assert.rejects(generateImage({prompt:'test',credentials,dir,fetcher:async()=>new Response(JSON.stringify({data:[{b64_json:Buffer.from('not image').toString('base64')}]}))}),/invalid image/)
}finally{await rm(dir,{recursive:true,force:true})}})
test('editing submits the selected reference image',async()=>{const dir=await mkdtemp(join(tmpdir(),'dsh-image-edit-'));try{const {mkdir,writeFile}=await import('node:fs/promises');await mkdir(join(dir,'images'));const name='12345678-1234-4234-8234-123456789abc.png';await writeFile(join(dir,'images',name),png);let sent;const fetcher=async(_url,options)=>{sent=JSON.parse(options.body);return Response.json({data:[{b64_json:png.toString('base64')}]})};await generateImage({prompt:'Make it blue',reference:name,credentials,dir,fetcher});assert.equal(sent.input_references.length,1);assert.equal(sent.input_references[0].image_url.url,'data:image/png;base64,'+png.toString('base64'));await assert.rejects(generateImage({prompt:'test',reference:'/etc/passwd',credentials,dir,fetcher}),/attach/i)}finally{await rm(dir,{recursive:true,force:true})}})
