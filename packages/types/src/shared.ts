import type { CssInJs } from 'postcss-js'

export type CssValue = string | CssInJs | (CssInJs | string)[]

export interface CreatePresetOptions {
  types: string[]
}

export type IDefaults = {
  styled?: object
  base?: object
  utils?: object
}

export type IValue =
  | string
  | {
      apply: string | string[]
    }
  | { css: Record<string, string> }
  | {
      apply: string | string[]
      css: Record<string, string>
    }

export type ISchema = {
  selector: string
  defaults: IDefaults
}

export type SchemaFnOptions = CreatePresetOptions & { selector: string; params: Record<string, any>; baseDefault: CssValue }

export type GetSchemaFn = (opts: SchemaFnOptions) => ISchema

export { type CssInJs } from 'postcss-js'
