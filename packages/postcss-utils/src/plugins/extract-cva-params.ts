import type { PluginCreator, Comment, Rule } from 'postcss'
import parser from 'postcss-selector-parser'
import { set, get } from 'lodash'
import { objHash } from '@icestack/shared'

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
  const p = comment.parent
  if (p?.type === 'rule') {
    return p as Rule
  }
  // while (p) {
  //   if (p.type === 'rule') {
  //     return p
  //   }
  //   p = comment.parent
  // }
}
// 只有 base 和 variant 会向下寻找， compoundVariants 也需要
// defaultVariants 不需要

// const equalRegExp = /(?:\s*=\s*([\w"'-]+))?/

export const baseRegex = new RegExp(/@b(?:ase)?/.source, 'g')

export const variantRegex = new RegExp(/@v(?:ariant)?/.source, 'g')

export const compoundVariantRegex = /@(?:cv|compoundVariant)/g

export const defaultVariantRegex = new RegExp(/@(?:dv|defaultVariant)?/.source, 'g')

// function regexpTest(regex: RegExp, text: string) {
//   const res = regex.test(text)
//   regex.lastIndex = 0
//   return res
// }

const regexArray: { type: CommentType; regex: RegExp; next: boolean }[] = [
  {
    regex: baseRegex,
    type: 'base',
    next: true
  },
  {
    regex: variantRegex,
    type: 'variant',
    next: true
  },
  {
    regex: compoundVariantRegex,
    type: 'compoundVariant',
    next: true
  },
  {
    regex: defaultVariantRegex,
    type: 'defaultVariant',
    next: false
  }
]

export type CommentType = 'base' | 'variant' | 'compoundVariant' | 'defaultVariant'

export function getSuffix(text: string) {
  for (const { next, regex, type } of regexArray) {
    regex.lastIndex = 0
    const res = regex.test(text)
    if (res) {
      return {
        type,
        suffix: text.slice(regex.lastIndex),
        next
      }
    }
  }
}

export function pickComment(comment: Comment) {
  const text = comment.text
  const p = text.indexOf('@')
  if (p > -1) {
    return getSuffix(text)
  }
}

export function extractParams(text: string) {
  const arr = text.split(' ').filter(Boolean)
  const result: Record<
    string,
    {
      value: string
      // this?: boolean
    }
  > = {}
  for (const text of arr) {
    const res = matchAll(/([\w-]+)=([\w"-]+)/g, text)
    if (res.length > 0) {
      for (const x of res) {
        const key = x[1]
        const d = x[2]

        if (d[0] === '"' && d.at(-1) === '"') {
          result[key] = {
            value: d.slice(1, -1)
          }
        }
        // else if (d === 'this') {
        //   result[key] = {
        //     this: true
        //   }
        // }
      }
    }
  }
  return result
}

export interface CvaParams {
  base: string[]
  variants: Record<string, Record<string, string[]>>
  compoundVariants: Record<string, string | string[]>[]
  defaultVariants: Record<string, string>
}

// @ts-ignore
const creator: PluginCreator<{ selector?: string; prefix?: string; process?: (res?: CvaParams) => void }> = ({ selector, process, prefix: _prefix }) => {
  const result: CvaParams = {
    base: [],
    variants: {},
    compoundVariants: [],
    defaultVariants: {}
  }
  const prefix = _prefix ?? ''
  const hashMap = new Map<string, object>()

  return {
    postcssPlugin: 'postcss-icestack-extract-cva-params-plugin',
    Comment(comment) {
      // comment.text
      const res = pickComment(comment)
      if (res) {
        const { next, suffix, type } = res
        const params = extractParams(suffix)
        const hashCode = objHash(params)
        const entries = Object.entries(params)

        if (type === 'defaultVariant') {
          for (const [key, { value }] of entries) {
            set(result.defaultVariants, key, value)
          }
        }

        if (next) {
          const rule = getNextRule(comment)

          if (rule) {
            const ast = defaultParser.astSync(rule.selector)

            let value: string | undefined
            ast.walkClasses((cls) => {
              value = cls.value
              return false
            })

            if (value) {
              value = prefix + value
              switch (type) {
                case 'base': {
                  result.base.push(value)

                  break
                }
                case 'variant': {
                  for (const [p1, { value: p2 }] of entries) {
                    const p = `${p1}.${p2}`

                    const arr = get(result.variants, p)
                    if (Array.isArray(arr)) {
                      arr.push(value)
                    } else {
                      set(result.variants, p, [value])
                    }
                  }

                  break
                }
                case 'compoundVariant': {
                  const item = hashMap.get(hashCode)
                  if (item) {
                    hashMap.set(hashCode, {
                      ...item,
                      // @ts-ignore
                      class: [...item.class, value]
                    })
                  } else {
                    hashMap.set(
                      hashCode,
                      entries.reduce<Record<string, string | string[]>>(
                        (acc, [k, { value }]) => {
                          acc[k] = value
                          return acc
                        },
                        {
                          class: [value]
                        }
                      )
                    )
                  }

                  break
                }
                // No default
              }
            }
          }
        }
      }

      // console.log(comment)
      // comment.next()
      // comment.text
    },
    OnceExit() {
      // @ts-ignore
      result.compoundVariants = [...hashMap.values()]
      process?.(result)
    }
  }
}

creator.postcss = true

export default creator