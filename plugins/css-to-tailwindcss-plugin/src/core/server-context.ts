import type { IProcessOptions } from '@/types'
import type { AcceptedPlugin } from 'postcss'
import fss from 'node:fs'
// dispose base components utilities
import fs from 'node:fs/promises'
import path from 'node:path'
import { getOptions } from '@/options'
import postcss from 'postcss'
import atImport from 'postcss-import'
import { BaseContext } from './base-context'
import { atRulesRenamePlugin, extractLayerPlugin, markLayerPlugin } from './extract-layer'
import { isExtSassFile, sassCompile, sassCompileString, sassCompileSync } from './sass'

export function createContext(opts?: IProcessOptions) {
  const ctx = new BaseContext()

  const options = getOptions(opts)
  ctx.options = options

  return {
    ctx,
    /**
     * @description Not recommended
     */
    getPluginsSync() {
      // const { tailwindcssConfig, tailwindcssResolved } = options
      const opt = { ctx }
      const plugins: AcceptedPlugin[] = [atRulesRenamePlugin(opt)]
      // tailwindcss is an sync plugin and both postcss-import

      // if (tailwindcssResolved && tailwindcssConfig) {
      //   const tailwindcss = require('tailwindcss')
      //   plugins.push(tailwindcss(tailwindcssConfig))
      // }
      plugins.push(markLayerPlugin(opt))
      plugins.push(extractLayerPlugin(opt))
      options.postcssPlugins?.(plugins)
      return plugins
    },
    async getPlugins() {
      const { tailwindcssConfig, tailwindcssResolved } = options
      const opt = { ctx }
      const plugins: AcceptedPlugin[] = [atRulesRenamePlugin(opt)]
      if (tailwindcssResolved && tailwindcssConfig) {
        const { default: tailwindcss } = await import('tailwindcss')
        plugins.push(tailwindcss(tailwindcssConfig))
      }
      plugins.push(markLayerPlugin(opt))
      plugins.push(extractLayerPlugin(opt))
      options.postcssPlugins?.(plugins)
      return plugins
    },
    async process(entry: string) {
      const { sassOptions, atImportOptions } = options
      const plugins = await this.getPlugins()
      let css: string
      const extname = path.extname(entry)

      // for more langs support

      if (isExtSassFile(extname)) {
        // eslint-disable-next-line no-useless-catch
        try {
          css = await sassCompile(entry, sassOptions)
        }
        catch (error) {
          throw error
          // new Error(`file: ${path} is skipped. please confirm you have installed \`sass\`!`)
          // console.log(`file: ${path} is skipped. please confirm you have installed \`sass\`!`)
          // return
        }
      }
      else {
        css = await fs.readFile(entry, 'utf8')
        atImportOptions.root = path.dirname(entry)
        plugins.unshift(atImport(atImportOptions))
      }
      const res = await postcss(plugins)
        .process(css, {
          from: undefined,
        })
        .async()
      return res
    },
    /**
     * @description Not recommended
     */
    processSync(entry: string) {
      const { sassOptions } = options
      const plugins = this.getPluginsSync()
      let css: string
      const extname = path.extname(entry)

      // for more langs support

      if (isExtSassFile(extname)) {
        // eslint-disable-next-line no-useless-catch
        try {
          css = sassCompileSync(entry, sassOptions)
        }
        catch (error) {
          throw error
          // throw new Error(`file: ${path} is skipped. please confirm you have installed \`sass\`!`)
        }
      }
      else {
        css = fss.readFileSync(entry, 'utf8')
        // atImportOptions.root = path.dirname(entry)
        // plugins.unshift(atImport(atImportOptions))
      }
      const res = postcss(plugins).process(css).sync()

      return res
    },
    /**
     * @description Not recommended
     */
    async processString(rawCss: string) {
      const { sassOptions } = options
      const plugins = await this.getPlugins()
      const css = await sassCompileString(rawCss, sassOptions)
      // for more langs support
      const res = await postcss(plugins)
        .process(css, {
          from: undefined,
        })
        .async()
      return res
    },
    generate() {
      const { generatorOptions } = options
      return ctx.generator.generate(ctx, generatorOptions)
    },
  }
}

export type IContext = ReturnType<typeof createContext>
