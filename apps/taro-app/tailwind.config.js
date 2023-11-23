const { icestackPlugin, miniprogramPreset } = require('@icestack/ui/tailwindcss')
const { iconsPlugin, getIconCollections } = require('@egoist/tailwindcss-icons')
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
    iconsPlugin({
      collections: getIconCollections(['mdi', 'grommet-icons'])
    }),
    icestackPlugin({
      loaddir: path.resolve(__dirname, './my-ui'),
    })

  ],
  corePlugins: {
    preflight: false
  }
}
