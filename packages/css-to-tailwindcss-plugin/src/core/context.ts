// dispose base components utilities
import fs from 'node:fs/promises'
import fss from 'node:fs'
import path from 'node:path'
import type { AcceptedPlugin, Node } from 'postcss'
import postcss from 'postcss'
import atImport from 'postcss-import'
import { extractLayerPlugin, markLayerPlugin } from './extract-layer'
import { isExtSassFile, sassCompile, sassCompileSync } from './sass'
import { createGenerator } from './generator'
import { IProcessOptions } from '@/types'
import { getOptions } from '@/options'

export type NodeMapKeys = 'base' | 'components' | 'utilities'

export function createContext(opts?: IProcessOptions) {
  const options = getOptions(opts)
  const layersMap = new Map<NodeMapKeys, Node[]>()

  function resetLayersMap() {
    layersMap.set('base', [])
    layersMap.set('components', [])
    layersMap.set('utilities', [])
  }

  resetLayersMap()

  function getNodes(key: NodeMapKeys) {
    const arrRef = layersMap.get(key)
    if (Array.isArray(arrRef)) {
      return arrRef
    }
    const arr: Node[] = []
    layersMap.set(key, arr)
    return arr
  }

  function append(key: NodeMapKeys, nodes: Node | Node[]) {
    const arr = getNodes(key)
    if (Array.isArray(nodes)) {
      arr.push(...nodes)
    } else {
      arr.push(nodes)
    }
  }

  const generator = createGenerator()

  return {
    layersMap,
    append,
    getNodes,
    getPluginsSync() {
      const { tailwindcssConfig } = options
      const opt = { ctx: this }
      const plugins: AcceptedPlugin[] = [markLayerPlugin(opt)]
      if (tailwindcssConfig) {
        const tailwindcss = require('tailwindcss')
        plugins.push(tailwindcss(tailwindcssConfig))
      }
      plugins.push(extractLayerPlugin(opt))
      return plugins
    },
    async getPlugins() {
      const { tailwindcssConfig } = options
      const opt = { ctx: this }
      const plugins: AcceptedPlugin[] = [markLayerPlugin(opt)]
      if (tailwindcssConfig) {
        const { default: tailwindcss } = await import('tailwindcss')
        plugins.push(tailwindcss(tailwindcssConfig))
      }
      plugins.push(extractLayerPlugin(opt))
      return plugins
    },
    async process(entry: string) {
      const { sassOptions, atImportOptions } = options
      const plugins = await this.getPlugins()
      let css: string
      const extname = path.extname(entry)

      // for more langs support
      // eslint-disable-next-line unicorn/prefer-ternary
      if (isExtSassFile(extname)) {
        try {
          css = await sassCompile(entry, sassOptions)
        } catch {
          throw new Error(`file: ${path} is skipped. please confirm you have installed \`sass\`!`)
          // console.log(`file: ${path} is skipped. please confirm you have installed \`sass\`!`)
          // return
        }
      } else {
        css = await fs.readFile(entry, 'utf8')
        atImportOptions.root = path.dirname(entry)
        plugins.unshift(atImport(atImportOptions))
      }
      const res = await postcss(plugins).process(css, {
        from: undefined
      })
      return res
    },
    processSync(entry: string) {
      const { sassOptions, atImportOptions } = options
      const plugins = this.getPluginsSync()
      let css: string
      const extname = path.extname(entry)

      // for more langs support
      // eslint-disable-next-line unicorn/prefer-ternary
      if (isExtSassFile(extname)) {
        try {
          css = sassCompileSync(entry, sassOptions)
        } catch {
          throw new Error(`file: ${path} is skipped. please confirm you have installed \`sass\`!`)
        }
      } else {
        css = fss.readFileSync(entry, 'utf8')
        atImportOptions.root = path.dirname(entry)
        // plugins.unshift(atImport(atImportOptions))
      }
      const res = postcss(plugins).process(css).sync()

      return res
    },
    generate: function () {
      return generator.generate(this)
    }
  }
}

export type IContext = ReturnType<typeof createContext>
