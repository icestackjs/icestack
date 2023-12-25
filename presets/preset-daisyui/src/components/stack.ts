import { transformCss2Js } from './shared'
import type { GetCssSchemaMethod } from './shared'

const schema: GetCssSchemaMethod = (opts) => {
  const { selector } = opts
  return {
    selector,
    defaults: {
      base: transformCss2Js(`
      .stack {
        @apply inline-grid;
        & > * {
          @apply col-start-1 row-start-1;
        }
        & > * {
          transform: translateY(10%) scale(0.9);
          z-index: 1;
        }
        & > *:nth-child(2) {
          transform: translateY(5%) scale(0.95);
          z-index: 2;
        }
        & > *:nth-child(1) {
          transform: translateY(0) scale(1);
          z-index: 3;
        }
      }
      
      `),
      styled: transformCss2Js(`
      .stack {
        @apply place-items-center items-end;
        & > * {
          @apply w-full;
        }
        & > * {
          @apply opacity-60;
        }
        & > *:nth-child(2) {
          @apply opacity-80;
        }
        & > *:nth-child(1) {
          @apply opacity-100;
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
