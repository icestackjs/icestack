const _plugin = require('tailwindcss/plugin')

const css2TwPlugin = _plugin.withOptions(
  function (_options) {
    const { withOptionsWalkCSSRuleObject } = _options
    return function ({ addBase, addComponents, addUtilities, theme, addVariant, config, corePlugins, e, matchComponents, matchUtilities, matchVariant }) {
      const _baseCss = withOptionsWalkCSSRuleObject(
        {
          h1: {
            fontSize: theme('fontSize.2xl')
          },
          h2: {
            fontSize: theme('fontSize.xl')
          }
        },
        'base'
      )
      const _componentsCss = withOptionsWalkCSSRuleObject(
        {
          '.card': {
            backgroundColor: theme('colors.white'),
            borderRadius: theme('borderRadius.lg'),
            padding: theme('spacing.6'),
            boxShadow: theme('boxShadow.xl')
          }
        },
        'components'
      )
      const _utilities = withOptionsWalkCSSRuleObject(
        {
          '.content-auto': {
            contentVisibility: 'auto'
          }
        },
        'utilities'
      )
      addBase(_baseCss)
      addComponents(_componentsCss)
      addUtilities(_utilities)
    }
  },
  function (_options) {
    return {}
  }
)

module.exports = css2TwPlugin
