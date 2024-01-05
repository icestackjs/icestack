import { parse as scssParse, stringify as scssStringify } from 'postcss-scss'
import type { Root } from 'postcss'
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
