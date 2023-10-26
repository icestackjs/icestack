import defu from 'defu'
import { getCodegenDefaults } from './defaults'
import { CodegenOptions, DeepPartial } from './types'

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
