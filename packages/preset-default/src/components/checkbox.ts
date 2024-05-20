/* eslint-disable prettier/prettier */
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
        @apply shrink-0;
      }
    `,
      styled: css`
        ${selector} {
          --chkbg: theme(colors.base-content);
          --chkfg: theme(colors.base-100);
          @apply border-base-content rounded-btn h-6 w-6 cursor-pointer appearance-none border border-opacity-20;
          &:focus {
            box-shadow: none;
          }
          &:focus-visible {
            @apply outline-base-content outline outline-2 outline-offset-2;
          }
          &:checked,
          &[checked='true'],
          &[aria-checked='true'] {
            @apply bg-no-repeat;
            animation: checkmark var(--animation-input, 0.2s) ease-out;
            background-color: var(--chkbg);
            background-image: linear-gradient(-45deg, transparent 65%, var(--chkbg) 65.99%), linear-gradient(45deg, transparent 75%, var(--chkbg) 75.99%),
              linear-gradient(-45deg, var(--chkbg) 40%, transparent 40.99%), linear-gradient(45deg, var(--chkbg) 30%, var(--chkfg) 30.99%, var(--chkfg) 40%, transparent 40.99%),
              linear-gradient(-45deg, var(--chkfg) 50%, var(--chkbg) 50.99%);
          }
          &:indeterminate {
            @apply bg-base-content bg-no-repeat;
            animation: checkmark var(--animation-input, 0.2s) ease-out;
            background-image: linear-gradient(90deg, transparent 80%, var(--chkbg) 80%), linear-gradient(-90deg, transparent 80%, var(--chkbg) 80%),
              linear-gradient(0deg, var(--chkbg) 43%, var(--chkfg) 43%, var(--chkfg) 57%, var(--chkbg) 57%);
          }

          ${types
          .map((type) => {
            return css`
                &-${type} {
                  // @v type="${type}"
                  --chkbg: theme(colors.${type});
                  --chkfg: theme(colors.${type}-content);
                  @apply border-${type} [@media(hover:hover)]:hover:border-${type};
                  &:focus-visible {
                    @apply outline-${type};
                  }
                  &:checked,
                  &[checked='true'],
                  &[aria-checked='true'] {
                    @apply border-${type} bg-${type} text-${type}-content;
                  }
                }
              `
          })
          .join('\n')}

          &:disabled {
            @apply bg-base-content cursor-not-allowed border-transparent opacity-20;
          }
        }

        @keyframes checkmark {
          0% {
            background-position-y: 5px;
          }
          50% {
            background-position-y: -2px;
          }
          100% {
            background-position-y: 0;
          }
        }

        /* backward compatibility */
        ${selector}-mark {
          @apply hidden;
        }
      `,
      utils: css`
        [type='checkbox']${selector} {
          &-xs {
            // @v size="xs"
            @apply h-4 w-4;
          }
          &-sm {
            // @v size="sm"
            @apply h-5 w-5;
          }
          &-md {
            // @v size="md"
            @apply h-6 w-6;
          }
          &-lg {
            // @v size="lg"
            @apply h-8 w-8;
          }
        }
      `,
    },
  }
}

export default {
  schema,
}
