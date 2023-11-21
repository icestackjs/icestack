import { GetSchemaFn, getSelector, IValue, expandTypes } from './shared'

export const schema: GetSchemaFn = (opts) => {
  const { selector, types } = opts

  function buttonHover(obj: IValue) {
    return {
      [`&${selector}-hover`]: obj,
      '&:hover': obj
    }
  }
  function buttonActive(obj: IValue) {
    return {
      '&:active': obj,
      [`&${selector}-active`]: obj
    }
  }

  function buttonFocusVisible(obj: IValue) {
    return {
      '&:focus-visible': obj,
      [`&${selector}-focus-visible`]: obj
    }
  }

  return {
    selector,
    defaults: {
      styled: {
        [selector]: {
          apply: 'border-base-400 bg-base-400 text-base-content outline-base-400 no-underline',
          css: {
            'border-width': 'var(--border-btn, 1px)'
          },
          ...buttonFocusVisible({
            apply: 'outline outline-2 outline-offset-2'
          }),
          ...buttonHover({
            apply: 'border-base-300 bg-base-300'
          }),
          ...buttonActive({
            apply: 'border-base-500 bg-base-500'
          }),
          ...expandTypes(types, (type) => {
            return {
              key: `&${getSelector(type)}`,
              value: {
                apply: `border-${type} bg-${type} text-${type}-content outline-${type}`,
                ...buttonHover({
                  apply: `border-${type}-hover bg-${type}-hover`
                }),
                ...buttonActive({
                  apply: `border-${type}-active bg-${type}-active`
                })
              }
            }
          }),
          '&.glass': {
            apply: 'shadow-none outline-current',
            ...buttonActive({
              css: {
                '--glass-opacity': '25%',
                '--glass-border-opacity': '15%'
              }
            })
          },
          '&-ghost': {
            apply: 'border border-transparent bg-transparent text-current shadow-none outline-current',
            ...buttonActive({
              apply: 'border-opacity-0 bg-base-content bg-opacity-20'
            })
          },
          '&-link': {
            apply: 'text-primary border-transparent bg-transparent underline shadow-none outline-current',
            ...buttonActive({
              apply: 'border-transparent bg-transparent underline'
            })
          },
          [`&${getSelector('outline')}`]: {
            apply: 'border-current bg-transparent shadow-none text-base-content',
            ...buttonHover({
              apply: `border-base-900 bg-base-900 text-base-100`
            }),
            ...buttonActive({
              apply: 'border-base-1100 bg-base-1100 text-base-100'
            }),
            ...expandTypes(types, (type) => {
              return {
                key: `&${getSelector(type, '.btn-')}`,
                value: {
                  apply: `text-${type}`,
                  ...buttonHover({
                    apply: `border-${type}-hover bg-${type}-hover text-${type}-content`
                  }),
                  ...buttonActive({
                    apply: `border-${type}-active bg-${type}-active text-${type}-content`
                  })
                }
              }
            })
          },
          [`&.btn-disabled,
          &[disabled],
          &:disabled`]: {
            apply: 'bg-neutral text-base-content border-opacity-0 bg-opacity-20 text-opacity-20'
          }
        }
      },
      base: {
        [selector]: {
          apply:
            'rounded-btn inline-flex flex-shrink-0 cursor-pointer select-none flex-wrap items-center justify-center border-transparent text-center transition duration-200 ease-out min-h-12 h-12 px-4',
          css: {
            'font-size': '0.875rem',
            'line-height': '1em'
          },
          [`&-disabled,
        &[disabled],
        &:disabled`]: {
            apply: 'pointer-events-none cursor-not-allowed'
          }
        }
      },
      utils: {
        [selector]: {
          [`&${getSelector('xs')}`]: {
            apply: 'min-h-6 h-6 px-2',
            css: {
              'font-size': '0.75rem'
            }
          },
          [`&${getSelector('sm')}`]: {
            apply: 'min-h-8 h-8 px-3',
            css: {
              'font-size': '0.875rem'
            }
          },
          [`&${getSelector('md')}`]: {
            apply: 'min-h-12 h-12 px-4',
            css: {
              'font-size': '0.875rem'
            }
          },
          [`&${getSelector('lg')}`]: {
            apply: 'min-h-16 h-16 px-6',
            css: {
              'font-size': '1.125rem'
            }
          },
          [`&${getSelector('wide')}`]: {
            apply: 'w-64'
          },
          [`&${getSelector('block')}`]: {
            apply: 'w-full'
          },
          [`&${getSelector('square')}`]: {
            apply: 'h-12 w-12 p-0',
            [`&:where(${getSelector('xs', selector + '-')})`]: {
              apply: 'h-6 w-6 p-0'
            },
            [`&:where(${getSelector('sm', selector + '-')})`]: {
              apply: 'h-8 w-8 p-0'
            },
            [`&:where(${getSelector('md', selector + '-')})`]: {
              apply: 'h-12 w-12 p-0'
            },
            [`&:where(${getSelector('lg', selector + '-')})`]: {
              apply: 'h-16 w-16 p-0'
            }
          },
          [`&${getSelector('circle')}`]: {
            apply: 'h-12 w-12 rounded-full p-0',
            [`&:where(${getSelector('xs', selector + '-')})`]: {
              apply: 'h-6 w-6 rounded-full p-0'
            },
            [`&:where(${getSelector('sm', selector + '-')})`]: {
              apply: 'h-8 w-8 rounded-full p-0'
            },
            [`&:where(${getSelector('md', selector + '-')})`]: {
              apply: 'h-12 w-12 rounded-full p-0'
            },
            [`&:where(${getSelector('lg', selector + '-')})`]: {
              apply: 'h-16 w-16 rounded-full p-0'
            }
          }
        }
      }
    }
  }
}
