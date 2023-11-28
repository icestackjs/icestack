import path from 'node:path'
import fs from 'node:fs'
import plugin from 'tailwindcss/plugin'
import merge from 'merge'
import type { CssInJs } from 'postcss-js'
import type { CSSRuleObject, PluginCreator } from 'tailwindcss/types/config'
// import objHash from 'object-hash'
import type { DeepPartial, TailwindcssPluginOptions } from '@icestack/types'
import { getJsProcess } from '@icestack/postcss'
import { logger } from '@icestack/logger'
// import type * as _base from '#/assets/js/base/index.js'
// import type * as _components from '#/assets/js/components/index.js'
// import type * as _utilities from '#/assets/js/utilities/index.js'

function requireLib(id: string, basedir?: string) {
  return require(basedir ? path.resolve(basedir, id) : path.join('../assets', id))
}

// function isRunByVscodePlugin() {
//   return process.env.VSCODE_PID !== undefined
// }

export type IcestackCSSRule = {
  base: CSSRuleObject | CSSRuleObject[]
  styled: CSSRuleObject | CSSRuleObject[]
  utils: CSSRuleObject | CSSRuleObject[]
}

const noop: PluginCreator = () => { }

export const icestackPlugin = plugin.withOptions(
  function (opts: DeepPartial<TailwindcssPluginOptions>) {
    try {
      if (opts && opts.loaddir) {
        const { loaddir } = opts
        const loadDirPath = loaddir

        if (!fs.existsSync(loadDirPath)) {
          logger.warn(`Can not find loadDirPath:${loadDirPath}, make sure this dir is existed`)
          return noop
        }
        const base = requireLib('js/base/index.js', loadDirPath) as IcestackCSSRule
        const components = requireLib('js/components/index.js', loadDirPath) as Record<
          string,
          IcestackCSSRule
        >
        const utilities = requireLib('js/utilities/index.js', loadDirPath) as IcestackCSSRule
        if (base && components && utilities) {
          const componentsEntries = Object.entries(components)
          const utilitiesEntries = Object.entries(utilities)
          const { baseProcess, componentsProcess, utilitiesProcess } = getJsProcess()

          const baseObj = baseProcess(base) as CSSRuleObject | CSSRuleObject[]

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
              const cssItems: (CssInJs | undefined)[] = [item]

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
  function () {
    return {}
  }
)
