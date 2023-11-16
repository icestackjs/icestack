// import postcssJs from 'postcss-js'
// import type { AcceptedPlugin } from 'postcss'
// import { TailwindcssPluginOptions } from '@/types'
// options: TailwindcssPluginOptions

const noop: <T>(x: T) => T = (x) => x
export function getJsProcess() {
  // const { runtime } = options
  // const basePlugins: AcceptedPlugin[] = []
  // const componentsPlugins: AcceptedPlugin[] = []
  // const utilitiesPlugins: AcceptedPlugin[] = []

  return {
    baseProcess: noop, // postcssJs.sync(basePlugins),
    componentsProcess: noop, // postcssJs.sync(componentsPlugins),
    utilitiesProcess: noop //  postcssJs.sync(utilitiesPlugins)
  }
}
