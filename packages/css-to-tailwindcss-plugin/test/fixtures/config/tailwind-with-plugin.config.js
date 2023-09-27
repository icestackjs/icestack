const path = require('node:path')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {}
  },
  plugins: [
    require('../../../dist/tailwindcss.cjs')({
      entries: [path.resolve(__dirname, '../theme-mutiple.css'), path.resolve(__dirname, '../common.scss')]
    })
  ],
  corePlugins: {
    preflight: false
  }
}
