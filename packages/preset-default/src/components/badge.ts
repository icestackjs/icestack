import { GetCssSchemaMethod, css } from '@/types'

const schema: GetCssSchemaMethod = (opts) => {
  const { selector, types } = opts

  return {
    selector,
    defaults: {
      styled: css`
        ${selector} {
          @apply border-base-200 bg-base-100 text-base-content rounded-badge border;

          ${types
            .map((type) => {
              return css`
                &-${type} {
                  @apply border-${type} bg-${type} text-${type}-content;
                }
              `
            })
            .join('\n')}

          &-ghost {
            @apply border-base-200 bg-base-200 text-base-content;
          }

          &-outline {
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
      base: css`
        ${selector} {
          @apply inline-flex items-center justify-center transition duration-200 ease-out;
          @apply h-5 text-sm leading-5;
          width: fit-content;
          padding-left: 0.563rem;
          padding-right: 0.563rem;
        }
      `,
      utils: css`
        ${selector} {
          &-xs {
            @apply h-3 text-xs leading-3;
            padding-left: 0.313rem;
            padding-right: 0.313rem;
          }
          &-sm {
            @apply h-4 text-xs leading-4;
            padding-left: 0.438rem;
            padding-right: 0.438rem;
          }
          &-md {
            @apply h-5 text-sm leading-5;
            padding-left: 0.563rem;
            padding-right: 0.563rem;
          }
          &-lg {
            @apply h-6 text-base leading-6;
            padding-left: 0.688rem;
            padding-right: 0.688rem;
          }
        }
      `
    }
  }
}

export default {
  schema
}
