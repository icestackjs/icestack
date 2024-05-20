import type { GetCssSchemaMethod } from '@/types'
import { css } from '@/types'

const schema: GetCssSchemaMethod = (opts) => {
  const { selector } = opts
  return {
    selector,
    defaults: {
      base: css`
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
      `,
      styled: css`
        ${selector} {
          @apply gap-x-4 gap-y-10 text-sm;
          & > * {
            @apply gap-2;
          }
          &-title {
            @apply mb-2 font-bold uppercase opacity-60;
          }
        }
      `,
    },
  }
}

export default {
  schema,
}
