import plugin from 'tailwindcss/plugin'
import base from '../assets/js/base/index.js'
import button from '../assets/js/components/btn.js'
import utilities from '../assets/js/utilities/index.js'
import { colors } from './colors'
export default plugin.withOptions(
  function () {
    return function ({ addBase, addComponents, addUtilities, addVariant, config, corePlugins, e, matchComponents, matchUtilities, matchVariant, theme }) {
      addBase([base])
      addComponents([button])
      addUtilities([utilities])
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
