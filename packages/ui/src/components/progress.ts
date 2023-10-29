import { OptionFn, expandColorsMap } from './shared'

function generateDefault(typeName: string) {
  return `bg-${typeName}`
}
export const options: OptionFn = (opts) => {
  return {
    selector: '.progress',
    colors: expandColorsMap(opts.types, (cur) => {
      return {
        default: generateDefault(cur)
      }
    }),
    defaults: {
      base: {
        default: {
          apply: 'relative w-full appearance-none overflow-hidden'
        }
      }
    }
  }
}
