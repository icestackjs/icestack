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
          --tglbg: theme(colors.base-100);
          --handleoffset: 1.5rem;
          --handleoffsetcalculator: calc(var(--handleoffset) * -1);
          --togglehandleborder: 0 0;
          @apply text-base-content/50 rounded-badge h-6 w-12 cursor-pointer appearance-none border border-current bg-current;
          transition:
            background,
            box-shadow var(--animation-input, 0.2s) ease-out;
          box-shadow:
            var(--handleoffsetcalculator) 0 0 2px var(--tglbg) inset,
            0 0 0 2px var(--tglbg) inset,
            var(--togglehandleborder);
          [dir='rtl'] & {
            --handleoffsetcalculator: calc(var(--handleoffset) * 1);
          }
          &:focus-visible {
            @apply outline-base-content/20 outline outline-2 outline-offset-2;
          }
          &:hover {
            @apply bg-current;
          }
          &:checked,
          &[checked='true'],
          &[aria-checked='true'] {
            background-image: none;
            --handleoffsetcalculator: var(--handleoffset);
            @apply text-base-content;
            [dir='rtl'] & {
              --handleoffsetcalculator: calc(var(--handleoffset) * -1);
            }
          }
          &:indeterminate {
            @apply text-base-content;
            box-shadow:
              calc(var(--handleoffset) / 2) 0 0 2px var(--tglbg) inset,
              calc(var(--handleoffset) / -2) 0 0 2px var(--tglbg) inset,
              0 0 0 2px var(--tglbg) inset;
            [dir='rtl'] & {
              box-shadow:
                calc(var(--handleoffset) / 2) 0 0 2px var(--tglbg) inset,
                calc(var(--handleoffset) / -2) 0 0 2px var(--tglbg) inset,
                0 0 0 2px var(--tglbg) inset;
            }
          }
          ${types
            .map((type) => {
              return css`
                &-${type} {
                  // @v type="${type}"
                  &:focus-visible {
                    @apply outline-${type};
                  }
                  &:checked,
                  &[checked='true'],
                  &[aria-checked='true'] {
                    @apply border-${type} bg-${type} text-${type}-content border-opacity-10;
                  }
                }
              `
            })
            .join('\n')}

          &:disabled {
            @apply border-base-content cursor-not-allowed bg-transparent opacity-30;
            --togglehandleborder: 0 0 0 3px theme(colors.base-content) inset, var(--handleoffsetcalculator) 0 0 3px theme(colors.base-content) inset;
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
            --handleoffset: 0.5rem;
            @apply h-4 w-6;
          }
          &-sm {
            // @v size="sm"
            --handleoffset: 0.75rem;
            @apply h-5 w-8;
          }
          &-md {
            // @v size="md"
            --handleoffset: 1.5rem;
            @apply h-6 w-12;
          }
          &-lg {
            // @v size="lg"
            --handleoffset: 2rem;
            @apply h-8 w-16;
          }
        }
      `,
    },
  }
}

export default {
  schema,
}
