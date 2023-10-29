import { expandColorsMap, IDefaults } from './shared'
import { CreatePresetOptions } from '@/sass/functions'

const defaults: IDefaults = {
  styled: {
    default: {
      apply: 'border-base-content bg-base-content rounded-badge h-6 w-12 cursor-pointer appearance-none border border-opacity-20 bg-opacity-50',
      css: {
        '--tglbg': 'rgba(var(--base-100))',
        '--handleoffset': '1.5rem',
        '--handleoffsetcalculator': 'calc(var(--handleoffset) * -1)',
        '--togglehandleborder': '0 0',
        transition: `background,
        box-shadow var(--animation-input, 0.2s) ease-out`,
        'box-shadow': `var(--handleoffsetcalculator) 0 0 2px var(--tglbg) inset,
        0 0 0 2px var(--tglbg) inset,
        var(--togglehandleborder)`
      }
    },
    disabled: {
      apply: 'border-base-content cursor-not-allowed bg-transparent opacity-30',
      css: {
        '--togglehandleborder': '0 0 0 3px rgba(var(--base-content)) inset, var(--handleoffsetcalculator) 0 0 3px rgba(var(--base-content)) inset'
      }
    },
    focusVisible: {
      apply: 'outline-base-content/20 outline outline-2 outline-offset-2'
    },
    checked: {
      apply: 'border-opacity-100 bg-opacity-100',
      css: {
        '--handleoffsetcalculator': 'var(--handleoffset)'
      }
    },
    indeterminate: {
      apply: 'border-opacity-100 bg-opacity-100',
      css: {
        'box-shadow': `calc(var(--handleoffset) / 2) 0 0 2px var(--tglbg) inset,
        calc(var(--handleoffset) / -2) 0 0 2px var(--tglbg) inset,
        0 0 0 2px var(--tglbg) inset`
      }
    },
    rtl: {
      default: {
        css: {
          '--handleoffsetcalculator': 'calc(var(--handleoffset) * 1)'
        }
      },
      checked: {
        css: {
          '--handleoffsetcalculator': 'calc(var(--handleoffset) * -1)'
        }
      },
      indeterminate: {
        css: {
          'box-shadow': `calc(var(--handleoffset) / 2) 0 0 2px var(--tglbg) inset,
          calc(var(--handleoffset) / -2) 0 0 2px var(--tglbg) inset,
          0 0 0 2px var(--tglbg) inset`
        }
      }
    }
  },
  base: {
    default: ''
  }
}

export const options = (opts: CreatePresetOptions) => {
  const d = {
    colors: expandColorsMap(opts.types, (typeName) => {
      return {
        focusVisible: `outline-${typeName}`,
        checked: `border-${typeName} bg-${typeName} text-${typeName}-content border-opacity-10`
      }
    }),
    defaults
  }

  return d
}
