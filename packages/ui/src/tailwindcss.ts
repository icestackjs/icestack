import path from 'node:path'
import plugin from 'tailwindcss/plugin'
import merge from 'merge'
import postcssJs from 'postcss-js'
import type { AcceptedPlugin } from 'postcss'
import rtlcss from 'rtlcss'
import type * as _base from '../assets/js/base/index.js'
import type * as _components from '../assets/js/components/index.js'
import type * as _utilities from '../assets/js/utilities/index.js'
import postcssPrefix from './postcss/prefixer'
import { someExtends, defaultVarPrefix } from './constants.js'
import type { TailwindcssPluginOptions } from './types'
import { getTailwindcssOptions } from '@/options'
import globalPostcss from '@/postcss/global'

function isRgba(colorString: string) {
  return typeof colorString === 'string' && colorString.includes('/')
}

function requireLib(id: string, basedir?: string) {
  return require(basedir ? path.resolve(basedir, id) : path.join('../assets', id))
}

export const miniprogramPreset: Partial<TailwindcssPluginOptions> = {}

export const icestackPlugin = plugin.withOptions(
  function (opts?: Partial<TailwindcssPluginOptions>) {
    const options = getTailwindcssOptions(opts)
    const { log, prefix, rtl, styled, basedir } = options

    const base = requireLib('js/base/index.js', basedir) as typeof _base
    const components = requireLib('js/components/index.js', basedir) as typeof _components
    const utilities = requireLib('js/utilities/index.js', basedir) as typeof _utilities

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
  function (opts?: Partial<TailwindcssPluginOptions>) {
    const { basedir } = getTailwindcssOptions(opts)
    const base = requireLib('js/base/index.js', basedir) as typeof _base

    const colors = {
      transparent: 'transparent',
      current: 'currentColor',
      ...Object.entries(base[':root']).reduce<Record<string, string>>((acc, [key, value]) => {
        // remove -- var prefix
        // "ice-"
        const varName = key.slice(defaultVarPrefix.length)
        acc[varName] = isRgba(value) ? `rgba(var(${key}))` : `rgba(var(${key}) / <alpha-value>)`

        return acc
      }, {})
    }
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
