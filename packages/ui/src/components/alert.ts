import { expandColorsMap, IDefaults } from './shared'
import { CreatePresetOptions } from '@/sass/functions'

const defaults: IDefaults = {
  styled: {
    default: 'rounded-box border p-4 text-base-content border-base-200'
  },
  unstyled: {
    default:
      'grid w-full grid-flow-row content-start items-center justify-items-center gap-4 text-center sm:grid-flow-col sm:grid-cols-[auto_minmax(auto,1fr)] sm:justify-items-start sm:text-left'
  }
}

export const options = (opts: CreatePresetOptions) => {
  return {
    colors: expandColorsMap(opts.types, (typeName) => {
      return {
        default: `text-${typeName}-content border-${typeName}/20 bg-${typeName}`
      }
    }),
    defaults
  }
}
