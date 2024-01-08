import { loadConfig, LoadConfigOptions } from 'c12'
import { flattenDeep, set, isObject } from 'lodash'
import { getCodegenDefaults } from './defaults'
import type { CodegenOptions, Preset } from '@/types'
import { defuOptions, makeArray } from '@/shared'

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
        // if (override && !Array.isArray(override)) {
        //   set(options, `components.${componentName}.override`, [override])
        // }

        if (extend && !Array.isArray(extend)) {
          set(options, `components.${componentName}.extend`, [extend])
        }
      }

      // if (opts && opts.baseDefault) {
      //   set(options, `components.${componentName}.default`, mapCss2JsArray(opts.baseDefault))
      // }
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
  const opts = defuOptions(...arr)

  return opts
}

export async function load(options?: LoadConfigOptions<CodegenOptions>) {
  const { cwd, configFile } = options ?? {}
  const { config } = await loadConfig<CodegenOptions>({
    name: 'icestack',
    cwd,
    configFile
  })
  return config
}
