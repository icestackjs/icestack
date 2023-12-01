import { isObject, set, get } from 'lodash'
import postcss from 'postcss'
import selectorParser from 'postcss-selector-parser'

import { createDefu } from 'defu'

const defuOverrideArray = createDefu((obj, key, value) => {
  if (Array.isArray(obj[key]) && Array.isArray(value)) {
    obj[key] = value
    return true
  }
})

const defuOverrideApplyCss = createDefu((obj, key, value) => {
  if ((key === 'css' || key === 'apply') && typeof obj[key] === 'object' && typeof value === 'object') {
    obj[key] = value
    return true
  }
})

export { defuOverrideArray, defuOverrideApplyCss }

const defaultSelectorParser = selectorParser()

export function compressCssSelector(selectors: string) {
  return defaultSelectorParser.processSync(selectors, { lossless: false })
}

export function expandTypes(types: string[], fn: (typeName: string) => { key: string; value: object }) {
  return types.reduce<Record<string, object>>((acc, cur) => {
    const { key, value } = fn(cur)
    acc[key] = value
    return acc
  }, {})
}

export function preprocessCssInJs(obj: Record<string, any>, res: Record<string, any> = {}) {
  if (typeof obj !== 'object') {
    return res
  }
  const keys = Object.keys(obj)

  for (const key of keys) {
    const value = obj[key]
    if (key === 'apply') {
      if (typeof value === 'string') {
        if (Array.isArray(res[key])) {
          res[key].push(value.split(' '))
        } else {
          res[key] = [value.split(' ')]
        }
      } else if (Array.isArray(value)) {
        // has been handled
        // preprocessCssInJs case 2

        for (const applyStr of value) {
          if (typeof applyStr === 'string') {
            if (Array.isArray(res[key])) {
              res[key].push(applyStr.split(' '))
            } else {
              res[key] = [applyStr.split(' ')]
            }
          }
        }

        // res[key] = value
      }
      // do nothing
    } else if (key === 'css') {
      res[key] = value
    } else if (isObject(value)) {
      const s = compressCssSelector(key)
      if (res[s] === undefined) {
        res[s] = {}
      }

      preprocessCssInJs(obj[key], res[s])
    }
  }
  return res
}

export function getSelector(type: string, prefix: string = '-') {
  return type === '' ? type : `${prefix}${type}`
}

export function recursiveNodes(nodes: postcss.ChildNode[], result: Record<string, any> = {}) {
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
          recursiveNodes(node.nodes, result[selector])
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

export function transformCss2Js(css: string) {
  const root = postcss.parse(css)
  const result = recursiveNodes(root.nodes)
  return result
}

export { default as defu } from 'defu'
