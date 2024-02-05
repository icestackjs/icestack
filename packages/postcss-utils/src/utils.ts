import type { ChildNode } from 'postcss'
import sassParser from 'postcss-scss'
import selectorParser from 'postcss-selector-parser'
import { set, get } from 'lodash'
import type { CssValue, CssInJs } from '@icestack/types'

const defaultSelectorParser = selectorParser()

export function compressCssSelector(selectors: string) {
  return defaultSelectorParser.processSync(selectors, { lossless: false })
}

export function recursiveNodes(nodes: ChildNode[], result: Record<string, any> = {}) {
  for (const node of nodes) {
    switch (node.type) {
      case 'atrule': {
        if (node.name === 'apply') {
          const v = get(result, 'apply')
          if (Array.isArray(v)) {
            v.push(node.params)
          } else {
            set(result, 'apply', [node.params])
          }
        } else {
          const selector = `@${node.name} ${node.params}`
          result[selector] = {}
          recursiveNodes(node.nodes ?? [], result[selector])
        }

        break
      }
      case 'rule': {
        const s = compressCssSelector(node.selector)
        if (result[s] === undefined) {
          result[s] = {}
        }

        recursiveNodes(node.nodes, result[s])
        break
      }
      case 'decl': {
        set(result, `css.${node.prop}`, node.value + (node.important ? ' !important' : ''))
        break
      }
    }
  }
  return result
}

export function transformCss2Js(css: string): Record<string, any>
export function transformCss2Js(css: string | CssInJs): Record<string, any>
export function transformCss2Js<T>(css: T) {
  if (typeof css === 'string') {
    const root = sassParser.parse(css)
    const result = recursiveNodes(root.nodes)
    return result
  }
  return css
}

export function mapCss2JsArray(value?: CssValue) {
  if (value) {
    return Array.isArray(value) ? value.map((x) => transformCss2Js(x)) : [transformCss2Js(value)]
  }
  return []
}
