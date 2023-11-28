import postcssJs from 'postcss-js'
import postcss, { Root, AcceptedPlugin } from 'postcss'
import type { CodegenOptions, VarPrefixerOptions } from '@icestack/types'
import prefixer from './prefixer'
import type { Options as PrefixerOptions } from './prefixer'
export { VarPrefixerOptions } from '@icestack/types'
export type { Options as PrefixerOptions } from './prefixer'
export { getPlugin as getCssVarsPrefixerPlugin } from './custom-property-prefixer'

export * from './tailwindcss'
export * from './js'

export function resolvePrefixOption(options: string | PrefixerOptions): PrefixerOptions {
  return typeof options === 'string'
    ? {
        prefix: options
      }
    : options
}

export function resolveVarPrefixOption(options: string | VarPrefixerOptions): VarPrefixerOptions {
  return typeof options === 'string'
    ? {
        varPrefix: options
      }
    : options
}

export function getPrefixerPlugin(prefix: CodegenOptions['prefix']) {
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

export function process(plugins: AcceptedPlugin[], css: string) {
  // @ts-ignore
  return postcss(plugins).process(css, {
    from: undefined
  })
}
