import { IDefaults, expandColorsMap } from './shared'
import { CreatePresetOptions } from '@/sass/functions'

function generateDefault(typeName: string) {
  return `text-${typeName} [@media(hover:hover)]:hover:text-${typeName}-active`
}

const defaults: IDefaults = {
  styled: {
    focus: 'outline-none',
    focusVisible: {
      css: {
        outline: '2px solid currentColor',
        'outline-offset': '2px'
      }
    }
  }
}
export const options = (opts: CreatePresetOptions) => {
  const d = {
    colors: expandColorsMap(opts.types, (cur) => {
      return {
        default: generateDefault(cur)
      }
    }),
    defaults
  }
  return d
}
