import type { GetCssSchemaMethod } from '@/types'
import { css } from '@/types'

const schema: GetCssSchemaMethod = (opts) => {
  const { selector } = opts
  return {
    selector,
    defaults: {
      base: css`
        ${selector} {
          animation: skeleton-blink var(--skeleton-duration) ease-in-out infinite;
        }
        @keyframes skeleton-blink {
          50% {
            opacity: 0.6;
          }
        }
      `,
      styled: css`
        ${selector} {
          @apply bg-base-300;
        }
      `,
      utils: css`
        ${selector}-title {
          @apply w-2/5 h-4;
        }
        ${selector}-paragraph {
          @apply w-full h-4;
        }
        ${selector}-avatar {
          @apply h-8 w-8 rounded-full;
        }
      `,
    },
  }
}

export default {
  schema,
}
