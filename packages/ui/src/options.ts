import defu from 'defu'
import { loadConfig } from 'c12'
import { getCodegenDefaults } from './defaults'
import type { CodegenOptions, DeepPartial } from './types'
export function getCodegenOptions(options?: DeepPartial<CodegenOptions>, raw?: boolean): CodegenOptions {
  let presets: DeepPartial<CodegenOptions>[] = []
  if (options?.presets && Array.isArray(options?.presets)) {
    // @ts-ignore
    presets = options.presets ?? []
  }
  return defu<CodegenOptions, DeepPartial<CodegenOptions>[]>(options, ...presets, getCodegenDefaults(raw))
}

export async function load(cwd?: string) {
  const { config } = await loadConfig<DeepPartial<CodegenOptions>>({
    name: 'icestack',
    cwd,
    defaultConfig: getCodegenOptions()
  })
  return config
}
