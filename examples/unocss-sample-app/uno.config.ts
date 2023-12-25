// uno.config.ts
import path from 'node:path'
import { defineConfig, presetUno } from 'unocss'
import { icestackPreset } from '@icestack/unocss'
export default defineConfig({
  presets: [
    icestackPreset({
      loadConfig: true,
      loadDirectory: path.resolve(__dirname, 'my-ui')
    }),
    presetUno()
  ]
  // ...UnoCSS options
})
