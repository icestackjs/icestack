/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{html,js,ts,jsx,tsx,vue}'],
  theme: {
    extend: {},
    colors: {}
  },
  plugins: [require('ice-mobile-ui')({})],
  corePlugins: {
    preflight: false
  }
}
