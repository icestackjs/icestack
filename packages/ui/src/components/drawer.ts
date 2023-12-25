import { transformCss2Js } from '@/shared'
import type { GetCssSchemaMethod } from '@/types'

const schema: GetCssSchemaMethod = (opts) => {
  const { selector } = opts
  return {
    selector,
    defaults: {
      base: transformCss2Js(`
      ${selector} {
        @apply relative grid;
        grid-auto-columns: max-content auto;
        &-content {
          @apply col-start-2 row-start-1 min-w-0;
        }
        &-side {
          @apply pointer-events-none fixed start-0 top-0 col-start-1 row-start-1 grid w-full grid-cols-1 grid-rows-1 items-start justify-items-start overflow-y-auto overscroll-contain;
          height: 100vh;
          height: 100dvh;
          & > ${selector}-overlay {
            @apply sticky top-0 place-self-stretch;
          }
          & > * {
            @apply col-start-1 row-start-1;
          }
          & > *:not(${selector}-overlay) {
            @apply transition-transform duration-300 ease-out will-change-transform;
            transform: translateX(-100%);
            [dir="rtl"] & {
              transform: translateX(100%);
            }
          }
        }
        &-toggle {
          @apply fixed h-0 w-0 appearance-none opacity-0;
          &:checked {
            & ~ ${selector}-side {
              @apply pointer-events-auto visible;
              & > *:not(${selector}-overlay) {
                transform: translateX(0%);
              }
            }
          }
        }
        &-end {
          grid-auto-columns: auto max-content;
          ${selector}-toggle {
            & ~ ${selector}-content {
              @apply col-start-1;
            }
            & ~ ${selector}-side {
              @apply col-start-2 justify-items-end;
            }
            & ~ ${selector}-side > *:not(${selector}-overlay) {
              transform: translateX(100%);
              [dir="rtl"] & {
                transform: translateX(-100%);
              }
            }
            &:checked ~ ${selector}-side > *:not(${selector}-overlay) {
              transform: translateX(0%);
            }
          }
        }
      }
      
      `),
      styled: transformCss2Js(`
      ${selector} {
        width: 100%;
        &-side {
          & > ${selector}-overlay {
            @apply cursor-pointer bg-transparent transition-colors duration-200 ease-out;
          }
        }
        &-toggle {
          &:checked ~ ${selector}-side {
            & > ${selector}-overlay {
              background-color: #0006;
            }
          }
          &:focus-visible ~ ${selector}-content label${selector}-button {
            @apply outline outline-2 outline-offset-2;
          }
        }
      }
      
      `),
      utils: transformCss2Js(`
      ${selector}-open > ${selector}-toggle {
        @apply hidden;
        & ~ ${selector}-side {
          @apply pointer-events-auto visible sticky block w-auto overscroll-auto;
          & > *:not(${selector}-overlay) {
            transform: translateX(0%);
            [dir="rtl"] & {
              transform: translateX(0%);
            }
          }
        }
        &:checked ~ ${selector}-side {
          @apply pointer-events-auto visible;
        }
      }
      

      ${selector}-open > ${selector}-toggle {
        & ~ ${selector}-side {
          & > ${selector}-overlay {
            @apply cursor-default bg-transparent;
          }
        }
      }
      
      `)
    }
  }
}

export default {
  schema
}
