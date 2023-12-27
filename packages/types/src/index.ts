import type { Config as TailwindcssConfig } from 'tailwindcss/types/config'

import type { GetCssSchemaMethod, GetCssSchemaMethodOptions, CssValue } from './shared'
import type { PrefixerOptions, VarPrefixerOptions } from './postcss'

export type { CreatePresetOptions, GetCssSchemaMethod, CssSchemaDefaults, CssSchema, CssSchemaValue, GetCssSchemaMethodOptions, CssValue, CssInJs } from './shared'
export type { PrefixerOptions, VarPrefixerOptions } from './postcss'
export type { Config as TailwindcssConfig } from 'tailwindcss/types/config'

export type ThemeOptions = {
  selector: string
  extraColors: Record<string, string>
  extraVars: Record<string, string>
  extraCss: CssValue
  //    typeName | colors string/colors cssVars obj
  types: Record<string, string | Record<string, string>>
}

export type Themes = Record<string, Partial<ThemeOptions>>

export type BaseOptions = {
  themes: Themes

  extraCss: CssValue

  themeSelectorTemplate: (theme: string) => string

  mediaDarkTheme: string | boolean
}

export type ModeMergeValue = {
  base?: CssValue
  styled?: CssValue
  utils?: CssValue
}

export type ModeMergeOptions = string | ModeMergeValue | ((opts: Partial<GetCssSchemaMethodOptions>) => string | ModeMergeValue)

export type ComponentsValue = {
  prefix: PrefixerOptions
  varPrefix: VarPrefixerOptions
  mode: CodegenMode
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
   * @description senior
   */
  override: ModeMergeOptions | ModeMergeOptions[]
  /**
   * @description senior
   */
  extend: ModeMergeOptions | ModeMergeOptions[]
  /**
   * @description use params
   */
  params: Record<string, any>
  /**
   * @description senior
   */
  schema: GetCssSchemaMethod
}

export type ComponentsOptions = Record<string, Partial<ComponentsValue> | false>

export type GlobalOptions = {
  atMedia: {
    // default false
    hover?: boolean
  }
  // pseudo: {
  //   // default true
  //   where: boolean
  // }
  selector: {
    // default *
    universal?: string // | string[] // | (() => string)
    root?: string
    // default global
    // globalKeyword: string
  }
}

export type UtilitiesOptions = {
  extraCss: CssValue
}

export type CodegenMode = 'styled' | 'base' | 'none' //  'raw' |

export type Preset = Partial<Pick<CodegenOptions, 'base' | 'components' | 'global' | 'tailwindcssConfig'>>

export type CodegenOptions = {
  /**
   * @description load css mode
   * @default styled
   * @enum "styled" | "base" | "none"
   * @example styled load all, base load base, none load none
   */
  mode?: CodegenMode
  /**
   * @description custom all your components
   */
  components?: ComponentsOptions
  /**
   * @description css utilities
   */
  utilities?: Partial<UtilitiesOptions>
  /**
   * @description set themes and all types
   */
  base?: Partial<BaseOptions>
  /**
   * @description global postcss options
   */
  global?: Partial<GlobalOptions>
  /**
   * @description css var prefix
   * @example '--primary' -> '--ice-primary'
   * @default '--ice-'
   */
  varPrefix?: Partial<VarPrefixerOptions>
  /**
   * @description if console.log some debug information
   * @default true
   */
  log?: boolean
  /**
   * @type PrefixerOptions
   * @description PrefixerOptions, set prefix to your class and ignore class
   */
  prefix?: Partial<PrefixerOptions>
  /**
   * @description load presets
   */
  presets?: (Preset | ((options?: any) => Preset))[]

  /**
   * @description if run build without any output
   * @default false
   */
  dryRun?: boolean

  /**
   * @description required! set output dir path.
   */
  outdir?: string

  /**
   * @description your custom tailwindcss config to resolve `@apply` and theme()
   */
  tailwindcssConfig?: Partial<TailwindcssConfig>
} & (
  | {
      /**
       * @description required! set output dir path.
       */
      outdir: string
    }
  | {
      dryRun: true
    }
)

export type Config = CodegenOptions

export type TailwindcssPluginOptions = {
  loadDirectory: string
  loadConfig?: boolean | string
}

export type UnocssPluginOptions = {
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
