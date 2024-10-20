const { colors } = require('./src/colors')
// const {} = require('tailwindcss/colors')
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    colors: {},
    extend: {
      colors: {
        ...colors,
      },
    },
  },
  plugins: [],
  presets: [],
}
