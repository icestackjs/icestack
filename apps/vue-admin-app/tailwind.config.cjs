const path = require('node:path')
const { icestackPlugin } = require('@icestack/tailwindcss')
/** @type {import('tailwindcss').Config} */
const config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
  theme: {
    extend: {}
  },
  plugins: [
    icestackPlugin({
      loadConfig: true,
      loadDirectory: path.resolve(__dirname, './my-ui')
    })
  ]
}

module.exports = config
