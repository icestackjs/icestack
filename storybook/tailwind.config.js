const path = require('node:path')
const { icestackPlugin } = require('@icestack/ui/tailwindcss')
const { iconsPlugin, getIconCollections } = require('@egoist/tailwindcss-icons')
// const colors = require('tailwindcss/colors')
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [path.resolve(__dirname, './stories/**/*.{ts,tsx}')],
  darkMode: ['class', '[data-mode="dark"]'],
  theme: {
    colors: {},
    extend: {}
  },
  plugins: [
    icestackPlugin({
      outdir: path.resolve(__dirname, 'ice-ui')
    }),
    iconsPlugin({
      collections: getIconCollections(['mdi'])
    })
  ]
}
