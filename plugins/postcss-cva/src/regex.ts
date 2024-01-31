import type { Comment, Rule } from 'postcss'
import parser from 'postcss-selector-parser'
import { trimStart } from 'lodash'
import { matchAll } from './utils'
import type { CommentType } from './types'

// b
export const baseRegex = new RegExp(/@b/.source, 'g')
// gb
export const defineBaseRegex = new RegExp(/@gb/.source, 'g')
// v
export const variantRegex = new RegExp(/@v/.source, 'g')
// gv
export const defineVariantRegex = new RegExp(/@gv/.source, 'g')
// cv
export const compoundVariantRegex = /@cv/g
// gcv
export const defineCompoundVariantRegex = /@gcv/g
// dv
export const defaultVariantRegex = new RegExp(/@dv/.source, 'g')
// meta
export const defineMetaRegex = new RegExp(/@meta/.source, 'g')

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
    regex: defineMetaRegex,
    type: 'meta',
    next: false
  }
]

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

export function extractParams(text: string, opts?: ReturnType<typeof pickComment>) {
  const { type } = opts ?? {}
  const params: string[] = []

  const query: Record<
    string,
    {
      value: string
    }
  > = {}

  function handle(res: string) {
    return type === 'meta' ? res : trimStart(res, '.')
  }

  const paramsArray = matchAll(/\[([^\]]*)]/g, text)
  for (const x of paramsArray) {
    const arr = x[1]
      .split(',')
      .map((x) => x.trim())
      .filter(Boolean)
    for (const d of arr) {
      if (d[0] === '"' && d.at(-1) === '"') {
        const param = handle(d.slice(1, -1))
        params.push(param)
      }
    }
  }
  const queryArray = matchAll(/([\w-]+)="([^"]+)"/g, text)

  for (const x of queryArray) {
    // const key = x[1]
    // const d = x[2]

    // if (d[0] === '"' && d.at(-1) === '"') {
    //   query[key] = {
    //     value: trimStart(d.slice(1, -1), '.')
    //   }
    // }
    const key = x[1]
    const d = x[2]
    query[key] = {
      value: handle(d)
    }
  }

  return {
    query,
    params
  }
}

export const defaultParser = parser()

export function getParentRule(comment: Comment) {
  const p = comment.parent
  if (p?.type === 'rule') {
    return p as Rule
  }
}

export const cvaSymbol = Symbol('cva')

export function setAdd<T>(set: Set<T>, value: T | T[]) {
  if (Array.isArray(value)) {
    for (const v of value) {
      set.add(v)
    }
  } else {
    set.add(value)
  }
}
