/**
 * @type {import('@icestack/ui').Config}
 */
const config = {
  outdir: './my-ui',
  components: {
    button: {
      override: ({ selector, types }) => {
        return {
          selector,
          base: {}
        }
      }
    }
  }
}

module.exports = config
