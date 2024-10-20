const css = String.raw

/**
 * @type {import('@icestack/ui').Config}
 */
const config = {
  outdir: './my-ui',
  components: {
    xxx: {
      selector: '.xxx',
      schema: ({ selector }) => {
        return {
          selector,
          defaults: {
            base: css`
              ${selector} {
                @apply flex bg-[#000] h-[100px] w-10;
              }
            `,
          },
        }
      },
    },
    yyy: {
      selector: '.yyy',
      schema: ({ selector }) => {
        return {
          selector,
          defaults: {
            base: css`
              ${selector} {
                @apply flex bg-[#592fa7] h-[100px] w-10;
                &::before {
                  content: 'icebreaker';
                  @apply text-yellow-700 text-2xl flex items-center justify-center;
                }
              }
            `,
            styled: css`
              ${selector} {
                @apply h-[200px] w-20;
              }
            `,
            utils: css`
              ${selector} {
                @apply h-[300px] w-32;
              }
            `,
          },
        }
      },
    },
  },
}

module.exports = config
