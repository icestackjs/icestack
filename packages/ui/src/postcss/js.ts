import postcssJs from 'postcss-js'
import type { AcceptedPlugin } from 'postcss'
// import { getPlugin } from './custom-property-prefixer'
import postcssPrefix from './prefixer'
import globalPostcss from './global'
// import { rtlcss } from './rtlcss'
// import basePlugin from './runtime/base'
import { CodegenOptions } from '@/types'

export function getJsProcess(options: CodegenOptions) {
  const { runtime } = options
  const basePlugins: AcceptedPlugin[] = []
  const componentsPlugins: AcceptedPlugin[] = []
  const utilitiesPlugins: AcceptedPlugin[] = []

  // if (varPrefix) {
  //   const p = getPlugin(varPrefix)
  //   basePlugins.push(p)
  //   componentsPlugins.push(p)
  //   utilitiesPlugins.push(p)
  // }
  const { prefix } = runtime
  if (prefix) {
    const p = postcssPrefix(typeof prefix === 'string' ? { prefix, ignore: [] } : prefix)
    componentsPlugins.push(p)
    utilitiesPlugins.push(p)
  }
  // if (rtl) {
  //   const p = rtlcss(typeof rtl === 'boolean' ? undefined : rtl)
  //   componentsPlugins.push(p)
  //   utilitiesPlugins.push(p)
  // }

  if (runtime) {
    const p = globalPostcss(options)
    basePlugins.push(p)
    componentsPlugins.push(p)
    utilitiesPlugins.push(p)
  }

  // if (base) {
  //   const p = basePlugin(options)
  //   basePlugins.push(p)
  // }

  return {
    baseProcess: postcssJs.sync(basePlugins),
    componentsProcess: postcssJs.sync(componentsPlugins),
    utilitiesProcess: postcssJs.sync(utilitiesPlugins)
  }
}
