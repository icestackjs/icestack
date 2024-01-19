import { GetCssSchemaMethod, css } from '@/types'
const schema: GetCssSchemaMethod = (opts) => {
  const { types, selector } = opts
  return {
    selector,
    defaults: {
      styled: css`
        ${selector} {
          @apply bg-base-100 rounded-btn border border-transparent pr-10;
          &-bordered {
            @apply border-base-content/20;
          }
          background-image: linear-gradient(45deg, transparent 50%, currentColor 50%), linear-gradient(135deg, currentColor 50%, transparent 50%);
          background-position:
            calc(100% - 20px) calc(1px + 50%),
            calc(100% - 16.1px) calc(1px + 50%);
          background-size:
            4px 4px,
            4px 4px;
          background-repeat: no-repeat;
          &:focus {
            box-shadow: none;
            @apply border-base-content/20 outline-base-content/20 outline outline-2 outline-offset-2;
          }
          &-ghost {
            @apply bg-opacity-5;
            &:focus {
              @apply text-base-content bg-opacity-100;
            }
          }
          ${types
            .reduce<string[]>((acc, type) => {
              acc.push(css`
                &-${type} {
                  @apply border-${type};
                  &:focus {
                    @apply outline-${type} border-${type};
                  }
                }
              `)
              return acc
            }, [])
            .join('\n')}

          &-disabled,
        &:disabled,
        &[disabled] {
            @apply border-base-200 bg-base-200 placeholder-base-content cursor-not-allowed text-opacity-20 placeholder-opacity-20;
          }
          &-multiple,
          &[multiple],
          &[size]:not([size='1']) {
            @apply bg-none pr-4;
          }
        }

        [dir='rtl'] ${selector} {
          background-position:
            calc(0% + 12px) calc(1px + 50%),
            calc(0% + 16px) calc(1px + 50%);
        }
      `,
      base: css`
        ${selector} {
          @apply inline-flex cursor-pointer select-none appearance-none;
          @apply h-12 min-h-[3rem] pl-4 pr-10 text-sm leading-loose;

          &[multiple] {
            @apply h-auto;
          }
        }
      `,
      utils: css`
        ${selector} {
          &-md {
            @apply h-12 min-h-[3rem] pl-4 pr-10 text-sm leading-loose;
            [dir='rtl'] & {
              @apply pl-10 pr-4;
            }
          }
          &-lg {
            @apply h-16 min-h-[4rem] pl-6 pr-8 text-lg leading-loose;
            [dir='rtl'] & {
              @apply pl-8 pr-6;
            }
          }
          &-sm {
            @apply h-8 min-h-[2rem] pl-3 pr-8 text-sm leading-8;
            [dir='rtl'] & {
              @apply pl-8 pr-3;
            }
          }
          &-xs {
            @apply h-6 min-h-[1.5rem] pl-2 pr-8 text-xs leading-relaxed;
            [dir='rtl'] & {
              @apply pl-8 pr-2;
            }
          }
        }
      `
    }
  }
}

export default {
  schema
}
