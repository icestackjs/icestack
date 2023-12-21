import { transformCss2Js } from './shared'
import type { GetSchemaFn } from './shared'

const schema: GetSchemaFn = (opts) => {
  const { selector } = opts
  return {
    selector,
    defaults: {
      base: transformCss2Js(`
      ${selector} {
        @apply grid w-full place-items-center bg-cover bg-center;
        & > * {
          @apply col-start-1 row-start-1;
        }
        &-overlay {
          @apply col-start-1 row-start-1 h-full w-full;
        }
        &-content {
          @apply z-0 flex items-center justify-center;
        }
      }
      `),
      styled: transformCss2Js(`
      ${selector} {
        &-overlay {
          @apply bg-neutral bg-opacity-50;
        }
        &-content {
          @apply max-w-7xl gap-4 p-4;
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
