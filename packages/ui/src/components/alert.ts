// import defu from 'defu'
import { DefaultsFn, OptionFn, getSelector, expandTypes } from './shared'

export const selector = '.alert'
const getDefaults: DefaultsFn = (opts) => {
  return {
    styled: {
      [selector]: {
        apply: 'rounded-box border p-4 text-base-content border-base-400',
        ...expandTypes(opts.types, (typeName) => {
          return {
            key: `&${getSelector(typeName)}`,
            value: {
              apply: `text-${typeName}-content border-${typeName}/20 bg-${typeName}`
            }
          }
        })
      }
    },
    base: {
      [selector]: {
        apply:
          'grid w-full grid-flow-row content-start items-center justify-items-center gap-4 text-center sm:grid-flow-col sm:grid-cols-[auto_minmax(auto,1fr)] sm:justify-items-start sm:text-left'
      }
    }
  }
}

export const options: OptionFn = (opts) => {
  const d = {
    selector,
    defaults: getDefaults(opts)
  }
  return d
}
