import type { Config } from 'tailwindcss'
import { presetPrimaryColors, generateColorVars, sharedExtraColors, sharedExtraVars } from './base/colors'
import type { CodegenOptions, DeepPartial, ComponentsOptions, CodegenMode } from './types'
import { defaultVarPrefix } from './constants'
import { schemaMap, names as componentNames } from '@/components'

export function getDefaultBase(mode?: CodegenMode) {
  const base = {
    themes: {
      light: {},
      dark: {}
    }
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
    if (mode === undefined || mode === 'styled') {
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
  }

  return base
}

export const defaultSelectorMap: DeepPartial<ComponentsOptions> = {
  alert: {
    selector: '.alert'
  },
  avatar: {
    selector: '.avatar'
  },
  badge: {
    selector: '.badge'
  },
  button: {
    selector: '.btn'
  },
  chat: {
    selector: '.chat'
  },
  checkbox: {
    selector: '.checkbox'
  },
  input: {
    selector: '.input'
  },
  link: {
    selector: '.link'
  },
  progress: {
    selector: '.progress'
  },
  radio: {
    selector: '.radio'
  },
  range: {
    selector: '.range'
  },
  select: {
    selector: '.select'
  },
  textarea: {
    selector: '.textarea'
  },
  toggle: {
    selector: '.toggle'
  },
  loading: {
    selector: '.loading'
  },
  mask: {
    selector: '.mask'
  },
  table: {
    selector: '.table'
  },
  skeleton: {
    selector: '.skeleton'
  },
  form: {},
  'radial-progress': {
    selector: '.radial-progress',
    varPrefix: {
      ignoreProp: ['--size', '--thickness', '--value'],
      ignoreValueCustomProperty: ['--size', '--thickness', '--value']
    }
  },
  countdown: {
    selector: '.countdown',
    varPrefix: {
      ignoreProp: ['--value'],
      ignoreValueCustomProperty: ['--value']
    }
  },
  diff: {
    selector: '.diff'
  },
  kbd: {
    selector: '.kbd'
  },
  tooltip: {
    selector: '.tooltip',
    varPrefix: {
      ignoreProp: ['--tooltip-tail', '--tooltip-color', '--tooltip-text-color', '--tooltip-tail-offset'],
      ignoreValueCustomProperty: ['--tooltip-tail', '--tooltip-color', '--tooltip-text-color', '--tooltip-tail-offset']
    }
  },
  toast: {
    selector: '.toast'
  },
  steps: {
    selector: '.step'
  },
  collapse: {
    selector: '.collapse'
  },
  join: {
    selector: '.join'
  },
  indicator: {
    selector: '.indicator'
  },
  divider: {
    selector: '.divider'
  },
  stack: {
    selector: '.stack'
  },
  tab: {
    selector: '.tab'
  },
  dropdown: {
    selector: '.dropdown'
  },
  swap: {
    selector: '.swap'
  },
  card: {
    selector: '.card'
  },
  carousel: {
    selector: '.carousel'
  },
  stat: {
    selector: '.stat'
  },
  timeline: {
    selector: '.timeline'
  },
  breadcrumbs: {
    selector: '.breadcrumbs'
  },
  'bottom-navigation': {
    selector: '.btm-nav'
  },
  menu: {
    selector: '.menu'
  },
  navbar: {
    selector: '.navbar'
  },
  'file-input': {
    selector: '.file-input'
  },
  rating: {
    selector: '.rating'
  },
  drawer: {
    selector: '.drawer'
  },
  footer: {
    selector: '.footer'
  },
  hero: {
    selector: '.hero'
  }
}

export function injectSchema(map: DeepPartial<ComponentsOptions>) {
  return Object.entries(map).reduce<DeepPartial<ComponentsOptions>>((acc, [key, opts]) => {
    const k = key as unknown as (typeof componentNames)[number]
    acc[k] = {
      ...opts,
      schema: schemaMap[k]?.schema
    }
    return acc
  }, {})
}

export function createDefaultTailwindcssExtends(opts: { varPrefix?: string } = {}): DeepPartial<Config>['theme'] {
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

export function getCodegenDefaults(mode?: CodegenMode): DeepPartial<CodegenOptions> {
  const base = getDefaultBase(mode)
  const components = mode === 'none' ? {} : injectSchema(defaultSelectorMap)
  return {
    mode: 'styled',
    varPrefix: {
      varPrefix: defaultVarPrefix
    },
    log: true,
    dryRun: false,
    global: {
      atMedia: {
        hover: false
      },
      selector: {
        universal: '*'
      }
    },
    base,
    components
  }
}

export { sharedExtraColors, sharedExtraVars, generate, generateColorVars, gray, makeRgbaValue, presetPrimaryColors } from './base/colors'
