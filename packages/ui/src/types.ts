// import type { ConfigOptions } from 'rtlcss'
// import type { AcceptedPlugin } from 'postcss'
import type { Config } from 'tailwindcss'
// import type { UserDefinedOptions as PropertyPrefixerOptions } from 'postcss-custom-property-prefixer'
import type { CssInJs } from 'postcss-js'
import type allComponents from './allComponents'
import type { Options as PrefixerOptions } from '@/postcss/prefixer'
// export interface SharedOptions {
//   // https://daisyui.com/docs/config/
//   // themes: only light + dark, and custom
//   // darkTheme
//   // base
//   // styled
//   // utils: true
// }

export type BaseOptions = {
  themes: Record<
    string,
    {
      selector: string
    }
  >
  //           typeName        themeName       cssVars
  types: Record<string, Record<string, Record<string, string>>>
  extraColors: Record<string, Record<string, string>>
  extraVars: Record<string, Record<string, string>>
}

export type ComponentsValue = {
  mode: CodegenMode
  override: object
  extend: object
  append: CssInJs[]
  // postcss: {
  //   plugins: AcceptedPlugin[]
  // }
}

export type ComponentsOptions = Record<(typeof allComponents)[number] | string, ComponentsValue>

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
    universal: string // | (() => string)
    // default global
    globalKeyword: string
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
  presets: DeepPartial<CodegenOptions>[]

  outdir: string
  autobuild: boolean
  dryRun: boolean
  loaddir: string
  // tailwindcss plugin
  runtime: {
    prefix: string | PrefixerOptions
    atMedia: {
      hover: boolean
    }
    selector: {
      // default *
      universal: string // | (() => string)
    }
  }
}

// export type TailwindcssPluginOptions = CodegenOptions | LoadCodeOptions

export interface IBuildScssOptions<T> {
  outdir?: string
  filename: string
  resolveConfig?: (config: Config) => void
  outSideLayerCss: 'base' | 'components' | 'utilities'
  options: T
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

export type DeepPartial<T> = { [P in keyof T]?: DeepPartial<T[P]> }

export type DeepRequired<T> = Required<{
  [K in keyof T]: T[K] extends Required<T[K]> ? T[K] : DeepRequired<T[K]>
}>
