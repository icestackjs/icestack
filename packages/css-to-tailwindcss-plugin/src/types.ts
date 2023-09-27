import type { Options } from 'sass'
import type { Config } from 'tailwindcss'
import type { AtImportOptions } from 'postcss-import'
import type { GeneratorOptions } from '@babel/generator'
import type { Root } from 'postcss'
import type { IContext } from './core'
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

  outSideLayerCss?: 'base' | 'components' | 'utilities' | ((root: Root, ctx: IContext) => void)
}

export type TailwindcssPluginOptions = {
  entries: string[]
  cacheDir?: string
} & IProcessOptions
