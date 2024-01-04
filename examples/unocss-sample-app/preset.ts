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

const replacePrefix = (css: string) => css.replaceAll('--tw-', '--un-')

const processor = postcss([
  {
    postcssPlugin: 'xxx',
    Declaration(decl) {
      decl.prop = replacePrefix(decl.prop)
      decl.value = decl.value.replace(/rgba?\((.*?)\/(.*)\)/, (m, p1, p2) => {
        return replacePrefix(`rgba(${p1.trim()},${p2.trim()})`)
      })
    }
  }
])
const process = (object: CssInJs) => processor.process(object, { parser: parse })

export function groupBy<T, R = T>(arr: T[], cb: (arg: T) => string, mapper?: (arg: T) => R): Record<string, R[]> {
  if (!Array.isArray(arr)) {
    throw new TypeError('expected an array for first argument')
  }

  if (typeof cb !== 'function') {
    throw new TypeError('expected a function for second argument')
  }

  const result: Record<string, R[]> = {}
  for (const item of arr) {
    const bucketCategory = cb(item)
    const bucket = result[bucketCategory]
    const x = mapper ? mapper(item) : (item as unknown as R)
    if (Array.isArray(bucket)) {
      result[bucketCategory].push(x)
    } else {
      result[bucketCategory] = [x]
    }
  }

  return result
}

function requireLib(id: string, basedir: string) {
  return require(path.resolve(basedir, id))
}

const defaultOptions: Partial<UnocssPluginOptions> = {
  loadConfig: false
}

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
  const rules: [string, string][] = []
  for (const { base, styled, utils } of Object.values(components)) {
    const v = process(mergeRClone(base, styled, utils)).root.nodes

    for (const r of v) {
      const s = new Set<string>()
      if (r.type === 'atrule') {
      } else if (r.type === 'rule') {
        const ast = defaultParser.astSync(r.selector)
        // console.log(ast)
        ast.walkClasses((rule) => {
          if (!s.has(rule.value)) {
            s.add(rule.value)
            rules.push([rule.value, r.toString()])
          }
        })
      }
    }
  }

  const res = groupBy(
    rules,
    ([key]) => {
      return key
    },
    (x) => {
      return x[1]
    }
  )
  const rrr = Object.entries(res).map(([key, css]) => {
    return [key, css.join('\n')]
  })
  // console.log(res)

  return rrr
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
  const theme = loadConfig ? getConfig(loadDirectory) : {}
  const rules: Rule<object>[] = getRules(loadDirectory).map(([x, y]) => {
    return [new RegExp(`^${x}$`), () => y]
  })
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
