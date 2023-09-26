// dispose base components utilities
import fs from 'node:fs/promises'
import path from 'node:path'
import type { AcceptedPlugin, Node } from 'postcss'
import postcss from 'postcss'
import atImport from 'postcss-import'
import { extractLayerPlugin, markLayerPlugin } from './extract-layer'
import { isExtSassFile, sassCompile } from './sass'
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
    append,
    getNodes,
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
        css = await sassCompile(entry, sassOptions)
      } else {
        css = await fs.readFile(entry, 'utf8')
        plugins.push(atImport(atImportOptions))
      }

      await postcss(plugins).process(css, {
        from: undefined
      })
      return this
    },
    generate: function () {
      return generator.generate(this)
    }
  }
}

export type IContext = ReturnType<typeof createContext>
