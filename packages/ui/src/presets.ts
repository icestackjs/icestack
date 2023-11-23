import type { CodegenOptions, DeepPartial } from './types'
import { components } from '@/components/mp'

export const miniprogramPreset: () => DeepPartial<CodegenOptions> = () => {
  return {
    global: {
      atMedia: {
        hover: false
      },
      selector: {
        universal: 'view', // ['view', 'text']
        root: 'page'
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
