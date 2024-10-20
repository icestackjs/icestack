import type { ModeMergeValue } from '@icestack/types'
import fs from 'node:fs'
import { createDefu } from 'defu'
import merge from 'merge'

const defuOverrideArray = createDefu((obj, key, value) => {
  if (Array.isArray(obj[key]) && Array.isArray(value)) {
    obj[key] = value
    return true
  }
})

type defuOverrideArray<T> = (...args: T[]) => T

const defuOptions = createDefu((obj, key, value) => {
  if (Array.isArray(obj[key]) && Array.isArray(value)) {
    // @ts-ignore
    obj[key] = [...obj[key], ...value]
    return true
  }
})

type defuOptions<T> = (...args: T[]) => T

const defuArrayRight = createDefu((obj, key, value) => {
  if (Array.isArray(obj[key]) && Array.isArray(value)) {
    // @ts-ignore
    obj[key] = [...obj[key], ...value]
    return true
  }
})
type defuArrayRight<T> = (...args: T[]) => T

export { defuArrayRight, defuOptions, defuOverrideArray }

export function expandTypes(types: string[], fn: (typeName: string) => { key: string, value: object }) {
  return types.reduce<Record<string, object>>((acc, cur) => {
    const { key, value } = fn(cur)
    acc[key] = value
    return acc
  }, {})
}

export function getSelector(type: string, prefix: string = '-') {
  return type === '' ? type : `${prefix}${type}`
}

export function mergeR(...items: any[]) {
  return merge.recursive(...items)
}

export function mergeRClone(...items: any[]) {
  return merge.recursive(true, ...items)
}

export { default as defu } from 'defu'

export function groupBy<T>(arr: T[], cb: (arg: T) => string): Record<string, T[]> {
  if (!Array.isArray(arr)) {
    throw new TypeError('expected an array for first argument')
  }

  if (typeof cb !== 'function') {
    throw new TypeError('expected a function for second argument')
  }

  const result: Record<string, T[]> = {}
  for (const item of arr) {
    const bucketCategory = cb(item)
    const bucket = result[bucketCategory]

    if (Array.isArray(bucket)) {
      result[bucketCategory].push(item)
    }
    else {
      result[bucketCategory] = [item]
    }
  }

  return result
}

export function JSONStringify(value: any) {
  return JSON.stringify(value, null, 2)
}

export function arrMatch(matchArr?: (string | RegExp)[], str?: string) {
  if (!Array.isArray(matchArr)) { return }
  if (typeof str !== 'string') { return }
  return matchArr.some((regex) => {
    if (typeof regex === 'string') {
      return str.includes(regex)
    }
    return str.match(regex)
  })
}

export function isModeMergeValue(input: any): input is ModeMergeValue {
  return typeof input === 'object' && (Reflect.has(input, 'base') || Reflect.has(input, 'styled') || Reflect.has(input, 'utils'))
}

export function makeArray<T>(value?: T) {
  if (value) {
    return Array.isArray(value) ? value : [value]
  }
  return []
}

export const css = String.raw

export function touch(filename: string) {
  const time = new Date()

  try {
    fs.utimesSync(filename, time, time)
  }
  catch {
    fs.closeSync(fs.openSync(filename, 'w'))
  }
}
