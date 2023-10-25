import defu from 'defu'
import { getCodegenDefaults, getTailwindcssPluginDefaults } from './defaults'
import { CodegenOptions, DeepPartial, TailwindcssPluginOptions } from './types'

export function getTailwindcssOptions(options?: DeepPartial<TailwindcssPluginOptions>): TailwindcssPluginOptions {
  let presets: DeepPartial<TailwindcssPluginOptions>[] = []
  if (options?.presets && Array.isArray(options?.presets)) {
    // @ts-ignore
    presets = options.presets ?? []
  }

  return defu<TailwindcssPluginOptions, DeepPartial<TailwindcssPluginOptions>[]>(options, ...presets, getTailwindcssPluginDefaults())
}

export function getCodegenOptions(options?: DeepPartial<CodegenOptions>): CodegenOptions {
  let presets: DeepPartial<CodegenOptions>[] = []
  if (options?.presets && Array.isArray(options?.presets)) {
    // @ts-ignore
    presets = options.presets ?? []
  }
  return defu<CodegenOptions, DeepPartial<CodegenOptions>[]>(options, ...presets, getCodegenDefaults())
}

export function getCliCodegenOptions(options?: CodegenOptions): CodegenOptions {
  let presets: DeepPartial<CodegenOptions>[] = []
  if (options?.presets && Array.isArray(options?.presets)) {
    // @ts-ignore
    presets = options.presets ?? []
  }
  return defu<CodegenOptions, DeepPartial<CodegenOptions>[]>(options, ...presets)
}
