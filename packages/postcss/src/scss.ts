import { parse as scssParse, stringify as scssStringify } from 'postcss-scss'
import type { AtRule, Root, Rule } from 'postcss'
import { compressCssSelector } from '@icestack/postcss-utils'

export function parse(css: string) {
  const root = scssParse(css)
  root.walkRules((rule) => {
    rule.selector = compressCssSelector(rule.selector)
  })
  return root
}

export function stringify(root: Root) {
  let result = ''
  scssStringify(root, (i) => {
    result += i
  })
  return result
}

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
  nodes.reduce((acc, cur) => {
    mergeLeftRight(acc, cur)
    return acc
  })
  return nodes[0]
}
