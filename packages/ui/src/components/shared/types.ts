export type IDefaults = {
  styled?: object
  unstyled?: object
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
