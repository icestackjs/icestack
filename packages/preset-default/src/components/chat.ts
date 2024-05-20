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
          @apply grid grid-cols-2 gap-x-3 py-1;
          &-image {
            @apply row-span-2 self-end;
          }
          &-header {
            @apply row-start-1 text-sm;
          }
          &-footer {
            @apply row-start-3 text-sm;
          }
          &-bubble {
            @apply relative block w-fit px-4 py-2;
            max-width: 90%;
            &:before {
              @apply absolute bottom-0 h-3 w-3;
              background-color: inherit;
              content: '';
              mask-size: contain;
              mask-repeat: no-repeat;
              mask-position: center;
            }
          }
          &-start {
            @apply place-items-start;
            grid-template-columns: auto 1fr;
            ${selector}-header {
              @apply col-start-2;
            }
            ${selector}-footer {
              @apply col-start-2;
            }
            ${selector}-image {
              @apply col-start-1;
            }
            ${selector}-bubble {
              @apply col-start-2;
              &:before {
                mask-image: url("data:image/svg+xml,%3csvg width='3' height='3' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill='black' d='m 0 3 L 3 3 L 3 0 C 3 1 1 3 0 3'/%3e%3c/svg%3e");
                [dir='rtl'] & {
                  mask-image: url("data:image/svg+xml,%3csvg width='3' height='3' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill='black' d='m 0 3 L 1 3 L 3 3 C 2 3 0 1 0 0'/%3e%3c/svg%3e");
                }
              }
            }
          }
          &-end {
            @apply place-items-end;
            grid-template-columns: 1fr auto;
            ${selector}-header {
              @apply col-start-1;
            }
            ${selector}-footer {
              @apply col-start-1;
            }
            ${selector}-image {
              @apply col-start-2;
            }
            ${selector}-bubble {
              @apply col-start-1;
              &:before {
                mask-image: url("data:image/svg+xml,%3csvg width='3' height='3' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill='black' d='m 0 3 L 1 3 L 3 3 C 2 3 0 1 0 0'/%3e%3c/svg%3e");
                [dir='rtl'] & {
                  mask-image: url("data:image/svg+xml,%3csvg width='3' height='3' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill='black' d='m 0 3 L 3 3 L 3 0 C 3 1 1 3 0 3'/%3e%3c/svg%3e");
                }
              }
            }
          }
        }
      `,
      styled: css`
        ${selector} {
          &-bubble {
            @apply rounded-box;
            min-height: 2.75rem;
            min-width: 2.75rem;

            /* default */
            & {
              @apply bg-neutral text-neutral-content;
            }

            ${types
              .map((type) => {
                return css`
                  &-${type} {
                    @apply bg-${type} text-${type}-content;
                  }
                `
              })
              .join('\n')}
          }

          &-start ${selector}-bubble {
            @apply rounded-es-none;
            &:before {
              inset-inline-start: -0.749rem;
            }
          }

          &-end ${selector}-bubble {
            @apply rounded-ee-none;
            &:before {
              inset-inline-start: 99.9%;
            }
          }
        }
      `,
    },
  }
}

export default {
  schema,
}
