export interface PrefixerOptions {
  prefix?: string
  ignore?: ReadonlyArray<RegExp | string>
}

export type VarPrefixerOptions = {
  varPrefix?: string // | PrefixFunction
  ignoreProp?: (RegExp | string)[]
  ignoreValueCustomProperty?: (RegExp | string)[]
}
