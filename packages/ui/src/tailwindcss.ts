import path from 'node:path'
import plugin from 'tailwindcss/plugin'
import merge from 'merge'
import type { CssInJs } from 'postcss-js'
import type * as _base from '../assets/js/base/index.js'
import type * as _components from '../assets/js/components/index.js'
import type * as _utilities from '../assets/js/utilities/index.js'
import { someExtends, defaultVarPrefix } from './constants.js'
import type { DeepPartial, TailwindcssPluginOptions } from './types'
import { getTailwindcssOptions } from '@/options'
import { getJsProcess } from '@/postcss/js'

function isRgba(colorString: string) {
  return typeof colorString === 'string' && colorString.includes('/')
}

function requireLib(id: string, basedir?: string) {
  return require(basedir ? path.resolve(basedir, id) : path.join('../assets', id))
}

export const miniprogramPreset: () => DeepPartial<TailwindcssPluginOptions> = () => {
  return {
    global: {
      atMedia: {
        hover: false
      },
      selector: {
        universal: 'view'
      }
    }
  }
}

export const icestackPlugin = plugin.withOptions(
  function (opts?: Partial<TailwindcssPluginOptions>) {
    const options = getTailwindcssOptions(opts)
    const { styled, basedir } = options

    const base = requireLib('js/base/index.js', basedir) as typeof _base
    const components = requireLib('js/components/index.js', basedir) as typeof _components
    const utilities = requireLib('js/utilities/index.js', basedir) as typeof _utilities

    const componentsEntries = Object.entries(components)
    const utilitiesEntries = Object.entries(utilities)
    const { baseProcess, componentsProcess, utilitiesProcess } = getJsProcess(options)

    const baseObj = baseProcess(base)

    return function ({ addBase, addComponents, addUtilities }) {
      addBase([baseObj])

      for (const [, item] of componentsEntries) {
        const cssItems: (CssInJs | undefined)[] = [item.unstyled]
        if (styled) {
          cssItems.push(item.styled)
        }
        let cssObj = merge.recursive(true, ...cssItems)

        cssObj = componentsProcess(cssObj)

        addComponents(cssObj)
      }

      for (const [, item] of utilitiesEntries) {
        const cssItems: (CssInJs | undefined)[] = [item.global, item.unstyled]
        if (styled) {
          cssItems.push(item.styled)
        }
        let cssObj = merge.recursive(true, item.global, item.unstyled, item.styled)

        cssObj = utilitiesProcess(cssObj)

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
