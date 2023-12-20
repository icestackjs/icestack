import type { Config } from 'tailwindcss'
import { gray, presetPrimaryColors, generateColorVars } from './colors'
import type { CodegenOptions, DeepPartial, ComponentsOptions, CodegenMode } from './types'
import { defaultVarPrefix } from './constants'
import { schemaMap, names as componentNames } from '@/components'
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

// https://github.com/ant-design/ant-design/blob/5393d9ce36821e64590d3f0d07daa0d393a4c299/.dumi/theme/common/Color/ColorStyle.tsx#L13
export const sharedExtraColors = {
  light: {
    ...Object.values(gray).reduce<Record<string, string>>((acc, value, idx) => {
      acc[`base-${idx + 1}00`] = value
      return acc
    }, {}),
    'base-content': '#000000'
  },
  dark: {
    ...Object.values(gray).reduce<Record<string, string>>((acc, value, idx) => {
      acc[`base-${13 - idx}00`] = value
      return acc
    }, {}),
    'base-content': '#ffffff'
  }
}

const defaultTypes = {
  primary: {
    light: generateColorVars('primary', presetPrimaryColors.blue),
    dark: generateColorVars('primary', presetPrimaryColors.blue, true)
  },
  success: {
    light: generateColorVars('success', presetPrimaryColors.green),
    dark: generateColorVars('success', presetPrimaryColors.green, true)
  },
  warning: {
    light: generateColorVars('warning', presetPrimaryColors.gold),
    dark: generateColorVars('warning', presetPrimaryColors.gold, true)
  },
  error: {
    light: generateColorVars('error', presetPrimaryColors.red),
    dark: generateColorVars('error', presetPrimaryColors.red, true)
  },
  neutral: {
    light: generateColorVars('neutral', presetPrimaryColors.grey),
    dark: generateColorVars('neutral', presetPrimaryColors.grey, true)
  }
}

export function getDefaultBase(mode?: CodegenMode) {
  const base = {
    themes: {
      light: {
        selector: ':root'
      },
      dark: {}
    },
    types: {},
    extraColors: sharedExtraColors,
    extraVars: {
      light: sharedExtraVars,
      dark: sharedExtraVars
    }
  }
  if (mode === undefined || mode === 'styled') {
    base.themes.dark = {
      selector: '[data-mode="dark"]'
    }
    base.types = defaultTypes
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
  // tabs: {
  //   selector: '.tab'
  // },
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
    components: {
      ...injectSchema(defaultSelectorMap)
    }
  }
}
