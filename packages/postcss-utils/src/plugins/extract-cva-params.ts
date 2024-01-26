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

export const defineBaseRegex = new RegExp(/@db(?:ase)?/.source, 'g')

export const variantRegex = new RegExp(/@v(?:ariant)?/.source, 'g')

export const compoundVariantRegex = /@(?:cv|compoundVariant)/g

export const defaultVariantRegex = new RegExp(/@(?:dv|defaultVariant)/.source, 'g')

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
  },
  {
    regex: defineBaseRegex,
    type: 'base',
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
  const params: string[] = []

  const query: Record<
    string,
    {
      value: string
    }
  > = {}

  const paramsArray = matchAll(/\[([^\]]*)]/g, text)
  for (const x of paramsArray) {
    const arr = x[1]
      .split(',')
      .map((x) => x.trim())
      .filter(Boolean)
    for (const d of arr) {
      if (d[0] === '"' && d.at(-1) === '"') {
        params.push(d.slice(1, -1))
      }
    }
  }
  const queryArray = matchAll(/([\w-]+)=([\w"-]+)/g, text)

  for (const x of queryArray) {
    const key = x[1]
    const d = x[2]

    if (d[0] === '"' && d.at(-1) === '"') {
      query[key] = {
        value: d.slice(1, -1)
      }
    }
  }

  return {
    query,
    params
  }
}

export interface CvaParams {
  base: string[]
  variants: Record<string, Record<string, string[]>>
  compoundVariants: Record<string, string | string[]>[]
  defaultVariants: Record<string, string>
}

export interface CvaParamsSet {
  base: Set<string>
  variants: Record<string, Record<string, Set<string>>>
  compoundVariants: Record<string, string | Set<string>>[]
  defaultVariants: Record<string, string>
}

const cvaSymbol = Symbol('cva')

const creator: PluginCreator<{ selector?: string; prefix?: string; process?: (res?: CvaParams) => void }> = (opts) => {
  const { process, prefix: _prefix } = opts ?? {}
  const result: CvaParamsSet = {
    base: new Set<string>(),
    variants: {},
    compoundVariants: [],
    defaultVariants: {}
  }
  const prefix = _prefix ?? ''
  const hashMap = new Map<string, CvaParamsSet['compoundVariants'][number]>()
  const weakMap = new WeakMap()
  return {
    postcssPlugin: 'postcss-icestack-extract-cva-params-plugin',
    Comment(comment) {
      // comment.text
      const res = pickComment(comment)
      if (res) {
        weakMap.set(comment, cvaSymbol)
        const { next, suffix, type } = res
        const { query, params } = extractParams(suffix)
        const hashCode = objHash(query)
        const entries = Object.entries(query)

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
                  result.base.add(value)

                  break
                }
                case 'variant': {
                  for (const [p1, { value: p2 }] of entries) {
                    const p = `${p1}.${p2}`

                    const arr = get(result.variants, p)
                    if (arr instanceof Set) {
                      arr.add(value)
                    } else {
                      const st = new Set<string>()
                      st.add(value)
                      set(result.variants, p, st)
                    }
                  }

                  break
                }
                case 'compoundVariant': {
                  const item = hashMap.get(hashCode)
                  if (item) {
                    // @ts-ignore
                    item.class?.add(value)
                    // hashMap.set(hashCode, {
                    //   ...item,
                    //   // @ts-ignore
                    //   class: [...item.class, value]
                    // })
                  } else {
                    const set = new Set<string>()
                    set.add(value)
                    hashMap.set(
                      hashCode,
                      entries.reduce<Record<string, string | Set<string>>>(
                        (acc, [k, { value }]) => {
                          acc[k] = value
                          return acc
                        },
                        {
                          class: set
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
        } else if (type === 'defaultVariant') {
          for (const [key, { value }] of entries) {
            set(result.defaultVariants, key, value)
          }
        } else if (type === 'base') {
          for (const param of params) {
            result.base.add(param)
          }
        }
      }
    },
    CommentExit(comment) {
      if (weakMap.get(comment) === cvaSymbol) {
        comment.remove()
      }
    },
    OnceExit() {
      result.compoundVariants = [...hashMap.values()]

      process?.({
        base: [...result.base],
        compoundVariants: result.compoundVariants.map((x) => {
          return {
            ...x,
            class: [...x.class]
          }
        }),
        defaultVariants: result.defaultVariants,
        variants: Object.entries(result.variants).reduce<CvaParams['variants']>((acc, [k, v]) => {
          acc[k] = Object.entries(v).reduce<Record<string, string[]>>((bcc, [k1, v1]) => {
            bcc[k1] = [...v1]
            return bcc
          }, {})
          return acc
        }, {})
      })
    }
  }
}

creator.postcss = true

export default creator
