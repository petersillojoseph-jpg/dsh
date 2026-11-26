import test from 'node:test'
import assert from 'node:assert/strict'
import { transcribeAudio } from '../plugin/package/src/host/transcribe.js'
const req = { headers: { host: 'localhost:1234', origin: 'http://localhost:1234', 'x-dsh-dictation': '1' } }
const body = {audio: Buffer.from([0x1a, 0x45, 0xdf, 0xa3, 0]).toString('base64'), type:'audio/webm'}
const ctx = {credentials:{resolve:async name => { assert.equal(name, 'OPENROUTER_API_KEY'); return {value:'test-key'} }}}
test('sends recording and model to OpenRouter and returns text', async () => {
  const old = globalThis.fetch
  globalThis.fetch = async (url, options) => {
    assert.equal(url, 'https://openrouter.ai/api/v1/audio/transcriptions')
    assert.equal(options.body.get('model'), 'x-ai/grok-stt-2.0')
    assert.equal(options.body.get('file').type, 'audio/webm')
    assert.equal(options.headers.Authorization, 'Bearer test-key')
    return new Response(JSON.stringify({text:'Hola'}), {status:200})
  }
  try { assert.deepEqual(await transcribeAudio(ctx, body, req), {text:'Hola'}) } finally { globalThis.fetch = old }
})
test('rejects requests from other origins and invalid audio', async () => {
  await assert.rejects(transcribeAudio(ctx, body, {headers:{...req.headers, origin:'http://example.com'}}), /dsh app/)
  await assert.rejects(transcribeAudio(ctx, {...body, audio:'invalid'}, req), /recording/)
  await assert.rejects(transcribeAudio(ctx, {...body, audio:Buffer.from('fake').toString('base64')}, req), /format/)
})
test('reports a missing key without contacting OpenRouter', async () => {
  await assert.rejects(transcribeAudio({credentials:{resolve:async()=>null}}, body, req), /OpenRouter API key/)
})
