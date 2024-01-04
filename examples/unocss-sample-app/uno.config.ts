// uno.config.ts
import path from 'node:path'
import { defineConfig, presetUno } from 'unocss'
import { icestackPreset } from '@icestack/unocss'

// const replacePrefix = (css: string) => css.replaceAll('--tw-', '--un-')

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
