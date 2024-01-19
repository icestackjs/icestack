import { GetCssSchemaMethod, css } from '@/types'

const schema: GetCssSchemaMethod = (opts) => {
  const { selector } = opts
  return {
    selector,
    defaults: {
      base: css``,
      styled: css``,
      utils: css``
    }
  }
}

export default {
  schema
}
