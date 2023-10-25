import defu from 'defu'
import { getCodegenDefaults, getTailwindcssPluginDefaults } from './defaults'
import { CodegenOptions, TailwindcssPluginOptions } from './types'

export function getTailwindcssOptions(options?: Partial<TailwindcssPluginOptions>): TailwindcssPluginOptions {
  return defu<TailwindcssPluginOptions, Partial<TailwindcssPluginOptions>[]>(options, getTailwindcssPluginDefaults())
}

export function getBuildOptions(options?: Partial<CodegenOptions>): CodegenOptions {
  return defu<CodegenOptions, Partial<CodegenOptions>[]>(options, getCodegenDefaults())
}
