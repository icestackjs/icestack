import { OptionFn, expandColorsMap } from './shared'

function generateDefault(typeName: string) {
  return `bg-${typeName}`
}
export const options: OptionFn = (opts) => {
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
