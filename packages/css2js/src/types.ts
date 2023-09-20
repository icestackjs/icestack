import type { Options } from 'sass'
import type { AcceptedPlugin, ProcessOptions } from 'postcss'

export type SharedOption = {
  plugins?: AcceptedPlugin[]
  processOptions?: ProcessOptions
  sassOptions?: Options<'sync'>
}

export type RawCssInput = {
  css: string
  lang?: 'sass' | 'scss'
} & SharedOption

export type CssFilePathInput = {
  path: string
} & SharedOption

export type UserDefinedOption = RawCssInput | CssFilePathInput
