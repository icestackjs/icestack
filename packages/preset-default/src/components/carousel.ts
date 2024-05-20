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
          @apply inline-flex overflow-x-scroll;
          scroll-snap-type: x mandatory;
          scroll-behavior: smooth;
          &-vertical {
            @apply flex-col overflow-y-scroll;
            scroll-snap-type: y mandatory;
          }
          &-item {
            @apply box-content flex flex-none;
            scroll-snap-align: start;
          }
          &-center ${selector}-item {
            scroll-snap-align: center;
          }
          &-end ${selector}-item {
            scroll-snap-align: end;
          }
        }
      `,
      styled: css`
        ${selector} {
          -ms-overflow-style: none;
          scrollbar-width: none;
          &::-webkit-scrollbar {
            @apply hidden;
          }
        }
      `,
    },
  }
}

export default {
  schema,
}
