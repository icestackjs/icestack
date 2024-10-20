import { defineConfig } from '@icestack/ui'

export default defineConfig({
  mode: 'none',
  outdir: './my-ui',
  base: {
    themes: {
      light: false,
      dark: false,
    },
  },
  clean: true,
})
