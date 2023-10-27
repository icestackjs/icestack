import { expandColorsMap } from './shared'
import { CreatePresetOptions } from '@/sass/functions'

function generateDefault(typeName: string) {
  return `bg-${typeName}`
}
export const options = (opts: CreatePresetOptions) => {
  const d = {
    colors: expandColorsMap(opts.types, (cur) => {
      return {
        default: generateDefault(cur)
      }
    })
    // defaults
  }
  return d
}
