// uno.config.ts
import path from 'node:path'
import { icestackPreset } from '@icestack/unocss'
import { defineConfig, presetUno } from 'unocss'

export default defineConfig({
  presets: [
    icestackPreset({
      loadDirectory: path.resolve(__dirname, 'my-ui'),
      loadConfig: true,
    }),
    presetUno(),
  ],
  // ...UnoCSS options
})
