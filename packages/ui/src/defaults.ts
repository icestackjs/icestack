import type { Config } from 'tailwindcss'
import { presetPrimaryColors, generateColorVars, sharedExtraColors, sharedExtraVars } from './base/colors'
import type { CodegenOptions, ComponentsOptions, CodegenMode, BaseOptions, ComponentsValue } from './types'
import { defaultVarPrefix } from './constants'
import { schemaMap, names as componentNames, defaultSelectorMap } from '@/components'
export { defaultSelectorMap } from '@/components'

export function getDefaultBase(mode?: CodegenMode) {
  const base: {
    themes: {
      light?: object
      dark?: object
    }
    themeSelectorTemplate: (theme: string) => string
    mediaDarkTheme: string | boolean
  } = {
    themes: {},
    themeSelectorTemplate: (theme: string) => {
      return `[data-mode="${theme}"]`
    },
    mediaDarkTheme: false // 'dark'
  }

  if (mode !== 'none') {
    base.themes.light = {
      selector: ':root',
      extraColors: sharedExtraColors.light,
      extraVars: sharedExtraVars,
      types: {
        primary: generateColorVars('primary', presetPrimaryColors.blue),
        success: generateColorVars('success', presetPrimaryColors.green),
        warning: generateColorVars('warning', presetPrimaryColors.gold),
        error: generateColorVars('error', presetPrimaryColors.red),
        neutral: generateColorVars('neutral', presetPrimaryColors.grey)
      }
    }
    base.themes.dark = {
      selector: '[data-mode="dark"]',
      extraColors: sharedExtraColors.dark,
      extraVars: sharedExtraVars,
      types: {
        primary: generateColorVars('primary', presetPrimaryColors.blue, true),
        success: generateColorVars('success', presetPrimaryColors.green, true),
        warning: generateColorVars('warning', presetPrimaryColors.gold, true),
        error: generateColorVars('error', presetPrimaryColors.red, true),
        neutral: generateColorVars('neutral', presetPrimaryColors.grey, true)
      }
    }
  }

  return base as Partial<BaseOptions>
}

export function injectSchema(map: ComponentsOptions, components?: ComponentsOptions) {
  return Object.entries(map).reduce<ComponentsOptions>((acc, [key, opts]) => {
    const k = key as unknown as (typeof componentNames)[number]
    acc[k] =
      components && components[key] && (components[key] as Partial<ComponentsValue<Record<string, any>>>).mode === 'none'
        ? {
            ...opts
          }
        : {
            ...opts,
            schema: schemaMap[k]?.schema
          }

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
  const base = getDefaultBase(options?.mode)
  const components = options?.mode === 'none' ? {} : injectSchema(defaultSelectorMap, options?.components)
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

export { sharedExtraColors, sharedExtraVars, generate, generateColorVars, gray, makeRgbaValue, presetPrimaryColors } from './base/colors'
