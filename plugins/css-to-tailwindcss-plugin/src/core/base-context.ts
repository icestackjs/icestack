import type { Node } from 'postcss'
import { createGenerator } from './generator'
import { TailwindcssPluginOptions } from '@/types'
import { LayerEnumType } from '@/constants'
// import { TailwindcssPluginOptions } from '@/types'

export class BaseContext {
  layersMap: Map<LayerEnumType, Node[]>
  options: Required<TailwindcssPluginOptions> | undefined
  generator: ReturnType<typeof createGenerator>
  constructor() {
    this.layersMap = new Map<LayerEnumType, Node[]>()

    this.resetLayersMap()

    this.generator = createGenerator()
  }

  getNodes(key: LayerEnumType) {
    const arrRef = this.layersMap.get(key)
    if (Array.isArray(arrRef)) {
      return arrRef
    }
    const arr: Node[] = []
    this.layersMap.set(key, arr)
    return arr
  }

  append(key: LayerEnumType, nodes: Node | Node[]) {
    const arr = this.getNodes(key)
    if (Array.isArray(nodes)) {
      arr.push(...nodes)
    } else {
      arr.push(nodes)
    }
  }

  resetLayersMap() {
    this.layersMap.set('base', [])
    this.layersMap.set('components', [])
    this.layersMap.set('utilities', [])
  }
}
