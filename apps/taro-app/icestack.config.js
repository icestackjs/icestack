const { transformCss2Js } = require('@icestack/ui')

/**
 * @type {import('@icestack/ui').Config}
 */
const config = {
  outdir: './my-ui',
  prefix: 'ice-',
  components: {
    subtitle: {
      selector: '.subtitle',
      extra: transformCss2Js(`.subtitle {
        @apply text-gray-600 text-sm pt-5 pb-4;
      }`)
    }
  }
}

module.exports = config
