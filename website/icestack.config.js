const { themes } = require('./icestack/index')

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
  presets: []
}
module.exports = config
