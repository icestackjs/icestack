const _plugin = require('tailwindcss/plugin')

const css2TwPlugin = _plugin.withOptions(
  function (_options) {
    return function ({ addBase, addComponents, addUtilities, theme, addVariant, config, corePlugins, e, matchComponents, matchUtilities, matchVariant }) {
      addBase({
        h1: {
          fontSize: theme('fontSize.2xl')
        },
        h2: {
          fontSize: theme('fontSize.xl')
        }
      })
      addComponents({
        '.card': {
          backgroundColor: theme('colors.white'),
          borderRadius: theme('borderRadius.lg'),
          padding: theme('spacing.6'),
          boxShadow: theme('boxShadow.xl')
        }
      })
      addUtilities({
        '.content-auto': {
          contentVisibility: 'auto'
        }
      })
    }
  },
  function (_options) {
    return {}
  }
)

module.exports = css2TwPlugin
