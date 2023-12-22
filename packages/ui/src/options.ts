import { loadConfig } from 'c12'
import { flattenDeep, get, set, isObject } from 'lodash'
import merge from 'merge'
import { getCodegenDefaults } from './defaults'
import type { CodegenOptions, DeepPartial, Preset } from './types'
import { defuOptions } from '@/shared'
import { makeExtraCssArray } from '@/utils'

export function preHandleOptions(options?: DeepPartial<CodegenOptions>): DeepPartial<CodegenOptions> {
  if (options === undefined) {
    return {}
  }
  if (isObject(options?.base?.themes)) {
    for (const [theme, opts] of Object.entries(options.base?.themes)) {
      if (opts?.extraCss) {
        set(options, `base.themes.${theme}.extraCss`, makeExtraCssArray(opts?.extraCss))
      }
    }
  }

  if (isObject(options?.base) && options.base.extraCss) {
    set(options, `base.extraCss`, makeExtraCssArray(options.base.extraCss))
  }

  if (isObject(options?.utilities) && options.utilities.extraCss && options.utilities.extraCss) {
    set(options, `utilities.extraCss`, makeExtraCssArray(options.utilities.extraCss))
  }

  if (isObject(options?.components)) {
    for (const [componentName, opts] of Object.entries(options.components)) {
      if (opts && isObject(opts.override)) {
        for (const [k, v] of Object.entries(opts.override)) {
          set(options, `components.${componentName}.override.${k}`, makeExtraCssArray(v))
        }
      }
      if (opts && isObject(opts.extend)) {
        for (const [k, v] of Object.entries(opts.extend)) {
          set(options, `components.${componentName}.extend.${k}`, makeExtraCssArray(v))
        }
      }

      if (opts && opts.extra) {
        set(options, `components.${componentName}.extra`, makeExtraCssArray(opts.extra))
      }
    }
  }

  return options
}

export function postHandleOptions(options: DeepPartial<CodegenOptions>): CodegenOptions {
  if (isObject(options?.base?.themes)) {
    for (const [theme, opts] of Object.entries(options.base?.themes)) {
      if (opts?.extraCss) {
        const p = `base.themes.${theme}.extraCss`
        const v = get(options, p)
        if (Array.isArray(v)) {
          set(options, p, merge.recursive(true, ...v))
        }
      }
    }
  }

  if (isObject(options?.base) && options.base.extraCss) {
    const p = `base.extraCss`
    const v = get(options, p)
    if (Array.isArray(v)) {
      set(options, p, merge.recursive(true, ...v))
    }
  }
  if (isObject(options?.utilities) && options.utilities.extraCss && options.utilities.extraCss) {
    const p = `utilities.extraCss`
    const v = get(options, p)
    if (Array.isArray(v)) {
      set(options, p, merge.recursive(true, ...v))
    }
  }

  if (isObject(options?.components)) {
    for (const [componentName, opts] of Object.entries(options.components)) {
      if (opts && isObject(opts.override)) {
        for (const k of Object.keys(opts.override)) {
          const p = `components.${componentName}.override.${k}`
          const v = get(options, p)
          if (Array.isArray(v)) {
            set(options, p, merge.recursive(true, ...v))
          }
        }
      }
      if (opts && isObject(opts.extend)) {
        for (const k of Object.keys(opts.extend)) {
          const p = `components.${componentName}.extend.${k}`
          const v = get(options, p)
          if (Array.isArray(v)) {
            set(options, p, merge.recursive(true, ...v))
          }
        }
      }

      if (opts && opts.extra) {
        const p = `components.${componentName}.extra`
        const v = get(options, p)
        if (Array.isArray(v)) {
          set(options, p, merge.recursive(true, ...v))
        }
      }
    }
  }

  return options as CodegenOptions
}

export function getCodegenOptions(options?: DeepPartial<CodegenOptions>): CodegenOptions {
  let presets: Preset[] = []
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
  const a = preHandleOptions(options)
  const bs = presets.map((p) => {
    return preHandleOptions(p)
  })
  const d = preHandleOptions(getCodegenDefaults(options?.mode))
  const opts = defuOptions<CodegenOptions, DeepPartial<CodegenOptions>[]>(a, ...bs, d)
  const pp = postHandleOptions(opts)
  return pp
}

export async function load(cwd?: string) {
  const { config } = await loadConfig<DeepPartial<CodegenOptions>>({
    name: 'icestack',
    cwd
  })
  return config
}
