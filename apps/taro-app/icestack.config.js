const miniprogramPreset = require('@icestack/preset-weapp')
const { expandTypes, getSelector, transformCss2Js } = require('@icestack/ui/components')
/**
 * @type {import('@icestack/ui').Config}
 */
const config = {
  outdir: './my-ui',
  // prefix: 'ice-',
  components: {
    subtitle: {
      selector: '.subtitle',
      extend: `.subtitle {
        @apply text-slate-600 dark:text-slate-400 text-sm pt-5 pb-4 break-all;
      }`
    },
    tips: {
      selector: '.tips',
      extend:`.tips {
        @apply text-slate-500 dark:text-slate-300 text-xs pt-2 pb-3 break-all;
      }`
    },

    // join: false
    // steps: false



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
