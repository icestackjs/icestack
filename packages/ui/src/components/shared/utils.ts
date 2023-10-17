import { pascalCase } from '@/utils'

export function createInjectName(componentName: string) {
  const name = pascalCase(componentName)
  return {
    name,
    colors: `inject${name}Colors()`,
    defaults: `inject${name}Defaults()`
  }
}

export function expandColorsMap<T extends object>(typeArr: string[], fn: (typeName: string) => T) {
  return typeArr.reduce<Record<string, T>>((acc, cur) => {
    acc[cur] = fn(cur)
    return acc
  }, {})
}
