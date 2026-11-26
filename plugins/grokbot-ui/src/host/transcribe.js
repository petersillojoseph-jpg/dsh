import { HttpError } from './store.js'

const LIMIT = 700000
/** Send only an explicitly recorded clip to the selected OpenRouter model. */
export async function transcribeAudio(ctx, body, req) {
  const origin = req.headers.origin
  const host = req.headers.host
  if (!host || !origin || origin !== `http://${host}` || req.headers['x-dsh-dictation'] !== '1') {
    throw new HttpError(403, 'Dictation requests must come from the dsh app.')
  }
  if (typeof body?.audio !== 'string' || body.audio.length > Math.ceil(LIMIT/3)*4 || !/^[A-Za-z0-9+/]*={0,2}$/.test(body.audio)) throw new HttpError(400, 'Invalid or oversized recording.')
  const audio = Buffer.from(body.audio, 'base64')
  if (!audio.length || audio.length > LIMIT || audio.toString('base64') !== body.audio) throw new HttpError(400, 'Invalid or oversized recording.')
  const mime = String(body.type || '').toLowerCase()
  const isWebm = audio.length >= 4 && audio.subarray(0,4).equals(Buffer.from([0x1a,0x45,0xdf,0xa3]))
  const isOgg = audio.length >= 4 && audio.toString('ascii',0,4) === 'OggS'
  if ((!mime.startsWith('audio/webm') || !isWebm) && (!mime.startsWith('audio/ogg') || !isOgg)) throw new HttpError(400, 'Unsupported recording format.')
  const key = (await ctx.credentials.resolve('OPENROUTER_API_KEY'))?.value
  if (!key) throw new HttpError(400, 'Add your OpenRouter API key in Settings → Models before using dictation.')
  const form = new FormData()
  form.append('model', 'x-ai/grok-stt-2.0')
  form.append('file', new Blob([audio], {type:isWebm ? 'audio/webm' : 'audio/ogg'}), isWebm ? 'dictation.webm' : 'dictation.ogg')
  let response
  try {
    response = await fetch('https://openrouter.ai/api/v1/audio/transcriptions', {method:'POST', headers:{Authorization:`Bearer ${key}`}, body:form, signal:AbortSignal.timeout(90000)})
  } catch { throw new HttpError(400, 'Could not reach OpenRouter. Check your internet connection and try again.') }
  if (!response.ok) {
    if (response.status === 401 || response.status === 403) throw new HttpError(400, 'OpenRouter rejected the API key or access to this model. Check Settings → Models.')
    if (response.status === 402) throw new HttpError(400, 'OpenRouter reports insufficient credit for dictation.')
    if (response.status === 429) throw new HttpError(400, 'OpenRouter is rate-limiting dictation. Please try again shortly.')
    throw new HttpError(400, `OpenRouter could not transcribe this recording (error ${response.status}).`)
  }
  const result = await response.json().catch(() => null)
  if (typeof result?.text !== 'string') throw new HttpError(400, 'OpenRouter returned an unexpected transcription response.')
  return {text:result.text}
}
