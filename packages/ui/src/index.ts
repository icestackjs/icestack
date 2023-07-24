import plugin from 'tailwindcss/plugin'
import base from '../assets/js/base/index.js'
import { colors } from './colors'
export default plugin.withOptions(
  function () {
    return function ({ addBase, addComponents, addUtilities, addVariant, config, corePlugins, e, matchComponents, matchUtilities, matchVariant, theme }) {
      addBase([base])
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
