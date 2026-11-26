import React from 'react'

function RecordingWaveform({ stream }) {
  const bars = React.useRef(null)
  React.useEffect(() => {
    if (!stream) return
    let audio, frame
    try {
      audio = new AudioContext()
      const source = audio.createMediaStreamSource(stream)
      const analyser = audio.createAnalyser()
      analyser.fftSize = 256
      analyser.smoothingTimeConstant = 0.7
      source.connect(analyser)
      const data = new Uint8Array(analyser.frequencyBinCount)
      const draw = () => {
        analyser.getByteFrequencyData(data)
        const nodes = bars.current?.children || []
        for (let i = 0; i < nodes.length; i++) {
          const bin = 2 + Math.floor(i * 28 / nodes.length)
          const level = Math.max(data[bin], data[bin + 1]) / 255
          nodes[i].style.transform = `scaleY(${Math.max(0.16, level)})`
        }
        frame = requestAnimationFrame(draw)
      }
      draw()
    } catch { /* The recording still works if audio visualisation is unavailable. */ }
    return () => { cancelAnimationFrame(frame); audio?.close().catch(() => {}) }
  }, [stream])
  return <span className="dsh-dictation-wave" ref={bars} aria-hidden="true">{Array.from({length: 15}, (_, i) => <span key={i} />)}</span>
}

export function GrokDictation({ inputActions, locked }) {
  const [phase, setPhase] = React.useState('idle')
  const [message, setMessage] = React.useState('')
  const [pending, setPending] = React.useState('')
  const capture = React.useRef(null)
  const mounted = React.useRef(true)
  React.useEffect(() => () => {
    mounted.current = false
    const current = capture.current
    if (current) {
      current.cancelled = true
      current.controller?.abort()
      if (current.recorder && current.recorder.state !== 'inactive') current.recorder.stop()
      current.stream?.getTracks().forEach(track => track.stop())
    }
  }, [])
  const start = async () => {
    if (!inputActions || phase !== 'idle') return
    setMessage('')
    const current = { cancelled:false, chunks:[], span:inputActions.captureInsertion(), controller:new AbortController() }
    capture.current = current
    setPhase('requesting')
    try {
      const stream = await navigator.mediaDevices.getUserMedia({audio:true})
      if (current.cancelled || !mounted.current) { stream.getTracks().forEach(track => track.stop()); return }
      current.stream = stream
      const options = MediaRecorder.isTypeSupported('audio/webm;codecs=opus') ? {mimeType:'audio/webm;codecs=opus', audioBitsPerSecond:32000} : {audioBitsPerSecond:32000}
      const recorder = new MediaRecorder(stream, options)
      current.recorder = recorder
      recorder.ondataavailable = (event) => { if (event.data.size) current.chunks.push(event.data) }
      recorder.onerror = () => { current.cancelled = true; stream.getTracks().forEach(track => track.stop()); if (mounted.current) {setMessage('Recording failed. Please try again.'); setPhase('idle')} }
      recorder.onstop = async () => {
        stream.getTracks().forEach(track => track.stop())
        if (current.cancelled || !mounted.current) return
        setPhase('transcribing')
        try {
          const blob = new Blob(current.chunks, {type:recorder.mimeType || 'audio/webm'})
          if (!blob.size) throw new Error('No audio was recorded. Please try again.')
          if (blob.size > 700000) throw new Error('Recording is too long. Please try a shorter recording.')
          const data = new Uint8Array(await blob.arrayBuffer())
          let binary = ''; for (let i=0;i<data.length;i+=16384) binary += String.fromCharCode(...data.subarray(i,i+16384))
          const response = await fetch('/grokbot/api/transcribe', {method:'POST', headers:{'content-type':'application/json','x-dsh-dictation':'1'}, body:JSON.stringify({audio:btoa(binary), type:blob.type}), signal:current.controller.signal})
          const result = await response.json().catch(() => ({}))
          if (!response.ok) throw new Error(result.error || 'Transcription failed. Please try again.')
          if (!mounted.current || current.cancelled) return
          if (!result.text?.trim()) throw new Error('No speech was recognised. Please try again.')
          if (!inputActions.insertText(result.text, current.span)) {setPending(result.text); setMessage('Your draft changed while recording. Insert the transcript when ready.')}
          else setMessage('')
          setPhase('idle')
        } catch (error) { if (mounted.current && !current.cancelled) { setMessage(error?.message || 'Transcription failed. Please try again.'); setPhase('idle') } }
      }
      recorder.start()
      current.timer = window.setTimeout(() => { if (recorder.state === 'recording') recorder.stop() }, 120000)
      setPhase('recording')
    } catch (error) { if (mounted.current && !current.cancelled) {setMessage(error?.name === 'NotAllowedError' ? 'Microphone access was denied. Check macOS microphone permissions.' : 'Microphone unavailable. Check its permissions and try again.'); setPhase('idle')} }
  }
  const stop = () => { const current=capture.current; if (!current?.recorder) return; window.clearTimeout(current.timer); if (current.recorder.state !== 'inactive') current.recorder.stop() }
  const cancel = () => {const current=capture.current; if(current){ current.cancelled=true; window.clearTimeout(current.timer);current.controller.abort();if(current.recorder?.state !== 'inactive') current.recorder?.stop();current.stream?.getTracks().forEach(track=>track.stop())}setPhase('idle');setMessage('')}
  return <span className="dsh-dictation-wrap">
    {message && <span className="dsh-dictation-message" role="status">{message}{pending && <button type="button" onClick={() => {if(inputActions.insertText(pending,inputActions.captureInsertion())) {setPending('');setMessage('')}}}>Insert</button>}</span>}
    {phase === 'recording' ? <><button type="button" className="dsh-dictation-cancel" aria-label="Cancel recording" onClick={cancel}>×</button><RecordingWaveform stream={capture.current?.stream} /><button type="button" className="dsh-apple-dictation is-recording" aria-label="Stop recording and transcribe" title="Stop recording and transcribe" onClick={stop}><span className="dsh-dictation-stop" /></button></> : phase === 'transcribing' || phase === 'requesting' ? <><span className="dsh-dictation-status" role="status">{phase === 'requesting' ? 'Starting…' : 'Transcribing…'}</span><button type="button" className="dsh-dictation-cancel" aria-label="Cancel dictation" onClick={cancel}>×</button></> : <button type="button" className="dsh-apple-dictation" disabled={locked || !inputActions} aria-label="Start dictation with Grok" title="Dictate with Grok STT (audio sent to OpenRouter)" onMouseDown={event=>event.preventDefault()} onClick={start}><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="9" y="3" width="6" height="12" rx="3"/><path d="M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v3M9 21h6"/></svg></button>}
  </span>
}
