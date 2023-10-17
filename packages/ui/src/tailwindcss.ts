import plugin from 'tailwindcss/plugin'
import merge from 'merge'

import base from '../assets/js/base/index.js'
import components from '../assets/js/components/index.js'
import utilities from '../assets/js/utilities/index.js'

import { colors } from './colors.js'
import { groupBy } from './utils'

export default plugin.withOptions(
  function () {
    const componentsEntries = Object.entries(
      groupBy(Object.entries(components), ([name]) => {
        let com = name
        if (com.includes('/')) {
          com = name.split('/')[1]
        }
        return com
      })
    ).map(([key, arr]) => {
      return [key, arr.map((x) => x[1])]
    })

    const utilitiesEntries = Object.entries(
      groupBy(Object.entries(utilities), ([name]) => {
        let com = name
        if (com.includes('/')) {
          com = name.split('/')[1]
        }
        return com
      })
    ).map(([key, arr]) => {
      return [key, arr.map((x) => x[1])]
    })
    return function ({ addBase, addComponents, addUtilities }) {
      addBase([base])

      for (const [name, c] of componentsEntries) {
        if (Array.isArray(c)) {
          addComponents(merge.recursive(true, ...c))
        }
      }

      for (const [name, u] of utilitiesEntries) {
        if (Array.isArray(u)) {
          addUtilities(merge.recursive(true, ...u))
        }
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
