import { getSelector, expandTypes } from '@/shared'
import type { GetCssSchemaMethod } from '@/types'

const schema: GetCssSchemaMethod = (opts) => {
  const { selector, types } = opts
  return {
    selector,
    defaults: {
      styled: {
        [selector]: {
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
          },
          '[dir="rtl"] &': {
            css: {
              '--handleoffsetcalculator': 'calc(var(--handleoffset) * 1)'
            }
          },
          '&:focus-visible': {
            apply: 'outline-base-content/20 outline outline-2 outline-offset-2'
          },
          [`&:checked,
          &[checked="true"],
          &[aria-checked="true"]`]: {
            apply: 'border-opacity-100 bg-opacity-100',
            css: {
              '--handleoffsetcalculator': 'var(--handleoffset)'
            },
            '[dir="rtl"] &': {
              css: {
                '--handleoffsetcalculator': 'calc(var(--handleoffset) * -1)'
              }
            }
          },
          '&:indeterminate': {
            apply: 'border-opacity-100 bg-opacity-100',
            css: {
              'box-shadow': `calc(var(--handleoffset) / 2) 0 0 2px var(--tglbg) inset,
            calc(var(--handleoffset) / -2) 0 0 2px var(--tglbg) inset,
            0 0 0 2px var(--tglbg) inset`
            },
            '[dir="rtl"] &': {
              css: {
                'box-shadow': `calc(var(--handleoffset) / 2) 0 0 2px var(--tglbg) inset,
                calc(var(--handleoffset) / -2) 0 0 2px var(--tglbg) inset,
                0 0 0 2px var(--tglbg) inset`
              }
            }
          },

          ...expandTypes(types, (type) => {
            return {
              key: `&${getSelector(type)}`,
              value: {
                '&:focus-visible': {
                  apply: `outline-${type}`
                },
                [`&:checked,
                &[checked="true"],
                &[aria-checked="true"]`]: {
                  apply: `border-${type} bg-${type} text-${type}-content border-opacity-10`
                }
              }
            }
          }),
          '&:disabled': {
            apply: 'border-base-content cursor-not-allowed bg-transparent opacity-30',
            css: {
              '--togglehandleborder': '0 0 0 3px rgba(var(--base-content)) inset, var(--handleoffsetcalculator) 0 0 3px rgba(var(--base-content)) inset'
            }
          }
        }
      },
      base: {
        [selector]: {
          apply: 'shrink-0'
        }
      },
      utils: {
        [selector]: {
          [`&${getSelector('xs')}`]: {
            apply: 'h-4 w-6',
            css: {
              '--handleoffset': '0.5rem'
            }
          },
          [`&${getSelector('sm')}`]: {
            apply: 'h-5 w-8',
            css: {
              '--handleoffset': '0.75rem'
            }
          },
          [`&${getSelector('md')}`]: {
            apply: 'h-6 w-12',
            css: {
              '--handleoffset': '1.5rem'
            }
          },
          [`&${getSelector('lg')}`]: {
            apply: 'h-8 w-16',
            css: {
              '--handleoffset': '2rem'
            }
          }
        }
      }
    }
  }
}

export default {
  schema
}
