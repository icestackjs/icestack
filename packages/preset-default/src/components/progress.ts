import { GetCssSchemaMethod, css } from '@/types'
const schema: GetCssSchemaMethod = (opts) => {
  const { selector, types } = opts
  return {
    selector,
    defaults: {
      styled: css`
        ${selector} {
          @apply rounded-box bg-base-content/20 h-2;
          &::-moz-progress-bar {
            @apply bg-base-content rounded-box;
          }
          ${types
            .map((type) => {
              return css`
                &-${type}::-moz-progress-bar {
                  @apply bg-${type} rounded-box;
                }
              `
            })
            .join('\n')}

          &:indeterminate {
            --progress-color: theme(colors.base-content);
          }

          ${types
            .map((type) => {
              return css`
                &-${type}:indeterminate {
                  --progress-color: theme(colors. ${type});
                }
              `
            })
            .join('\n')}

          &::-webkit-progress-bar {
            @apply rounded-box bg-transparent;
          }
          &::-webkit-progress-value {
            @apply bg-base-content rounded-box;
          }

          ${types
            .map((type) => {
              return css`
                &-${type}::-webkit-progress-value {
                  @apply bg-${type};
                }
              `
            })
            .join('\n')}
        }

        ${selector}:indeterminate {
          background-image: repeating-linear-gradient(90deg, var(--progress-color) -1%, var(--progress-color) 10%, transparent 10%, transparent 90%);
          background-size: 200%;
          background-position-x: 15%;
          animation: progress-loading 5s ease-in-out infinite;
        }
        ${selector}:indeterminate::-moz-progress-bar {
          @apply bg-transparent;
          background-image: repeating-linear-gradient(90deg, var(--progress-color) -1%, var(--progress-color) 10%, transparent 10%, transparent 90%);
          background-size: 200%;
          background-position-x: 15%;
          animation: progress-loading 5s ease-in-out infinite;
        }

        @keyframes progress-loading {
          50% {
            background-position-x: -115%;
          }
        }
      `,
      base: css`
        ${selector} {
          @apply relative w-full appearance-none overflow-hidden;
        }
      `
    }
  }
}

export default {
  schema
}
