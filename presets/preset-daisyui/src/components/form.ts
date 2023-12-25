import { GetCssSchemaMethod } from './shared'

const schema: GetCssSchemaMethod = (opts) => {
  const { selector } = opts
  return {
    selector,
    defaults: {
      styled: {
        '.label': {
          apply: 'px-1 py-2',
          '&-text': {
            apply: 'text-base-content text-sm'
          },
          '&-text-alt': {
            apply: 'text-base-content text-xs'
          },
          a: {
            apply: '[@media(hover:hover)]:hover:text-base-content'
          }
        }
      },
      base: {
        '.form-control': {
          apply: 'flex flex-col'
        },
        '.label': {
          apply: 'flex select-none items-center justify-between'
        }
      },
      utils: {}
    }
  }
}

export default {
  schema
}
