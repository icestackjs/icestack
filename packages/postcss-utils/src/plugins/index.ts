import type { PrefixerOptions, VarPrefixerOptions } from '@icestack/types'
import prefixer from './prefixer'

export { default as collectClassPlugin } from './collect-class'
export { getPlugin as getCssVarsPrefixerPlugin } from './custom-property-prefixer'
export { default as extractCvaParamsPlugin } from './extract-cva-params'
export type { CommentType, CvaParams } from './extract-cva-params'

export { initTailwindcssConfig, resolveTailwindcss } from './tailwindcss'

export function resolvePrefixOption(options?: false | string | PrefixerOptions) {
  if (options === false) {
    return options
  }
  return typeof options === 'string'
    ? {
        prefix: options,
      }
    : options
}

export function resolveVarPrefixOption(options?: false | string | VarPrefixerOptions) {
  if (options === false) {
    return options
  }
  return typeof options === 'string'
    ? {
        varPrefix: options,
      }
    : options
}

export function getPrefixerPlugin(prefix?: false | string | PrefixerOptions) {
  if (typeof prefix === 'string') {
    return prefixer({
      prefix,
    })
  }
  else if (typeof prefix === 'object') {
    return prefixer(prefix)
  }
}
