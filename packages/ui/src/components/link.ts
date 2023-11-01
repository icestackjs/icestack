import { OptionFn, expandTypes, getSelector } from './shared'

export const options: OptionFn = (opts) => {
  const { selector, types } = opts
  return {
    selector,
    defaults: {
      styled: {
        [selector]: {
          ...expandTypes(types, (type) => {
            return {
              key: `&${getSelector(type)}`,
              value: {
                apply: `text-${type} [@media(hover:hover)]:hover:text-${type}-active`
              }
            }
          }),
          '&:focus': {
            apply: 'outline-none'
          },
          '&:focus-visible': {
            css: {
              outline: '2px solid currentColor',
              'outline-offset': '2px'
            }
          }
        }
      },
      base: {
        [selector]: {
          apply: 'cursor-pointer underline',
          '&-hover': {
            apply: 'no-underline hover:underline'
          }
        }
      }
    }
  }
}
