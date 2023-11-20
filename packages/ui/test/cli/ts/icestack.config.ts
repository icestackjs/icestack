import { defineConfig } from '@icestack/ui'

export default defineConfig({
  log: false,
  base: {
    themes: {
      light: {
        selector: 'page'
      },
      dark: {
        selector: '.dark'
      }
    }
  }
})
