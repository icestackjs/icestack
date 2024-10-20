/**
 * @type {import('@icestack/ui').Config}
 */
const config = {
  outdir: './my-ui',
  components: {
    button: {
      extra: `
      .btn{
        @apply rounded-lg p-0.5;
        height: auto;
        min-height: auto;
      }
      `,
    },
  },
}

module.exports = config
