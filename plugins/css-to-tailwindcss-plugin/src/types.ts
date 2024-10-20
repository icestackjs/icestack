import type { GeneratorOptions } from '@babel/generator'
import type { AcceptedPlugin, Root } from 'postcss'
import type { AtImportOptions } from 'postcss-import'
import type { Options } from 'sass'
import type { Config } from 'tailwindcss'
import type { CSSRuleObject } from 'tailwindcss/types/config'
import type { LayerEnumType } from './constants'
import type { BaseContext } from './core/base-context'

export interface IProcessOptions {
  tailwindcssResolved?: boolean

  tailwindcssConfig?:
    | string
    | Config
    | {
      config: string | Config
    }
    | undefined
  sassOptions?: Options<'sync'>

  atImportOptions?: AtImportOptions

  generatorOptions?: GeneratorOptions

  outSideLayerCss?: LayerEnumType

  interceptors?: {
    css?: ((root: Root, ctx: BaseContext) => void)[]
  }

  withOptions?: boolean

  withOptionsWalkCSSRuleObject?: (obj: CSSRuleObject, layer: '') => CSSRuleObject | CSSRuleObject[]

  postcssPlugins?: (plugins: AcceptedPlugin[]) => void
  // |
}

export type TailwindcssPluginOptions = {
  entries: string[]
  cacheDir?: string
} & IProcessOptions
