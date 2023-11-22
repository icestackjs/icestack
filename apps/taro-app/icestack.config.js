const { transformCss2Js } = require('@icestack/ui')
const { miniprogramPreset } = require('@icestack/ui/presets')
const { expandTypes, getSelector } = require('@icestack/ui/components')
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
    tips: {
      selector: '.tips',
      extra: transformCss2Js(`.tips {
        @apply text-gray-500 text-xs pt-2 pb-3 break-all;
      }`),
    },



    // slider: {
    //   prefix: '.slider',
    //   schema: ({ selector, types }) => {
    //     return {
    //       selector
    //     }
    //   }
    // }
    // checkbox: {
    //   prefix: {
    //     prefix: 'ice-'
    //   }
    // }
  },
  presets: [miniprogramPreset()]
}

module.exports = config
