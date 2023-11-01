import { OptionFn, getSelector, expandTypes } from './shared'

export const options: OptionFn = (opts) => {
  const { types, selector } = opts
  return {
    selector,
    defaults: {
      styled: {
        [selector]: {
          apply: 'border-base-content bg-base-100 rounded-btn border border-opacity-0 pr-10',
          css: {
            'background-image': `linear-gradient(45deg, transparent 50%, currentColor 50%),
            linear-gradient(135deg, currentColor 50%, transparent 50%)`,
            'background-position': `calc(100% - 20px) calc(1px + 50%),
            calc(100% - 16.1px) calc(1px + 50%)`,
            'background-size': `4px 4px,
            4px 4px`,
            'background-repeat': 'no-repeat'
          },
          '&-bordered': {
            apply: 'border-opacity-20'
          },
          '&:focus': {
            apply: 'outline-base-content/20 outline outline-2 outline-offset-2'
          },
          '&-ghost': {
            apply: 'bg-opacity-5',
            '&:focus': {
              apply: 'text-base-content bg-opacity-100'
            }
          },
          ...expandTypes(types, (type) => {
            return {
              key: `&${getSelector(type)}`,
              value: {
                apply: `border-${type}`,
                '&:focus': {
                  apply: `outline-${type}`
                }
              }
            }
          }),
          [`&-disabled,
          &:disabled,
          &[disabled]`]: {
            apply: 'border-base-200 bg-base-200 placeholder-base-content cursor-not-allowed text-opacity-20 placeholder-opacity-20'
          },
          [`&-multiple,
          &[multiple],
          &[size]:not([size="1"])`]: {
            apply: 'bg-none pr-4'
          }
        },
        [`[dir="rtl"] ${selector}`]: {
          css: {
            'background-position': `calc(0% + 12px) calc(1px + 50%),
    calc(0% + 16px) calc(1px + 50%)`
          }
        }
      },
      base: {
        [selector]: {
          apply: 'inline-flex cursor-pointer select-none appearance-none min-h-12 h-12 pl-4 pr-10 text-sm leading-loose',
          '&[multiple]': {
            apply: 'h-auto'
          }
        }
      },
      utils: {
        [selector]: {
          [`&${getSelector('xs')}`]: {
            apply: 'min-h-6 h-6 pl-2 pr-8 text-xs leading-relaxed',
            '[dir="rtl"] &': {
              apply: 'pl-8 pr-2'
            }
          },
          [`&${getSelector('sm')}`]: {
            apply: 'min-h-8 h-8 pl-3 pr-8 text-sm leading-8',
            '[dir="rtl"] &': {
              apply: 'pl-8 pr-3'
            }
          },
          [`&${getSelector('md')}`]: {
            apply: 'min-h-12 h-12 pl-4 pr-10 text-sm leading-loose',
            '[dir="rtl"] &': {
              apply: 'pl-10 pr-4'
            }
          },
          [`&${getSelector('lg')}`]: {
            apply: 'min-h-16 h-16 pl-6 pr-8 text-lg leading-loose',
            '[dir="rtl"] &': {
              apply: 'pl-8 pr-6'
            }
          }
        }
      }
    }
  }
}
