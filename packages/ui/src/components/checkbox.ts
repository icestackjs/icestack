import { getSelector, expandTypes } from '@/shared'
import type { GetSchemaFn } from '@/types'
const schema: GetSchemaFn = (opts) => {
  const { selector, types } = opts
  return {
    selector,
    defaults: {
      styled: {
        [selector]: {
          apply: 'border-base-content rounded-btn h-6 w-6 cursor-pointer appearance-none border border-opacity-20',
          css: {
            '--chkbg': 'var(--base-content)',
            '--chkfg': 'var(--base-400)'
          },
          '&:focus-visible': {
            apply: 'outline-base-content outline outline-2 outline-offset-2'
          },
          [`&:checked,
          &[checked="true"],
          &[aria-checked="true"]`]: {
            apply: 'bg-base-content bg-no-repeat',
            css: {
              animation: 'checkmark var(--animation-input, 0.2s) ease-out',
              'background-image': `linear-gradient(-45deg, transparent 65%, rgba(var(--chkbg)) 65.99%),
              linear-gradient(45deg, transparent 75%, rgba(var(--chkbg)) 75.99%),
              linear-gradient(-45deg, rgba(var(--chkbg)) 40%, transparent 40.99%),
              linear-gradient(
                45deg,
                rgba(var(--chkbg)) 30%,
                rgba(var(--chkfg)) 30.99%,
                rgba(var(--chkfg)) 40%,
                transparent 40.99%
              ),
              linear-gradient(-45deg, rgba(var(--chkfg)) 50%, rgba(var(--chkbg)) 50.99%)`
            }
          },
          '&:indeterminate': {
            apply: 'bg-base-content bg-no-repeat',
            css: {
              animation: 'checkmark var(--animation-input, 0.2s) ease-out',
              'background-image': `linear-gradient(90deg, transparent 80%, rgba(var(--chkbg)) 80%),
          linear-gradient(-90deg, transparent 80%, rgba(var(--chkbg)) 80%),
          linear-gradient(
            0deg,
            rgba(var(--chkbg)) 43%,
            rgba(var(--chkfg)) 43%,
            rgba(var(--chkfg)) 57%,
            rgba(var(--chkbg)) 57%
          )`
            }
          },
          ...expandTypes(types, (type) => {
            return {
              key: `&${getSelector(type)}`,
              value: {
                apply: `border-${type} [@media(hover:hover)]:hover:border-${type}`,
                css: {
                  '--chkbg': `var(--${type})`,
                  '--chkfg': `var(--${type}-content)`
                },
                '&:focus-visible': {
                  apply: `outline-${type}`
                },
                [`&:checked,
          &[checked="true"],
          &[aria-checked="true"]`]: {
                  apply: `border-${type} bg-${type} text-${type}-content`
                }
              }
            }
          }),

          '&:disabled': {
            apply: 'bg-base-content cursor-not-allowed border-transparent opacity-20'
          }
        },
        '@keyframes checkmark': {
          '0%': {
            css: {
              'background-position-y': '5px'
            }
          },
          '50%': {
            css: {
              'background-position-y': '-2px'
            }
          },
          '100%': {
            css: {
              'background-position-y': '0'
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
            apply: 'h-4 w-4'
          },
          [`&${getSelector('sm')}`]: {
            apply: 'h-5 w-5'
          },
          [`&${getSelector('md')}`]: {
            apply: 'h-6 w-6'
          },
          [`&${getSelector('lg')}`]: {
            apply: 'h-8 w-8'
          }
        }
      }
    }
  }
}

export default {
  schema
}
