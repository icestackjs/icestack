import type { ComponentsValue } from '@/types'

const options: Partial<ComponentsValue> = {
  schema: ({ selector }) => {
    return {
      selector,
      defaults: {
        /* 提升优先级 */
        base: `
      
        ${selector}:not(.td):not(.tr):not(.colgroup) {
          @apply visible;
        }
        ${selector} {
          @apply relative grid overflow-hidden;
          grid-template-rows: auto 0fr;
          transition: grid-template-rows 0.2s;
        }
        ${selector}-title,
        ${selector}-content {
          @apply col-start-1 row-start-1;
        }
        ${selector}-content {
          @apply invisible col-start-1 row-start-2 min-h-0;
          transition: visibility 0.2s;
        }

        ${selector}-open {
          grid-template-rows: auto 1fr;
        }


        ${selector}-open > ${selector}-content {
          @apply visible min-h-fit;
        }
        `,
        styled: `${selector} {
          @apply rounded-box w-full;
        }

        ${selector}-title {
          @apply relative;
        }

        ${selector}-title {
          @apply w-full;
          transition: background-color 0.2s ease-out;
        }

        ${selector}-content {
          transition:
            padding 0.2s ease-out,
            background-color 0.2s ease-out;
        }

        ${selector}-open > ${selector}-content {
          @apply pb-2;
          transition:
            padding 0.2s ease-out,
            background-color 0.2s ease-out;
        }
        `,
      },
    }
  },
}

export default options
