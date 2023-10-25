const { icestackPlugin } = require('@icestack/ui/tailwindcss')
const { iconsPlugin, getIconCollections } = require('@egoist/tailwindcss-icons')
// const plugin = require('tailwindcss/plugin')
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './theme.config.jsx'],
  theme: {},
  plugins: [
    icestackPlugin,
    iconsPlugin({
      collections: getIconCollections(['mdi'])
    })
    // plugin.withOptions(() => {
    //   const a = require('lodash')
    //   a.add(1, 2)
    //   return () => {}
    // })
  ]
}
