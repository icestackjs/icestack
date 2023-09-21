import { Options } from 'sass'
import type { Config } from 'tailwindcss'
import type { AtImportOptions } from 'postcss-import'
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
}
