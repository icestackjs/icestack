// import type { ConfigOptions } from 'rtlcss'
// import type { AcceptedPlugin } from 'postcss'
import type { Config as TailwindcssConfig } from 'tailwindcss'
// import type { UserDefinedOptions as PropertyPrefixerOptions } from 'postcss-custom-property-prefixer'
import type { CssInJs } from 'postcss-js'
import { componentsNames } from './components'
import type { Options as PrefixerOptions } from '@/postcss/prefixer'
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

// const a: BaseOptions = {
//   extraColors: {},
//   themes: {
//     xxx: {
//       selector: '.xxx'
//     }
//   }
// }

export type ComponentsValue = {
  mode: CodegenMode
  override: CssInJs
  extend: CssInJs
  extra: CssInJs
  // append: CssInJs[]
  selector: string
  // postcss: {
  //   plugins: AcceptedPlugin[]
  // }
}

export type ComponentsOptions = Record<(typeof componentsNames)[number], ComponentsValue>

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
  presets: DeepPartial<CodegenOptions>[]

  outdir: string
  autobuild: boolean
  dryRun: boolean
  loaddir: string
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

// export type TailwindcssPluginOptions = CodegenOptions | LoadCodeOptions

export interface IBuildScssOptions {
  filename: string
  resolveConfig?: (config: TailwindcssConfig) => void
  outSideLayerCss: 'base' | 'components' | 'utilities'
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
