import { isObject, pick, set, get } from 'lodash'
import postcss from 'postcss'
import selectorParser from 'postcss-selector-parser'
import type { ISchema } from './types'
import { defu, defuOverrideArray } from '@/utils'
import type { CodegenMode, ComponentsValue, CssInJs, ModeMergeValue } from '@/types'

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

export function applyStringToArray(obj: Record<string, any>, res: Record<string, any> = {}) {
  if (typeof obj !== 'object') {
    return res
  }
  const keys = Object.keys(obj)

  for (const key of keys) {
    const value = obj[key]
    if (key === 'apply') {
      if (typeof value === 'string') {
        res[key] = value.split(' ')
      } else if (Array.isArray(value)) {
        // has been handled
        res[key] = value
      }
      // do nothing
    } else if (key === 'css') {
      res[key] = value
    } else if (isObject(value)) {
      const s = compressCssSelector(key)
      res[s] = {}
      applyStringToArray(obj[key], res[s])
    }
  }
  return res
}

export function makeDefaults(obj?: ModeMergeValue, selector?: string) {
  const res: Record<string, Record<string, CssInJs>> = {
    base: {},
    styled: {},
    utils: {}
  }
  if (selector) {
    if (obj?.base) {
      res.base[selector] = obj.base
    }
    if (obj?.styled) {
      res.styled[selector] = obj.styled
    }
    if (obj?.utils) {
      res.utils[selector] = obj.utils
    }
  }
  return res
}

function getPickedProps(mode: CodegenMode = 'styled') {
  switch (mode) {
    case 'base': {
      return ['base']
    }
    case 'styled': {
      return ['base', 'styled', 'utils']
    }
    default: {
      return []
    }
  }
}

export function handleOptions(d: ISchema, { extend, override, selector, extra = {}, mode }: Partial<ComponentsValue>) {
  let de = applyStringToArray(d) as ISchema
  de.defaults = pick(de.defaults, getPickedProps(mode))
  if (override) {
    de = defuOverrideArray(de, {
      selector,
      defaults: makeDefaults(override, selector)
    })
  }
  const res = defu(
    {
      selector,
      defaults: defu(
        {
          utils: {
            ...extra
          }
        },
        makeDefaults(extend, selector)
      )
    },
    de
  )
  return res
}

// @function getSelector($type, $prefix: "-") {
//   @if ($type == "") {
//     @return "";
//   } @else {
//     @return "#{$prefix}#{$type}";
//   }
// }
export function getSelector(type: string, prefix: string = '-') {
  return type === '' ? type : `${prefix}${type}`
}

export function recursiveNodes(nodes: postcss.ChildNode[], result: Record<string, any> = {}) {
  for (const node of nodes) {
    switch (node.type) {
      case 'atrule': {
        if (node.name === 'apply') {
          const v = get(result, 'apply')
          if (typeof v === 'string' && v.length > 0) {
            set(result, 'apply', v + ' ' + node.params)
          } else {
            set(result, 'apply', node.params)
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
        result[s] = {}
        recursiveNodes(node.nodes, result[s])
        break
      }
      case 'decl': {
        set(result, `css.${node.prop}`, node.value)
        break
      }
    }
  }
  return result
}

export function transformCss2Js(css: string) {
  const root = postcss.parse(css)
  const result = applyStringToArray(recursiveNodes(root.nodes))
  return result
}
