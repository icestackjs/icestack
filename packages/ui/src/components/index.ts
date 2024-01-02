import { schemaMap, componentNames } from '@icestack/preset-default/components'
import { preprocessDefaults } from './utils'
import { preprocessCssInJs } from '@/postcss'
import type { GetCssSchemaMethod } from '@/types'

const resolvedSchemaMap = {} as Record<string, { schema: GetCssSchemaMethod }>
for (const componentName of componentNames) {
  const o = schemaMap[componentName as keyof typeof schemaMap].schema
  resolvedSchemaMap[componentName] = {
    schema: (...args) => {
      const { defaults, selector } = o(...args)
      return {
        selector,
        defaults: preprocessCssInJs(preprocessDefaults(defaults))
      }
    }
  }
}

export { resolvedSchemaMap }

export { schemaMap, componentNames as names, removeDefaultComponents } from '@icestack/preset-default/components'
