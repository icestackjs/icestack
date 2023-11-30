import { transformCss2Js } from '@icestack/shared'
import { ComponentsValue } from '@/types'

const options: Partial<ComponentsValue> = {
  schema: ({ selector }) => {
    return {
      selector,
      defaults: {
        base: transformCss2Js(`.join {
          @apply inline-flex items-stretch;
          & :where(.join-item) {
            border-start-end-radius: 0;
            border-end-end-radius: 0;
            border-end-start-radius: 0;
            border-start-start-radius: 0;
          }
          & .join-item:not(:first-child):not(:last-child),
          & *:not(:first-child):not(:last-child) .join-item {
            border-start-end-radius: 0;
            border-end-end-radius: 0;
            border-end-start-radius: 0;
            border-start-start-radius: 0;
          }

          & .join-item:first-child:not(:last-child),
          & *:first-child:not(:last-child) .join-item {
            border-start-end-radius: 0;
            border-end-end-radius: 0;
          }

          & .join-item:first-child:not(:last-child),
          & *:first-child:not(:last-child) .join-item {
            border-end-start-radius: inherit;
            border-start-start-radius: inherit;
          }

          & .join-item:last-child:not(:first-child),
          & *:last-child:not(:first-child) .join-item {
            border-end-start-radius: 0;
            border-start-start-radius: 0;
          }

          & .join-item:last-child:not(:first-child),
          & *:last-child:not(:first-child) .join-item {
            border-start-end-radius: inherit;
            border-end-end-radius: inherit;
          }
        }
        `),
        styled: transformCss2Js(`${selector} {
          @apply rounded-btn;
          & > *:not(:first-child) {
            @apply my-0 -ms-px;
          }
          &-item:focus {
            @apply isolate;
          }
        }
        `),
        utils: transformCss2Js(`.join.join-vertical {
          @apply flex-col;
          & .join-item:first-child:not(:last-child),
          & *:first-child:not(:last-child) .join-item {
            border-end-start-radius: 0;
            border-end-end-radius: 0;
          }
          & .join-item:first-child:not(:last-child),
          & *:first-child:not(:last-child) .join-item {
            border-start-start-radius: inherit;
            border-start-end-radius: inherit;
          }
          & .join-item:last-child:not(:first-child),
          & *:last-child:not(:first-child) .join-item {
            border-start-start-radius: 0;
            border-start-end-radius: 0;
          }
          & .join-item:last-child:not(:first-child),
          & *:last-child:not(:first-child) .join-item {
            border-end-start-radius: inherit;
            border-end-end-radius: inherit;
          }
        }

        .join.join-horizontal {
          @apply flex-row;
          & .join-item:first-child:not(:last-child),
          & *:first-child:not(:last-child) .join-item {
            border-end-end-radius: 0;
            border-start-end-radius: 0;
          }
          & .join-item:first-child:not(:last-child),
          & *:first-child:not(:last-child) .join-item {
            border-end-start-radius: inherit;
            border-start-start-radius: inherit;
          }
          & .join-item:last-child:not(:first-child),
          & *:last-child:not(:first-child) .join-item {
            border-end-start-radius: 0;
            border-start-start-radius: 0;
          }
          & .join-item:last-child:not(:first-child),
          & *:last-child:not(:first-child) .join-item {
            border-end-end-radius: inherit;
            border-start-end-radius: inherit;
          }
        }

        ${selector}${selector}-vertical > *:not(:first-child) {
          @apply mx-0 -mt-px;
        }
        ${selector}${selector}-horizontal > *:not(:first-child) {
          @apply my-0 -ms-px;
        }

        `)
      }
    }
  }
}

export default options
