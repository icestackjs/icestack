const { icestackPlugin } = require('@icestack/ui/tailwindcss')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{html,js,ts,jsx,tsx,vue}'],
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
    icestackPlugin()

  ],
  corePlugins: {
    preflight: false
  }
}
