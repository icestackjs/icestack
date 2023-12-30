const path = require('node:path')
const { icestackPlugin } = require('@icestack/tailwindcss')
const { iconsPlugin, getIconCollections } = require('@egoist/tailwindcss-icons')
const { createTailwindcssContent } = require('@icestack/cva')
// const plugin = require('tailwindcss/plugin')
// const plugin = require('tailwindcss/plugin')
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx,md}',
    './components/**/*.{js,ts,jsx,tsx,mdx,md}',
    './theme.config.jsx',
    {
      // https://github.com/tailwindlabs/tailwindcss/issues/11134
      raw: 'dark'
    },
    createTailwindcssContent()
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
      loadDirectory: path.resolve(__dirname, './my-ui'),
      loadConfig: true
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
