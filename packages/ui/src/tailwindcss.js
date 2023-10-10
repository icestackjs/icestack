const plugin = require('tailwindcss/plugin')
const base = require('../assets/js/base/index.js')
const components = require('../assets/js/components/index.js')
const utilities = require('../assets/js/utilities/index.js')
const { colors } = require('./colors.js')
module.exports = plugin.withOptions(
  function () {
    return function ({ addBase, addComponents, addUtilities }) {
      addBase([base])
      for (const [name, component] of Object.entries(components)) {
        addComponents(component)
      }
      for (const [name, utility] of Object.entries(utilities)) {
        addUtilities(utility)
      }
    }
  },
  function () {
    return {
      theme: {
        extend: {
          colors: {
            ...colors
          }
        }
      }
    }
  }
)
