import type { PluginCreator, Comment, Rule } from 'postcss'
import parser from 'postcss-selector-parser'
import { set, get, trimStart } from 'lodash'
import { objHash } from '@icestack/shared'
import { matchAll } from './utils'
const defaultParser = parser()

function getParentRule(comment: Comment) {
  const p = comment.parent
  if (p?.type === 'rule') {
    return p as Rule
  }
}
// b
export const baseRegex = new RegExp(/@b(?:ase)?/.source, 'g')
// gb
export const defineBaseRegex = new RegExp(/@gb(?:ase)?/.source, 'g')
// v
export const variantRegex = new RegExp(/@v(?:ariant)?/.source, 'g')
// gv
export const defineVariantRegex = new RegExp(/@gv(?:ariant)?/.source, 'g')
// cv
export const compoundVariantRegex = /@(?:cv|compoundVariant)/g
// gcv
export const defineCompoundVariantRegex = /@(?:gcv|gcompoundVariant)/g
// dv
export const defaultVariantRegex = new RegExp(/@(?:dv|defaultVariant)/.source, 'g')
// global
export const globalOptionsRegex = new RegExp(/@global/.source, 'g')
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
    regex: defineBaseRegex,
    type: 'base',
    next: false
  },
  {
    regex: defineVariantRegex,
    type: 'variant',
    next: false
  },
  {
    regex: defineCompoundVariantRegex,
    type: 'compoundVariant',
    next: false
  },
  {
    regex: defaultVariantRegex,
    type: 'defaultVariant',
    next: false
  },
  {
    regex: globalOptionsRegex,
    type: 'global',
    next: false
  }
]

export type CommentType = 'base' | 'variant' | 'compoundVariant' | 'defaultVariant' | 'global'

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
        params.push(trimStart(d.slice(1, -1), '.'))
      }
    }
  }
  const queryArray = matchAll(/([\w-]+)=([\w"-]+)/g, text)

  for (const x of queryArray) {
    const key = x[1]
    const d = x[2]

    if (d[0] === '"' && d.at(-1) === '"') {
      query[key] = {
        value: trimStart(d.slice(1, -1), '.')
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
  compoundVariants: ({ class: string[] } & Record<string, string>)[]
  defaultVariants: Record<string, string>
  global: Record<string, string>
  file?: string
}

export interface CvaParamsSet {
  base: Set<string>
  variants: Record<string, Record<string, Set<string>>>
  compoundVariants: ({ class: Set<string> } & Record<string, string>)[]
  defaultVariants: Record<string, string>
  global: Record<string, string>
  file?: string
}

const cvaSymbol = Symbol('cva')

function setAdd(set: Set<string>, value: string | string[]) {
  if (Array.isArray(value)) {
    for (const v of value) {
      set.add(v)
    }
  } else {
    set.add(value)
  }
}

const creator: PluginCreator<{ prefix?: string; process?: (res?: CvaParams) => void }> = (opts) => {
  const { process, prefix: _prefix } = opts ?? {}
  const result: CvaParamsSet = {
    base: new Set<string>(),
    variants: {},
    compoundVariants: [],
    defaultVariants: {},
    global: {}
  }
  const prefix = _prefix ?? ''
  const hashMap = new Map<string, CvaParamsSet['compoundVariants'][number]>()
  const weakMap = new WeakMap()

  function addBase(value: string | string[]) {
    setAdd(result.base, value)
  }

  function addVariant(
    value: string | string[],
    entries: [
      string,
      {
        value: string
      }
    ][]
  ) {
    for (const [p1, { value: p2 }] of entries) {
      const p = `${p1}.${p2}`
      const arr = get(result.variants, p)

      if (arr instanceof Set) {
        setAdd(arr, value)
      } else {
        const st = new Set<string>()
        setAdd(st, value)
        set(result.variants, p, st)
      }
    }
  }

  function addDefaultVariant(
    entries: [
      string,
      {
        value: string
      }
    ][]
  ) {
    for (const [key, { value }] of entries) {
      set(result.defaultVariants, key, value)
    }
  }

  function addCompoundVariant(
    value: string | string[],
    entries: [
      string,
      {
        value: string
      }
    ][],
    hashCode: string
  ) {
    const item = hashMap.get(hashCode)
    if (item) {
      item.class && setAdd(item.class, value)
    } else {
      const set = new Set<string>()
      setAdd(set, value)

      hashMap.set(
        hashCode,
        // @ts-ignore
        entries.reduce(
          (acc, [k, { value }]) => {
            // @ts-ignore
            acc[k] = value
            return acc
          },
          {
            class: set
          }
        )
      )
    }
  }

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
          const rule = getParentRule(comment)

          if (rule) {
            const ast = defaultParser.astSync(rule.selector)

            let value: string | undefined
            ast.walkClasses((cls) => {
              value = cls.value
              return false
            })

            if (value) {
              // value = prefix + value
              switch (type) {
                case 'base': {
                  addBase(value)

                  break
                }
                case 'variant': {
                  addVariant(value, entries)

                  break
                }
                case 'compoundVariant': {
                  addCompoundVariant(value, entries, hashCode)

                  break
                }
              }
            }
          }
        } else
          switch (type) {
            case 'defaultVariant': {
              addDefaultVariant(entries)

              break
            }
            case 'base': {
              addBase(params.map((x) => prefix + x))

              break
            }
            case 'variant': {
              addVariant(
                params.map((x) => prefix + x),
                entries
              )

              break
            }
            case 'compoundVariant': {
              addCompoundVariant(
                params.map((x) => prefix + x),
                entries,
                hashCode
              )

              break
            }
          }
      }
    },
    CommentExit(comment) {
      if (weakMap.get(comment) === cvaSymbol) {
        comment.remove()
      }
    },
    OnceExit(root) {
      result.compoundVariants = [...hashMap.values()]

      process?.({
        base: [...result.base],
        compoundVariants: result.compoundVariants.map((x) => {
          return {
            ...x,
            class: [...x.class]
          }
        }) as CvaParams['compoundVariants'],
        defaultVariants: result.defaultVariants,
        variants: Object.entries(result.variants).reduce<CvaParams['variants']>((acc, [k, v]) => {
          acc[k] = Object.entries(v).reduce<Record<string, string[]>>((bcc, [k1, v1]) => {
            bcc[k1] = [...v1]
            return bcc
          }, {})
          return acc
        }, {}),
        global: result.global,
        file: root.source?.input.file
      })
    }
  }
}

creator.postcss = true

export default creator
