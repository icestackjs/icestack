import { transformCss2Js } from '@/shared'
import type { GetCssSchemaMethod } from '@/types'

const schema: GetCssSchemaMethod = (opts) => {
  const { selector } = opts
  return {
    selector,
    defaults: {
      base: transformCss2Js(`
      ${selector}s {
        @apply grid items-end;
      }
      ${selector}s-lifted {
        &:has(${selector}-content[class^="rounded-"]) ${selector}:first-child:not(${selector}-active),
        &:has(${selector}-content[class*=" rounded-"]) ${selector}:first-child:not(${selector}-active) {
          @apply border-b-transparent;
        }
      }
      ${selector} {
        @apply relative row-start-1 inline-flex h-8 cursor-pointer select-none appearance-none flex-wrap items-center justify-center text-center text-sm leading-loose;
        --tab-padding: 1rem;
        &:is(input[type="radio"]) {
          @apply w-auto rounded-b-none;
          &:after {
            --tw-content: attr(aria-label);
            content: var(--tw-content);
          }
        }
        &:not(input):empty {
          @apply cursor-default;
          grid-column-start: span 9999;
        }
      }
      ${selector}-content {
        @apply col-start-1 col-end-[span_9999] row-start-2 -mt-[--tab-border] hidden border-transparent;
        border-width: var(--tab-border, 0);
        :checked + &:nth-child(2),
        ${selector}-active + &:nth-child(2) {
          @apply rounded-ss-none;
        }
      }
      input${selector}:checked + ${selector}-content,
      ${selector}-active + ${selector}-content {
        @apply block;
      }
      
      `),
      styled: transformCss2Js(`
      ${selector}s-lifted > ${selector}:focus-visible {
        border-end-end-radius: 0;
        border-end-start-radius: 0;
      }
      ${selector} {
        @apply text-opacity-50 [@media(hover:hover)]:hover:text-opacity-100;
        --tab-color: theme(colors.base-content);
        --tab-bg: theme(colors.base-100);
        --tab-border-color: theme(colors.base-300);
        color: var(--tab-color);
        padding-inline-start: var(--tab-padding, 1rem);
        padding-inline-end: var(--tab-padding, 1rem);
        &${selector}-active:not(${selector}-disabled):not([disabled]),
        &:is(input:checked) {
          @apply border-base-content border-opacity-100 text-opacity-100;
        }
        &:focus {
          @apply outline-none;
        }
        &:focus-visible {
          outline: 2px solid currentColor;
          outline-offset: -5px;
        }
        /* disabled */
        &-disabled,
        &[disabled] {
          @apply text-base-content cursor-not-allowed text-opacity-20;
        }
        @media (hover: hover) {
          &[disabled],
          &[disabled]:hover {
            @apply text-base-content cursor-not-allowed text-opacity-20;
          }
        }
      }
      ${selector}s-bordered > ${selector} {
        @apply border-base-content border-opacity-20;
        border-style: solid;
        border-bottom-width: calc(var(--tab-border, 1px) + 1px);
      }
      ${selector}s-lifted > ${selector} {
        border: var(--tab-border, 1px) solid transparent;
        border-width: 0 0 var(--tab-border, 1px) 0;
        border-start-start-radius: var(--tab-radius, 0.5rem);
        border-start-end-radius: var(--tab-radius, 0.5rem);
        border-bottom-color: var(--tab-border-color);
        padding-inline-start: var(--tab-padding, 1rem);
        padding-inline-end: var(--tab-padding, 1rem);
        padding-top: var(--tab-border, 1px);
        &${selector}-active:not(${selector}-disabled):not([disabled]),
        &:is(input:checked) {
          background-color: var(--tab-bg);
          border-width: var(--tab-border, 1px) var(--tab-border, 1px) 0 var(--tab-border, 1px);
          border-inline-start-color: var(--tab-border-color);
          border-inline-end-color: var(--tab-border-color);
          border-top-color: var(--tab-border-color);
          padding-inline-start: calc(var(--tab-padding, 1rem) - var(--tab-border, 1px));
          padding-inline-end: calc(var(--tab-padding, 1rem) - var(--tab-border, 1px));
          padding-bottom: var(--tab-border, 1px);
          padding-top: 0;
          &:before {
            z-index: 1;
            content: "";
            display: block;
            position: absolute;
            width: calc(100% + var(--tab-radius, 0.5rem) * 2);
            height: var(--tab-radius, 0.5rem);
            bottom: 0;
            background-size: var(--tab-radius, 0.5rem);
            background-position:
              top left,
              top right;
            background-repeat: no-repeat;
            --tab-grad: calc(69% - var(--tab-border, 1px));
            --radius-start: radial-gradient(
              circle at top left,
              transparent var(--tab-grad),
              var(--tab-border-color) calc(var(--tab-grad) + 0.25px),
              var(--tab-border-color) calc(var(--tab-grad) + var(--tab-border, 1px)),
              var(--tab-bg) calc(var(--tab-grad) + var(--tab-border, 1px) + 0.25px)
            );
            --radius-end: radial-gradient(
              circle at top right,
              transparent var(--tab-grad),
              var(--tab-border-color) calc(var(--tab-grad) + 0.25px),
              var(--tab-border-color) calc(var(--tab-grad) + var(--tab-border, 1px)),
              var(--tab-bg) calc(var(--tab-grad) + var(--tab-border, 1px) + 0.25px)
            );
            background-image: var(--radius-start), var(--radius-end);
          }
      
          &:first-child:before {
            background-image: var(--radius-end);
            background-position: top right;
            [dir="rtl"] & {
              background-image: var(--radius-start);
              background-position: top left;
            }
          }
          &:last-child:before {
            background-image: var(--radius-start);
            background-position: top left;
            [dir="rtl"] & {
              background-image: var(--radius-end);
              background-position: top right;
            }
          }
        }
      }
      ${selector}s-lifted >
        ${selector}-active:not(${selector}-disabled):not([disabled])
        + ${selector}s-lifted
        ${selector}-active:not(${selector}-disabled):not([disabled]),
      ${selector}s-lifted > ${selector}:is(input:checked) + ${selector}s-lifted ${selector}:is(input:checked) {
        &:before {
          background-image: var(--radius-end);
          background-position: top right;
        }
      }
      ${selector}s-boxed {
        @apply bg-base-200 rounded-btn p-1;
        ${selector} {
          @apply rounded-btn;
        }
        ${selector}-active:not(${selector}-disabled):not([disabled]),
        :is(input:checked) {
          @apply bg-primary text-primary-content [@media(hover:hover)]:hover:text-primary-content;
        }
      }
      
      `),
      utils: transformCss2Js(`
      ${selector}s-md :where(${selector}) {
        @apply h-8 text-sm leading-loose;
        --tab-padding: 1rem;
      }
      ${selector}s-lg :where(${selector}) {
        @apply h-12 text-lg leading-loose;
        --tab-padding: 1.25rem;
      }
      ${selector}s-sm :where(${selector}) {
        @apply h-6 text-sm leading-3;
        --tab-padding: 0.75rem;
      }
      ${selector}s-xs :where(${selector}) {
        @apply h-5 text-xs leading-3;
        --tab-padding: 0.5rem;
      }
      
      `)
    }
  }
}

export default {
  schema
}
