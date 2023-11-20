const { transformCss2Js } = require('@icestack/ui')
const { miniprogramPreset } = require('@icestack/ui/presets')
/**
 * @type {import('@icestack/ui').Config}
 */
const config = {
  outdir: './my-ui',
  // prefix: 'ice-',
  components: {
    subtitle: {
      selector: '.subtitle',
      extra: transformCss2Js(`.subtitle {
        @apply text-gray-600 text-sm pt-5 pb-4;
      }`),
    },
    table: false
  },
  presets: [miniprogramPreset()]
}

module.exports = config
