import defu from 'defu'
import { getDefaults } from './defaults'
import { CodegenOptions, TailwindcssPluginOptions } from './types'

export function getTailwindcssOptions(options?: Partial<TailwindcssPluginOptions>): TailwindcssPluginOptions {
  return defu<TailwindcssPluginOptions, Partial<TailwindcssPluginOptions>[]>(options, getDefaults())
}

export function getBuildOptions(options?: Partial<CodegenOptions>): CodegenOptions {
  return defu<CodegenOptions, Partial<CodegenOptions>[]>(options, getDefaults())
}
