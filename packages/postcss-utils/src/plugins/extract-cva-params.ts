import type { PluginCreator, Comment } from 'postcss'
import parser from 'postcss-selector-parser'
const defaultParser = parser()
export const matchAll = (regex: RegExp, str: string) => {
  const arr = []
  let res
  do {
    res = regex.exec(str)
    if (res) {
      arr.push(res)
    }
  } while (res !== null)
  return arr
}

function getNextRule(comment: Comment) {
  let p = comment.next()
  while (p) {
    if (p.type === 'rule') {
      return p
    }
    p = comment.next()
  }
}
// 只有 base 和 variant 会向下寻找， compoundVariants 也需要
// defaultVariants 不需要

// const equalRegExp = /(?:\s*=\s*([\w"'-]+))?/

export const baseRegex = new RegExp(/@b(?:ase)?/.source, 'g')

export const variantRegex = new RegExp(/@v(?:ariant)?/.source, 'g')

export const compoundVariantRegex = /@(?:cv|compoundVariant)/g

export const defaultVariantRegex = new RegExp(/@(?:dv|defaultVariant)?/.source, 'g')

const creator: PluginCreator<{ selector?: string; process: (res?: any) => void }> = ({ selector, process }) => {
  const base: string[] = []
  const variants: Record<string, Record<string, string[]>> = {}
  const compoundVariants: Record<string, string | string[]>[] = []
  const defaultVariants: Record<string, string> = {}
  return {
    postcssPlugin: 'postcss-icestack-extract-cva-params-plugin',
    Comment(comment) {
      // comment.text
      const rule = getNextRule(comment)
      if (rule) {
        const ast = defaultParser.astSync(rule.selector)
        console.log(ast)
        let value: string | undefined
        ast.walkClasses((cls) => {
          value = cls.value
        })
      }
      // console.log(comment)
      // comment.next()
      // comment.text
    },
    OnceExit() {
      process?.({
        base,
        variants,
        compoundVariants,
        defaultVariants
      })
    }
  }
}

creator.postcss = true

export default creator
