import { GetSchemaFn, getSelector, expandTypes } from './shared'

export const schema: GetSchemaFn = (opts) => {
  const { selector, types } = opts
  return {
    selector,
    defaults: {
      styled: {
        [selector]: {
          apply: 'rounded-box overflow-hidden bg-transparent',
          css: {
            appearance: 'none',
            '--range-shdw': 'var(--base-content)'
          },
          '&:focus-visible::-webkit-slider-thumb': {
            css: {
              '--focus-shadow': '0 0 0 6px rgba(var(--base-400)) inset, 0 0 0 2rem rgba(var(--range-shdw)) inset'
            }
          },
          '&:focus-visible::-moz-range-thumb': {
            css: {
              '--focus-shadow': '0 0 0 6px rgba(var(--base-400)) inset, 0 0 0 2rem rgba(var(--range-shdw)) inset'
            }
          },
          '&::-webkit-slider-runnable-track': {
            apply: 'rounded-box bg-base-content/10 h-2 w-full'
          },
          '&::-moz-range-track': {
            apply: 'rounded-box bg-base-content/10 h-2 w-full'
          },
          '&::-webkit-slider-thumb': {
            apply: 'rounded-box bg-base-400 relative h-6 w-6 border-none',
            css: {
              appearance: 'none',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'rgba(var(--range-shdw))',
              '--filler-size': '100rem',
              '--filler-offset': '0.6rem',
              'box-shadow': `0 0 0 3px rgba(var(--range-shdw)) inset,
          var(--focus-shadow, 0 0),
          calc(var(--filler-size) * -1 - var(--filler-offset)) 0 0 var(--filler-size)`
            }
          },
          '&::-moz-range-thumb': {
            apply: 'rounded-box bg-base-400 relative h-6 w-6 border-none',
            css: {
              top: '50%',
              color: 'rgba(var(--range-shdw))',
              '--filler-size': '100rem',
              '--filler-offset': '0.5rem',
              'box-shadow': `0 0 0 3px rgba(var(--range-shdw)) inset,
          var(--focus-shadow, 0 0),
          calc(var(--filler-size) * -1 - var(--filler-offset)) 0 0 var(--filler-size)`
            }
          },
          ...expandTypes(types, (type) => {
            return {
              key: `&${getSelector(type)}`,
              value: {
                css: {
                  '--range-shdw': `var(--${type})`
                }
              }
            }
          })
        }
      },
      base: {
        [selector]: {
          apply: 'h-6 w-full cursor-pointer',
          '&:focus': {
            css: {
              outline: 'none'
            }
          }
        }
      },
      utils: {
        [selector]: {
          [`&${getSelector('xs')}`]: {
            apply: 'h-4',
            '&::-webkit-slider-runnable-track': {
              apply: 'h-1'
            },
            '&::-moz-range-track': {
              apply: 'h-1'
            },
            '&::-webkit-slider-thumb': {
              apply: 'h-4 w-4',
              css: {
                '--filler-offset': '0.4rem'
              }
            },
            '&::-moz-range-thumb': {
              apply: 'h-4 w-4',
              css: {
                '--filler-offset': '0.4rem'
              }
            }
          },
          [`&${getSelector('sm')}`]: {
            apply: 'h-5',
            '&::-webkit-slider-runnable-track': {
              apply: 'h-1'
            },
            '&::-moz-range-track': {
              apply: 'h-1'
            },
            '&::-webkit-slider-thumb': {
              apply: 'h-5 w-5',
              css: {
                '--filler-offset': '0.5rem'
              }
            },
            '&::-moz-range-thumb': {
              apply: 'h-5 w-5',
              css: {
                '--filler-offset': '0.5rem'
              }
            }
          },
          [`&${getSelector('md')}`]: {
            apply: 'h-6',
            '&::-webkit-slider-runnable-track': {
              apply: 'h-2'
            },
            '&::-moz-range-track': {
              apply: 'h-2'
            },
            '&::-webkit-slider-thumb': {
              apply: 'h-6 w-6',
              css: {
                '--filler-offset': '0.6rem'
              }
            },
            '&::-moz-range-thumb': {
              apply: 'h-6 w-6',
              css: {
                '--filler-offset': '0.6rem'
              }
            }
          },
          [`&${getSelector('lg')}`]: {
            apply: 'h-8',
            '&::-webkit-slider-runnable-track': {
              apply: 'h-4'
            },
            '&::-moz-range-track': {
              apply: 'h-4'
            },
            '&::-webkit-slider-thumb': {
              apply: 'h-8 w-8',
              css: {
                '--filler-offset': '1rem'
              }
            },
            '&::-moz-range-thumb': {
              apply: 'h-8 w-8',
              css: {
                '--filler-offset': '1rem'
              }
            }
          }
        }
      }
    }
  }
}
