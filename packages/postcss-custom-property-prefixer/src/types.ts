import type { Declaration } from 'postcss'

export type PrefixFunction = (decl: Declaration, target: 'prop' | 'value') => string

export interface UserDefinedOptions {
  prefix: string | PrefixFunction
  /**
   * @description default equal prefix
   */
  propPrefix?: string | PrefixFunction
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
  ignoreValueCustomProperty?: (customProperty: string, decl: Declaration) => boolean | undefined
}

export type InternalOptions = Required<UserDefinedOptions>
