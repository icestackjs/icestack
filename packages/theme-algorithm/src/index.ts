import { generate } from '@ant-design/colors'
import { TinyColor } from '@ctrl/tinycolor'
export { generate, presetPrimaryColors } from '@ant-design/colors'

export function makeRgbaValue(key: string, slash: boolean = true) {
  return slash ? `rgba(var(${key}) / <alpha-value>)` : `rgba(var(${key}),<alpha-value>)`
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

export interface ColorGenerateOptions {
  theme?: 'dark' | 'default'
  backgroundColor?: string
}
// type GenerateOptions = Parameters<typeof generate>[1]
export function generateColors(key: string, color: string, dark?: boolean): Record<string, string>
export function generateColors(key: string, color: string, opts: true | ColorGenerateOptions): Record<string, string>
export function generateColors(key: string, color: string, opt?: any) {
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
    [`${key}-content`]: gray[1] //  typeof opts === 'object' && opts.theme === 'dark' ? gray[13] : gray[1]
  }
}

export const composeVarsObject = (colorsMap: Record<string, string>, shareVars: Record<string, string>, slash: boolean = true) => {
  return Object.entries({
    ...colorsMap,
    ...shareVars
  }).reduce<Record<string, string>>((acc, [key, value]) => {
    const k = '--' + key
    const color = new TinyColor(value)
    let str = value
    if (color.isValid) {
      if (slash) {
        str = color.a < 1 && color.a > 0 ? `${color.r} ${color.g} ${color.b} / ${color.a}` : `${color.r} ${color.g} ${color.b}`
      } else {
        str = color.a < 1 && color.a > 0 ? `${color.r},${color.g},${color.b},${color.a}` : `${color.r},${color.g},${color.b}`
      }
    }
    acc[k] = str
    return acc
  }, {})
}

export { TinyColor } from '@ctrl/tinycolor'
