import { defineConfig } from '@icestack/ui'
import { getCodegenDefaults } from '@icestack/ui/defaults'
import { miniprogramPreset } from '@icestack/ui/tailwindcss'

export default defineConfig({
  ...getCodegenDefaults(),
  outdir: './my-ui',
  presets: [miniprogramPreset()]
})
