import { PluginCreator, Declaration } from 'postcss'
import { defu } from 'defu'
export const PropResolvedMarkSymbol = Symbol('PropResolved')

export const ValueResolvedMarkSymbol = Symbol('ValueResolved')

function addMark(decl: Declaration, mark: symbol) {
  Reflect.defineProperty(decl, mark, {
    enumerable: false,
    value: true,
    configurable: true,
    writable: true
  })
}

function getMark(decl: Declaration, mark: symbol): boolean | undefined {
  return Reflect.get(decl, mark)
}

export interface UserDefinedOptions {
  prefix: string
  transformProp?: boolean
  transformValue?: boolean
  /**
   * @description ignore the prop (css node left side)
   */
  ignoreProp?: (decl: Declaration) => boolean | undefined
  /**
   * @description ignore the value (css node right side)
   */
  ignoreValue?: (decl: Declaration) => boolean | undefined
  /**
   * @description ignore the whole Declaration
   */
  ignoreDecl?: (decl: Declaration) => boolean | undefined
  /**
   * @description ignore the customProperty in css value
   */
  ignoreValueCustomProperty?: (customProperty: Declaration, decl: Declaration) => boolean | undefined
}

type InternalOptions = Required<UserDefinedOptions>

export function matchCustomPropertyFromValue(str: string, cb: (arr: RegExpExecArray) => void) {
  let arr: RegExpExecArray | null
  const regex = /var\((\s*--\w[\w-]*)/g
  while ((arr = regex.exec(str)) !== null) {
    cb(arr)
  }
}

export const postcssCustomPropertyPrefixer: PluginCreator<UserDefinedOptions> = (options) => {
  const { ignoreProp, ignoreValue, prefix, transformProp, transformValue, ignoreDecl, ignoreValueCustomProperty } = defu<InternalOptions, Partial<UserDefinedOptions>[]>(options, {
    ignoreProp: () => false,
    ignoreValue: () => false,
    ignoreValueCustomProperty: () => false,
    ignoreDecl: () => false,
    transformProp: true,
    transformValue: true
  })

  return {
    postcssPlugin: 'postcss-custom-property-prefixer',
    prepare() {
      return prefix && typeof prefix === 'string'
        ? {
            DeclarationExit(decl) {
              if (ignoreDecl(decl)) {
                return
              }
              if (transformProp && decl.prop.startsWith('--') && !ignoreProp(decl) && !getMark(decl, PropResolvedMarkSymbol)) {
                decl.prop = `--${prefix}${decl.prop.slice(2)}`
                addMark(decl, PropResolvedMarkSymbol)
              }
              if (transformValue && !ignoreValue(decl)) {
                matchCustomPropertyFromValue(decl.value, (arr) => {})
              }
            }
          }
        : {}
    }
  }
}

postcssCustomPropertyPrefixer.postcss = true
