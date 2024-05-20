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
          @apply inline-flex items-center justify-center transition duration-200 ease-out;
          @apply h-5 text-sm leading-5;
          width: fit-content;
          padding-left: 0.563rem;
          padding-right: 0.563rem;
        }
      `,
      styled: css`
        ${selector} {
          @apply border-base-200 bg-base-100 text-base-content rounded-badge border;

          ${types
            .map((type) => {
              return css`
                &-${type} {
                  // @v type="${type}"
                  @apply border-${type} bg-${type} text-${type}-content;
                }
              `
            })
            .join('\n')}

          &-ghost {
            // @v ghost="true"
            @apply border-base-200 bg-base-200 text-base-content;
          }

          &-outline {
            // @v outline="true"
            @apply border-current border-opacity-50 bg-transparent text-current;

            ${types
              .map((type) => {
                return css`
                  &.badge-${type} {
                    @apply text-${type};
                  }
                `
              })
              .join('\n')}
          }
        }
      `,
      utils: css`
        ${selector} {
          &-xs {
            // @v size="xs"
            @apply h-3 text-xs leading-3;
            padding-left: 0.313rem;
            padding-right: 0.313rem;
          }
          &-sm {
            // @v size="sm"
            @apply h-4 text-xs leading-4;
            padding-left: 0.438rem;
            padding-right: 0.438rem;
          }
          &-md {
            // @v size="md"
            @apply h-5 text-sm leading-5;
            padding-left: 0.563rem;
            padding-right: 0.563rem;
          }
          &-lg {
            // @v size="lg"
            @apply h-6 text-base leading-6;
            padding-left: 0.688rem;
            padding-right: 0.688rem;
          }
        }
      `,
    },
  }
}

export default {
  schema,
}
