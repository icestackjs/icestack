import type { GetCssSchemaMethod } from '@/types'
import { css } from '@/types'

const schema: GetCssSchemaMethod = (opts) => {
  const { selector } = opts

  return {
    selector,
    defaults: {
      base: css`
        ${selector} {
          // @b
          @apply relative inline-flex;
          > div {
            @apply block aspect-square overflow-hidden;
          }
          img {
            @apply h-full w-full object-cover;
          }
          &.placeholder {
            > div {
              @apply flex items-center justify-center;
            }
          }
        }
      `,
      styled: css`
        ${selector}-group {
          @apply flex overflow-hidden;
          :where(${selector}) {
            @apply border-base-100 overflow-hidden rounded-full border-4;
          }
        }
      `,
    },
  }
}

export default {
  schema,
}
