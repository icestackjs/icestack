import { transformCss2Js } from '@/shared'
import type { GetSchemaFn } from '@/shared'

const schema: GetSchemaFn = (opts) => {
  const { selector } = opts
  return {
    selector,
    defaults: {
      base: transformCss2Js(`
      ${selector} {
        @apply relative inline-block;
      }
      ${selector} > *:not(summary):focus {
        @apply outline-none;
      }
      ${selector} ${selector}-content {
        @apply absolute;
      }
      ${selector}:is(:not(details)) ${selector}-content {
        @apply invisible opacity-0;
      }
      ${selector}-end ${selector}-content {
        @apply end-0;
      }
      ${selector}-left ${selector}-content {
        @apply bottom-auto end-full top-0;
      }
      ${selector}-right ${selector}-content {
        @apply bottom-auto start-full top-0;
      }
      ${selector}-bottom ${selector}-content {
        @apply bottom-auto top-full;
      }
      ${selector}-top ${selector}-content {
        @apply bottom-full top-auto;
      }
      ${selector}-end${selector}-right ${selector}-content {
        @apply bottom-0 top-auto;
      }
      ${selector}-end${selector}-left ${selector}-content {
        @apply bottom-0 top-auto;
      }
      ${selector}${selector}-open ${selector}-content,
      ${selector}:not(${selector}-hover):focus ${selector}-content,
      ${selector}:focus-within ${selector}-content {
        @apply visible opacity-100;
      }
      @media (hover: hover) {
        ${selector}${selector}-hover:hover ${selector}-content {
          @apply visible opacity-100;
        }
      }
      ${selector}:is(details) summary::-webkit-details-marker {
        @apply hidden;
      }
      
      `),
      styled: transformCss2Js(`
      ${selector}:is(:not(details)) ${selector}-content {
        @apply origin-top scale-95 transform transition duration-200 ease-out;
      }
      ${selector}-bottom ${selector}-content {
        @apply origin-top;
      }
      ${selector}-top ${selector}-content {
        @apply origin-bottom;
      }
      ${selector}-left ${selector}-content {
        @apply origin-right;
      }
      ${selector}-right ${selector}-content {
        @apply origin-left;
      }
      ${selector}${selector}-open ${selector}-content,
      ${selector}:focus ${selector}-content,
      ${selector}:focus-within ${selector}-content {
        @apply scale-100;
      }
      @media (hover: hover) {
        ${selector}${selector}-hover:hover ${selector}-content {
          @apply scale-100;
        }
      }
      
      `),
      utils: transformCss2Js(``)
    }
  }
}

export default {
  schema
}
