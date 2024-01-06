import { pick, reverse } from 'lodash'
import { defuExtendApplyCss, defuArrayRight } from '@/shared'
import type { ComponentsValue, GetCssSchemaMethodOptions, CssValue, CreatePresetOptions, CssSchema, ModeMergeOptions, PickCss, CssSchemaDefaults } from '@/types'
import { isModeMergeValue, makeArray } from '@/utils'

function getPickedProps(pickCss?: PickCss) {
  if (pickCss === undefined) {
    return ['base', 'styled', 'utils']
  }
  return Object.entries(pickCss).reduce<string[]>((acc, [key, value]) => {
    if (value !== false) {
      acc.push(key)
    }
    return acc
  }, [])
}

function resolvedFunctionArray<T>(arr: T | T[], opts: Partial<GetCssSchemaMethodOptions>) {
  if (!Array.isArray(arr)) {
    arr = [arr]
  }
  return arr.map((x) => {
    return typeof x === 'function' ? x(opts) : x
  })
}

export function mergeAllOptions(input: ModeMergeOptions[], opts: Partial<GetCssSchemaMethodOptions>): Record<string, CssValue> {
  if (!input) {
    return input
  }
  const obj = resolvedFunctionArray(input, opts).map((x) => {
    if (isModeMergeValue(x)) {
      return {
        base: resolvedFunctionArray(x.base, opts),
        styled: resolvedFunctionArray(x.styled, opts),
        utils: resolvedFunctionArray(x.utils, opts)
      }
    }

    return {
      utils: makeArray(x),
      base: [],
      styled: []
    }
  })
  // override or extend?
  // @ts-ignore
  return defuExtendApplyCss(...reverse(obj), {
    base: {},
    styled: {},
    utils: {}
  })
}

export function preprocessDefaults(de?: Partial<CssSchemaDefaults>) {
  if (de === undefined) {
    return {}
  }
  if (typeof de.base === 'string') {
    de.base = [de.base] // transformCss2Js(de.base)
  } else if (de.base === undefined) {
    de.base = []
  }

  if (typeof de.styled === 'string') {
    de.styled = [de.styled]
  } else if (de.styled === undefined) {
    de.styled = []
  }
  if (typeof de.utils === 'string') {
    de.utils = [de.utils]
  } else if (de.utils === undefined) {
    de.utils = []
  }

  return de
}

export function handleOptions({ extend, selector, schema, params, pick: pickCss }: Partial<ComponentsValue>, { types }: CreatePresetOptions) {
  const schemaOpts: GetCssSchemaMethodOptions = {
    types,
    selector: selector ?? '',
    params: params ?? {}
  }

  const d: CssSchema | undefined = schema?.(schemaOpts)
  const de: Partial<CssSchema> = d ?? {}
  // mode: none , no default
  de.defaults = pick(preprocessDefaults(de.defaults), getPickedProps(pickCss))

  const extendDefaults = {
    selector,
    defaults: mergeAllOptions(extend as ModeMergeOptions[], schemaOpts)
  }
  const res = defuArrayRight(extendDefaults, de)
  return res
}
