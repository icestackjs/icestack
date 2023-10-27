import { IDefaults, expandColorsMap } from './shared'
import { CreatePresetOptions } from '@/sass/functions'

const defaults: IDefaults = {
  styled: {}
}

export const options = (opts: CreatePresetOptions) => {
  const d = {
    colors: expandColorsMap(opts.types, (cur) => {
      return {
        default: {
          css: {
            '--range-shdw': `var(--${cur})`
          }
        }
      }
    }),
    defaults
  }
  return d
}
