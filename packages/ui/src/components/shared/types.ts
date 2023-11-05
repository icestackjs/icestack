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

export type IOptionReturnType = {
  selector?: string
  colors?: object
  defaults?: IDefaults
  // index: object
}

export type OptionFn = (opts: CreatePresetOptions & { selector: string }) => IOptionReturnType

export type DefaultsFn = (opts: CreatePresetOptions & { selector: string }) => IDefaults
