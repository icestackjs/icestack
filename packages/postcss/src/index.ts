import postcssJs from 'postcss-js'
import postcss, { Root, AcceptedPlugin, LazyResult, Document } from 'postcss'
import type { VarPrefixerOptions, PrefixerOptions } from '@icestack/types'
import prefixer from './prefixer'

export type { CssInJs } from 'postcss-js'
export type { VarPrefixerOptions, PrefixerOptions } from '@icestack/types'

export { getPlugin as getCssVarsPrefixerPlugin } from './custom-property-prefixer'

export { initTailwindcssConfig, resolveTailwindcss } from './tailwindcss'
export { getJsProcess } from './js'

export function resolvePrefixOption(options?: false | string | PrefixerOptions) {
  if (options === false) {
    return options
  }
  return typeof options === 'string'
    ? {
        prefix: options
      }
    : options
}

export function resolveVarPrefixOption(options?: false | string | VarPrefixerOptions) {
  if (options === false) {
    return options
  }
  return typeof options === 'string'
    ? {
        varPrefix: options
      }
    : options
}

export function getPrefixerPlugin(prefix?: false | string | PrefixerOptions) {
  if (typeof prefix === 'string') {
    return prefixer({
      prefix
    })
  } else if (typeof prefix === 'object') {
    return prefixer(prefix)
  }
}

export function objectify(root: Root) {
  return postcssJs.objectify(root as Root)
}

export function process(plugins: AcceptedPlugin[], css: string): LazyResult<Document | Root> {
  // @ts-ignore
  return postcss(plugins).process(css, {
    from: undefined
  })
}

export * from '@icestack/postcss-utils'
