import type { Stats } from 'node:fs'
import type { ConfigOptions } from 'rtlcss'
import type { AcceptedPlugin } from 'postcss'
import type { Config } from 'tailwindcss'
import type { UserDefinedOptions as PropertyPrefixerOptions } from 'postcss-custom-property-prefixer'
import type allComponents from './allComponents'
import type { Options as PrefixerOptions } from '@/postcss/prefixer'
export interface SharedOptions {
  varPrefix: PropertyPrefixerOptions['prefix']
  styled: boolean
  log: boolean
  prefix: string | PrefixerOptions
  rtl: boolean | ConfigOptions
  presets: any[]
  global: {
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
      universal: string | (() => string)
      // default global
      globalKeyword: string
    }
  }

  // https://daisyui.com/docs/config/
  // themes: only light + dark, and custom
  // darkTheme
  // base
  // styled
  // utils: true
}

export type CodegenOptions = SharedOptions & {
  components: Record<
    (typeof allComponents)[number],
    {
      override: object
      extend: object
      postcss: {
        plugins: AcceptedPlugin[]
      }
    }
  >

  outdir: string
  base: {
    selector: {
      // default
      light: string
      dark: string
    }
  }
}

export type TailwindcssPluginOptions = SharedOptions & {
  basedir: string
  base: {
    selector: {
      entries: { find: string | RegExp; replacement: string }[]
    }
  }
}

export interface IBuildScssOptions {
  outdir?: string
  filename: string
  stats?: Stats
  resolveConfig?: (config: Config) => void
  outSideLayerCss: 'base' | 'components' | 'utilities'
  options: CodegenOptions
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

export declare type DeepPartial<T> = {
  [K in keyof T]?: DeepPartial<T[K]>
}

export declare type DeepRequired<T> = {
  [K in keyof T]-?: DeepRequired<NonNullable<T[K]>>
}
