import type { CodegenOptions, DeepPartial } from './types'
import { components } from '@/components/mp'
// import { expandTypes, transformCss2Js } from '@/components/shared'

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
    components,
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
