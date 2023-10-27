import { IDefaults, expandColorsMap } from './shared'
import { CreatePresetOptions } from '@/sass/functions'

function generateDefault(typeName: string) {
  return `border-${typeName}`
}

function generateFocus(typeName: string) {
  return `outline-${typeName}`
}

const defaults: IDefaults = {
  styled: {
    default: 'border-base-content bg-base-100 rounded-btn border border-opacity-0 text-base',
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
  }
}
export const options = (opts: CreatePresetOptions) => {
  const d = {
    colors: expandColorsMap(opts.types, (cur) => {
      return {
        default: generateDefault(cur),
        focus: generateFocus(cur)
      }
    }),
    defaults
  }
  return d
}
