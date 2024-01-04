// uno.config.ts
import path from 'node:path'
import { defineConfig, presetUno } from 'unocss'
import { icestackPreset } from '@icestack/unocss'

export default defineConfig({
  presets: [
    icestackPreset({
      loadDirectory: path.resolve(__dirname, 'my-ui'),
      loadConfig: true
    }),
    presetUno()
  ]
  // ...UnoCSS options
})
