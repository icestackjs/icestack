const { icestackPlugin, miniprogramPreset } = require('@icestack/ui/tailwindcss')
const path = require('path')
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{html,js,ts,jsx,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {},
    // colors: {}
  },
  // plugins: [require('@icestack/ui')({})],
  plugins: [
    // require('css-to-tailwindcss-plugin/tailwindcss')({
    //   entries: [
    //     './scss/index.scss'
    //   ],
    //   withOptionsWalkCSSRuleObject(x, layer) {
    //     console.log(x, layer)
    //     return x
    //   },

    // })
    icestackPlugin({
      basedir: path.resolve(__dirname, './my-ui'),
      // presets: [miniprogramPreset()]
    })

  ],
  corePlugins: {
    preflight: false
  }
}
