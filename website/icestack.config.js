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
    ...components
  },
  presets: []
}
module.exports = config
