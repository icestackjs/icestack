import { GetCssSchemaMethod, css } from '@/types'

const schema: GetCssSchemaMethod = (opts) => {
  const { selector, types } = opts
  return {
    selector,
    defaults: {
      styled: css`
        ${selector} {
          @apply bg-base-100 rounded-btn border border-transparent text-base;
          input:focus {
            @apply outline-none;
          }
          &[list]::-webkit-calendar-picker-indicator {
            line-height: 1em;
          }
          &-bordered {
            @apply border-base-content/20;
          }
          &:focus,
          &:focus-within {
            box-shadow: none;
            @apply border-base-content/20 outline-base-content/20 outline outline-2 outline-offset-2;
          }
          &-ghost {
            @apply bg-opacity-5;
            &:focus,
            &:focus-within {
              @apply text-base-content bg-opacity-100;
              box-shadow: none;
            }
          }
          ${types
            .map((type) => {
              return css`
                &-${type} {
                  @apply border-${type};
                  &:focus,
                  &:focus-within {
                    @apply outline-${type} border-${type};
                  }
                }
              `
            })
            .join('\n')}

          &-disabled,
        &:disabled,
        &[disabled] {
            @apply border-base-200 bg-base-200 placeholder-base-content text-base-content/40 cursor-not-allowed placeholder-opacity-20;
          }
          /* &::-webkit-calendar-picker-indicator {
          display: none;
        } */
          &::-webkit-date-and-time-value {
            text-align: inherit;
          }
        }
      `,
      base: css`
        ${selector} {
          @apply shrink appearance-none;
          @apply h-12 px-4 text-sm leading-loose;
        }
      `,
      utils: css`
        ${selector} {
          &-xs {
            @apply h-6 px-2 text-xs leading-relaxed;
          }
          &-md {
            @apply h-12 px-4 text-sm leading-loose;
          }
          &-lg {
            @apply h-16 px-6 text-lg leading-loose;
          }
          &-sm {
            @apply h-8 px-3 text-sm leading-8;
          }
        }
      `
    }
  }
}

export default {
  schema
}
