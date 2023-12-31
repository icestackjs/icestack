import { loadConfig } from 'c12'
import { flattenDeep, get, set, isObject } from 'lodash'
import { getCodegenDefaults } from './defaults'
import type { CodegenOptions, Preset } from '@/types'
import { defuOptions, mergeRClone } from '@/shared'
import { mapCss2JsArray } from '@/postcss'

export function preHandleOptions(options: Partial<CodegenOptions>): Partial<CodegenOptions> {
  const { base, utilities, components } = options
  if (isObject(base?.themes)) {
    for (const [theme, opts] of Object.entries(base.themes)) {
      if (opts?.extraCss) {
        set(options, `base.themes.${theme}.extraCss`, mapCss2JsArray(opts?.extraCss))
      }
    }
  }

  if (isObject(base) && base.extraCss) {
    set(options, `base.extraCss`, mapCss2JsArray(base.extraCss))
  }

  if (isObject(utilities) && utilities.extraCss && utilities.extraCss) {
    set(options, `utilities.extraCss`, mapCss2JsArray(utilities.extraCss))
  }

  if (isObject(components)) {
    for (const [componentName, opts] of Object.entries(components)) {
      if (opts) {
        // make array for merge and array concat
        const { override, extend } = opts
        if (override && !Array.isArray(override)) {
          set(options, `components.${componentName}.override`, [override])
        }

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

export function postHandleOptions(options: Partial<CodegenOptions>): CodegenOptions {
  const { base, utilities } = options
  if (isObject(base?.themes)) {
    for (const [theme, opts] of Object.entries(base.themes)) {
      if (opts?.extraCss) {
        const p = `base.themes.${theme}.extraCss`
        const v = get(options, p)
        if (Array.isArray(v)) {
          set(options, p, mergeRClone(...v))
        }
      }
    }
  }

  if (isObject(base) && base.extraCss) {
    const p = `base.extraCss`
    const v = get(options, p)
    if (Array.isArray(v)) {
      set(options, p, mergeRClone(...v))
    }
  }
  if (isObject(utilities) && utilities.extraCss && utilities.extraCss) {
    const p = `utilities.extraCss`
    const v = get(options, p)
    if (Array.isArray(v)) {
      set(options, p, mergeRClone(...v))
    }
  }

  return options as CodegenOptions
}

export function getCodegenOptions(options?: CodegenOptions) {
  let presets: Preset[] = []
  if (options?.presets && Array.isArray(options?.presets)) {
    presets =
      flattenDeep(
        options.presets.map((x) => {
          if (typeof x === 'function') {
            return x()
          }
          return x
        })
      ).filter(Boolean) ?? []
  }

  const arr = [options, ...presets, getCodegenDefaults(options)].filter(Boolean).map((x) => {
    return preHandleOptions(x as Partial<CodegenOptions>)
  })
  // @ts-ignore
  const opts = defuOptions(...arr)

  return postHandleOptions(opts)
}

export async function load(cwd?: string) {
  const { config } = await loadConfig<CodegenOptions>({
    name: 'icestack',
    cwd
  })
  return config
}
