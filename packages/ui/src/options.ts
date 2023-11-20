import defu from 'defu'
import { loadConfig } from 'c12'
import { getCodegenDefaults } from './defaults'
import type { CodegenOptions, DeepPartial } from './types'
export function getCodegenOptions(options?: DeepPartial<CodegenOptions>): CodegenOptions {
  let presets: DeepPartial<CodegenOptions>[] = []
  if (options?.presets && Array.isArray(options?.presets)) {
    presets =
      options.presets
        .map((x) => {
          if (typeof x === 'function') {
            // @ts-ignore
            return x()
          }
          return x
        })
        .filter(Boolean) ?? []
  }
  return defu<CodegenOptions, DeepPartial<CodegenOptions>[]>(options, ...presets, getCodegenDefaults())
}

export async function load(cwd?: string) {
  const { config } = await loadConfig<DeepPartial<CodegenOptions>>({
    name: 'icestack',
    cwd
  })
  return config
}
