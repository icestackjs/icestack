import path from 'node:path'
import fs from 'node:fs'
import plugin from 'tailwindcss/plugin'
import merge from 'merge'
import type { CssInJs } from 'postcss-js'
import type { CSSRuleObject, PluginCreator } from 'tailwindcss/types/config'

import type { DeepPartial, TailwindcssPluginOptions } from '@icestack/types'
import { getJsProcess } from '@icestack/postcss'
import { createLogger } from '@icestack/logger'
import { Config } from 'tailwindcss'
import { name as pkgName } from '../package.json'

const logger = createLogger(pkgName)

function requireLib(id: string, basedir: string) {
  return require(path.resolve(basedir, id))
}

export type IcestackCSSRule = {
  base: CSSRuleObject | CSSRuleObject[]
  styled: CSSRuleObject | CSSRuleObject[]
  utils: CSSRuleObject | CSSRuleObject[]
}

const noop: PluginCreator = () => {}

export const icestackPlugin = plugin.withOptions(
  function (opts: DeepPartial<TailwindcssPluginOptions>) {
    try {
      if (opts && opts.loadDirectory) {
        const { loadDirectory } = opts

        if (!fs.existsSync(loadDirectory)) {
          logger.warn(`Can not find loadDirectory:${loadDirectory}, make sure this dir is existed`)
          return noop
        }
        const base = requireLib('js/base/index.cjs', loadDirectory) as IcestackCSSRule
        const components = requireLib('js/components/index.cjs', loadDirectory) as Record<string, IcestackCSSRule>
        const utilities = requireLib('js/utilities/index.cjs', loadDirectory) as IcestackCSSRule
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
      logger.warn(error)

      return noop
    }
  },
  function (opts: DeepPartial<TailwindcssPluginOptions>) {
    try {
      if (opts && opts.loadDirectory) {
        const { loadConfig, loadDirectory } = opts
        if (loadConfig) {
          if (loadConfig === true) {
            const config = requireLib('js/tailwindcss/config.cjs', loadDirectory) as Config
            return config
          } else if (typeof loadConfig === 'string') {
            return require(loadConfig)
          }
        }
      }
      return {}
    } catch (error) {
      logger.warn(error)
      return {}
    }
  }
)
