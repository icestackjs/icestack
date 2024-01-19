import type { Config as TailwindcssConfig } from 'tailwindcss/types/config'
import type { AcceptedPlugin } from 'postcss'
import type { StringOptions } from 'sass'
import type { GetCssSchemaMethod, GetCssSchemaMethodOptions, CssValue } from './shared'
import type { PrefixerOptions, VarPrefixerOptions } from './postcss'

export type { CreatePresetOptions, GetCssSchemaMethod, CssSchemaDefaults, CssSchema, GetCssSchemaMethodOptions, CssValue, CssInJs } from './shared'
export type { PrefixerOptions, VarPrefixerOptions } from './postcss'
export type { Config as TailwindcssConfig } from 'tailwindcss/types/config'

export type ThemeOptions = {
  selector: string
  extraColors: Record<string, string>
  extraVars: Record<string, string>
  extraCss: CssValue
  //    typeName | colors string/colors cssVars obj
  types: Record<string, string | [string, true | ColorGenerateOptions] | Record<string, string>>
}

export type Themes = Record<string, false | Partial<ThemeOptions>>

export type BaseOptions = {
  themes: Themes

  extraCss: CssValue

  themeSelectorTemplate: (theme: string) => string

  mediaDarkTheme: string | boolean

  generateColors: (key: string, ...args: any[]) => Record<string, string>
}

export type ModeMergeValue = {
  base?: CssValue
  styled?: CssValue
  utils?: CssValue
}

export type ModeMergeOptions = string | ModeMergeValue | ((opts: Partial<GetCssSchemaMethodOptions>) => string | ModeMergeValue)

export type ComponentsValue<Params extends Record<string, any> = any> = {
  mode: CodegenMode

  pick: PickCss
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
  // override: ModeMergeOptions | ModeMergeOptions[]
  /**
   * @description senior
   */
  extend: ModeMergeOptions | ModeMergeOptions[]
  /**
   * @description use params
   */
  params: Params
  /**
   * @description senior
   */
  schema: GetCssSchemaMethod<Params>
  /**
   * @description postcss options
   */
  postcss: PostcssOptions
}

export type ComponentsOptions = Record<string, false | Partial<ComponentsValue>>

export type UtilitiesOptions = {
  extraCss: CssValue
}

export type CodegenMode = 'preset' | 'none'

export type Preset = Partial<Pick<CodegenOptions, 'base' | 'components' | 'utilities' | 'postcss' | 'tailwindcssConfig'>>

export type PostcssOptions = {
  /**
   * @type PrefixerOptions
   * @description PrefixerOptions, set prefix to your class and ignore class
   */
  prefix?: string | false | Partial<PrefixerOptions>
  /**
   * @description css var prefix
   * @example '--primary' -> '--ice-primary'
   * @default '--ice-'
   */
  varPrefix?: string | false | Partial<VarPrefixerOptions>

  atMedia?: {
    // default false
    hover?: boolean
  }
  // pseudo: {
  //   // default true
  //   where: boolean
  // }
  selector?: {
    // default *
    universal?: string // | string[] // | (() => string)
    root?: string
    // default global
    // globalKeyword: string
  }

  plugins?: AcceptedPlugin[] | ((plugins: AcceptedPlugin[]) => AcceptedPlugin[])
}

export type PickCss = {
  base?: boolean
  styled?: boolean
  utils?: boolean
}

export type CodegenOptions = {
  /**
   * @description load css mode
   * @default preset
   * @enum 'preset' | 'none'
   * @example styled load preset, none load none
   */
  mode?: CodegenMode

  pick?: PickCss
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
   * @description all postcss options
   */
  postcss?: Partial<PostcssOptions>

  /**
   * @description if console.log some debug information
   * @default true
   */
  log?: boolean

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

  /**
   * @description Whether to clean the output directory before generating the css.
   */
  clean?: boolean

  sassOptions?: StringOptions<'sync'>
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

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : Partial<T[P]>
}

// eslint-disable-next-line @typescript-eslint/ban-types
// export type DeepPartial<T> = T extends Function ? T : T extends Record<string, any> ? { [P in keyof T]?: DeepPartial<T[P]> } : T

export type DeepRequired<T> = Required<{
  [K in keyof T]: T[K] extends Required<T[K]> ? T[K] : DeepRequired<T[K]>
}>

export type ILayer = 'base' | 'utilities' | 'components'

export interface ColorGenerateOptions {
  theme?: 'dark' | 'default'
  backgroundColor?: string
}

export const css = String.raw
