import type { CssInJs } from 'postcss-js'
import type { Config } from 'tailwindcss'
import type { CSSRuleObject, PluginCreator } from 'tailwindcss/types/config'
import fs from 'node:fs'
import path from 'node:path'
import { createLogger } from '@icestack/logger'

import { mergeRClone } from '@icestack/shared'
import plugin from 'tailwindcss/plugin'
import { name as pkgName } from '../package.json'

export interface TailwindcssPluginOptions {
  loadDirectory: string
  loadConfig?: boolean | string
}

const logger = createLogger(pkgName)

function requireLib(id: string, basedir: string) {
  return require(path.resolve(basedir, id))
}

export interface IcestackCSSRule {
  base: CSSRuleObject | CSSRuleObject[]
  styled: CSSRuleObject | CSSRuleObject[]
  utils: CSSRuleObject | CSSRuleObject[]
}

const noop: PluginCreator = () => {}

export const icestackPlugin = plugin.withOptions(
  (opts: TailwindcssPluginOptions) => {
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
          // const { baseProcess, componentsProcess, utilitiesProcess } = getJsProcess()

          const baseObj = base as CSSRuleObject | CSSRuleObject[]

          return function ({ addBase, addComponents, addUtilities }) {
            addBase(baseObj)

            for (const [, item] of componentsEntries) {
              // 优先级 utils > index > base
              const cssItems: (CssInJs | undefined)[] = [item.base, item.styled, item.utils]

              const cssObj = mergeRClone(...cssItems)

              addComponents(cssObj)
            }

            for (const [, item] of utilitiesEntries) {
              const cssItems: (CssInJs | undefined)[] = [item]

              const cssObj = mergeRClone(...cssItems)

              addUtilities(cssObj)
            }
          }
        }
      }

      return noop
    }
    catch (error) {
      logger.warn(error)

      return noop
    }
  },
  (opts: TailwindcssPluginOptions) => {
    try {
      if (opts && opts.loadDirectory) {
        const { loadConfig, loadDirectory } = opts
        if (loadConfig) {
          if (loadConfig === true) {
            const config = requireLib('js/tailwindcss/config.cjs', loadDirectory) as Config
            return config
          }
          else if (typeof loadConfig === 'string') {
            return require(loadConfig)
          }
        }
      }
      return {}
    }
    catch (error) {
      logger.warn(error)
      return {}
    }
  },
)
