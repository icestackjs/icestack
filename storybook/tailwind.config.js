const path = require('node:path')
const fs = require('node:fs')
const { icestackPlugin } = require('@icestack/tailwindcss')
const { iconsPlugin, getIconCollections } = require('@egoist/tailwindcss-icons')
// const klawSync = require('klaw-sync')
// const icestackPath = require.resolve('@icestack/ui/package.json')
// const dir = path.resolve(path.dirname(icestackPath), 'assets/js')

// const colors = require('tailwindcss/colors')
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    path.resolve(__dirname, './stories/**/*.{ts,tsx}'),
    {
      raw: fs.readFileSync(path.resolve(__dirname, 'table.js'), 'utf8')
    }
    // ...klawSync(dir, {
    //   nodir: true,
    //   filter: (item) => {
    //     return /\.js$/.test(item.path)
    //   },
    //   traverseAll: true
    // }).map((x) => {
    //   return {
    //     raw: fs.readFileSync(x.path, 'utf8')
    //   }
    // })
  ],
  darkMode: ['class', '[data-mode="dark"]'],
  theme: {
    extend: {}
  },
  plugins: [
    icestackPlugin({
      loadDirectory: path.resolve(__dirname, 'my-ui')
    }),
    iconsPlugin({
      collections: getIconCollections(['mdi'])
    })
  ]
}
