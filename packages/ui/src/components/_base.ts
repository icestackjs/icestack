import { transformCss2Js } from '@/shared'
import type { GetCssSchemaMethod } from '@/shared'

const schema: GetCssSchemaMethod = (opts) => {
  const { selector } = opts
  return {
    selector,
    defaults: {
      base: transformCss2Js(``),
      styled: transformCss2Js(``),
      utils: transformCss2Js(``)
    }
  }
}

export default {
  schema
}
