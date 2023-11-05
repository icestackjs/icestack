// import defu from 'defu'
import { DefaultsFn, OptionFn, getSelector, expandTypes } from './shared'

const getDefaults: DefaultsFn = (opts) => {
  const { selector, types } = opts
  return {
    styled: {
      [selector]: {
        apply: 'rounded-box border p-4 text-base-content border-base-400',
        ...expandTypes(types, (typeName) => {
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
  const selector = opts.selector

  return {
    selector,
    defaults: getDefaults(opts)
  }
}
