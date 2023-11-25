import { GetSchemaFn, getSelector, expandTypes } from './shared'

const schema: GetSchemaFn = (opts) => {
  const { selector, types } = opts
  return {
    selector,

    defaults: {
      styled: {
        [selector]: {
          apply: 'border-base-content h-6 w-6 cursor-pointer appearance-none rounded-full border border-opacity-20',
          '&:focus-visible': {
            apply: 'outline-base-content outline outline-2 outline-offset-2'
          },
          [`&:checked,
          &[aria-checked="true"]`]: {
            apply: 'bg-base-content',
            css: {
              animation: 'radiomark var(--animation-input, 0.2s) ease-out',
              'box-shadow': `0 0 0 4px rgba(var(--base-400)) inset,
            0 0 0 4px rgba(var(--base-400)) inset`
            }
          },
          ...expandTypes(types, (type) => {
            return {
              key: `&${getSelector(type)}`,
              value: {
                apply: `border-${type} hover:border-${type}`,
                '&:focus-visible': {
                  apply: `outline-${type}`
                },
                [`&:checked,
                &[aria-checked="true"]`]: {
                  apply: `border-${type} bg-${type} text-${type}-content`
                }
              }
            }
          }),
          '&:disabled': {
            apply: 'cursor-not-allowed opacity-20'
          }
        },
        '@keyframes radiomark': {
          '0%': {
            css: {
              'box-shadow': `0 0 0 12px rgba(var(--base-400)) inset,
              0 0 0 12px rgba(var(--base-400)) inset`
            }
          },
          '50%': {
            css: {
              'box-shadow': `0 0 0 3px rgba(var(--base-400)) inset,
              0 0 0 3px rgba(var(--base-400)) inset`
            }
          },
          '100%': {
            css: {
              'box-shadow': `0 0 0 4px rgba(var(--base-400)) inset,
              0 0 0 4px rgba(var(--base-400)) inset`
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
