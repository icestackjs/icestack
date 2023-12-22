import { transformCss2Js } from '@/shared'
import type { GetSchemaFn } from '@/types'
/**
 * @deprecated
 * @param opts
 * @returns
 */
const schema: GetSchemaFn = (opts) => {
  const { selector } = opts
  return {
    selector,
    defaults: {
      styled: transformCss2Js(`${selector} {
        @apply text-opacity-50 [@media(hover:hover)]:hover:text-opacity-100;
        --tab-color: rgba(var(--base-content) / var(--tw-text-opacity, 1));
        --tab-bg: rgba(var(--base-400) / var(--tw-bg-opacity, 1));
        --tab-border-color: rgba(var(--base-500) / var(--tw-bg-opacity, 1));
        color: var(--tab-color);
        padding-left: var(--tab-padding, 1rem);
        padding-right: var(--tab-padding, 1rem);
        &${selector}-active:not(${selector}-disabled):not([disabled]) {
          @apply border-base-content border-opacity-100 text-opacity-100;
        }
        &:focus {
          @apply outline-none;
        }
        &:focus-visible {
          outline: 2px solid currentColor;
          outline-offset: -3px;
          &${selector}-lifted {
            border-bottom-right-radius: var(--tab-radius, 0.5rem);
            border-bottom-left-radius: var(--tab-radius, 0.5rem);
          }
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
      ${selector}-bordered {
        @apply border-base-content border-opacity-20;
        border-style: solid;
        border-bottom-width: calc(var(--tab-border, 1px) + 1px);
      }
      ${selector}-lifted {
        border: var(--tab-border, 1px) solid transparent;
        border-width: 0 0 var(--tab-border, 1px) 0;
        border-top-left-radius: var(--tab-radius, 0.5rem);
        border-top-right-radius: var(--tab-radius, 0.5rem);
        border-bottom-color: var(--tab-border-color);
        padding-left: var(--tab-padding, 1rem);
        padding-right: var(--tab-padding, 1rem);
        padding-top: var(--tab-border, 1px);
        &${selector}-active:not(${selector}-disabled):not([disabled]) {
          background-color: var(--tab-bg);
          border-width: var(--tab-border, 1px) var(--tab-border, 1px) 0 var(--tab-border, 1px);
          border-left-color: var(--tab-border-color);
          border-right-color: var(--tab-border-color);
          border-top-color: var(--tab-border-color);
          padding-left: calc(var(--tab-padding, 1rem) - var(--tab-border, 1px));
          padding-right: calc(var(--tab-padding, 1rem) - var(--tab-border, 1px));
          padding-bottom: var(--tab-border, 1px);
          padding-top: 0;
          &:before,
          &:after {
            z-index: 1;
            content: "";
            display: block;
            position: absolute;
            width: var(--tab-radius, 0.5rem);
            height: var(--tab-radius, 0.5rem);
            bottom: 0;
            --tab-grad: calc(68% - var(--tab-border, 1px));
            --tab-corner-bg: radial-gradient(
              circle at var(--circle-pos),
              transparent var(--tab-grad),
              var(--tab-border-color) calc(var(--tab-grad) + 0.3px),
              var(--tab-border-color) calc(var(--tab-grad) + var(--tab-border, 1px)),
              var(--tab-bg) calc(var(--tab-grad) + var(--tab-border, 1px) + 0.3px)
            );
          }
          &:before {
            left: calc(var(--tab-radius, 0.5rem) * -1);
            --circle-pos: top left;
            background-image: var(--tab-corner-bg);
            /* RTL quick fix */
            [dir="rtl"] & {
              --circle-pos: top right;
            }
          }
          &:after {
            right: calc(var(--tab-radius, 0.5rem) * -1);
            --circle-pos: top right;
            background-image: var(--tab-corner-bg);
            /* RTL quick fix */
            [dir="rtl"] & {
              --circle-pos: top left;
            }
          }
          &:first-child:before {
            background: none;
          }
          &:last-child:after {
            background: none;
          }
        }
      }
      ${selector}-lifted${selector}-active:not(${selector}-disabled):not([disabled])
        + ${selector}-lifted${selector}-active:not(${selector}-disabled):not([disabled]) {
        &:before {
          background: none;
        }
      }
      ${selector}s-boxed {
        @apply bg-base-200 rounded-btn p-1;
        ${selector} {
          @apply rounded-btn;
        }
        ${selector}-active:not(${selector}-disabled):not([disabled]) {
          @apply bg-primary text-primary-content [@media(hover:hover)]:hover:text-primary-content;
        }
      }`),
      base: transformCss2Js(`${selector}s {
        @apply flex flex-wrap items-end;
      }
      ${selector} {
        @apply relative inline-flex cursor-pointer select-none flex-wrap items-center justify-center text-center;
        @apply h-8 text-sm leading-loose;
        --tab-padding: 1rem;
      }`),
      utils: transformCss2Js(`${selector}-border-none {
        --tab-border: 0px;
      }
      ${selector}-border {
        --tab-border: 1px;
      }
      ${selector}-border-2 {
        --tab-border: 2px;
      }
      ${selector}-border-3 {
        --tab-border: 3px;
      }
      ${selector}-rounded-none {
        --tab-radius: 0;
      }
      ${selector}-rounded-lg {
        --tab-radius: 0.5rem;
      }`)
    }
  }
}

export default {
  schema
}
