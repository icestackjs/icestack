import { transformCss2Js } from './shared'
import type { GetSchemaFn } from './shared'

const schema: GetSchemaFn = (opts) => {
  const { selector } = opts
  return {
    selector,
    defaults: {
      base: transformCss2Js(`
      .indicator {
        @apply relative inline-flex;
        width: max-content;
        & :where(.indicator-item) {
          z-index: 1;
          @apply absolute transform whitespace-nowrap;
        }
      }
      `),
      styled: transformCss2Js(`
      .indicator {
        & :where(.indicator-item) {
          @apply bottom-auto end-0 start-auto top-0 -translate-y-1/2 translate-x-1/2 rtl:-translate-x-1/2;
        }
        & :where(.indicator-item.indicator-start) {
          @apply end-auto start-0 -translate-x-1/2 rtl:translate-x-1/2;
        }
        & :where(.indicator-item.indicator-center) {
          @apply end-1/2 start-1/2 -translate-x-1/2 rtl:translate-x-1/2;
        }
        & :where(.indicator-item.indicator-end) {
          @apply end-0 start-auto translate-x-1/2 rtl:-translate-x-1/2;
        }
        & :where(.indicator-item.indicator-bottom) {
          @apply bottom-0 top-auto translate-y-1/2;
        }
        & :where(.indicator-item.indicator-middle) {
          @apply bottom-1/2 top-1/2 -translate-y-1/2;
        }
        & :where(.indicator-item.indicator-top) {
          @apply bottom-auto top-0 -translate-y-1/2;
        }
      }
      
      `),
      utils: transformCss2Js(``)
    }
  }
}

export default {
  schema
}
