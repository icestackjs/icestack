import dedent from 'dedent'
import { transformCss2Js } from '@/shared'
import type { GetCssSchemaMethod } from '@/types'

const schema: GetCssSchemaMethod = (opts) => {
  const { selector, types } = opts
  return {
    selector,
    defaults: {
      base: transformCss2Js(`
      ${selector} {
        @apply h-12 shrink pe-4 text-sm leading-loose;
        &::file-selector-button {
          @apply me-4 inline-flex h-full shrink-0 cursor-pointer select-none flex-wrap items-center justify-center px-4 text-center text-sm transition duration-200 ease-out;
          line-height: 1em;
        }
      }
      
      `),
      styled: transformCss2Js(`
      ${selector} {
        @apply border-base-content bg-base-100 rounded-btn overflow-hidden border border-opacity-0 text-base;
        &::file-selector-button {
          border-style: solid;
          @apply border-neutral bg-neutral text-neutral-content font-semibold uppercase no-underline;
          border-width: var(--border-btn, 1px);
          animation: button-pop var(--animation-btn, 0.25s) ease-out;
        }
        &-bordered {
          @apply border-opacity-20;
        }
        &:focus {
          @apply outline-base-content/20 outline outline-2 outline-offset-2;
        }
        &-ghost {
          @apply bg-opacity-5;
          &:focus {
            @apply text-base-content bg-opacity-100;
            box-shadow: none;
          }
          &::file-selector-button {
            @apply border border-transparent bg-transparent text-current;
          }
        }
        ${types
          .map((type) => {
            return dedent`
            &-${type} {
              @apply border-${type};
              &:focus {
                @apply outline-${type};
              }
              &::file-selector-button {
                @apply border-${type} bg-${type} text-${type}-content;
              }
            }
            `
          })
          .join('\n')}

        &-disabled,
        &[disabled] {
          @apply border-base-200 bg-base-200 placeholder-base-content cursor-not-allowed text-opacity-20 placeholder-opacity-20;
          &::file-selector-button {
            @apply bg-neutral text-base-content border-opacity-0 bg-opacity-20 text-opacity-20;
          }
        }
      }
      
      `),
      utils: transformCss2Js(`
      ${selector} {
        &-xs {
          @apply h-6 pe-2 text-xs leading-relaxed;
          &::file-selector-button {
            @apply mr-2;
            font-size: 0.75rem;
          }
        }
        &-sm {
          @apply h-8 pe-3 text-sm leading-loose;
          &::file-selector-button {
            @apply mr-3;
            font-size: 0.875rem;
          }
        }
        &-md {
          @apply h-12 pe-4 text-sm leading-loose;
          &::file-selector-button {
            @apply mr-4;
            font-size: 0.875rem;
          }
        }
        &-lg {
          @apply h-16 pe-6 text-lg leading-loose;
          &::file-selector-button {
            @apply mr-6;
            font-size: 1.125rem;
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
