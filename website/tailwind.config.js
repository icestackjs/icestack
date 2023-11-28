const path = require('node:path')
const { icestackPlugin } = require('@icestack/tailwindcss')
const { iconsPlugin, getIconCollections } = require('@egoist/tailwindcss-icons')
// const plugin = require('tailwindcss/plugin')
// const plugin = require('tailwindcss/plugin')
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './theme.config.jsx',
    {
      // https://github.com/tailwindlabs/tailwindcss/issues/11134
      raw: 'dark'
    }
  ],
  theme: {},
  plugins: [
    // plugin(({ addBase }) => {
    //   addBase({
    //     '.dark': {
    //       '--xxxxx': 'xxxxxxx'
    //     },
    //     ':root': {
    //       '--rrr': 'rrr'
    //     },
    //     html: {
    //       '--xx': 'yyyy'
    //     },
    //     'html.dark': {
    //       '--ccc': 'cccc'
    //     },
    //     '[data-theme=dark]': {
    //       '--dsad': 'fds'
    //     }
    //   })
    // }),
    icestackPlugin({
      loaddir: path.resolve(__dirname, './my-ui')
    }),
    iconsPlugin({
      collections: getIconCollections(['mdi'])
    })

    // plugin.withOptions(() => {
    //   const a = require('lodash')
    //   a.add(1, 2)
    //   return () => {}
    // })
  ]
}
