import { transformCss2Js } from './shared'
import type { GetSchemaFn } from './shared'

const schema: GetSchemaFn = (opts) => {
  const { selector } = opts
  return {
    selector,
    defaults: {
      base: transformCss2Js(`${selector} {
        @apply relative grid w-full overflow-hidden;
        container-type: inline-size;
        grid-template-columns: auto 1fr;
      }
      ${selector}-resizer {
        @apply relative top-1/2 z-[1] h-12 w-[25rem] min-w-[1rem] max-w-[calc(100cqi-1rem)] resize-x overflow-hidden opacity-0;
        transform-origin: 100% 100%;
        scale: 4;
        translate: 1.5rem -1.5rem;
        clip-path: inset(calc(100% - 0.75rem) 0 0 calc(100% - 0.75rem));
      }
      ${selector}-resizer,
      ${selector}-item-1,
      ${selector}-item-2 {
        @apply relative col-start-1 row-start-1;
      }
      ${selector}-item-1:after {
        @apply pointer-events-none absolute bottom-0 right-px top-1/2 z-[1] h-8 w-8 content-[''];
        translate: 50% -50%;
      }
      ${selector}-item-2 {
        @apply overflow-hidden;
      }
      ${selector}-item-1 > *,
      ${selector}-item-2 > * {
        @apply pointer-events-none absolute bottom-0 left-0 top-0 h-full w-[100cqi] max-w-none object-cover object-center;
      }
      `),
      styled: transformCss2Js(`${selector}-item-1:after {
        @apply bg-base-100/50 border-base-100 outline-base-content/5 rounded-full border-2 shadow-sm outline outline-offset-[-3px] backdrop-blur;
        translate: 50% -50%;
      }
      ${selector}-item-2 {
        @apply border-base-100 border-r-2;
      }
      `),
      utils: transformCss2Js(``)
    }
  }
}

export default {
  schema
}
