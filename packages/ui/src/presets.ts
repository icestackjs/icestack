import type { CodegenOptions, DeepPartial } from './types'

// @ts-ignore
export const miniprogramPreset: () => DeepPartial<CodegenOptions> = () => {
  return {
    global: {
      atMedia: {
        hover: false
      },
      selector: {
        universal: 'view' // ['view', 'text']
      },
      pseudo: {}
    },
    components: {
      table: false,
      button: {
        extra: {
          '.btn::after': {
            css: {
              border: 'none'
            }
          },
          '.btn': {
            css: {
              'border-style': 'solid'
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
