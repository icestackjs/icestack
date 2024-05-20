/* eslint-disable prettier/prettier */
import type { GetCssSchemaMethod } from '@/types'
import { css } from '@/types'

const schema: GetCssSchemaMethod = (opts) => {
  const { selector, types } = opts
  return {
    selector,
    defaults: {
      styled: css`
        ${selector} {
          appearance: none;
          -webkit-appearance: none;
          --range-shdw: theme(colors.base-content);
          @apply rounded-box overflow-hidden bg-transparent;
          &:focus-visible::-webkit-slider-thumb {
            --focus-shadow: 0 0 0 6px theme(colors.base-100) inset, 0 0 0 2rem var(--range-shdw) inset;
          }
          &:focus-visible::-moz-range-thumb {
            --focus-shadow: 0 0 0 6px theme(colors.base-100) inset, 0 0 0 2rem var(--range-shdw) inset;
          }
          &::-webkit-slider-runnable-track {
            @apply rounded-box bg-base-content/10 h-2 w-full;
          }
          &::-moz-range-track {
            @apply rounded-box bg-base-content/10 h-2 w-full;
          }
          &::-webkit-slider-thumb {
            @apply rounded-box bg-base-100 relative h-6 w-6 border-none;
            appearance: none;
            -webkit-appearance: none;
            top: 50%;
            color: var(--range-shdw);
            transform: translateY(-50%);
            --filler-size: 100rem;
            --filler-offset: 0.6rem;
            box-shadow:
              0 0 0 3px var(--range-shdw) inset,
              var(--focus-shadow, 0 0),
              calc(var(--filler-size) * -1 - var(--filler-offset)) 0 0 var(--filler-size);
          }
          &::-moz-range-thumb {
            @apply rounded-box bg-base-100 relative h-6 w-6 border-none;
            top: 50%;
            color: var(--range-shdw);
            --filler-size: 100rem;
            --filler-offset: 0.5rem;
            box-shadow:
              0 0 0 3px var(--range-shdw) inset,
              var(--focus-shadow, 0 0),
              calc(var(--filler-size) * -1 - var(--filler-offset)) 0 0 var(--filler-size);
          }
          ${types
            .map((type) => {
              return css`
                &-${type} {
                  --range-shdw: theme(colors.${type});
                }
              `
            })
            .join('\n')}
        }
      `,
      base: css`
        ${selector} {
          @apply h-6 w-full cursor-pointer;
          &:focus {
            outline: none;
          }
        }
      `,
      utils: css`
        ${selector} {
          &-xs {
            @apply h-4;
            &::-webkit-slider-runnable-track {
              @apply h-1;
            }
            &::-moz-range-track {
              @apply h-1;
            }
            &::-webkit-slider-thumb {
              @apply h-4 w-4;
              --filler-offset: 0.4rem;
            }
            &::-moz-range-thumb {
              @apply h-4 w-4;
              --filler-offset: 0.4rem;
            }
          }
          &-sm {
            @apply h-5;
            &::-webkit-slider-runnable-track {
              @apply h-1;
            }
            &::-moz-range-track {
              @apply h-1;
            }
            &::-webkit-slider-thumb {
              @apply h-5 w-5;
              --filler-offset: 0.5rem;
            }
            &::-moz-range-thumb {
              @apply h-5 w-5;
              --filler-offset: 0.5rem;
            }
          }
          &-md {
            @apply h-6;
            &::-webkit-slider-runnable-track {
              @apply h-2;
            }
            &::-moz-range-track {
              @apply h-2;
            }
            &::-webkit-slider-thumb {
              @apply h-6 w-6;
              --filler-offset: 0.6rem;
            }
            &::-moz-range-thumb {
              @apply h-6 w-6;
              --filler-offset: 0.6rem;
            }
          }
          &-lg {
            @apply h-8;
            &::-webkit-slider-runnable-track {
              @apply h-4;
            }
            &::-moz-range-track {
              @apply h-4;
            }
            &::-webkit-slider-thumb {
              @apply h-8 w-8;
              --filler-offset: 1rem;
            }
            &::-moz-range-thumb {
              @apply h-8 w-8;
              --filler-offset: 1rem;
            }
          }
        }
      `,
    },
  }
}

export default {
  schema,
}
