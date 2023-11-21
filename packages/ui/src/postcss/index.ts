import postcssJs from 'postcss-js'
import postcss, { Root, AcceptedPlugin } from 'postcss'
import prefixer from './prefixer'
import type { CodegenOptions } from '@/types'
import type { Options as PrefixerOptions } from '@/postcss/prefixer'
export type { Options as PrefixerOptions } from '@/postcss/prefixer'
export { getPlugin as getCssVarsPrefixerPlugin } from './custom-property-prefixer'
export * from './tailwindcss'

export function resolvePrefixOption(options: string | PrefixerOptions): PrefixerOptions {
  return typeof options === 'string'
    ? {
        prefix: options
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

export { type Root, type AcceptedPlugin } from 'postcss'
