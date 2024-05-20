import type { GetCssSchemaMethod } from '@/types'
import { css } from '@/types'

const schema: GetCssSchemaMethod = (opts) => {
  const { selector, types } = opts
  return {
    selector,
    defaults: {
      base: css`
        ${selector} {
          // @b
          @apply cursor-pointer underline;
          &-hover {
            // @v hover="true"
            @apply no-underline [@media(hover:hover)]:hover:underline;
          }
        }
      `,
      styled: css`
        ${selector} {
          ${types
            .map((type) => {
              return css`
                &-${type} {
                  // @v type="${type}"
                  @apply text-${type} [@media(hover:hover)]:hover:text-${type}-active;
                }
              `
            })
            .join('\n')}

          &:focus {
            @apply outline-none;
          }
          &:focus-visible {
            outline: 2px solid currentColor;
            outline-offset: 2px;
          }
        }
      `,
    },
  }
}

export default {
  schema,
}
