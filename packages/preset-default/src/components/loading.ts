import { loading as loading64Map } from './assets/svg.json'
import { GetCssSchemaMethod, css } from '@/types'

function makeMaskImage(base64: string) {
  return `url("${base64}")`
}

// https://github.com/SamHerbert/SVG-Loaders
// https://github.com/loadingio/css-spinner/
const schema: GetCssSchemaMethod = (opts) => {
  const { selector } = opts

  return {
    selector,
    defaults: {
      base: css`
        ${selector} {
          @apply pointer-events-none inline-block aspect-square w-6;
          background-color: currentColor;
          mask-size: 100%;
          mask-repeat: no-repeat;
          mask-position: center;
          mask-image: ${makeMaskImage(loading64Map['tail-spin'])};
        }
      `,
      utils: css`
        ${Object.entries(loading64Map)
          .map(([key, value]) => {
            return css`
              ${selector}-${key} {
                mask-image: ${makeMaskImage(value)};
              }
            `
          })
          .join('\n')}

        ${selector}-xs {
          @apply w-4;
        }
        ${selector}-sm {
          @apply w-5;
        }
        ${selector}-md {
          @apply w-6;
        }
        ${selector}-lg {
          @apply w-10;
        }
      `
    }
  }
}

export default {
  schema
}
