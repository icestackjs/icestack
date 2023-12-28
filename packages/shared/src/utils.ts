import merge from 'merge'
import { createDefu } from 'defu'

const defuOverrideArray = createDefu((obj, key, value) => {
  if (Array.isArray(obj[key]) && Array.isArray(value)) {
    obj[key] = value
    return true
  }
})

const defuOptions = createDefu((obj, key, value) => {
  if (Array.isArray(obj[key]) && Array.isArray(value)) {
    // @ts-ignore
    obj[key] = [...obj[key], ...value]
    return true
  }
})

const defuOverrideApplyCss = createDefu((obj, key, value) => {
  if ((key === 'css' || key === 'apply') && typeof obj[key] === 'object' && typeof value === 'object') {
    obj[key] = value
    return true
  }
})

const defuBaseDefault = createDefu((obj, key, value) => {
  if (key === 'apply' && typeof obj[key] === 'string' && typeof value === 'string') {
    // @ts-ignore
    obj[key] = obj[key] + ' ' + value
    return true
  }
})

const defuExtendApplyCss = createDefu((obj, key, value) => {
  if (key === 'apply' && Array.isArray(obj[key]) && Array.isArray(value)) {
    // @ts-ignore
    obj[key] = [...obj[key], ...value]
    return true
  }
})
// defuExtendApplyCss
export { defuOverrideArray, defuOverrideApplyCss, defuOptions, defuBaseDefault, defuExtendApplyCss }

export function expandTypes(types: string[], fn: (typeName: string) => { key: string; value: object }) {
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
