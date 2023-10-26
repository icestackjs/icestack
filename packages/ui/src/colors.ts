// import base from '../assets/js/base/index.js'
// import { defaultVarPrefix } from './constants'
import { CodegenOptions } from './types.js'

// function isRgba(colorString: string) {
//   return typeof colorString === 'string' && colorString.includes('/')
// }

// export const colors = {
//   transparent: 'transparent',
//   current: 'currentColor',
//   ...Object.entries(base[':root']).reduce<Record<string, string>>((acc, [key, value]) => {
//     // remove -- var prefix
//     // "ice-"
//     const varName = key.slice(defaultVarPrefix.length)
//     acc[varName] = isRgba(value) ? `rgba(var(${key}))` : `rgba(var(${key}) / <alpha-value>)`

//     return acc
//   }, {})
// }

export function getColors(options: CodegenOptions) {
  return {
    transparent: 'transparent',
    current: 'currentColor',
    ...Object.values(options.base.types).reduce<Record<string, string>>((acc, cur) => {
      const set = Object.values(cur).reduce<Set<string>>((acc, cur) => {
        for (const x of Object.keys(cur)) {
          acc.add(x)
        }
        return acc
      }, new Set())

      for (const x of set) {
        const key = options.varPrefix + x // x.slice(options.varPrefix.length)
        acc[x] = `rgba(var(${key}) / <alpha-value>)`
      }
      return acc
    }, {}),
    ...Object.values(options.base.extraColors).reduce<Record<string, string>>((acc, cur) => {
      for (const x of Object.keys(cur)) {
        const key = options.varPrefix + x // x.slice(options.varPrefix.length)
        acc[x] = `rgba(var(${key}) / <alpha-value>)`
      }
      return acc
    }, {})
  }
}
