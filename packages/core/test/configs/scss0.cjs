const css = String.raw

/**
 * @type {import('@icestack/ui').Config}
 */
const config = {
  mode: 'none',
  outdir: './my-ui',
  components: {
    aaa: {
      selector: '.aaa',
      schema: ({ selector }) => {
        return {
          defaults: {
            base: css`
              @use 'foundation/code';
              @use 'foundation/lists';
            `,
          },
        }
      },
    },
  },
}

module.exports = config
