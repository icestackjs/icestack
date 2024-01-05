import { generate } from '@ant-design/colors'

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

interface ColorGenerateOptions {
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

// https://github.com/ant-design/ant-design/blob/5393d9ce36821e64590d3f0d07daa0d393a4c299/.dumi/theme/common/Color/ColorStyle.tsx#L13
export const sharedExtraColors = {
  light: {
    'base-100': '#ffffff',
    'base-200': '#f2f2f2',
    'base-300': '#e5e6e6',
    'base-content': '#1f2937',
    ...Object.values(gray).reduce<Record<string, string>>((acc, value, idx) => {
      acc[`ant-neutral-${idx + 1}00`] = value
      return acc
    }, {})
  },
  dark: {
    'base-100': '#1d232a',
    'base-200': '#191e24',
    'base-300': '#15191e',
    'base-content': '#697280',
    ...Object.values(gray).reduce<Record<string, string>>((acc, value, idx) => {
      acc[`ant-neutral-${13 - idx}00`] = value
      return acc
    }, {})
  }
}

export const sharedExtraVars = {
  'rounded-box': '1rem',
  'rounded-btn': '0.5rem',
  'rounded-badge': '1.9rem',
  'animation-btn': '0.25s',
  'animation-input': '0.2s',
  'skeleton-duration': '1.2s',
  'border-btn': '1px',
  'tab-border': '1px',
  'tab-radius': '0.5rem'
}
