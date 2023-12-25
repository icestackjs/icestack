import { transformCss2Js } from '@/shared'
import type { GetCssSchemaMethod } from '@/types'

const schema: GetCssSchemaMethod = (opts) => {
  const { selector } = opts
  return {
    selector,
    defaults: {
      base: transformCss2Js(`
      ${selector} {
        @apply max-w-full overflow-x-auto;
        & > ul,
        & > ol {
          @apply flex items-center whitespace-nowrap;
          min-height: min-content;
          & > li {
            @apply flex items-center;
            & > a {
              @apply flex cursor-pointer items-center [@media(hover:hover)]:hover:underline;
            }
          }
        }
      }
      
      `),
      styled: transformCss2Js(`
      ${selector} {
        @apply py-2;
        & > ul,
        & > ol {
          & > li {
            & > a {
              &:focus {
                @apply outline-none;
              }
              &:focus-visible {
                outline: 2px solid currentColor;
                outline-offset: 2px;
              }
            }
            & + *:before {
              content: "";
              @apply ml-2 mr-3 block h-1.5 w-1.5 rotate-45 transform opacity-40;
              border-top: 1px solid;
              border-right: 1px solid;
              background-color: transparent;
            }
          }
        }
      }
      
      [dir="rtl"] ${selector} > ul > li + *:before,
      [dir="rtl"] ${selector} > ol > li + *:before {
        --tw-rotate: -135deg;
      }
      
      `),
      utils: transformCss2Js(``)
    }
  }
}

export default {
  schema
}
