import { Options } from 'sass'
import type { Config } from 'tailwindcss'
import type { AtImportOptions } from 'postcss-import'
import type { GeneratorOptions } from '@babel/generator'
export interface IProcessOptions {
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
}

export type TailwindcssPluginOptions = {
  entries: string[]
} & IProcessOptions
