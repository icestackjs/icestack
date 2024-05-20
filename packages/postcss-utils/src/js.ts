import type { CssInJs } from 'postcss-js'
import postcssJs from 'postcss-js'
import type { AcceptedPlugin, Document, LazyResult, Root } from 'postcss'
import postcss from 'postcss'

const noop: <T>(x: T) => T = x => x
export function getJsProcess() {
  return {
    baseProcess: noop, // postcssJs.sync(basePlugins),
    componentsProcess: noop, // postcssJs.sync(componentsPlugins),
    utilitiesProcess: noop, //  postcssJs.sync(utilitiesPlugins)
  }
}

export function objectify(root: Root) {
  return postcssJs.objectify(root as Root)
}

export function parseJs(cssInJs: CssInJs) {
  return postcssJs.parse(cssInJs)
}

export function stringify(cssInJs: CssInJs) {
  return parseJs(cssInJs).toString()
}

export function postcssProcess(plugins: AcceptedPlugin[], css: string): LazyResult<Document | Root> {
  // @ts-ignore
  return postcss(plugins).process(css, {
    from: undefined,
  })
}

export { generateCva } from 'postcss-cva/generator'
