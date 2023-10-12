const iceui = require('@icestack/ui/tailwindcss')
const { iconsPlugin, getIconCollections } = require('@egoist/tailwindcss-icons')
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './theme.config.jsx'],
  theme: {},
  plugins: [
    iceui,
    iconsPlugin({
      collections: getIconCollections(['mdi'])
    })
  ]
}
