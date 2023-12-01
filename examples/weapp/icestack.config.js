const { miniprogramPreset } = require('@icestack/presets')

/**
 * @type {import('@icestack/ui').Config}
 */
const config = {
  outdir: './my-ui',
  presets: [miniprogramPreset()]
}

module.exports = config
