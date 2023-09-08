const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{html,js,ts,jsx,tsx,vue}'],
  darkMode: 'class',
  theme: {
    // extend: {},
    // colors: {}
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant('deep', ':is(.deep &)')
      addVariant('fantasy', ':is(.fantasy &)')
    })
  ], // [require('@icestack/ui')({})],
  corePlugins: {
    preflight: false,
    container: false
  }
}
