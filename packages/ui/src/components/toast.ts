import { transformCss2Js } from '@/postcss'
import type { GetCssSchemaMethod } from '@/types'

const schema: GetCssSchemaMethod = (opts) => {
  const { selector } = opts
  return {
    selector,
    defaults: {
      base: transformCss2Js(`${selector} {
        @apply fixed flex min-w-fit flex-col whitespace-nowrap;
      }
      `),
      styled: transformCss2Js(`${selector} {
        @apply gap-2 p-4;
        & > * {
          animation: toast-pop 0.25s ease-out;
        }
      }
      
      @keyframes toast-pop {
        0% {
          transform: scale(0.9);
          opacity: 0;
        }
        100% {
          transform: scale(1);
          opacity: 1;
        }
      }
      `),
      utils: transformCss2Js(`:where(${selector}) {
        @apply bottom-0 end-0 start-auto top-auto translate-x-0 translate-y-0;
      }
      ${selector}:where(${selector}-start) {
        @apply end-auto start-0 translate-x-0;
      }
      ${selector}:where(${selector}-center) {
        @apply end-1/2 start-1/2 -translate-x-1/2 rtl:translate-x-1/2;
      }
      ${selector}:where(${selector}-end) {
        @apply end-0 start-auto translate-x-0;
      }
      ${selector}:where(${selector}-bottom) {
        @apply bottom-0 top-auto translate-y-0;
      }
      ${selector}:where(${selector}-middle) {
        @apply bottom-auto top-1/2 -translate-y-1/2;
      }
      ${selector}:where(${selector}-top) {
        @apply bottom-auto top-0 translate-y-0;
      }
      `)
    }
  }
}

export default {
  schema
}
