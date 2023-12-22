import { GetSchemaFn, getSelector, expandTypes } from '@/shared'

const schema: GetSchemaFn = (opts) => {
  const { selector, types } = opts
  return {
    selector,
    defaults: {
      styled: {
        [selector]: {
          apply: 'border-base-content bg-base-100 rounded-btn border border-opacity-0 text-base',
          'input:focus': {
            apply: 'outline-none'
          },
          '&[list]::-webkit-calendar-picker-indicator': {
            css: {
              'line-height': '1em'
            }
          },
          '&-bordered': {
            apply: 'border-opacity-20'
          },
          [`&:focus,
          &:focus-within`]: {
            apply: 'outline-0 shadow-[0_0_0_2px] shadow-base-content/10'
          },
          '&-ghost': {
            apply: 'bg-opacity-5',
            [`&:focus,
            &:focus-within`]: {
              apply: 'text-base-content bg-opacity-100',
              css: {
                'box-shadow': 'none'
              }
            }
          },
          ...expandTypes(types, (type) => {
            return {
              key: `&${getSelector(type)}`,
              value: {
                apply: `border-${type}`,
                [`&:focus,
            &:focus-within`]: {
                  apply: `shadow-${type}/10`
                }
              }
            }
          }),
          [`&-disabled,
          &:disabled,
          &[disabled]`]: {
            apply: 'border-base-200 bg-base-200 placeholder-base-content cursor-not-allowed text-opacity-20 placeholder-opacity-20'
          }
        }
      },
      base: {
        [selector]: {
          apply: 'flex-shrink h-12 px-4 text-sm leading-loose'
        }
      },
      utils: {
        [selector]: {
          [`&${getSelector('xs')}`]: {
            apply: 'h-6 px-2 text-xs leading-relaxed'
          },
          [`&${getSelector('sm')}`]: {
            apply: 'h-8 px-3 text-sm leading-8'
          },
          [`&${getSelector('md')}`]: {
            apply: 'h-12 px-4 text-sm leading-loose'
          },
          [`&${getSelector('lg')}`]: {
            apply: 'h-16 px-6 text-lg leading-loose'
          }
        }
      }
    }
  }
}

export default {
  schema
}
