import path from 'node:path'
import fs from 'node:fs'
import type { Preset, DynamicRule, Preflight, Rule } from 'unocss'
import postcss from 'postcss'
import { parse, type CssInJs } from 'postcss-js'
// import { icestackPreset } from '@icestack/unocss'
import { mergeRClone, defu } from '@icestack/shared'
// import { tokenize, type ClassToken } from 'parsel-js'
import parser from 'postcss-selector-parser'
import type { UnocssPluginOptions } from '@icestack/types'
const processor = postcss()
const process = (object: CssInJs) => processor.process(object, { parser: parse })
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

export function getRules(loadDirectory: string) {
  const components = requireLib('js/components/index.cjs', loadDirectory) as Record<
    string,
    {
      base: Record<string, object>
      styled: Record<string, object>
      utils: Record<string, object>
    }
  >
  const rules: Rule<object>[] = [
    [
      /^x{5}$/,
      () => {
        return `.xxxxx{color:red;}
        .xxxxx>div{color:blue;}`
      }
    ]
  ]
  for (const { base, styled, utils } of Object.values(components)) {
    const v = process(mergeRClone(base, styled, utils)).root.nodes
    // console.log(v)
    // for (const [key, value] of Object.entries(v)) {
    //   const ast = defaultParser.astSync(key)
    //   if (ast.nodes.length === 1) {
    //     ast.walkClasses((s) => {
    //       // @ts-ignore
    //       rules.push([new RegExp(`^${s.value}$`), () => value, {}])
    //     })
    //   }
    // }

    // rules.push([new RegExp(`^${}$`), () => {
    //   return
    // }])
  }
  return rules
}

export function getConfig(loadDirectory: string) {
  const config = requireLib('js/unocss/config.cjs', loadDirectory)
  return {
    colors: {
      ...config.theme.colors
    }
  }
}

export const icestackPreset: (opts: UnocssPluginOptions) => Preset = (opts) => {
  const { loadDirectory, loadConfig } = defu<UnocssPluginOptions, Partial<UnocssPluginOptions>[]>(opts, defaultOptions)
  if (!loadDirectory) {
    throw new Error('loadDirectory option must be passed')
  }
  const preflightCss = getPreflightCss(loadDirectory)
  const keyframes = []
  const theme = getConfig(loadDirectory)
  const rules: Rule<object>[] = getRules(loadDirectory)
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
