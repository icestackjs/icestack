import { GetCssSchemaMethod, css } from '@/types'
const schema: GetCssSchemaMethod = (opts) => {
  const { selector, types } = opts

  return {
    selector,
    defaults: {
      styled: css`
        ${selector} {
          @apply rounded-box border p-4 text-base-content border-base-200;

          ${types
            .map((type) => {
              return css`
                &-${type} {
                  @apply text-${type}-content border-${type}/20 bg-${type};
                }
              `
            })
            .join('\n')}
        }
      `,
      base: css`
        ${selector} {
          @apply grid w-full grid-flow-row content-start items-center justify-items-center gap-4 text-center sm:grid-flow-col sm:grid-cols-[auto_minmax(auto,1fr)] sm:justify-items-start sm:text-left;
        }
      `
    }
  }
}

export default {
  schema
}
