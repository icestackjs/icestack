import { GetCssSchemaMethod, css } from '@/types'
const schema: GetCssSchemaMethod = (opts) => {
  const { selector, types } = opts
  return {
    selector,
    defaults: {
      styled: css`
        ${selector} {
          ${types
            .map((type) => {
              return css`
                &-${type} {
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
      base: css`
        ${selector} {
          @apply cursor-pointer underline;
          &-hover {
            @apply no-underline [@media(hover:hover)]:hover:underline;
          }
        }
      `
    }
  }
}

export default {
  schema
}
