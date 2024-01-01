import type { CssInJs } from 'postcss-js'

export type CssValue = string | CssInJs | (CssInJs | string)[]

export interface CreatePresetOptions {
  types: string[]
}

export type CssSchemaDefaults = {
  styled: CssValue
  base: CssValue
  utils: CssValue
}

export type CssSchemaValue =
  | string
  | {
      apply: string | string[]
    }
  | { css: Record<string, string> }
  | {
      apply: string | string[]
      css: Record<string, string>
    }

export type CssSchema = {
  selector?: string
  defaults: Partial<CssSchemaDefaults>
}
// baseDefault: CssValue
export type GetCssSchemaMethodOptions<T extends Record<string, any> = Record<string, any>> = CreatePresetOptions & { selector: string; params: T }

export type GetCssSchemaMethod<T extends Record<string, any> = Record<string, any>> = (opts: GetCssSchemaMethodOptions<T>) => CssSchema

export { type CssInJs } from 'postcss-js'
