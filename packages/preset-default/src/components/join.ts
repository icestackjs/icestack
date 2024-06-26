import type { GetCssSchemaMethod } from '@/types'
import { css } from '@/types'

const schema: GetCssSchemaMethod = (opts) => {
  const { selector } = opts
  return {
    selector,
    defaults: {
      base: css`
        ${selector} {
          // @b
          @apply inline-flex items-stretch;
          & :where(${selector}-item) {
            border-start-end-radius: 0;
            border-end-end-radius: 0;
            border-end-start-radius: 0;
            border-start-start-radius: 0;
          }
          & ${selector}-item:not(:first-child):not(:last-child),
          & *:not(:first-child):not(:last-child) ${selector}-item {
            border-start-end-radius: 0;
            border-end-end-radius: 0;
            border-end-start-radius: 0;
            border-start-start-radius: 0;
          }

          & ${selector}-item:first-child:not(:last-child),
          & *:first-child:not(:last-child) ${selector}-item {
            border-start-end-radius: 0;
            border-end-end-radius: 0;
          }

          & .dropdown ${selector}-item:first-child:not(:last-child),
          & *:first-child:not(:last-child) .dropdown ${selector}-item {
            border-start-end-radius: inherit;
            border-end-end-radius: inherit;
          }

          & :where(${selector}-item:first-child:not(:last-child)),
          & :where(*:first-child:not(:last-child) ${selector}-item) {
            border-end-start-radius: inherit;
            border-start-start-radius: inherit;
          }

          & ${selector}-item:last-child:not(:first-child),
          & *:last-child:not(:first-child) ${selector}-item {
            border-end-start-radius: 0;
            border-start-start-radius: 0;
          }

          & :where(${selector}-item:last-child:not(:first-child)),
          & :where(*:last-child:not(:first-child) ${selector}-item) {
            border-start-end-radius: inherit;
            border-end-end-radius: inherit;
          }
        }

        @supports not selector(:has(*)) {
          :where(${selector} *) {
            @apply rounded-[inherit];
          }
        }

        @supports selector(:has(*)) {
          :where(${selector} *:has(${selector}-item)) {
            @apply rounded-[inherit];
          }
        }
      `,
      styled: css`
        ${selector} {
          @apply rounded-btn;
          & > :where(*:not(:first-child)) {
            @apply my-0 -ms-px;
          }
          &-item:focus {
            @apply isolate;
          }
        }
      `,
      utils: css`
        // @gv direction="vertical" ["${selector}-vertical"]

        ${selector}${selector}-vertical {
          @apply flex-col;
          & ${selector}-item:first-child:not(:last-child),
          & *:first-child:not(:last-child) ${selector}-item {
            border-end-start-radius: 0;
            border-end-end-radius: 0;
          }
          & ${selector}-item:first-child:not(:last-child),
          & *:first-child:not(:last-child) ${selector}-item {
            border-start-start-radius: inherit;
            border-start-end-radius: inherit;
          }
          & ${selector}-item:last-child:not(:first-child),
          & *:last-child:not(:first-child) ${selector}-item {
            border-start-start-radius: 0;
            border-start-end-radius: 0;
          }
          & ${selector}-item:last-child:not(:first-child),
          & *:last-child:not(:first-child) ${selector}-item {
            border-end-start-radius: inherit;
            border-end-end-radius: inherit;
          }
        }

        // @gv direction="horizontal" ["${selector}-horizontal"]

        ${selector}${selector}-horizontal {
          @apply flex-row;
          & ${selector}-item:first-child:not(:last-child),
          & *:first-child:not(:last-child) ${selector}-item {
            border-end-end-radius: 0;
            border-start-end-radius: 0;
          }
          & ${selector}-item:first-child:not(:last-child),
          & *:first-child:not(:last-child) ${selector}-item {
            border-end-start-radius: inherit;
            border-start-start-radius: inherit;
          }
          & ${selector}-item:last-child:not(:first-child),
          & *:last-child:not(:first-child) ${selector}-item {
            border-end-start-radius: 0;
            border-start-start-radius: 0;
          }
          & ${selector}-item:last-child:not(:first-child),
          & *:last-child:not(:first-child) ${selector}-item {
            border-end-end-radius: inherit;
            border-start-end-radius: inherit;
          }
        }
        ${selector}${selector}-vertical > :where(*:not(:first-child)) {
          @apply mx-0 -mt-px;
        }
        ${selector}${selector}-horizontal > :where(*:not(:first-child)) {
          @apply my-0 -ms-px;
        }
      `,
    },
  }
}

export default {
  schema,
}
