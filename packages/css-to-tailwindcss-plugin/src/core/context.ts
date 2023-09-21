// dispose base components utilities
import type { Node } from 'postcss'

export type NodeMapKeys = 'base' | 'components' | 'utilities'

export function createContext() {
  const nodeMap = new Map<NodeMapKeys, Node[]>()
  nodeMap.set('base', [])
  nodeMap.set('components', [])
  nodeMap.set('utilities', [])

  function getNodes(key: NodeMapKeys) {
    return nodeMap.get(key)
  }

  function append(key: NodeMapKeys, node: Node) {
    return getNodes(key)?.push(node)
  }

  return {
    append,
    getNodes
  }
}

export type IContext = ReturnType<typeof createContext>
