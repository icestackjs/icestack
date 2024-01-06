import type { GetCssSchemaMethod } from '@/types'

const schema: GetCssSchemaMethod = (opts) => {
  const { selector, types } = opts
  return {
    selector,
    defaults: {
      styled: `${selector}s {
        ${selector} {
          grid-template-rows: 2.5rem 1fr;
          grid-template-columns: auto;
          min-width: 4rem;
          &:before {
            @apply bg-base-300 text-base-content top-0 col-start-1 row-start-1 h-2 w-full transform;
            content: "";
            margin-inline-start: -100%;
          }
        }
        ${selector} {
          &:after {
            content: counter(step);
            counter-increment: step;
            z-index: 1;
            @apply bg-base-300 text-base-content relative col-start-1 row-start-1 grid h-8 w-8 place-items-center place-self-center rounded-full;
          }
          &:first-child:before {
            content: none;
          }
          &[data-content]:after {
            content: attr(data-content);
          }
        }
        ${types
          .map((type) => {
            return `
            ${selector}-${type} + ${selector}-${type}:before,
        ${selector}-${type}:after {
          @apply bg-${type} text-${type}-content;
        }
            ${selector}-${type} + ${selector}-${type}:before,
            ${selector}-${type}:after {
              @apply bg-${type} text-${type}-content;
            }`
          })
          .join('\n')}
      }
      `,
      base: `${selector}s {
        @apply inline-grid grid-flow-col overflow-hidden overflow-x-auto;
        counter-reset: step;
        grid-auto-columns: 1fr;
        ${selector} {
          @apply grid grid-cols-1 grid-rows-2 place-items-center text-center;
        }
      }
      `,
      utils: `${selector}s {
        &-horizontal {
          ${selector} {
            grid-template-rows: 2.5rem 1fr;
            grid-template-columns: auto;
            min-width: 4rem;
            &:before {
              @apply h-2 w-full translate-x-0 translate-y-0 rtl:translate-x-0;
              content: "";
              margin-inline-start: -100%;
            }
          }
        }
        &-vertical {
          ${selector} {
            gap: 0.5rem;
            grid-template-columns: 2.5rem 1fr;
            grid-template-rows: auto;
            min-height: 4rem;
            justify-items: start;
            &:before {
              @apply h-full w-2 -translate-x-1/2 -translate-y-1/2 rtl:translate-x-1/2;
              margin-inline-start: 50%;
            }
          }
        }
      }

${selector}s {
  &-horizontal {
    grid-auto-columns: 1fr;
    @apply inline-grid grid-flow-col overflow-hidden overflow-x-auto;
    ${selector} {
      @apply grid grid-cols-1 grid-rows-2 place-items-center text-center;
      grid-template-rows: 2.5rem 1fr;
      grid-template-columns: auto;
      min-width: 4rem;
      &:before {
        @apply h-2 w-full translate-x-0 translate-y-0;
        content: "";
        margin-left: -100%;
      }
    }
  }
  &-vertical {
    grid-auto-rows: 1fr;
    @apply grid-flow-row;
    ${selector} {
      @apply grid grid-cols-2 grid-rows-1;
      gap: 0.5rem;
      grid-template-columns: 2.5rem 1fr;
      grid-template-rows: auto;
      min-height: 4rem;
      justify-items: start;
      &:before {
        @apply h-full w-2 -translate-x-1/2 -translate-y-1/2;
        margin-left: 50%;
        [dir="rtl"] & {
          margin-right: auto;
        }
      }
    }
  }
}

      `
    }
  }
}

export default {
  schema
}
