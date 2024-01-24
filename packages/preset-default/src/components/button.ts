import { GetCssSchemaMethod, css } from '@/types'

const schema: GetCssSchemaMethod = (opts) => {
  const { selector, types } = opts

  return {
    selector,
    defaults: {
      styled: css`
        // @base
        ${selector} {
          @apply border-ant-neutral-400 bg-ant-neutral-400 text-base-content outline-ant-neutral-400 no-underline;
          border-width: var(--border-btn, 1px);
          // @v focus-visible=true
          &:focus-visible,
          &${selector}-focus-visible {
            @apply outline outline-2 outline-offset-2;
          }
          // @v hover=true
          &:hover,
          &${selector}-hover {
            @apply border-ant-neutral-300 bg-ant-neutral-300;
          }
          // @v active=true
          &:active,
          &${selector}-active {
            @apply border-ant-neutral-500 bg-ant-neutral-500;
          }
          ${types
            .map((type) => {
              return css`
                // @v type="${type}"
                &-${type} {
                  @apply border-${type} bg-${type} text-${type}-content outline-${type};
                  &:hover,
                  &${selector}-hover {
                    @apply border-${type}-hover bg-${type}-hover;
                  }
                  &:active,
                  &${selector}-active {
                    @apply border-${type}-active bg-${type}-active;
                  }
                }
              `
            })
            .join('\n')}
          // @v glass=true
          &.glass {
            @apply shadow-none outline-current;
            &:active,
            &${selector}-active {
              --glass-opacity: 25%； --glass-border-opacity: 15%；;
            }
          }
          // @v ghost=true
          &-ghost {
            @apply border border-transparent bg-transparent text-current shadow-none outline-current;
            &:active,
            &${selector}-active {
              @apply border-opacity-0 bg-base-content bg-opacity-20;
            }
          }
          // @v link=true
          &-link {
            @apply text-primary border-transparent bg-transparent underline shadow-none outline-current;
            &:active,
            &${selector}-active {
              @apply border-transparent bg-transparent underline;
            }
          }
          // @v outline=true
          &-outline {
            @apply border-current bg-transparent shadow-none text-base-content;
            &:hover,
            &${selector}-hover {
              @apply border-ant-neutral-900 bg-ant-neutral-900 text-ant-neutral-100;
            }
            &:active,
            &${selector}-active {
              @apply border-ant-neutral-1100 bg-ant-neutral-1100 text-ant-neutral-100;
            }
            ${types
              .map((type) => {
                return css`
                  // @v type="${type}"
                  &${selector}-${type} {
                    @apply text-${type};
                    &:hover,
                    &${selector}-hover {
                      @apply border-${type}-hover bg-${type}-hover text-${type}-content;
                    }
                    &:active,
                    &${selector}-active {
                      @apply border-${type}-active bg-${type}-active text-${type}-content;
                    }
                  }
                `
              })
              .join('\n')}
          }

          // @v disabled=true
          &${selector}-disabled, &[disabled],
          &:disabled {
            @apply bg-neutral text-base-content border-opacity-0 bg-opacity-20 text-opacity-20;
          }
        }
      `,
      base: css`
        // @base
        ${selector} {
          @apply rounded-btn inline-flex h-12 min-h-[3rem] shrink-0 cursor-pointer select-none flex-wrap items-center justify-center border-transparent px-4 text-center;
          font-size: 0.875rem;
          line-height: 1em;
          /* disabled */
          &-disabled,
          &[disabled],
          &:disabled {
            @apply pointer-events-none;
          }

          /* shapes */
          &-square {
            @apply h-12 w-12 p-0;
          }
          &-circle {
            @apply h-12 w-12 rounded-full p-0;
          }
        }

        /* radio input and checkbox as button */
        :where(${selector}:is(input[type="checkbox"])),
        :where(${selector}:is(input[type="radio"])) {
          @apply w-auto appearance-none;
        }
        ${selector}:is(input[type="checkbox"]):after,
      ${selector}:is(input[type="radio"]):after {
          @apply content-[attr(aria-label)];
        }
      `,
      utils: css`
        // @base
        ${selector} {
          // @v size="xs"
          &-xs {
            @apply h-6 min-h-[1.5rem] px-2;
            font-size: 0.75rem;
          }
          // @v size="sm"
          &-sm {
            @apply h-8 min-h-[2rem] px-3;
            font-size: 0.875rem;
          }
          // @v size="md"
          &-md {
            @apply h-12 min-h-[3rem] px-4;
            font-size: 0.875rem;
          }
          // @v size="lg"
          &-lg {
            @apply h-16 min-h-[4rem] px-6;
            font-size: 1.125rem;
          }
          // @v size="wide"
          &-wide {
            @apply w-64;
          }
          // @v size="block"
          &-block {
            @apply w-full;
          }
          // @v shape="square"
          &-square {
            &:where(${selector}-xs) {
              @apply h-6 w-6 p-0;
            }
            &:where(${selector}-sm) {
              @apply h-8 w-8 p-0;
            }
            &:where(${selector}-md) {
              @apply h-12 w-12 p-0;
            }
            &:where(${selector}-lg) {
              @apply h-16 w-16 p-0;
            }
          }
          // @v shape="circle"
          &-circle {
            &:where(${selector}-xs) {
              @apply h-6 w-6 rounded-full p-0;
            }
            &:where(${selector}-sm) {
              @apply h-8 w-8 rounded-full p-0;
            }
            &:where(${selector}-md) {
              @apply h-12 w-12 rounded-full p-0;
            }
            &:where(${selector}-lg) {
              @apply h-16 w-16 rounded-full p-0;
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
