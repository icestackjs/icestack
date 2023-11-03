import type { CodegenOptions, DeepPartial } from './types'

// @ts-ignore
export const miniprogramPreset: () => DeepPartial<CodegenOptions> = () => {
  return {
    global: {
      atMedia: {
        hover: false
      },
      selector: {
        universal: 'view'
      },
      pseudo: {}
    },
    components: {
      button: {
        extra: {
          '.btn::after': {
            css: {
              border: 'none'
            }
          }
        }
      }
    },
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
  }
}
