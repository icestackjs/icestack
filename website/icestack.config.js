const mockupPreset = require('@icestack/preset-mockup')
const { css } = require('@icestack/ui')
const { themes, components } = require('./icestack/index')

/**
 * @type {import('@icestack/ui').Config}
 */
const config = {
  outdir: './my-ui',
  base: {
    themes: {
      ...themes
    }
  },
  components: {
    ...components,
    cbutton: {
      selector: '.cbtn',
      schema: ({ selector, params, types }) => {
        const colors = ['red', 'yellow', 'green']
        return {
          selector,
          defaults: {
            base: css`
              ${selector} {
                @apply relative overflow-hidden bg-blue-600 focus:ring-4 focus:ring-blue-300 inline-flex items-center px-7 py-2.5 rounded-lg text-white justify-center;

                &::after {
                  content: '';
                  @apply absolute inset-0 h-[200%] w-[200%] rotate-45 translate-x-[-75%] transition-all bg-white/30 z-20 duration-1000;
                }

                &:hover::after {
                  @apply translate-x-[50%];
                }
              }
            `,
            styled: css`
              ${colors
                .map((color) => {
                  return `${selector}-${color}{
                @apply bg-${color}-600 focus:ring-${color}-300;
              }`
                })
                .join('\n')}
            `,
            utils: css`
              ${selector}-xs {
                @apply px-3 py-1.5 rounded;
              }
              ${selector}-sm {
                @apply px-5 py-2 rounded-md;
              }
              ${selector}-md {
                @apply px-7 py-2.5 rounded-lg;
              }
              ${selector}-lg {
                @apply px-8 py-3 rounded-lg;
              }
            `
          }
        }
      }
    }
  },
  presets: [mockupPreset()]
}
module.exports = config
