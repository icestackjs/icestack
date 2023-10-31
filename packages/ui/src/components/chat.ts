import { OptionFn, expandTypes, getSelector } from './shared'

export const options: OptionFn = (opts) => {
  const { selector, types } = opts
  return {
    selector,
    defaults: {
      styled: {
        [selector]: {
          '&-bubble': {
            apply: 'bg-neutral text-neutral-content rounded-box',
            css: {
              'min-height': '2.75rem',
              'min-width': '2.75rem'
            },
            ...expandTypes(types, (type) => {
              return {
                key: `&${getSelector(type)}`,
                value: {
                  apply: `bg-${type} text-${type}-content`
                }
              }
            })
          },
          [`&-start ${selector}-bubble`]: {
            apply: 'rounded-bl-none',
            '&:before': {
              css: {
                left: '-0.749rem'
              }
            }
          },
          [`&-end ${selector}-bubble`]: {
            apply: 'rounded-br-none',
            '&:before': {
              css: {
                left: '99.9%'
              }
            }
          }
        }
      },
      base: {
        [selector]: {
          apply: 'grid grid-cols-2 gap-x-3 py-1',
          [`&${getSelector('image')}`]: {
            apply: 'row-span-2 self-end'
          },
          [`&${getSelector('header')}`]: {
            apply: 'row-start-1 text-sm'
          },
          [`&${getSelector('footer')}`]: {
            apply: 'row-start-3 text-sm'
          },
          [`&${getSelector('bubble')}`]: {
            apply: 'relative block w-fit px-4 py-2',
            css: {
              'max-width': '90%'
            },
            '&:before': {
              apply: 'absolute bottom-0 h-3 w-3',
              css: {
                'background-color': 'inherit',
                content: '""',
                'mask-size': 'contain',
                'mask-repeat': 'no-repeat',
                'mask-position': 'center'
              }
            }
          },
          [`&${getSelector('start')}`]: {
            apply: 'place-items-start',
            css: {
              'grid-template-columns': 'auto 1fr'
            },
            [`${selector}-header`]: {
              apply: 'col-start-2'
            },
            [`${selector}-footer`]: {
              apply: 'col-start-2'
            },
            [`${selector}-image`]: {
              apply: 'col-start-1'
            },
            [`${selector}-bubble`]: {
              apply: 'col-start-2',
              '&:before': {
                css: {
                  'mask-image': `url("data:image/svg+xml,%3csvg width='3' height='3' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill='black' d='m 0 3 L 3 3 L 3 0 C 3 1 1 3 0 3'/%3e%3c/svg%3e")`
                },
                '[dir="rtl"] &': {
                  css: {
                    'mask-image': `url("data:image/svg+xml,%3csvg width='3' height='3' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill='black' d='m 0 3 L 1 3 L 3 3 C 2 3 0 1 0 0'/%3e%3c/svg%3e")`
                  }
                }
              }
            }
          },
          [`&${getSelector('end')}`]: {
            apply: 'place-items-end',
            css: {
              'grid-template-columns': '1fr auto'
            },
            [`${selector}-header`]: {
              apply: 'col-start-1'
            },
            [`${selector}-footer`]: {
              apply: 'col-start-1'
            },
            [`${selector}-image`]: {
              apply: 'col-start-2'
            },
            [`${selector}-bubble`]: {
              apply: 'col-start-1',
              '&:before': {
                css: {
                  'mask-image': `url("data:image/svg+xml,%3csvg width='3' height='3' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill='black' d='m 0 3 L 1 3 L 3 3 C 2 3 0 1 0 0'/%3e%3c/svg%3e")`
                },
                '[dir="rtl"] &': {
                  css: {
                    'mask-image': `url("data:image/svg+xml,%3csvg width='3' height='3' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill='black' d='m 0 3 L 3 3 L 3 0 C 3 1 1 3 0 3'/%3e%3c/svg%3e")`
                  }
                }
              }
            }
          }
        },
        bubble: {}
      }
    }
  }
}
