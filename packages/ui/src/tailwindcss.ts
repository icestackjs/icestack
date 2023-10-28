import path from 'node:path'
import plugin from 'tailwindcss/plugin'
import merge from 'merge'
import type { CssInJs } from 'postcss-js'
import type * as _base from '../assets/js/base/index.js'
import type * as _components from '../assets/js/components/index.js'
import type * as _utilities from '../assets/js/utilities/index.js'
import { someExtends, defaultVarPrefix } from './constants.js'
import type { CodegenOptions, DeepPartial } from './types'
import { getCodegenOptions } from './options.js'
import { getJsProcess } from '@/postcss/js'
import { extractAll } from '@/extract'

function isRgba(colorString: string) {
  return typeof colorString === 'string' && colorString.includes('/')
}

function requireLib(id: string, basedir?: string) {
  return require(basedir ? path.resolve(basedir, id) : path.join('../assets', id))
}

export const icestackPlugin = plugin.withOptions(
  function (opts?: DeepPartial<CodegenOptions>) {
    const options = getCodegenOptions(opts)
    const { basedir } = options
    let base: typeof _base, components: typeof _components, utilities: typeof _utilities
    if (basedir) {
      base = requireLib('js/base/index.js', basedir) as typeof _base
      components = requireLib('js/components/index.js', basedir) as typeof _components
      utilities = requireLib('js/utilities/index.js', basedir) as typeof _utilities
    } else {
      const start = performance.now()
      const res = extractAll(options)
      const now = performance.now()
      console.log(`extractAll: ${now - start}ms`)
      base = res.base
      components = res.components
      utilities = res.utilities
    }

    const componentsEntries = Object.entries(components)
    const utilitiesEntries = Object.entries(utilities)
    const { baseProcess, componentsProcess, utilitiesProcess } = getJsProcess(options)

    const baseObj = baseProcess(base)

    return function ({ addBase, addComponents, addUtilities }) {
      addBase([baseObj])

      for (const [name, item] of componentsEntries) {
        const cssItems: (CssInJs | undefined)[] = [item.unstyled, item.styled]

        // const hit = options?.components?.[name]
        // if (hit && Array.isArray(hit.append)) {
        //   cssItems.push(...hit.append)
        // }
        let cssObj = merge.recursive(true, ...cssItems)

        cssObj = componentsProcess(cssObj)

        addComponents(cssObj)
      }

      for (const [name, item] of utilitiesEntries) {
        const cssItems: (CssInJs | undefined)[] = [item.global, item.unstyled, item.styled]

        // @ts-ignore
        const hit = options?.components?.[name]
        if (hit && Array.isArray(hit.append)) {
          cssItems.push(...hit.append)
        }
        let cssObj = merge.recursive(true, ...cssItems)

        cssObj = utilitiesProcess(cssObj)

        addUtilities(cssObj)
      }
    }
  },
  function (opts?: DeepPartial<CodegenOptions>) {
    const { basedir } = getCodegenOptions(opts)
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
