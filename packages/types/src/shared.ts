import type { CssInJs } from 'postcss-js'

export type CssValue = string | CssInJs | (CssInJs | string)[]

export interface CreatePresetOptions {
  types: string[]
}

export type CssSchemaDefaults = {
  styled: object
  base: object
  utils: object
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
export type GetCssSchemaMethodOptions = CreatePresetOptions & { selector: string; params: Record<string, any> }

export type GetCssSchemaMethod = (opts: Partial<GetCssSchemaMethodOptions>) => CssSchema

export { type CssInJs } from 'postcss-js'
