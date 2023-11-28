import { PrefixFunction, UserDefinedOptions } from './types'

export function matchCustomPropertyFromValue(str: string, cb: (arr: RegExpExecArray, index: number) => void) {
  let arr: RegExpExecArray | null
  let index = 0
  const regex = /var\(\s*(--\w[\w-]*)/g
  while ((arr = regex.exec(str)) !== null) {
    cb(arr, index)
    index++
  }
}

export function makeCustomProperty(customProperty: string, prefix: string) {
  return `--${prefix}${customProperty.slice(2)}`
}

export const postcssPlugin = 'postcss-custom-property-prefixer'

export function makePrefixFunction(prefix: UserDefinedOptions['prefix']): PrefixFunction {
  return typeof prefix === 'string'
    ? () => {
        return prefix
      }
    : prefix
}
