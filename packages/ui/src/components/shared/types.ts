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
      apply: string
    }
  | { css: Record<string, string> }
  | {
      apply: string
      css: Record<string, string>
    }

export type ISchema = {
  selector: string
  defaults: IDefaults
}

export type GetSchemaFn = (opts: CreatePresetOptions & { selector: string }) => ISchema
