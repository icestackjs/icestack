import type { Options } from 'sass'
import type { Config } from 'tailwindcss'
import type { AtImportOptions } from 'postcss-import'
import type { GeneratorOptions } from '@babel/generator'
import type { AcceptedPlugin, Root } from 'postcss'
import type { CSSRuleObject } from 'tailwindcss/types/config'
import type { IContext } from './core'
import { LayerEnumType } from './constants'
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
    css?: ((root: Root, ctx: IContext) => void)[]
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
