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
type GenerateOptions = Parameters<typeof generate>[1]
export function generateColorVars(key: string, color: string, dark?: boolean): Record<string, string>
export function generateColorVars(key: string, color: string, opts: GenerateOptions): Record<string, string>
export function generateColorVars(key: string, color: string, opt?: any) {
  let opts = opt
  if (opts === true) {
    opts = {
      theme: 'dark',
      backgroundColor: '#141414'
    }
  }

  const colors = generate(color, opts)
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
    ...Object.values(base.themes).reduce<Record<string, string>>((acc, { extraColors, types }) => {
      if (types) {
        const values = Object.values(types)

        for (const x of values) {
          if (typeof x === 'object') {
            for (const y of Object.keys(x)) {
              const key = varPrefix + y
              acc[y] = makeRgbaValue(key)
            }
          }
        }
      }
      if (extraColors) {
        for (const x of Object.keys(extraColors)) {
          const key = varPrefix + x
          acc[x] = makeRgbaValue(key)
        }
      }

      return acc
    }, {})
  }
}
