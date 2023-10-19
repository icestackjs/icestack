export const Types = ['primary', 'info', 'success', 'warning', 'error', 'neutral']

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
