import { Config } from 'tailwindcss/types/config'

/* eslint-disable no-prototype-builtins */
export function mergeThemes(themes: Partial<Config>[]) {
  return {
    ...themes.reduce((merged, theme) => defaults(merged, theme), {}),

    // In order to resolve n config objects, we combine all of their `extend` properties
    // into arrays instead of objects so they aren't overridden.
    extend: collectExtends(themes)
  }
}

function collectExtends(items: Partial<Config>[]) {
  return items.reduce((merged, { extend }) => {
    return mergeWith(merged, extend, (mergedValue: any, extendValue: any) => {
      if (mergedValue === undefined) {
        return [extendValue]
      }

      if (Array.isArray(mergedValue)) {
        return [extendValue, ...mergedValue]
      }

      return [extendValue, mergedValue]
    })
  }, {})
}

function mergeWith(target: any, ...sources: any[]) {
  const customizer = sources.pop()

  for (const source of sources) {
    for (const k in source) {
      const merged = customizer(target[k], source[k])

      if (merged === undefined) {
        target[k] = isPlainObject(target[k]) && isPlainObject(source[k]) ? mergeWith({}, target[k], source[k], customizer) : source[k]
      } else {
        target[k] = merged
      }
    }
  }

  return target
}

export default function isPlainObject(value: any) {
  if (Object.prototype.toString.call(value) !== '[object Object]') {
    return false
  }

  const prototype = Object.getPrototypeOf(value)
  return prototype === null || prototype === Object.prototype
}

export function defaults(target: any, ...sources: any[]) {
  for (const source of sources) {
    for (const k in source) {
      if (!target?.hasOwnProperty?.(k)) {
        target[k] = source[k]
      }
    }

    for (const k of Object.getOwnPropertySymbols(source)) {
      if (!target?.hasOwnProperty?.(k)) {
        target[k] = source[k]
      }
    }
  }

  return target
}
