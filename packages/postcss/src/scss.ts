import { parse as scssParse } from 'postcss-scss'
import { rule, type AtRule, type Root, type Rule } from 'postcss'
import valueParser from 'postcss-value-parser'
import { compressCssSelector } from '@icestack/postcss-utils'

export function parse(css: string) {
  const root = scssParse(css)
  root.walkRules((rule) => {
    rule.selector = compressCssSelector(rule.selector)
  })
  root.walkDecls((decl) => {
    const valueRoot = valueParser(decl.value)
    valueRoot.walk((node) => {
      if (node.type === 'function' && node.value === 'theme') {
        const first = node.nodes[0]
        const last = node.nodes.at(-1)
        if (first && last) {
          // @ts-ignore
          const fc = first.quote ?? first.value[0]
          // @ts-ignore
          const lc = last.quote ?? last.value.at(-1)
          if (fc !== '"' && lc !== '"' && fc !== "'" && lc !== "'") {
            node.after = '"'
            node.before = '"'
          }
        }

        // node.nodes[0]
      }
    })

    decl.value = valueRoot.toString()
  })
  return root
}
// , stringify as scssStringify
// export function stringify(root: Root) {
//   let result = ''
//   scssStringify(root, (i) => {
//     result += i
//   })
//   return result
// }

// 从右到左
export function mergeLeftRight(leftNode: AtRule | Rule | Root, rightNode: AtRule | Rule | Root) {
  // leftNode
  for (const right of rightNode.nodes) {
    let insertFlag = true
    for (const left of leftNode.nodes) {
      if (left.type === 'rule' && right.type === 'rule' && compressCssSelector(left.selector) === compressCssSelector(right.selector)) {
        mergeLeftRight(left, right)
        insertFlag = false
      } else if (left.type === 'atrule' && right.type === 'atrule' && left.params === right.params && left.name === right.name) {
        if (left.name === 'apply' && right.name === 'apply') {
          left.after(right)
        } else {
          mergeLeftRight(left, right)
        }
        insertFlag = false
      } else if (left.type === 'decl' && right.type === 'decl' && left.prop === right.prop) {
        left.value = right.value
        left.important = right.important
        insertFlag = false
      }
    }
    insertFlag && leftNode.push(right)
  }
}

export function merge(...nodes: (AtRule | Rule | Root)[]) {
  if (nodes.length === 0) {
    return
  }
  nodes.reduce((acc, cur) => {
    mergeLeftRight(acc, cur)
    return acc
  })
  return nodes[0]
}

export function mapCssStringToAst(arr: unknown[]) {
  if (Array.isArray(arr)) {
    return arr.filter(Boolean).map((x) => {
      if (typeof x === 'string') {
        return parse(x)
      }
      return x
    })
  }
  return []
}
