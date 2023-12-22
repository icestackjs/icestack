import { transformCss2Js } from '@/shared'
import type { GetSchemaFn } from '@/shared'

const schema: GetSchemaFn = (opts) => {
  const { selector, types } = opts
  return {
    selector,
    defaults: {
      base: transformCss2Js(`${selector} {
        @apply relative inline-block;
        --tooltip-offset: calc(100% + 1px + var(--tooltip-tail, 0px));
      }
      ${selector}:before {
        @apply absolute;
        pointer-events: none;
        z-index: 1;
      }
      ${selector}:before {
        content: var(--tw-content);
        --tw-content: attr(data-tip);
      }
      ${selector},
      ${selector}-top {
        &:before {
          transform: translateX(-50%);
          top: auto;
          left: 50%;
          right: auto;
          bottom: var(--tooltip-offset);
        }
      }
      ${selector}-bottom {
        &:before {
          transform: translateX(-50%);
          top: var(--tooltip-offset);
          left: 50%;
          right: auto;
          bottom: auto;
        }
      }
      ${selector}-left {
        &:before {
          transform: translateY(-50%);
          top: 50%;
          left: auto;
          right: var(--tooltip-offset);
          bottom: auto;
        }
      }
      ${selector}-right {
        &:before {
          transform: translateY(-50%);
          top: 50%;
          left: var(--tooltip-offset);
          right: auto;
          bottom: auto;
        }
      }
      `),
      styled: transformCss2Js(`${selector} {
        @apply relative inline-block text-center;
        --tooltip-tail: 0.1875rem;
        --tooltip-color: theme(colors.neutral);
        --tooltip-text-color: theme(colors.neutral-content);
        --tooltip-tail-offset: calc(100% + 0.0625rem - var(--tooltip-tail));
      }
      ${selector}:before,
      ${selector}:after {
        @apply opacity-0 transition delay-100 duration-200 ease-in-out;
      }
      ${selector}:after {
        @apply absolute;
      }
      ${selector}:before {
        @apply max-w-xs rounded px-2 py-1 text-sm;
        background-color: var(--tooltip-color);
        color: var(--tooltip-text-color);
        width: max-content;
      }
      ${selector}${selector}-open:before,
      ${selector}${selector}-open:after,
      ${selector}:hover:before,
      ${selector}:hover:after {
        @apply opacity-100 delay-75;
      }
      ${selector}:has(:focus-visible):after,
      ${selector}:has(:focus-visible):before {
        @apply opacity-100 delay-75;
      }
      ${selector}:not([data-tip]):hover:before,
      ${selector}:not([data-tip]):hover:after {
        visibility: hidden;
        opacity: 0;
      }
      
      ${selector}:after {
        content: "";
        border-style: solid;
        border-width: var(--tooltip-tail, 0);
        width: 0;
        height: 0;
        display: block;
        position: absolute;
      }
      ${selector},
      ${selector}-top {
        &:after {
          transform: translateX(-50%);
          border-color: var(--tooltip-color) transparent transparent transparent;
          top: auto;
          left: 50%;
          right: auto;
          bottom: var(--tooltip-tail-offset);
        }
      }
      ${selector}-bottom {
        &:after {
          transform: translateX(-50%);
          border-color: transparent transparent var(--tooltip-color) transparent;
          top: var(--tooltip-tail-offset);
          left: 50%;
          right: auto;
          bottom: auto;
        }
      }
      ${selector}-left {
        &:after {
          transform: translateY(-50%);
          border-color: transparent transparent transparent var(--tooltip-color);
          top: 50%;
          left: auto;
          right: calc(var(--tooltip-tail-offset) + 0.0625rem);
          bottom: auto;
        }
      }
      ${selector}-right {
        &:after {
          transform: translateY(-50%);
          border-color: transparent var(--tooltip-color) transparent transparent;
          top: 50%;
          left: calc(var(--tooltip-tail-offset) + 0.0625rem);
          right: auto;
          bottom: auto;
        }
      }
      ${selector} {
        ${types
          .map((type) => {
            return `&-${type} {
              --tooltip-color: theme(colors.${type});
              --tooltip-text-color: theme(colors.${type}-content);
            }`
          })
          .join('\n')}
       
      }
      `),
      utils: transformCss2Js(``)
    }
  }
}

export default {
  schema
}
