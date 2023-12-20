import { generate } from '@ant-design/colors'
import type { CodegenOptions } from './types'
export { generate, presetPrimaryColors } from '@ant-design/colors'

export function makeRgbaValue(key: string) {
  return `rgba(var(${key}) / <alpha-value>)`
}

export const gray: { [key: number]: string } = {
  1: '#ffffff',
  2: '#fafafa',
  3: '#f5f5f5',
  4: '#f0f0f0',
  5: '#d9d9d9',
  6: '#bfbfbf',
  7: '#8c8c8c',
  8: '#595959',
  9: '#434343',
  10: '#262626',
  11: '#1f1f1f',
  12: '#141414',
  13: '#000000'
}

export function generateColorVars(key: string, color: string, dark?: boolean) {
  const colors = generate(
    color,
    dark
      ? {
          theme: 'dark',
          backgroundColor: '#141414'
        }
      : undefined
  )
  return {
    [key]: colors[5],
    [`${key}-hover`]: colors[4],
    [`${key}-active`]: colors[6],
    [`${key}-content`]: gray[1]
  }
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
