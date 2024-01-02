import type { GetCssSchemaMethod } from '@/types'

const schema: GetCssSchemaMethod = (opts) => {
  const { selector } = opts

  return {
    selector,
    defaults: {
      styled: {
        [selector + '-group']: {
          apply: 'flex overflow-hidden',
          [`:where(${selector})`]: {
            apply: 'border-base-100 overflow-hidden rounded-full border-4'
          }
        }
      },
      base: {
        [selector]: {
          apply: 'relative inline-flex',
          '> div': {
            apply: 'block aspect-square overflow-hidden'
          },
          img: {
            apply: 'h-full w-full object-cover'
          },
          '&.placeholder': {
            '> div': {
              apply: 'flex items-center justify-center'
            }
          }
        }
      }
    }
  }
}

export default {
  schema
}
