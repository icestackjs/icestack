import { transformCss2Js } from './shared'
import type { GetCssSchemaMethod } from './shared'

const schema: GetCssSchemaMethod = (opts) => {
  const { selector } = opts
  return {
    selector,
    defaults: {
      base: transformCss2Js(`
      ${selector}s {
        @apply inline-grid;
      }
      :where(${selector}s) {
        @apply grid-flow-col;
      }
      ${selector} {
        @apply inline-grid w-full;
        grid-template-columns: repeat(1, 1fr);
        &-figure {
          @apply col-start-2 row-span-3 row-start-1 place-self-center justify-self-end;
        }
        &-title {
          @apply col-start-1 whitespace-nowrap;
        }
        &-value {
          @apply col-start-1 whitespace-nowrap;
        }
        &-desc {
          @apply col-start-1 whitespace-nowrap;
        }
        &-actions {
          @apply col-start-1 whitespace-nowrap;
        }
      }
      `),
      styled: transformCss2Js(`
      ${selector}s {
        @apply bg-base-100 text-base-content rounded-box;
      }
      :where(${selector}s) {
        @apply divide-x divide-y-0 overflow-x-auto;
      }
      :is([dir="rtl"] ${selector}s > :not([hidden]) ~ :not([hidden])) {
        --tw-divide-x-reverse: 1;
      }
      ${selector} {
        @apply border-base-content gap-x-4 border-opacity-10 px-6 py-4;
        &-title {
          @apply text-base-content/60;
        }
        &-value {
          @apply text-4xl font-extrabold;
        }
        &-desc {
          @apply text-base-content/60 text-xs;
        }
        &-actions {
          @apply mt-4;
        }
      }
      `),
      utils: transformCss2Js(`
      ${selector}s-horizontal {
        @apply grid-flow-col;
      }
      ${selector}s-vertical {
        @apply grid-flow-row;
      }
      
      ${selector}s-horizontal {
        @apply divide-x divide-y-0 overflow-x-auto rtl:[--tw-divide-x-reverse:1];
      }
      ${selector}s-vertical {
        @apply divide-x-0 divide-y overflow-y-auto;
      }
      
      `)
    }
  }
}

export default {
  schema
}
