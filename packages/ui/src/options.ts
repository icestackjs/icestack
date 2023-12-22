import { loadConfig } from 'c12'
import { flattenDeep } from 'lodash'
import { getCodegenDefaults } from './defaults'
import type { CodegenOptions, DeepPartial } from './types'
import { defu } from '@/shared'

export function getCodegenOptions(options?: DeepPartial<CodegenOptions>): CodegenOptions {
  let presets: DeepPartial<CodegenOptions>[] = []
  if (options?.presets && Array.isArray(options?.presets)) {
    presets =
      flattenDeep(
        options.presets.map((x) => {
          if (typeof x === 'function') {
            // @ts-ignore
            const res = x()
            return res
          }
          return x
        })
      ).filter(Boolean) ?? []
  }

  return defu<CodegenOptions, DeepPartial<CodegenOptions>[]>(options, ...presets, getCodegenDefaults(options?.mode))
}

export async function load(cwd?: string) {
  const { config } = await loadConfig<DeepPartial<CodegenOptions>>({
    name: 'icestack',
    cwd
  })
  return config
}
