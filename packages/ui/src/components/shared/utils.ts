import defu from 'defu'
import { isObject } from 'lodash'
import { recursive } from 'merge'
import type { ComponentsValue } from '@/types'
// import { pascalCase } from '@/utils'

// export function createInjectName(componentName: string) {
//   const name = pascalCase(componentName)
//   return {
//     name,
//     colors: `inject${name}Colors()`,
//     defaults: `inject${name}Defaults()`
//   }
// }

export function expandColorsMap<T extends object>(typeArr: string[], fn: (typeName: string) => T) {
  return typeArr.reduce<Record<string, T>>((acc, cur) => {
    acc[cur] = fn(cur)
    return acc
  }, {})
}

export function expandInject<T extends Record<string, T>>(obj: T) {
  if (isObject(obj)) {
    const keys = Object.keys(obj)
    for (const key of keys) {
      const value = obj[key]
      if (key === 'css' || key === 'sort' || key === 'apply') {
        // do nothing
      } else if (typeof value === 'string') {
        // @ts-ignore
        obj[key] = {
          apply: value
        } as Record<string, string>
      } else if (isObject(obj[key])) {
        expandInject(obj[key])
      }
    }
  }
  return obj
}

export function applyListToString<T extends Record<string, T>>(obj: T) {
  const keys = Object.keys(obj)
  for (const key of keys) {
    if (key === 'apply') {
      const value = obj[key]
      if (Array.isArray(value)) {
        // @ts-ignore
        obj[key] = value.join(' ')
      }
      // do nothing
    } else if (isObject(obj[key])) {
      applyListToString(obj[key])
    }
  }
  return obj
}

export function applyStringToArray(obj: Record<string, any>) {
  const keys = Object.keys(obj)
  for (const key of keys) {
    if (key === 'apply') {
      const value = obj[key]
      if (typeof value === 'string') {
        obj[key] = value.split(' ')
      }
      // do nothing
    } else if (isObject(obj[key])) {
      applyStringToArray(obj[key])
    }
  }
  return obj
}

export function handleOptions(d: object, { extend, override }: Partial<ComponentsValue>) {
  const de = applyStringToArray(d)
  let xx = de
  if (override) {
    xx = recursive(true, de, override)
  }
  return defu(extend, xx)
}
