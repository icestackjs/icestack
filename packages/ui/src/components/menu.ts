import { transformCss2Js } from '@/postcss'
import type { GetCssSchemaMethod } from '@/types'
const schema: GetCssSchemaMethod = (opts) => {
  const { selector } = opts
  return {
    selector,
    defaults: {
      base: transformCss2Js(`
      ${selector} {
        @apply flex flex-col flex-wrap text-sm;
        :where(li ul) {
          @apply relative whitespace-nowrap;
        }
        :where(li:not(${selector}-title) > *:not(ul):not(details):not(${selector}-title)),
        :where(li:not(${selector}-title) > details > summary:not(${selector}-title)) {
          @apply grid grid-flow-col content-start items-center gap-2;
          grid-auto-columns: minmax(auto, max-content) auto max-content;
          user-select: none;
        }
        & li.disabled {
          @apply cursor-not-allowed select-none;
        }
        :where(li > ${selector}-dropdown:not(${selector}-dropdown-show)) {
          @apply hidden;
        }
      }
      :where(${selector} li) {
        @apply relative flex shrink-0 flex-col flex-wrap items-stretch;
        .badge {
          @apply justify-self-end;
        }
      }
      
      
      `),
      styled: transformCss2Js(`
      ${selector} {
        @apply p-2;
      }
      :where(${selector} li:empty) {
        @apply bg-base-content opacity-10;
        margin: 0.5rem 1rem;
        height: 1px;
      }
      ${selector} :where(li ul) {
        @apply ms-4 ps-2;
        &:before {
          @apply bg-base-content absolute bottom-3 start-0 top-3 w-px opacity-10;
          content: "";
        }
      }
      ${selector} :where(li:not(${selector}-title) > *:not(ul):not(details):not(${selector}-title)),
      ${selector} :where(li:not(${selector}-title) > details > summary:not(${selector}-title)) {
        @apply rounded-btn px-4 py-2 text-start transition duration-200 ease-out;
        text-wrap: balance;
      }
      
      :where(${selector} li:not(${selector}-title):not(.disabled) > *:not(ul):not(details):not(${selector}-title)),
      :where(${selector} li:not(${selector}-title):not(.disabled) > details > summary:not(${selector}-title)) {
        &:not(summary):not(.active).focus,
        &:not(summary):not(.active):focus,
        &:is(summary):not(.active):focus-visible {
          @apply bg-base-content/10 text-base-content cursor-pointer outline-none;
        }
        @media (hover: hover) {
          &:not(.active):hover {
            @apply cursor-pointer outline-none;
            @supports (color: oklch(0 0 0)) {
              @apply bg-base-content/10;
            }
          }
        }
      }
      
      ${selector} li > *:not(ul):not(${selector}-title):not(details):active,
      ${selector} li > *:not(ul):not(${selector}-title):not(details).active,
      ${selector} li > details > summary:active {
        @apply bg-neutral text-neutral-content [@media(hover:hover)]:bg-neutral [@media(hover:hover)]:text-neutral-content;
      }
      
      ${selector} li.disabled {
        @apply text-base-content/30;
      }
      ${selector} :where(li > details > summary)::-webkit-details-marker {
        @apply hidden;
      }
      ${selector} :where(li > details > summary):after,
      ${selector} :where(li > ${selector}-dropdown-toggle):after {
        @apply justify-self-end;
        display: block;
        margin-top: -0.5rem;
        height: 0.5rem;
        width: 0.5rem;
        transform: rotate(45deg);
        transition-property: transform, margin-top;
        transition-duration: 0.3s;
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        content: "";
        transform-origin: 75% 75%;
        box-shadow: 2px 2px;
        pointer-events: none;
      }
      ${selector} :where(li > details[open] > summary):after,
      ${selector} :where(li > ${selector}-dropdown-toggle${selector}-dropdown-show):after {
        transform: rotate(225deg);
        margin-top: 0;
      }
      ${selector}-title {
        @apply text-base-content/40 px-4 py-2 text-sm font-bold;
      }
      
      `),
      utils: transformCss2Js(`
      ${selector}-horizontal {
        @apply inline-flex flex-row;
        & > li:not(${selector}-title) > details > ul {
          @apply absolute;
        }
      }
      ${selector}-vertical {
        @apply flex flex-col;
        & > li:not(${selector}-title) > details > ul {
          @apply relative;
        }
      }
      
      ${selector}-horizontal {
        & > li:not(${selector}-title) > details > ul {
          @apply ms-0 mt-4 py-2 pe-2;
        }
        & > li > details > ul {
          &:before {
            content: none;
          }
        }
      }
      :where(${selector}-horizontal > li:not(${selector}-title) > details > ul) {
        @apply bg-base-100 rounded-box shadow-xl;
      }
      ${selector}-vertical {
        & > li:not(${selector}-title) > details > ul {
          @apply ms-4 mt-0 py-0 pe-0;
        }
      }
      
      ${selector}-xs {
        :where(li:not(${selector}-title) > *:not(ul):not(details):not(${selector}-title)),
        :where(li:not(${selector}-title) > details > summary:not(${selector}-title)) {
          @apply rounded px-2 py-1 text-xs;
        }
        ${selector}-title {
          @apply px-2 py-1;
        }
      }
      ${selector}-sm {
        :where(li:not(${selector}-title) > *:not(ul):not(details):not(${selector}-title)),
        :where(li:not(${selector}-title) > details > summary:not(${selector}-title)) {
          @apply rounded-btn px-3 py-1 text-sm;
        }
        ${selector}-title {
          @apply px-3 py-2;
        }
      }
      ${selector}-md {
        :where(li:not(${selector}-title) > *:not(ul):not(details):not(${selector}-title)),
        :where(li:not(${selector}-title) > details > summary:not(${selector}-title)) {
          @apply rounded-btn px-4 py-2 text-sm;
        }
        ${selector}-title {
          @apply px-4 py-2;
        }
      }
      ${selector}-lg {
        :where(li:not(${selector}-title) > *:not(ul):not(details):not(${selector}-title)),
        :where(li:not(${selector}-title) > details > summary:not(${selector}-title)) {
          @apply rounded-btn px-6 py-3 text-lg;
        }
        ${selector}-title {
          @apply px-6 py-3;
        }
      }
      
      `)
    }
  }
}

export default {
  schema
}
