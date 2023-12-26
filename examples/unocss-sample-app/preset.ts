import path from 'node:path'
import fs from 'node:fs'
import type { Preset, DynamicRule, Preflight, Rule } from 'unocss'
// import { icestackPreset } from '@icestack/unocss'
import { mergeRClone, defu } from '@icestack/shared'
// import { tokenize, type ClassToken } from 'parsel-js'
import parser from 'postcss-selector-parser'
import type { UnocssPluginOptions } from '@icestack/types'
// import { createLogger } from '@icestack/logger'
// import { name as pkgName } from '../package.json'
// // new RegExp(`^${base}$`)
// const logger = createLogger(pkgName)

function requireLib(id: string, basedir: string) {
  return require(path.resolve(basedir, id))
}

const defaultOptions: Partial<UnocssPluginOptions> = {
  loadConfig: false
}

// const replacePrefix = (css: string) => css.replaceAll('--tw-', '--un-')
const defaultParser = parser()

export function getPreflightCss(loadDirectory: string) {
  return fs.readFileSync(path.resolve(loadDirectory, 'css-resolved/base/unocss.css'), 'utf8')
}

export const icestackPreset: (opts: UnocssPluginOptions) => Preset = (opts) => {
  const { loadDirectory, loadConfig } = defu<UnocssPluginOptions, Partial<UnocssPluginOptions>[]>(opts, defaultOptions)
  if (!loadDirectory) {
    throw new Error('loadDirectory option must be passed')
  }
  const preflightCss = getPreflightCss(loadDirectory)
  const components = requireLib('js/components/index.cjs', loadDirectory) as Record<
    string,
    {
      base: Record<string, object>
      styled: Record<string, object>
      utils: Record<string, object>
    }
  >
  const config = requireLib('js/unocss/config.cjs', loadDirectory)
  const keyframes = []
  const theme = {
    colors: {
      ...config.theme.colors
    }
  }
  const rules: Rule<object>[] = []

  for (const { base, styled, utils } of Object.values(components)) {
    const v = mergeRClone(base, styled, utils)
    for (const [key, value] of Object.entries(v)) {
      const ast = defaultParser.astSync(key)
      ast.walkClasses((s) => {
        // @ts-ignore
        rules.push([new RegExp(`^${s.value}$`), value, {}])
      })
    }

    // rules.push([new RegExp(`^${}$`), () => {
    //   return
    // }])
  }
  const preflights: Preflight<object>[] = [
    {
      getCSS() {
        return preflightCss
      }
    },
    {
      getCSS: () => keyframes.join('\n')
    }
  ]
  return {
    name: 'unocss-preset-icestack',
    preflights,
    theme,
    rules
  }
}
