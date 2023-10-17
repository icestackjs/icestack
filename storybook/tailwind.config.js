const path = require('node:path')
const icestackUi = require('@icestack/ui/tailwindcss')
// const colors = require('tailwindcss/colors')
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [path.resolve(__dirname, './stories/**/*.ts')],
  darkMode: ['class', '[data-mode="dark"]'],
  theme: {
    colors: {},
    extend: {}
  },
  plugins: [icestackUi]
}
