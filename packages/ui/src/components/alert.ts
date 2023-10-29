// import defu from 'defu'
import { expandColorsMap, IDefaults, IOptionReturnType } from './shared'
import { CreatePresetOptions } from '@/sass/functions'
const defaults: IDefaults = {
  styled: {
    default: {
      apply: 'rounded-box border p-4 text-base-content border-base-200'
    }
  },
  base: {
    default: {
      apply:
        'grid w-full grid-flow-row content-start items-center justify-items-center gap-4 text-center sm:grid-flow-col sm:grid-cols-[auto_minmax(auto,1fr)] sm:justify-items-start sm:text-left'.split(
          ' '
        )
    }
  }
}

export const options: (opts: CreatePresetOptions) => IOptionReturnType = (opts) => {
  const d = {
    selector: '.alert',
    colors: expandColorsMap(opts.types, (typeName) => {
      return {
        default: {
          apply: `text-${typeName}-content border-${typeName}/20 bg-${typeName}`
        }
      }
    }),
    defaults
    // index: defu(defaults.base, defaults.styled)
  }
  return d
}
