import { transformCss2Js } from '@/shared'
import type { GetSchemaFn } from '@/types'

const schema: GetSchemaFn = (opts) => {
  const { selector } = opts
  return {
    selector,
    defaults: {
      base: transformCss2Js(`
      ${selector} {
        @apply fixed bottom-0 left-0 right-0 flex w-full flex-row items-center justify-around;
        padding-bottom: env(safe-area-inset-bottom);
        & > * {
          @apply relative flex h-full basis-full cursor-pointer flex-col items-center justify-center gap-1;
        }
      }
      
      `),
      styled: transformCss2Js(`
      ${selector} {
        @apply bg-base-100 h-16 text-current;
        & > * {
          @apply border-current;
      
          &:not(.active) {
            @apply pt-0.5;
          }
      
          /* active */
          &:where(.active) {
            @apply bg-base-100 border-t-2;
          }
      
          /* disabled */
          &.disabled,
          &[disabled] {
            @apply bg-neutral text-base-content pointer-events-none border-opacity-0 bg-opacity-10 text-opacity-20;
          }
          @media (hover: hover) {
            &.disabled:hover,
            &[disabled]:hover {
              @apply bg-neutral text-base-content pointer-events-none border-opacity-0 bg-opacity-10 text-opacity-20;
            }
          }
          .label {
            @apply text-base;
          }
        }
      }
      
      `),
      utils: transformCss2Js(`
      ${selector} {
        &-xs {
          @apply h-10;
          & > *:where(.active) {
            @apply border-t-[1px];
          }
          ${selector}-label {
            @apply text-xs;
          }
        }
        &-sm {
          @apply h-12;
          & > *:where(.active) {
            @apply border-t-2;
          }
          ${selector}-label {
            @apply text-xs;
          }
        }
        &-md {
          @apply h-16;
          & > *:where(.active) {
            @apply border-t-2;
          }
          ${selector}-label {
            @apply text-sm;
          }
        }
        &-lg {
          @apply h-20;
          & > *:where(.active) {
            @apply border-t-4;
          }
          ${selector}-label {
            @apply text-base;
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
