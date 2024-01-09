import { cosmiconfigSync } from 'cosmiconfig'
import type { CosmiconfigResult } from 'cosmiconfig'
import { flattenDeep, set, isObject } from 'lodash'
import type { CodegenOptions, Preset } from '@icestack/types'
import { defuOptions, makeArray } from '@icestack/shared'
import { getCodegenDefaults } from './defaults'

export function defineConfig(options?: CodegenOptions) {
  return options
}

export function preHandleOptions(options: Partial<CodegenOptions>): Partial<CodegenOptions> {
  const { base, utilities, components } = options
  if (isObject(base?.themes)) {
    for (const [theme, opts] of Object.entries(base.themes)) {
      if (typeof opts !== 'boolean' && opts?.extraCss) {
        set(options, `base.themes.${theme}.extraCss`, makeArray(opts?.extraCss))
      }
    }
  }

  if (isObject(base) && base.extraCss) {
    set(options, `base.extraCss`, makeArray(base.extraCss))
  }

  if (isObject(utilities) && utilities.extraCss && utilities.extraCss) {
    set(options, `utilities.extraCss`, makeArray(utilities.extraCss))
  }

  if (isObject(components)) {
    for (const [componentName, opts] of Object.entries(components)) {
      if (opts) {
        // make array for merge and array concat
        const { extend } = opts

        if (extend && !Array.isArray(extend)) {
          set(options, `components.${componentName}.extend`, [extend])
        }
      }
    }
  }

  return options
}

export function getCodegenOptions(options?: CodegenOptions) {
  const { presets } = options ?? {}
  let expandPresets: Preset[] = []

  if (presets && Array.isArray(presets)) {
    expandPresets =
      flattenDeep(
        presets.map((x) => {
          if (typeof x === 'function') {
            return x()
          }
          return x
        })
      ).filter(Boolean) ?? []
  }

  const arr = [options, ...expandPresets, getCodegenDefaults(options)].filter(Boolean).map((x) => {
    return preHandleOptions(x as Partial<CodegenOptions>)
  })
  // @ts-ignore
  return defuOptions(...arr) as CodegenOptions
}

export type LoadConfigResult = CosmiconfigResult & { config: CodegenOptions }

export function loadSync(options?: { cwd?: string; configFile?: string }) {
  const { configFile, cwd = process.cwd() } = options ?? {}
  const explorerSync = cosmiconfigSync('icestack')
  if (configFile) {
    return explorerSync.load(configFile) as LoadConfigResult
  }
  return explorerSync.search(cwd) as LoadConfigResult
}
