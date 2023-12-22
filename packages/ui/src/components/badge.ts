import { expandTypes, getSelector, defuBaseDefault } from '@/shared'
import type { GetSchemaFn } from '@/types'
function generateDefault(typeName: string) {
  return `border-${typeName} bg-${typeName} text-${typeName}-content`
}

function generateOutline(typeName: string) {
  return `text-${typeName}`
}

const xs = {
  apply: 'h-3 text-xs leading-3',
  css: {
    'padding-left': '0.313rem',
    'padding-right': '0.313rem'
  }
}
const sm = {
  apply: 'h-4 text-xs leading-4',
  css: {
    'padding-left': '0.438rem',
    'padding-right': '0.438rem'
  }
}
const md = {
  apply: 'h-5 text-sm leading-5',
  css: {
    'padding-left': '0.563rem',
    'padding-right': '0.563rem'
  }
}
const lg = {
  apply: 'h-6 text-base leading-6',
  css: {
    'padding-left': '0.688rem',
    'padding-right': '0.688rem'
  }
}

const schema: GetSchemaFn = (opts) => {
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
        [selector]: defuBaseDefault<any, any[]>(md, {
          apply: 'inline-flex items-center justify-center transition duration-200 ease-out w-[fit-content]'
        })
      },
      utils: {
        [selector]: {
          [`&${getSelector('xs')}`]: xs,
          [`&${getSelector('sm')}`]: sm,
          [`&${getSelector('md')}`]: md,
          [`&${getSelector('lg')}`]: lg
        }
      }
    }
  }
}

export default {
  schema
}
