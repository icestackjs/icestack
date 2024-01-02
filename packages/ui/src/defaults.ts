import type { Config } from 'tailwindcss'
import { components as defaultComponents } from '@icestack/preset-default/components'
import { defaultVarPrefix } from '@/constants'
import { presetPrimaryColors, generateColors, sharedExtraColors, sharedExtraVars } from '@/base/colors'
import type { CodegenOptions, CodegenMode, BaseOptions, ComponentsOptions, ComponentsValue } from '@/types'

export function getDefaultBase(mode?: CodegenMode) {
  const base: {
    themes: {
      light?: object
      dark?: object
    }
  } & Partial<BaseOptions> = {
    themes: {},
    themeSelectorTemplate: (theme: string) => {
      return `[data-mode="${theme}"]`
    },
    generateColors,
    mediaDarkTheme: false // 'dark'
  }

  if (mode !== 'none') {
    base.themes = {
      light: {
        selector: ':root',
        extraColors: sharedExtraColors.light,
        extraVars: sharedExtraVars,
        types: {
          primary: generateColors('primary', presetPrimaryColors.blue),
          success: generateColors('success', presetPrimaryColors.green),
          warning: generateColors('warning', presetPrimaryColors.gold),
          error: generateColors('error', presetPrimaryColors.red),
          neutral: generateColors('neutral', presetPrimaryColors.grey)
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
          neutral: generateColors('neutral', presetPrimaryColors.grey, true)
        }
      }
    }
  }

  return base as Partial<BaseOptions>
}

export function injectSchema(map: ComponentsOptions, options?: CodegenOptions) {
  const { components, mode: globalMode } = options ?? {}
  if (globalMode === 'none') {
    return Object.entries(map).reduce<ComponentsOptions>((acc, [key, opts]) => {
      const innerPreset = components && components[key] && (components[key] as Partial<ComponentsValue<Record<string, any>>>).mode === 'preset'
      if (innerPreset) {
        acc[key] = opts
      }
      return acc
    }, {})
  }
  return Object.entries(map).reduce<ComponentsOptions>((acc, [key, opts]) => {
    const innerNone = components && components[key] && (components[key] as Partial<ComponentsValue<Record<string, any>>>).mode === 'none'

    acc[key] = innerNone ? {} : opts
    return acc
  }, {})
}

export function createDefaultTailwindcssExtends(opts: { varPrefix?: string } = {}): Config['theme'] {
  const { varPrefix = defaultVarPrefix } = opts
  return {
    borderRadius: {
      box: `var(${varPrefix}rounded-box, 1rem)`,
      btn: `var(${varPrefix}rounded-btn, 0.5rem)`,
      badge: `var(${varPrefix}rounded-badge, 1.9rem)`
    },
    minHeight: {
      6: '1.5rem',
      8: '2rem',
      12: '3rem',
      16: '4rem'
    },
    lineHeight: {
      1: '0.25rem',
      2: '0.5rem'
    }
  }
}

export function getCodegenDefaults(options?: CodegenOptions): Omit<CodegenOptions, 'outdir'> {
  const { mode } = options ?? {}
  const base = getDefaultBase(mode)
  const components = injectSchema(defaultComponents, options)
  return {
    mode: 'preset',
    pick: {
      base: true,
      styled: true,
      utils: true
    },
    log: true,
    dryRun: false,
    base,
    components,
    postcss: {
      varPrefix: {
        varPrefix: defaultVarPrefix
      },
      atMedia: {},
      selector: {}
    }
  }
}

export { sharedExtraColors, sharedExtraVars, generate, generateColors, gray, makeRgbaValue, presetPrimaryColors } from './base/colors'
