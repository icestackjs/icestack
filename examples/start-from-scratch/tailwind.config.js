const path = require('node:path')
const { icestackPlugin } = require('@icestack/tailwindcss')
const plugin = require('tailwindcss/plugin')
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}', '!./src/cva/**/*.{js,ts,jsx,tsx,vue}'],
  theme: {
    extend: {},
  },
  plugins: [
    icestackPlugin({
      loadConfig: true,
      loadDirectory: path.resolve(__dirname, 'my-ui'),
    }),
    plugin(({ addComponents }) => {
      addComponents({
        '.xaxa': {
          color: 'green',
        },
      })
    }),
  ],
}
