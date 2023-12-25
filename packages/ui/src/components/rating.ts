import { transformCss2Js } from '@/shared'
import type { GetCssSchemaMethod } from '@/types'

const schema: GetCssSchemaMethod = (opts) => {
  const { selector } = opts
  return {
    selector,
    defaults: {
      base: transformCss2Js(`
      ${selector} {
        @apply relative inline-flex;
        :where(input) {
          @apply cursor-pointer rounded-none;
        }
      }
      
      `),
      styled: transformCss2Js(`
      ${selector} {
        & input {
          @apply appearance-none;
          -webkit-appearance: none;
        }
        :where(input) {
          animation: rating-pop var(--animation-input, 0.25s) ease-out;
          @apply bg-base-content h-6 w-6 bg-opacity-100;
        }
        & ${selector}-hidden {
          @apply w-2 bg-transparent;
        }
        input[type="radio"]:checked {
          background-image: none;
        }
        input:checked ~ input,
        input[aria-checked="true"] ~ input {
          @apply bg-opacity-20;
        }
        input:focus-visible {
          @apply transition-transform duration-300 ease-out;
          transform: translateY(-0.125em);
        }
      
        & input:active:focus {
          animation: none;
        }
      
        & input:active:focus {
          transform: translateY(-0.125em);
        }
      }
      ${selector}-half {
        :where(input:not(${selector}-hidden)) {
          @apply w-3;
        }
      }
      
      @keyframes rating-pop {
        0% {
          transform: translateY(-0.125em);
        }
        40% {
          transform: translateY(-0.125em);
        }
        100% {
          transform: translateY(0);
        }
      }
      
      `),
      utils: transformCss2Js(`
      ${selector}-xs input {
        @apply h-3 w-3;
      }
      ${selector}-sm input {
        @apply h-4 w-4;
      }
      ${selector}-md input {
        @apply h-6 w-6;
      }
      ${selector}-lg input {
        @apply h-10 w-10;
      }
      
      ${selector}-half {
        &${selector}-xs input:not(${selector}-hidden) {
          @apply w-1.5;
        }
        &${selector}-sm input:not(${selector}-hidden) {
          @apply w-2;
        }
        &${selector}-md input:not(${selector}-hidden) {
          @apply w-3;
        }
        &${selector}-lg input:not(${selector}-hidden) {
          @apply w-5;
        }
      }
      
      `)
    }
  }
}

export default {
  schema
}
