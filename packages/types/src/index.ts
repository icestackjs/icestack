import type { Config as TailwindcssConfig } from 'tailwindcss/types/config'

import type { GetSchemaFn, SchemaFnOptions, CssValue } from './shared'
import type { PrefixerOptions, VarPrefixerOptions } from './postcss'

export type { CreatePresetOptions, GetSchemaFn, IDefaults, ISchema, IValue, SchemaFnOptions, CssValue, CssInJs } from './shared'
export type { PrefixerOptions, VarPrefixerOptions } from './postcss'
export type { Config as TailwindcssConfig } from 'tailwindcss/types/config'

export type BaseOptions = {
  themes: Record<
    string,
    {
      selector: string
      extraColors: Record<string, string>
      extraVars: Record<string, string>
      extraCss: CssValue
      //    typeName | colors string/colors cssVars obj
      types: Record<string, string | Record<string, string>>
    }
  >

  extraCss: CssValue

  themeSelectorTemplate: (theme: string) => string

  mediaDarkTheme: string | boolean
}

export type ModeMergeValue = {
  base?: CssValue
  styled?: CssValue
  utils?: CssValue
}

export type ComponentsValue = {
  prefix: PrefixerOptions
  varPrefix: VarPrefixerOptions
  mode: CodegenMode
  extra: CssValue | ((opts: SchemaFnOptions) => CssValue)
  // baseDefault: CssValue
  /**
   * @description css selector
   */
  selector: string

  /**
   * @description disabled component, same to set false
   */
  disabled: boolean
  /**
   * @description use params
   */
  params: Record<string, any>
  /**
   * @description senior
   */
  override: ModeMergeValue | ((opts: SchemaFnOptions) => ModeMergeValue)
  /**
   * @description senior
   */
  extend: ModeMergeValue | ((opts: SchemaFnOptions) => ModeMergeValue)
  /**
   * @description senior
   */
  schema: GetSchemaFn
}

export type ComponentsOptions = Record<string, ComponentsValue | false>

export type GlobalOptions = {
  atMedia: {
    // default false
    hover: boolean
  }
  // pseudo: {
  //   // default true
  //   where: boolean
  // }
  selector: {
    // default *
    universal: string // | string[] // | (() => string)
    root: string
    // default global
    // globalKeyword: string
  }
}

export type UtilitiesOptions = {
  extraCss: CssValue
}

export type CodegenMode = 'styled' | 'base' | 'none' //  'raw' |

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
   * @description set themes and all types
   */
  base: BaseOptions
  /**
   * @description global postcss options
   */
  global: GlobalOptions
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
  presets: (Preset | ((options?: any) => Preset))[]
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

export type ILayer = 'base' | 'utilities' | 'components'
