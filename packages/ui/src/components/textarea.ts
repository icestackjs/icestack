import { IDefaults, expandColorsMap } from './shared'
import { CreatePresetOptions } from '@/sass/functions'

const defaults: IDefaults = {
  styled: {
    default: 'border-base-content bg-base-100 rounded-btn border border-opacity-0',
    bordered: 'border-opacity-20',
    focus: 'outline-base-content/20 outline outline-2 outline-offset-2',
    ghost: 'bg-opacity-5',
    ghostFocus: {
      apply: 'text-base-content bg-opacity-100',
      css: {
        'box-shadow': 'none'
      }
    },
    disabled: 'border-base-200 bg-base-200 placeholder-base-content cursor-not-allowed text-opacity-20 placeholder-opacity-20'
  },
  unstyled: {
    default: 'min-h-12 flex-shrink px-4 py-2 text-sm leading-loose'
  }
}

export const options = (opts: CreatePresetOptions) => {
  return {
    colors: expandColorsMap(opts.types, (cur) => {
      return {
        default: `border-${cur}`,
        focus: `outline-${cur}`
      }
    }),
    defaults
  }
}
