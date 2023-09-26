const _plugin = require('tailwindcss/plugin')
const css2TwPlugin = _plugin(function ({ addBase, addComponents, addUtilities, theme, addVariant, config, corePlugins, e, matchComponents, matchUtilities, matchVariant }) {
  addBase({
    h1: {
      'font-size': theme('fontSize.2xl')
    },
    h2: {
      'font-size': theme('fontSize.xl')
    }
  })
  addComponents({
    '.card': {
      'background-color': theme('colors.white'),
      'border-radius': theme('borderRadius.lg'),
      padding: theme('spacing.6'),
      'box-shadow': theme('boxShadow.xl')
    }
  })
  addUtilities({
    '.content-auto': {
      'content-visibility': '"auto"'
    }
  })
})
module.exports = css2TwPlugin
