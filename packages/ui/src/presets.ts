import type { CodegenOptions, DeepPartial } from './types'
import { expandTypes, transformCss2Js } from '@/components/shared'

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
      // checkbox: {
      //   schema: (opts) => {
      //     const { selector, types } = opts
      //     return {
      //       selector,
      //       defaults: {
      //         base: {},
      //         styled: {},
      //         utils: {}
      //       }
      //     }
      //   }
      // }
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
