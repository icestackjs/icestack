import type { CodegenOptions } from './types'

export function makeRgbaValue(key: string) {
  return `rgba(var(${key}) / <alpha-value>)`
}

export function getColors(options: CodegenOptions) {
  const { base, varPrefix: varPrefixOptions } = options
  const { varPrefix } = varPrefixOptions
  return {
    transparent: 'transparent',
    current: 'currentColor',
    ...Object.values(base.types).reduce<Record<string, string>>((acc, cur) => {
      const set = Object.values(cur).reduce<Set<string>>((acc, cur) => {
        for (const x of Object.keys(cur)) {
          acc.add(x)
        }
        return acc
      }, new Set())

      for (const x of set) {
        const key = varPrefix + x
        acc[x] = makeRgbaValue(key)
      }
      return acc
    }, {}),
    ...Object.values(base.extraColors).reduce<Record<string, string>>((acc, cur) => {
      for (const x of Object.keys(cur)) {
        const key = varPrefix + x
        acc[x] = makeRgbaValue(key)
      }
      return acc
    }, {})
  }
}
