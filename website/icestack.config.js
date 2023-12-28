const mockupPreset = require('@icestack/preset-mockup')
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
  presets: [mockupPreset()]
}
module.exports = config
