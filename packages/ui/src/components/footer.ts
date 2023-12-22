import { transformCss2Js } from '@/shared'
import type { GetSchemaFn } from '@/types'

const schema: GetSchemaFn = (opts) => {
  const { selector } = opts
  return {
    selector,
    defaults: {
      base: transformCss2Js(`
      ${selector} {
        @apply grid w-full grid-flow-row place-items-start;
        & > * {
          @apply grid place-items-start;
        }
        &-center {
          @apply place-items-center text-center;
          & > * {
            @apply place-items-center;
          }
        }
      }
      @media (min-width: 48rem) {
        ${selector} {
          grid-auto-flow: column;
        }
        ${selector}-center {
          grid-auto-flow: row dense;
        }
      }
      
      `),
      styled: transformCss2Js(`
      ${selector} {
        @apply gap-x-4 gap-y-10 text-sm;
        & > * {
          @apply gap-2;
        }
        &-title {
          @apply mb-2 font-bold uppercase opacity-60;
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
