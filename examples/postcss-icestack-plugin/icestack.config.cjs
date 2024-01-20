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
            `
          }
        }
      }
    },
    yyy: {
      selector: '.yyy',
      schema: ({ selector }) => {
        return {
          selector,
          defaults: {
            base: css`
              ${selector} {
                @apply flex bg-[#ff0] h-[100px] w-10;
              }
            `,
            styled: css`
              ${selector} {
                @apply h-[200px] w-20;
              }
            `
          }
        }
      }
    }
  }
}

module.exports = config
