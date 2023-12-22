import type { Config as TailwindcssConfig } from 'tailwindcss/types/config'
import type { CssInJs } from 'postcss-js'
import type { GetSchemaFn, SchemaFnOptions } from './shared'
import type { PrefixerOptions, VarPrefixerOptions } from './postcss'

export type { CreatePresetOptions, GetSchemaFn, IDefaults, ISchema, IValue, SchemaFnOptions } from './shared'
export type { PrefixerOptions, VarPrefixerOptions } from './postcss'
export type { Config as TailwindcssConfig } from 'tailwindcss/types/config'

export type BaseOptions = {
  themes: Record<
    string,
    {
      selector: string
      extraColors: Record<string, string>
      extraVars: Record<string, string>
      extraCss: (CssInJs | string)[]
      //    typeName | colors string/colors cssVars obj
      types: Record<string, string | Record<string, string>>
    }
  >

  extraCss: (CssInJs | string)[]
}

export type ModeMergeValue = {
  base?: CssInJs
  styled?: CssInJs
  utils?: CssInJs
}

export type ComponentsValue = {
  prefix: PrefixerOptions
  varPrefix: VarPrefixerOptions
  mode: CodegenMode
  override: ModeMergeValue | ((opts: SchemaFnOptions) => ModeMergeValue)
  extend: ModeMergeValue | ((opts: SchemaFnOptions) => ModeMergeValue)
  extra: CssInJs | ((opts: SchemaFnOptions) => CssInJs)
  selector: string
  schema: GetSchemaFn
  disabled: boolean
  params: Record<string, any>
}

export type ComponentsOptions = Record<string, ComponentsValue | false>

export type GlobalOptions = {
  atMedia: {
    // default false
    hover: boolean
  }
  pseudo: {
    // default true
    where: boolean
  }
  selector: {
    // default *
    universal: string // | string[] // | (() => string)
    root: string
    // default global
    // globalKeyword: string
  }
}

export type UtilitiesOptions = {
  extraCss: (CssInJs | string)[]
}

export type CodegenMode = 'styled' | 'base' | 'raw' | 'none'

export type Preset = DeepPartial<Pick<CodegenOptions, 'base' | 'components' | 'global' | 'tailwindcssConfig'>>

export type CodegenOptions = {
  /**
   * @description load css mode
   */
  mode: CodegenMode
  /**
   * @description custom all your components
   */
  components: ComponentsOptions
  /**
   * @description css utilities
   */
  utilities: UtilitiesOptions
  /**
   * @description global postcss options
   */
  global: GlobalOptions
  /**
   * @description set themes and all types
   */
  base: BaseOptions
  /**
   * @description css var prefix
   * @example '--primary' -> '--ice-primary'
   * @default '--ice-'
   */
  varPrefix: VarPrefixerOptions
  /**
   * @description if console.log some debug information
   * @default true
   */
  log: boolean
  /**
   * @type PrefixerOptions
   * @description PrefixerOptions, set prefix to your class and ignore class
   */
  prefix: PrefixerOptions
  /**
   * @description load presets
   */
  presets: (DeepPartial<Preset> | ((options?: any) => DeepPartial<Preset>))[]
  /**
   * @description required! set output dir path.
   */
  outdir: string
  /**
   * @description if run build without any output
   * @default false
   */
  dryRun: boolean
  /**
   * @description your custom tailwindcss config to resolve `@apply`
   */
  tailwindcssConfig: TailwindcssConfig
}

export type Config = Partial<CodegenOptions>

export type TailwindcssPluginOptions = {
  loadDirectory: string
  loadConfig?: boolean | string
}

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : Partial<T[P]>
}

// eslint-disable-next-line @typescript-eslint/ban-types
// export type DeepPartial<T> = T extends Function ? T : T extends Record<string, any> ? { [P in keyof T]?: DeepPartial<T[P]> } : T

export type DeepRequired<T> = Required<{
  [K in keyof T]: T[K] extends Required<T[K]> ? T[K] : DeepRequired<T[K]>
}>

export { type CssInJs } from 'postcss-js'

export type ILayer = 'base' | 'utilities' | 'components'
