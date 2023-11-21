// import type { ConfigOptions } from 'rtlcss'
// import type { AcceptedPlugin } from 'postcss'
import type { Config as TailwindcssConfig } from 'tailwindcss'
// import type { UserDefinedOptions as PropertyPrefixerOptions } from 'postcss-custom-property-prefixer'
import type { CssInJs } from 'postcss-js'
import type { GetSchemaFn } from './components/shared'
import type { PrefixerOptions } from '@/postcss'

// export interface SharedOptions {
//   // https://daisyui.com/docs/config/
//   // themes: only light + dark, and custom
//   // darkTheme
//   // base
//   // styled
//   // utils: true
// }

export type BaseOptions<T extends string = string> = {
  themes: Record<
    T,
    {
      selector: string
    }
  >
  //           typeName        themeName       cssVars
  types: Record<string, Record<keyof BaseOptions['themes'], Record<string, string>>>
  extraColors: Record<keyof BaseOptions['themes'], Record<string, string>>
  extraVars: Record<keyof BaseOptions['themes'], Record<string, string>>
}

export type ModeMergeValue = {
  base?: CssInJs
  styled?: CssInJs
  utils?: CssInJs
}

export type ComponentsValue = {
  prefix: PrefixerOptions
  mode: CodegenMode
  override: ModeMergeValue
  extend: ModeMergeValue
  extra: CssInJs
  selector: string
  schema: GetSchemaFn
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
    // default global
    // globalKeyword: string
  }
}

export type CodegenMode = 'styled' | 'base' | 'raw'

export type LoadCodeOptions = {
  loaddir: string
}

export type CodegenOptions = {
  // default styled
  mode: CodegenMode
  components: ComponentsOptions
  global: GlobalOptions
  base: BaseOptions
  varPrefix: string // PropertyPrefixerOptions['prefix']
  // styled: boolean
  log: boolean
  prefix: string | PrefixerOptions
  // rtl: boolean | ConfigOptions
  presets: (DeepPartial<CodegenOptions> | ((options?: any) => DeepPartial<CodegenOptions>))[]
  cache: boolean
  outdir: string
  dryRun: boolean
  tailwindcssConfig: TailwindcssConfig
  // tailwindcss plugin
  // runtime: {
  //   prefix: string | PrefixerOptions
  //   atMedia: {
  //     hover: boolean
  //   }
  //   selector: {
  //     // default *
  //     universal: string // | (() => string)
  //   }
  // }
}

export type Config = Partial<CodegenOptions>

export type TailwindcssPluginOptions = {
  loaddir: string
}

// export type DeepRequired<T> = {
//   [P in keyof T]-?: T[P] extends Array<infer U>
//     ? Array<DeepRequired<U>>
//     : T[P] extends ReadonlyArray<infer X>
//     ? ReadonlyArray<DeepRequired<X>>
//     : T[P] extends object
//     ? DeepRequired<T[P]>
//     : T[P]
// }

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : Partial<T[P]>
}

export type DeepRequired<T> = Required<{
  [K in keyof T]: T[K] extends Required<T[K]> ? T[K] : DeepRequired<T[K]>
}>

export { type CssInJs } from 'postcss-js'

export type ILayer = 'base' | 'utilities' | 'components'
