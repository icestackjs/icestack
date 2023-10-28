import path from 'node:path'
import plugin from 'tailwindcss/plugin'
import merge from 'merge'
import type { CssInJs } from 'postcss-js'
import type * as _base from '../assets/js/base/index.js'
import type * as _components from '../assets/js/components/index.js'
import type * as _utilities from '../assets/js/utilities/index.js'
import { someExtends } from './constants.js'
import type { CodegenOptions, DeepPartial } from './types'
import { getCodegenOptions } from './options.js'
import { getJsProcess } from '@/postcss/js'
import { buildAll } from '@/generate'
import { getColors } from '@/colors'

// function isRgba(colorString: string) {
//   return typeof colorString === 'string' && colorString.includes('/')
// }

function requireLib(id: string, basedir?: string) {
  return require(basedir ? path.resolve(basedir, id) : path.join('../assets', id))
}

export const icestackPlugin = plugin.withOptions(
  function (opts?: DeepPartial<CodegenOptions>) {
    const options = getCodegenOptions(opts)

    if (options.loaddir || options.outdir) {
      let loadDirPath: string
      if (options.loaddir) {
        const { loaddir } = options
        loadDirPath = loaddir
      } else {
        if (options.autobuild) {
          const start = performance.now()
          buildAll(options)
          const now = performance.now()
          console.log(`buildAll: ${now - start}ms`)
        }
        const { outdir } = options
        loadDirPath = outdir
      }
      const base = requireLib('js/base/index.js', loadDirPath) as typeof _base
      const components = requireLib('js/components/index.js', loadDirPath) as typeof _components
      const utilities = requireLib('js/utilities/index.js', loadDirPath) as typeof _utilities
      if (base && components && utilities) {
        const componentsEntries = Object.entries(components)
        // const utilitiesEntries = Object.entries(utilities)
        const { baseProcess, componentsProcess, utilitiesProcess } = getJsProcess(options)

        const baseObj = baseProcess(base)

        return function ({ addBase, addComponents, addUtilities }) {
          addBase([baseObj])

          for (const [name, item] of componentsEntries) {
            // 优先级 utils > index > base
            const cssItems: (CssInJs | undefined)[] = [item.base, item.index, item.utils]

            let cssObj = merge.recursive(true, ...cssItems)

            cssObj = componentsProcess(cssObj)

            addComponents(cssObj)
          }

          const cssItems: (CssInJs | undefined)[] = [utilities.global]

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
    }

    return function () {}
  },
  function (opts?: DeepPartial<CodegenOptions>) {
    const options = getCodegenOptions(opts)
    // const base = requireLib('js/base/index.js', loaddir) as typeof _base

    const colors = getColors(options)
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
