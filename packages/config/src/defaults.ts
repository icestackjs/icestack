import type { Config } from 'tailwindcss'
import { components as defaultComponents } from '@icestack/preset-default/components'
import { base as defaultBase } from '@icestack/preset-default/base'
import { utilities as defaultUtilities } from '@icestack/preset-default/utilities'
import { defaultVarPrefix } from '@icestack/shared/constants'
import { generateColors } from '@icestack/theme-algorithm'
import type { CodegenOptions, BaseOptions, ComponentsOptions, ComponentsValue } from '@icestack/types'

export function getDefaultBase(options?: CodegenOptions) {
  const { base: baseOptions, mode: globalMode } = options ?? {}
  const { themes } = baseOptions ?? {}
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
  if (globalMode !== 'none') {
    if (themes?.light !== false) {
      // @ts-ignore
      base.themes.light = defaultBase.themes?.light
    }

    if (themes?.dark !== false) {
      // @ts-ignore
      base.themes.dark = defaultBase.themes?.dark
    }
  }

  return base as Partial<BaseOptions>
}

export function injectSchema(defaultComponents: ComponentsOptions, options?: CodegenOptions) {
  const { components, mode: globalMode } = options ?? {}
  if (globalMode === 'none') {
    return Object.entries(defaultComponents).reduce<ComponentsOptions>((acc, [key, opts]) => {
      const innerPreset = components && components[key] && (components[key] as Partial<ComponentsValue<Record<string, any>>>).mode === 'preset'
      if (innerPreset) {
        acc[key] = opts
      }
      return acc
    }, {})
  }
  return Object.entries(defaultComponents).reduce<ComponentsOptions>((acc, [key, opts]) => {
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
  const { mode: globalMode } = options ?? {}
  const base = getDefaultBase(options)
  const components = injectSchema(defaultComponents, options)
  const utilities = globalMode === 'none' ? {} : defaultUtilities
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
    utilities,
    postcss: {
      varPrefix: {
        varPrefix: defaultVarPrefix
      },
      atMedia: {},
      selector: {}
    },
    cva: {
      format: 'ts',
      importFrom: '@icestack/cva'
    }
  }
}

export { sharedExtraColors, sharedExtraVars } from '@icestack/preset-default/base'
