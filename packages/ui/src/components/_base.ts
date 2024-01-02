import type { GetCssSchemaMethod } from '@/types'

const schema: GetCssSchemaMethod = (opts) => {
  const { selector } = opts
  return {
    selector,
    defaults: {
      base: ``,
      styled: ``,
      utils: ``
    }
  }
}

export default {
  schema
}
