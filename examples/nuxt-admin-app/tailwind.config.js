const path = require('node:path')
const {
  iconsPlugin,
  getIconCollections,
} = require('@egoist/tailwindcss-icons')
const { icestackPlugin } = require('@icestack/tailwindcss')
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  darkMode: ['class', '[data-mode="dark"]'],
  theme: {
    extend: {},
  },
  plugins: [
    icestackPlugin({
      loadConfig: true,
      loadDirectory: path.resolve(__dirname, 'my-ui'),
    }),
    iconsPlugin({
      collections: getIconCollections(['mdi', 'logos']),
    }),
  ],
}
