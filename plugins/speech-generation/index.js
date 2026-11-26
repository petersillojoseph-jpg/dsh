import { defineTool } from '@deepseek-ai/dsh-tools'
import { dirname,join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { generateSpeech } from './src/generate.js'
const dir=join(dirname(fileURLToPath(import.meta.url)),'data')
export const inject=['tools','credentials']
export function apply(ctx){
 const tool=defineTool({name:'generate_speech',description:'Generate an audio recording using Fish Audio Drama 3 through OpenRouter when the user asks for speech, narration, an audio recording or spoken dialogue. The result is playable and downloadable in chat. Use the exact words the user wants spoken, preserving the language and accents. If they request an accent, speed, emotion or delivery style, put a concise natural-language instruction in square brackets before the words; never silently translate. For multi-speaker dialogue retain speaker cues. If the words to speak are unclear, ask. The text is sent to OpenRouter and Fish Audio and incurs a charge. Do not automatically retry a failed request.',parameters:{text:{type:'string',required:true,description:'Exact text to be spoken, optionally prefixed with a brief bracketed delivery or accent direction. Preserve English and Spanish words exactly.'}},timeoutMs:180000,output:{schema:{type:'object',additionalProperties:false,properties:{file:{type:'string',required:true},model:{type:'string',required:true}}},render:()=>[{type:'text',text:'The audio is ready and already appears in the chat with playback and Save. Tell the user it is ready. Do not search for files or run other tools to display it.'}],presentationMeta:(_args,value)=>value},execute:(args,exec)=>generateSpeech({text:args.text,credentials:ctx.credentials,dir,signal:exec.signal})})
 ctx.effect(()=>ctx.tools.register(tool),'dsh-speech-generation')
}
