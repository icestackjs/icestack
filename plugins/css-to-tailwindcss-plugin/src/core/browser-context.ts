import type { AcceptedPlugin } from 'postcss'
import postcss from 'postcss'
import defu from 'defu'
import { extractLayerPlugin, markLayerPlugin, atRulesRenamePlugin } from './extract-layer'
// import { sassCompileString } from './sass'
import { BaseContext } from './base-context'
import type { IProcessOptions, TailwindcssPluginOptions } from '@/types'

export function getDefaults(): IProcessOptions & { cacheDir?: string } {
  return {
    atImportOptions: {},
    tailwindcssResolved: false,
    withOptions: true,
    withOptionsWalkCSSRuleObject(obj) {
      return obj
    }
  }
}

export function getClientOptions(opts?: IProcessOptions) {
  return defu(opts, getDefaults()) as Required<TailwindcssPluginOptions>
}

export function createContext(opts?: IProcessOptions) {
  const ctx = new BaseContext()
  const options = getClientOptions(opts)
  ctx.options = options
  return {
    ctx,
    getPlugins() {
      // const { tailwindcssConfig, tailwindcssResolved } = options
      const opt = { ctx }
      const plugins: AcceptedPlugin[] = [atRulesRenamePlugin(opt)]
      // if (tailwindcssResolved && tailwindcssConfig) {
      //   const { default: tailwindcss } = await import('tailwindcss')
      //   plugins.push(tailwindcss(tailwindcssConfig))
      // }
      plugins.push(markLayerPlugin(opt))
      plugins.push(extractLayerPlugin(opt))
      options.postcssPlugins?.(plugins)
      return plugins
    },

    async processString(rawCss: string) {
      // const { sassOptions } = options
      const plugins = await this.getPlugins()
      // const css = await sassCompileString(rawCss, sassOptions)
      // for more langs support
      const res = await postcss(plugins).process(rawCss, {
        from: undefined
      })
      return res
    },
    generate: function () {
      const { generatorOptions } = options
      return ctx.generator.generate(ctx, generatorOptions)
    }
  }
}

export type IContext = ReturnType<typeof createContext>
