/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{html,js,ts,jsx,tsx,vue}'],
  theme: {
    extend: {},
    // colors: {}
  },
  // plugins: [require('@icestack/ui')({})],
  plugins: [...require('css-to-tailwindcss-plugin/tailwindcss')({
    entries: [
      './scss/index.scss'
    ],
  })],
  corePlugins: {
    preflight: false
  }
}
