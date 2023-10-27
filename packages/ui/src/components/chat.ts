import { IDefaults, expandColorsMap } from './shared'
import { CreatePresetOptions } from '@/sass/functions'

const defaults: IDefaults = {
  styled: {
    default: {
      apply: 'bg-neutral text-neutral-content rounded-box',
      css: {
        'min-height': '2.75rem',
        'min-width': '2.75rem'
      }
    }
  }
}
export const options = (opts: CreatePresetOptions) => {
  const d = {
    colors: expandColorsMap(opts.types, (t) => {
      return {
        default: `bg-${t} text-${t}-content`
      }
    }),
    defaults
  }
  return d
}
