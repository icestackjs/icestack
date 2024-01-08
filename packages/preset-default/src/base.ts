import type { BaseOptions } from '@icestack/types'
import { generateColors, presetPrimaryColors, gray } from '@icestack/theme-algorithm'

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

export const base: Partial<BaseOptions> = {
  themes: {
    light: {
      selector: ':root',
      extraColors: sharedExtraColors.light,
      extraVars: sharedExtraVars,
      types: {
        primary: generateColors('primary', presetPrimaryColors.blue),
        success: generateColors('success', presetPrimaryColors.green),
        warning: generateColors('warning', presetPrimaryColors.gold),
        error: generateColors('error', presetPrimaryColors.red),
        neutral: generateColors('neutral', presetPrimaryColors.grey),
        // add secondary accent info like daisyui
        secondary: generateColors('secondary', presetPrimaryColors.magenta),
        accent: generateColors('accent', presetPrimaryColors.cyan),
        info: generateColors('info', presetPrimaryColors.geekblue)
        // default: generateColors('default', presetPrimaryColors.grey)
      }
    },
    dark: {
      selector: '[data-mode="dark"]',
      extraColors: sharedExtraColors.dark,
      extraVars: sharedExtraVars,
      types: {
        primary: generateColors('primary', presetPrimaryColors.blue, true),
        success: generateColors('success', presetPrimaryColors.green, true),
        warning: generateColors('warning', presetPrimaryColors.gold, true),
        error: generateColors('error', presetPrimaryColors.red, true),
        neutral: generateColors('neutral', presetPrimaryColors.grey, true),
        // add secondary accent info like daisyui
        secondary: generateColors('secondary', presetPrimaryColors.magenta, true),
        accent: generateColors('accent', presetPrimaryColors.cyan, true),
        info: generateColors('info', presetPrimaryColors.geekblue, true)

        // default: generateColors('default', presetPrimaryColors.grey, true)
      }
    }
  }
}
