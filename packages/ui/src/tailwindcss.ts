import path from 'node:path'
import fs from 'node:fs'
import plugin from 'tailwindcss/plugin'
import merge from 'merge'
import type { CssInJs } from 'postcss-js'
import type { PluginCreator } from 'tailwindcss/types/config'
import type * as _base from '../assets/js/base/index.js'
import type * as _components from '../assets/js/components/index.js'
import type * as _utilities from '../assets/js/utilities/index.js'
import { createDefaultTailwindcssExtends } from './defaults'
import type { CodegenOptions, DeepPartial } from './types'
import { getCodegenOptions } from './options.js'
import { getJsProcess } from '@/postcss/js'
import { buildAll } from '@/generate'
import { getColors } from '@/colors'
import { logger } from '@/log'

function requireLib(id: string, basedir?: string) {
  return require(basedir ? path.resolve(basedir, id) : path.join('../assets', id))
}

function isRunByVscodePlugin() {
  return process.env.VSCODE_PID !== undefined
}

const noop: PluginCreator = () => {}

export const icestackPlugin = plugin.withOptions(
  function (opts?: DeepPartial<CodegenOptions>) {
    try {
      const options = getCodegenOptions(opts)

      if (options.loaddir || options.outdir) {
        let loadDirPath: string
        if (options.loaddir) {
          const { loaddir } = options
          loadDirPath = loaddir
        } else {
          if (options.autobuild || !isRunByVscodePlugin()) {
            const start = performance.now()
            buildAll(options)
            const now = performance.now()
            logger.success(`buildAll: ${now - start}ms`)
          }
          const { outdir } = options
          // fs.writeFileSync(path.resolve(outdir, './env.json'), JSON.stringify(process.env), 'utf8')
          loadDirPath = outdir
        }
        if (!fs.existsSync(loadDirPath)) {
          return noop
        }
        const base = requireLib('js/base/index.js', loadDirPath) as typeof _base
        const components = requireLib('js/components/index.js', loadDirPath) as typeof _components
        const utilities = requireLib('js/utilities/index.js', loadDirPath) as typeof _utilities
        if (base && components && utilities) {
          const componentsEntries = Object.entries(components)
          const utilitiesEntries = Object.entries(utilities)
          const { baseProcess, componentsProcess, utilitiesProcess } = getJsProcess(options)

          const baseObj = baseProcess(base)

          return function ({ addBase, addComponents, addUtilities }) {
            addBase(baseObj)

            for (const [, item] of componentsEntries) {
              // 优先级 utils > index > base
              const cssItems: (CssInJs | undefined)[] = [item.base, item.styled, item.utils]

              let cssObj = merge.recursive(true, ...cssItems)

              cssObj = componentsProcess(cssObj)

              addComponents(cssObj)
            }

            for (const [, item] of utilitiesEntries) {
              const cssItems: (CssInJs | undefined)[] = [item.glass, item.variables]

              // @ts-ignore
              // const hit = options?.components?.[name]
              // if (hit && Array.isArray(hit.append)) {
              //   cssItems.push(...hit.append)
              // }
              let cssObj = merge.recursive(true, ...cssItems)

              cssObj = utilitiesProcess(cssObj)

              addUtilities(cssObj)
            }
          }
        }
      }

      return noop
    } catch (error) {
      console.error(error)
      return noop
    }
  },
  function (opts?: DeepPartial<CodegenOptions>) {
    const options = getCodegenOptions(opts)
    const { varPrefix } = options

    return {
      theme: {
        extend: {
          colors: {
            ...getColors(options)
          },
          ...createDefaultTailwindcssExtends({
            varPrefix
          })
        }
      }
    }
  }
)
