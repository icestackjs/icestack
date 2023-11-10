import { expandTypes, OptionFn, getSelector } from './shared'
function generateDefault(typeName: string) {
  return `border-${typeName} bg-${typeName} text-${typeName}-content`
}

function generateOutline(typeName: string) {
  return `text-${typeName}`
}

export const options: OptionFn = (opts) => {
  const { selector, types } = opts

  return {
    selector,
    defaults: {
      styled: {
        [selector]: {
          apply: 'rounded-badge border border-base-400 bg-base-100 text-base-content',
          ...expandTypes(types, (type) => {
            return {
              key: `&${getSelector(type)}`,
              value: {
                apply: generateDefault(type)
              }
            }
          }),
          '&-ghost': {
            apply: 'border-base-400 bg-base-400 text-base-content'
          },
          '&-outline': {
            apply: 'border-current border-opacity-50 bg-transparent text-current',
            ...expandTypes(types, (type) => {
              return {
                key: `&${getSelector(type, '.badge-')}`,
                value: {
                  apply: generateOutline(type)
                }
              }
            })
          }
        }
      },
      base: {
        [selector]: {
          apply: 'inline-flex items-center justify-center transition duration-200 ease-out h-5 text-sm leading-5 w-[fit-content] pl-[0.563rem] pr-[0.563rem]'
        }
      },
      utils: {
        [selector]: {
          [`&${getSelector('xs')}`]: {
            apply: 'h-3 text-xs leading-3',
            css: {
              'padding-left': '0.313rem',
              'padding-right': '0.313rem'
            }
          },
          [`&${getSelector('sm')}`]: {
            apply: 'h-4 text-xs leading-4',
            css: {
              'padding-left': '0.438rem',
              'padding-right': '0.438rem'
            }
          },
          [`&${getSelector('md')}`]: {
            apply: 'h-5 text-sm leading-5',
            css: {
              'padding-left': '0.563rem',
              'padding-right': '0.563rem'
            }
          },
          [`&${getSelector('lg')}`]: {
            apply: 'h-6 text-base leading-6',
            css: {
              'padding-left': '0.688rem',
              'padding-right': '0.688rem'
            }
          }
        }
      }
    }
  }
}
