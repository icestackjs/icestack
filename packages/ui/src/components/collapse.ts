import { transformCss2Js } from '@/postcss'

import type { GetCssSchemaMethod } from '@/types'
const schema: GetCssSchemaMethod = (opts) => {
  const { selector } = opts
  return {
    selector,
    defaults: {
      base: transformCss2Js(`${selector}:not(td):not(tr):not(colgroup) {
        @apply visible;
      }
      ${selector} {
        @apply relative grid overflow-hidden;
        grid-template-rows: auto 0fr;
        transition: grid-template-rows 0.2s;
      }
      ${selector}-title,
      ${selector} > input[type="checkbox"],
      ${selector} > input[type="radio"],
      ${selector}-content {
        @apply col-start-1 row-start-1;
      }
      ${selector} > input[type="checkbox"],
      ${selector} > input[type="radio"] {
        @apply appearance-none opacity-0;
      }
      ${selector}-content {
        @apply invisible col-start-1 row-start-2 min-h-0;
        transition: visibility 0.2s;
      }
      ${selector}[open],
      ${selector}-open,
      ${selector}:focus:not(${selector}-close) {
        grid-template-rows: auto 1fr;
      }
      ${selector}:not(${selector}-close):has(> input[type="checkbox"]:checked),
      ${selector}:not(${selector}-close):has(> input[type="radio"]:checked) {
        grid-template-rows: auto 1fr;
      }
      ${selector}[open] > ${selector}-content,
      ${selector}-open > ${selector}-content,
      ${selector}:focus:not(${selector}-close) > ${selector}-content,
      ${selector}:not(${selector}-close) > input[type="checkbox"]:checked ~ ${selector}-content,
      ${selector}:not(${selector}-close) > input[type="radio"]:checked ~ ${selector}-content {
        @apply visible min-h-fit;
      }
      `),
      styled: transformCss2Js(`${selector} {
        @apply rounded-box w-full;
      }
      details${selector} {
        @apply w-full;
        & summary {
          @apply relative block;
          &::-webkit-details-marker {
            @apply hidden;
          }
        }
      }
      
      ${selector}:focus-visible {
        @apply outline-base-content outline outline-2 outline-offset-2;
      }
      details${selector} summary {
        @apply outline-none;
      }
      ${selector}:has(${selector}-title:focus-visible),
      ${selector}:has(> input[type="checkbox"]:focus-visible),
      ${selector}:has(> input[type="radio"]:focus-visible) {
        @apply outline-base-content outline outline-2 outline-offset-2;
      }
      ${selector}-arrow > ${selector}-title:after {
        @apply absolute block h-2 w-2 translate-y-[-100%] rotate-[45deg] transition-all ease-out;
        transition-duration: 0.2s;
        top: 50%;
        inset-inline-end: 1.4rem;
        content: "";
        transform-origin: 75% 75%;
        box-shadow: 2px 2px;
        pointer-events: none;
      }
      ${selector}-plus > ${selector}-title:after {
        @apply absolute block h-2 w-2 transition-all duration-300 ease-out;
        top: 0.9rem;
        inset-inline-end: 1.4rem;
        content: "+";
        pointer-events: none;
      }
      
      ${selector}:not(${selector}-open):not(${selector}-close) > input[type="checkbox"],
      ${selector}:not(${selector}-open):not(${selector}-close) > input[type="radio"]:not(:checked),
      ${selector}:not(${selector}-open):not(${selector}-close) > ${selector}-title {
        @apply cursor-pointer;
      }
      ${selector}:focus:not(${selector}-open):not(${selector}-close):not(${selector}[open]) > ${selector}-title {
        cursor: unset;
      }
      ${selector}-title {
        @apply relative;
      }
      :where(${selector} > input[type="checkbox"]),
      :where(${selector} > input[type="radio"]) {
        z-index: 1;
      }
      ${selector}-title,
      :where(${selector} > input[type="checkbox"]),
      :where(${selector} > input[type="radio"]) {
        @apply w-full p-4 pe-12;
        min-height: 3.75rem;
        transition: background-color 0.2s ease-out;
      }
      
      ${selector}-content {
        @apply px-4;
        cursor: unset;
        transition:
          padding 0.2s ease-out,
          background-color 0.2s ease-out;
      }
      ${selector}[open] > :where(${selector}-content),
      ${selector}-open > :where(${selector}-content),
      ${selector}:focus:not(${selector}-close) > :where(${selector}-content),
      ${selector}:not(${selector}-close) > :where(input[type="checkbox"]:checked ~ ${selector}-content),
      ${selector}:not(${selector}-close) > :where(input[type="radio"]:checked ~ ${selector}-content) {
        @apply pb-4;
        transition:
          padding 0.2s ease-out,
          background-color 0.2s ease-out;
      }
      
      ${selector}[open]${selector}-arrow > ${selector}-title:after,
      ${selector}-open${selector}-arrow > ${selector}-title:after,
      ${selector}-arrow:focus:not(${selector}-close) > ${selector}-title:after,
      ${selector}-arrow:not(${selector}-close) > input[type="checkbox"]:checked ~ ${selector}-title:after,
      ${selector}-arrow:not(${selector}-close) > input[type="radio"]:checked ~ ${selector}-title:after {
        @apply translate-y-[-50%] rotate-[225deg];
      }
      ${selector}[open]${selector}-plus > ${selector}-title:after,
      ${selector}-open${selector}-plus > ${selector}-title:after,
      ${selector}-plus:focus:not(${selector}-close) > ${selector}-title:after,
      ${selector}-plus:not(${selector}-close) > input[type="checkbox"]:checked ~ ${selector}-title:after,
      ${selector}-plus:not(${selector}-close) > input[type="radio"]:checked ~ ${selector}-title:after {
        content: "−";
      }
      `),
      utils: transformCss2Js(``)
    }
  }
}

export default {
  schema
}
