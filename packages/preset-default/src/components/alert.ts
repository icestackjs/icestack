import { getSelector, expandTypes } from '@/shared'
import type { GetCssSchemaMethod } from '@/types'
const schema: GetCssSchemaMethod = (opts) => {
  const { selector, types } = opts

  return {
    selector,
    defaults: {
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
}

export default {
  schema
}
