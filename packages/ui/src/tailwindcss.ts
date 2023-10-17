import plugin from 'tailwindcss/plugin'
import merge from 'merge'
import defu from 'defu'
import postcssJs from 'postcss-js'
import type { AcceptedPlugin } from 'postcss'
import rtlcss from 'rtlcss'
import base from '../assets/js/base/index.js'
import components from '../assets/js/components/index.js'
import utilities from '../assets/js/utilities/index.js'

import postcssPrefix from './postcss/prefixer'

import { colors } from './colors.js'
import { groupBy } from './utils'
import type { UserDefinedOptions } from './types'

export default plugin.withOptions(
  function (options: UserDefinedOptions) {
    const { log, prefix, rtl } = defu<UserDefinedOptions, Partial<UserDefinedOptions>[]>(options, { log: true, rtl: false, styled: true })
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

    let postcssJsProcess: (input: postcssJs.CssInJs) => postcssJs.CssInJs

    const postcssPlugins: AcceptedPlugin[] = []
    if (prefix) {
      postcssPlugins.push(postcssPrefix(typeof prefix === 'string' ? { prefix, ignore: [] } : prefix))
    }
    if (rtl) {
      postcssPlugins.push(rtlcss(typeof rtl === 'boolean' ? undefined : rtl))
    }

    try {
      postcssJsProcess = postcssJs.sync(postcssPlugins)
    } catch (error) {
      log && console.error(`Error occurred when create \`postcssJsProcess\`:`, error)
    }
    const shouldApplyPrefix = Boolean(prefix && postcssJsProcess!)

    return function ({ addBase, addComponents, addUtilities }) {
      addBase([base])

      for (const [name, c] of componentsEntries) {
        if (Array.isArray(c)) {
          let cssObj = merge.recursive(true, ...c)
          if (shouldApplyPrefix) {
            cssObj = postcssJsProcess(cssObj)
          }

          addComponents(cssObj)
        }
      }

      for (const [name, u] of utilitiesEntries) {
        if (Array.isArray(u)) {
          let cssObj = merge.recursive(true, ...u)
          if (shouldApplyPrefix) {
            cssObj = postcssJsProcess(cssObj)
          }

          addUtilities(cssObj)
        }
      }
    }
  },
  function (options: UserDefinedOptions) {
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
