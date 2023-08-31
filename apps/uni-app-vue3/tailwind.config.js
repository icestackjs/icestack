/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{html,js,ts,jsx,tsx,vue}'],
  theme: {
    extend: {},
    colors: {}
  },
  plugins: [require('ice-ui')({})],
  corePlugins: {
    preflight: false
  }
}
