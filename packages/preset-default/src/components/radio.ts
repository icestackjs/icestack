import { GetCssSchemaMethod, css } from '@/types'
const schema: GetCssSchemaMethod = (opts) => {
  const { selector, types } = opts
  return {
    selector,

    defaults: {
      styled: css`
        ${selector} {
          --chkbg: var(--base-content);
          @apply border-base-content h-6 w-6 cursor-pointer appearance-none rounded-full border border-opacity-20;
          &:focus {
            box-shadow: none;
          }
          &:focus-visible {
            @apply outline-base-content outline outline-2 outline-offset-2;
          }
          &:checked,
          &[aria-checked='true'] {
            @apply bg-base-content;
            background-image: none;
            animation: radiomark var(--animation-input, 0.2s) ease-out;
            box-shadow:
              0 0 0 4px theme(colors.base-100) inset,
              0 0 0 4px theme(colors.base-100) inset;
          }
          ${types
            .map((type) => {
              return css`
                &-${type} {
                  --chkbg: var(--${type});
                  @apply border-${type} [@media(hover:hover)]:hover:border-${type};
                  &:focus-visible {
                    @apply outline-${type};
                  }
                  &:checked,
                  &[aria-checked='true'] {
                    @apply border-${type} bg-${type} text-${type}-content;
                  }
                }
              `
            })
            .join('\n')}
          &:disabled {
            @apply cursor-not-allowed opacity-20;
          }
        }

        @keyframes radiomark {
          0% {
            box-shadow:
              0 0 0 12px theme(colors.base-100) inset,
              0 0 0 12px theme(colors.base-100) inset;
          }
          50% {
            box-shadow:
              0 0 0 3px theme(colors.base-100) inset,
              0 0 0 3px theme(colors.base-100) inset;
          }
          100% {
            box-shadow:
              0 0 0 4px theme(colors.base-100) inset,
              0 0 0 4px theme(colors.base-100) inset;
          }
        }

        /* backward compatibility */
        ${selector}-mark {
          @apply hidden;
        }
      `,
      base: css`
        ${selector} {
          @apply shrink-0;
        }
      `,
      utils: css`
        [type='radio']${selector} {
          &-xs {
            @apply h-4 w-4;
          }
          &-sm {
            @apply h-5 w-5;
          }
          &-md {
            @apply h-6 w-6;
          }
          &-lg {
            @apply h-8 w-8;
          }
        }
      `
    }
  }
}

export default {
  schema
}
