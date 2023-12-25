import { transformCss2Js } from '@/shared'
import type { GetCssSchemaMethod } from '@/types'

const schema: GetCssSchemaMethod = (opts) => {
  const { selector } = opts
  return {
    selector,
    defaults: {
      base: transformCss2Js(`
      ${selector} {
        @apply inline-flex overflow-x-scroll;
        scroll-snap-type: x mandatory;
        scroll-behavior: smooth;
        &-vertical {
          @apply flex-col overflow-y-scroll;
          scroll-snap-type: y mandatory;
        }
        &-item {
          @apply box-content flex flex-none;
          scroll-snap-align: start;
        }
        &-center ${selector}-item {
          scroll-snap-align: center;
        }
        &-end ${selector}-item {
          scroll-snap-align: end;
        }
      }
      
      `),
      styled: transformCss2Js(`
      
      ${selector} {
        -ms-overflow-style: none;
        scrollbar-width: none;
        &::-webkit-scrollbar {
          @apply hidden;
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
