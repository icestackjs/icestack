import type { PluginCreator } from 'postcss'
import type { IContext, NodeMapKeys } from './context'
import { layerNodesKeys, markedLayerKey } from '@/constants'

export interface SharedOptions {
  ctx: IContext
}

export const markLayerPlugin: PluginCreator<SharedOptions> = () => {
  // const { ctx } = options!
  return {
    postcssPlugin: 'postcss-css-to-tailwindcss-plugin-mark-layer-plugin',
    Once(root) {
      root.walkAtRules('layer', (rule) => {
        if (layerNodesKeys.includes(rule.params)) {
          const layerName = rule.params as NodeMapKeys
          for (const node of rule.nodes) {
            Object.defineProperty(node, markedLayerKey, {
              value: layerName,
              enumerable: false,
              configurable: true
            })
          }
          // may be process by tailwindcss
          rule.parent?.insertBefore(rule, rule.nodes)

          // ctx.append(layerName, rule.nodes)
          rule.remove()
        }
      })
    }
  }
}

markLayerPlugin.postcss = true

export const extractLayerPlugin: PluginCreator<SharedOptions> = (options) => {
  const { ctx } = options!
  return {
    postcssPlugin: 'postcss-css-to-tailwindcss-plugin-extract-layer-plugin',
    OnceExit(root) {
      root.walkRules((rule) => {
        // @ts-ignore
        const layerName = rule[markedLayerKey]
        if (layerName && layerNodesKeys.includes(layerName)) {
          ctx.append(layerName, rule)
        }
      })
      // console.log(root)
    }
  }
}

extractLayerPlugin.postcss = true
