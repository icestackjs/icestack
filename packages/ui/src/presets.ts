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
      }
    },
    components: {
      button: {
        append: [
          {
            '.btn::after': {
              border: 'none'
            }
          }
        ]
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
