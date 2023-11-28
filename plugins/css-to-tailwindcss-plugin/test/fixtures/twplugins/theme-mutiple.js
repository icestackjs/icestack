const _plugin = require('tailwindcss/plugin')
const css2TwPlugin = _plugin(function ({ addBase, addComponents, addUtilities, theme, addVariant, config, corePlugins, e, matchComponents, matchUtilities, matchVariant }) {
  addBase({})
  addComponents({
    '.content-area0': {
      height: `calc(100vh - ${theme('spacing.12')} - ${theme('spacing.1')})`
    },
    '.content-area1': {
      height: `calc(100vh - ${theme('spacing[2.5]')} + ${theme('spacing.6')})`
    }
  })
  addUtilities({})
})
module.exports = css2TwPlugin
