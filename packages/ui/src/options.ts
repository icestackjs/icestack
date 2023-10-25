import defu from 'defu'
import { getCodegenDefaults, getTailwindcssPluginDefaults } from './defaults'
import { CodegenOptions, TailwindcssPluginOptions } from './types'

export function getTailwindcssOptions(options?: Partial<TailwindcssPluginOptions>, ...presets: Partial<TailwindcssPluginOptions>[]): TailwindcssPluginOptions {
  return defu<TailwindcssPluginOptions, Partial<TailwindcssPluginOptions>[]>(options, ...presets, getTailwindcssPluginDefaults())
}

export function getCodegenOptions(options?: Partial<CodegenOptions>, ...presets: Partial<CodegenOptions>[]): CodegenOptions {
  return defu<CodegenOptions, Partial<CodegenOptions>[]>(options, ...presets, getCodegenDefaults())
}
