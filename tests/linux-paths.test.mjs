import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
test('media library and video references use the sibling image plugin on Linux', async () => {
  for (const file of ['plugins/grokbot-ui/src/host/media.js', 'plugins/video-generation/src/generate.js']) {
    const source = await readFile(new URL('../' + file, import.meta.url), 'utf8')
    assert.match(source, /process\.platform\s*===\s*['"]darwin['"]/)
    assert.match(source, /image-generation/)
  }
})
