import type { PluginCreator } from 'postcss'

const layerNodes = {
  base: null,
  components: null,
  utilities: null
  // variants: null
}

const markedLayerKey = '__tw_layer_name__'

const layerNodesKeys = Object.keys(layerNodes)

export const markLayerPlugin: PluginCreator<object> = () => {
  return {
    postcssPlugin: 'postcss-css-to-tailwindcss-plugin-mark-layer-plugin',
    Once(root) {
      root.walkAtRules('layer', (rule) => {
        if (layerNodesKeys.includes(rule.params)) {
          const layerName = rule.params
          for (const node of rule.nodes) {
            // @ts-ignore
            node[markedLayerKey] = layerName
          }
          rule.parent?.insertBefore(rule, rule.nodes)

          rule.remove()
        }
      })
    }
  }
}

markLayerPlugin.postcss = true

export const extractLayerPlugin: PluginCreator<object> = () => {
  return {
    postcssPlugin: 'postcss-css-to-tailwindcss-plugin-extract-layer-plugin',
    OnceExit(root) {
      // console.log(root)
    }
  }
}

extractLayerPlugin.postcss = true
