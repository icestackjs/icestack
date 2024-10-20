/**
 * @type {import('@icestack/ui').Config}
 */
const config = {
  outdir: './my-ui',
  components: {
    tab: {
      postcss: {
        prefix: 'ice-',
      },
    },
  },
}

module.exports = config
