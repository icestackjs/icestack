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
import { someExtends } from './constants.js'

import { colors } from './colors.js'

import type { UserDefinedOptions } from './types'
import globalPostcss from '@/postcss/global'

export default plugin.withOptions(
  function (options: UserDefinedOptions) {
    const { log, prefix, rtl, styled } = defu<UserDefinedOptions, Partial<UserDefinedOptions>[]>(options, { log: true, rtl: false, styled: true })
    const componentsEntries = Object.entries(components)
    const utilitiesEntries = Object.entries(utilities)

    let postcssJsProcess: (input: postcssJs.CssInJs) => postcssJs.CssInJs

    const postcssPlugins: AcceptedPlugin[] = []
    if (prefix) {
      postcssPlugins.push(postcssPrefix(typeof prefix === 'string' ? { prefix, ignore: [] } : prefix))
    }
    if (rtl) {
      postcssPlugins.push(rtlcss(typeof rtl === 'boolean' ? undefined : rtl))
    }

    postcssPlugins.push(globalPostcss(options))

    try {
      postcssJsProcess = postcssJs.sync(postcssPlugins)
    } catch (error) {
      log && console.error(`Error occurred when create \`postcssJsProcess\`:`, error)
    }
    const shouldApplyPrefix = Boolean(prefix && postcssJsProcess!)

    return function ({ addBase, addComponents, addUtilities }) {
      addBase([base])

      for (const [name, item] of componentsEntries) {
        const cssItems: (postcssJs.CssInJs | undefined)[] = [item.unstyled]
        if (styled) {
          cssItems.push(item.styled)
        }
        let cssObj = merge.recursive(true, ...cssItems)
        if (shouldApplyPrefix) {
          cssObj = postcssJsProcess(cssObj)
        }

        addComponents(cssObj)
      }

      for (const [name, item] of utilitiesEntries) {
        const cssItems: (postcssJs.CssInJs | undefined)[] = [item.global, item.unstyled]
        if (styled) {
          cssItems.push(item.styled)
        }
        let cssObj = merge.recursive(true, item.global, item.unstyled, item.styled)
        if (shouldApplyPrefix) {
          cssObj = postcssJsProcess(cssObj)
        }

        addUtilities(cssObj)
      }
    }
  },
  function (options: UserDefinedOptions) {
    return {
      theme: {
        extend: {
          colors: {
            ...colors
          },
          ...someExtends
        }
      }
    }
  }
)
