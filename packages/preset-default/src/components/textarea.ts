import type { GetCssSchemaMethod } from '@/types'
import { css } from '@/types'

const schema: GetCssSchemaMethod = (opts) => {
  const { selector, types } = opts
  return {
    selector,
    defaults: {
      styled: css`
        ${selector} {
          @apply bg-base-100 rounded-btn border border-transparent;
          &-bordered {
            @apply border-base-content/20;
          }
          &:focus {
            box-shadow: none;
            @apply border-base-content/20 outline-base-content/20 outline outline-2 outline-offset-2;
          }
          &-ghost {
            @apply bg-opacity-5;
            &:focus {
              @apply text-base-content bg-opacity-100;
              box-shadow: none;
            }
          }
          ${types
            .map((type) => {
              return css`
                &-${type} {
                  @apply border-${type};
                  &:focus {
                    @apply outline-${type} border-${type};
                  }
                }
              `
            })
            .join('\n')}

          &-disabled,
        &:disabled,
        &[disabled] {
            @apply border-base-200 bg-base-200 placeholder-base-content cursor-not-allowed text-opacity-20 placeholder-opacity-20;
          }
        }
      `,
      base: css`
        ${selector} {
          @apply min-h-[3rem] shrink;
          @apply px-4 py-2 text-sm leading-loose;
        }
      `,
      utils: css`
        ${selector} {
          &-xs {
            @apply px-2 py-1 text-xs leading-relaxed;
          }
          &-sm {
            @apply px-3 py-1 text-sm leading-8;
          }
          &-md {
            @apply px-4 py-3 text-sm leading-loose;
          }
          &-lg {
            @apply px-6 py-4 text-lg leading-loose;
          }
        }
      `,
    },
  }
}

export default {
  schema,
}
