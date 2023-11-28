import { type PluginCreator } from 'postcss'
import type { BaseContext } from './base-context'

import { LayerEnumType, layerNodesKeys, markedLayerKey } from '@/constants'
export interface SharedOptions {
  ctx: BaseContext
}

const atRulesNameFilter = 'twlayer'

export const atRulesRenamePlugin: PluginCreator<SharedOptions> = () => {
  return {
    postcssPlugin: 'postcss-css-to-tailwindcss-plugin-at-rule-rename-plugin',
    Once(root) {
      root.walkAtRules('layer', (rule) => {
        rule.name = atRulesNameFilter
      })
    }
  }
}

atRulesRenamePlugin.postcss = true

export const markLayerPlugin: PluginCreator<SharedOptions> = (options) => {
  const { ctx } = options!
  return {
    postcssPlugin: 'postcss-css-to-tailwindcss-plugin-mark-layer-plugin',
    Once(root) {
      root.walkAtRules(atRulesNameFilter, (rule) => {
        if (layerNodesKeys.includes(rule.params as LayerEnumType)) {
          const layerName = rule.params
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
      if (ctx.options?.outSideLayerCss !== undefined) {
        root.walkRules((rule) => {
          // @ts-ignore
          const layerName = rule[markedLayerKey]
          if (!layerName) {
            Object.defineProperty(rule, markedLayerKey, {
              value: ctx.options?.outSideLayerCss,
              enumerable: false,
              configurable: true
            })
          }
        })
      }
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

      if (ctx.options?.interceptors?.css)
        for (const fn of ctx.options.interceptors.css) {
          fn(root, ctx)
        }
    }
  }
}

extractLayerPlugin.postcss = true
