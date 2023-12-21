import { transformCss2Js } from './shared'
import type { GetSchemaFn } from './shared'

const schema: GetSchemaFn = (opts) => {
  const { selector } = opts
  return {
    selector,
    defaults: {
      base: transformCss2Js(`
      ${selector} {
        @apply relative inline-grid select-none place-content-center;
      }
      
      ${selector} > * {
        @apply col-start-1 row-start-1;
      }
      
      ${selector} input {
        @apply appearance-none;
      }
      
      ${selector} ${selector}-on,
      ${selector} ${selector}-indeterminate,
      ${selector} input:indeterminate ~ ${selector}-on {
        @apply opacity-0;
      }
      
      ${selector} input:checked ~ ${selector}-off,
      ${selector}-active ${selector}-off,
      ${selector} input:indeterminate ~ ${selector}-off {
        @apply opacity-0;
      }
      
      ${selector} input:checked ~ ${selector}-on,
      ${selector}-active ${selector}-on,
      ${selector} input:indeterminate ~ ${selector}-indeterminate {
        @apply opacity-100;
      }
      
      `),
      styled: transformCss2Js(`
      
      ${selector} {
        @apply cursor-pointer;
      }
      
      ${selector} > * {
        @apply duration-300 ease-out;
        transition-property: transform, opacity;
      }
      
      ${selector}-rotate ${selector}-on,
      ${selector}-rotate ${selector}-indeterminate,
      ${selector}-rotate input:indeterminate ~ ${selector}-on {
        @apply rotate-45;
      }
      
      ${selector}-rotate input:checked ~ ${selector}-off,
      ${selector}-active:where(${selector}-rotate) ${selector}-off,
      ${selector}-rotate input:indeterminate ~ ${selector}-off {
        @apply -rotate-45;
      }
      
      ${selector}-rotate input:checked ~ ${selector}-on,
      ${selector}-active:where(${selector}-rotate) ${selector}-on,
      ${selector}-rotate input:indeterminate ~ ${selector}-indeterminate {
        @apply rotate-0;
      }
      
      ${selector}-flip {
        transform-style: preserve-3d;
        perspective: 16em;
      }
      ${selector}-flip ${selector}-on,
      ${selector}-flip ${selector}-indeterminate,
      ${selector}-flip input:indeterminate ~ ${selector}-on {
        transform: rotateY(180deg);
        backface-visibility: hidden;
        @apply opacity-100;
      }
      
      ${selector}-flip input:checked ~ ${selector}-off,
      ${selector}-active:where(${selector}-flip) ${selector}-off,
      ${selector}-flip input:indeterminate ~ ${selector}-off {
        transform: rotateY(-180deg);
        backface-visibility: hidden;
        @apply opacity-100;
      }
      
      ${selector}-flip input:checked ~ ${selector}-on,
      ${selector}-active:where(${selector}-flip) ${selector}-on,
      ${selector}-flip input:indeterminate ~ ${selector}-indeterminate {
        transform: rotateY(0deg);
      }
      
      `),
      utils: transformCss2Js(``)
    }
  }
}

export default {
  schema
}
