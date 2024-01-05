import postcssJs, { CssInJs } from 'postcss-js'
import postcss, { Root, AcceptedPlugin, LazyResult, Document } from 'postcss'

const noop: <T>(x: T) => T = (x) => x
export function getJsProcess() {
  return {
    baseProcess: noop, // postcssJs.sync(basePlugins),
    componentsProcess: noop, // postcssJs.sync(componentsPlugins),
    utilitiesProcess: noop //  postcssJs.sync(utilitiesPlugins)
  }
}

export function objectify(root: Root) {
  return postcssJs.objectify(root as Root)
}

export function stringify(cssInJs: CssInJs) {
  return postcssJs.parse(cssInJs).toString()
}

export function process(plugins: AcceptedPlugin[], css: string): LazyResult<Document | Root> {
  // @ts-ignore
  return postcss(plugins).process(css, {
    from: undefined
  })
}
