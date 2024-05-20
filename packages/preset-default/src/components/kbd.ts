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
          @apply inline-flex items-center justify-center;
        }
      `,
      styled: css`
        ${selector} {
          @apply border-base-content bg-base-200 rounded-btn border border-opacity-20 px-2;
          border-bottom-width: 2px;
          min-height: 2.2em;
          min-width: 2.2em;
        }
      `,
      utils: css`
        ${selector} {
          &-xs {
            // @v size="xs"
            @apply px-1 text-xs;
            min-height: 1.2em;
            min-width: 1.2em;
          }
          &-sm {
            // @v size="sm"
            @apply px-1 text-sm;
            min-height: 1.6em;
            min-width: 1.6em;
          }
          &-md {
            // @v size="md"
            @apply px-2 text-base;
            min-height: 2.2em;
            min-width: 2.2em;
          }
          &-lg {
            // @v size="lg"
            @apply px-4 text-lg;
            min-height: 2.5em;
            min-width: 2.5em;
          }
        }
      `,
    },
  }
}

export default {
  schema,
}
