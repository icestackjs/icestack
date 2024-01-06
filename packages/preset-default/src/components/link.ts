import type { GetCssSchemaMethod } from '@/types'
const schema: GetCssSchemaMethod = (opts) => {
  const { selector, types } = opts
  return {
    selector,
    defaults: {
      styled: `
      ${selector} {
        ${types
          .map((type) => {
            return `
          &-${type}{
            @apply text-${type} [@media(hover:hover)]:hover:text-${type}-active;
          }

          `
          })
          .join('\n')}
        
        &:focus {
          @apply outline-none;
        }
        &:focus-visible {
          outline: 2px solid currentColor;
          outline-offset: 2px;
        }
      }
      
      `,
      base: `
      ${selector} {
        @apply cursor-pointer underline;
        &-hover {
          @apply no-underline [@media(hover:hover)]:hover:underline;
        }
      }
      
      `
    }
  }
}

export default {
  schema
}
