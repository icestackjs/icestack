const path = require('node:path')
const plugin = require('tailwindcss/plugin')
const { icestackPlugin } = require('@icestack/tailwindcss')
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
  theme: {
    extend: {}
  },
  plugins: [
    icestackPlugin({
      loadConfig: true,
      loadDirectory: path.resolve(__dirname, 'my-ui')
    }),
    plugin(({ addComponents }) => {
      addComponents({
        '.xaxa': {
          color: 'yellow'
        }
      })
    })
  ]
}
