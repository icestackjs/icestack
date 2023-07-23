import plugin from 'tailwindcss/plugin'

export default plugin.withOptions(
  function () {
    return function ({ addBase, addComponents, addUtilities, addVariant, config, corePlugins, e, matchComponents, matchUtilities, matchVariant, theme }) {
      addBase({
        ':root': {
          '--primary-content': '#ffffff',
          '--primary': '#1989fa'
        }
      })
    }
  },
  function () {
    return {
      theme: {
        extend: {}
      }
    }
  }
)
