import type { CreatePresetOptions } from '@/sass/functions'

export type IDefaults = {
  styled?: object
  base?: object
  utils?: {
    sizes?: object
    shapes?: object
  }
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

export type OptionFn = (opts: CreatePresetOptions) => IOptionReturnType
