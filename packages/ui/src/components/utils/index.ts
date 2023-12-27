import { pick } from 'lodash'
import { preprocessCssInJs, defu, defuOverrideApplyCss, mergeRClone } from '@/shared'
import type { CodegenMode, ComponentsValue, GetCssSchemaMethodOptions, CssValue, CreatePresetOptions, CssSchema, ModeMergeOptions } from '@/types'
import { mapCss2JsArray, isModeMergeValue } from '@/utils'

function getPickedProps(mode: CodegenMode = 'styled') {
  switch (mode) {
    case 'base': {
      return ['base']
    }
    case 'styled': {
      return ['base', 'styled', 'utils']
    }
    default: {
      return []
    }
  }
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
    return isModeMergeValue(x)
      ? {
          base: mergeRClone(...mapCss2JsArray(resolvedFunctionArray(x.base, opts))),
          styled: mergeRClone(...mapCss2JsArray(resolvedFunctionArray(x.styled, opts))),
          utils: mergeRClone(...mapCss2JsArray(resolvedFunctionArray(x.utils, opts)))
        }
      : {
          utils: mergeRClone(...mapCss2JsArray(x))
        }
  })
  return mergeRClone(
    {
      base: {},
      styled: {},
      utils: {}
    },
    ...obj
  )
}

export function handleOptions({ extend, override, selector, mode, schema, params }: Partial<ComponentsValue>, { types }: CreatePresetOptions) {
  const schemaOpts: GetCssSchemaMethodOptions = {
    types,
    selector: selector ?? '',
    params: params ?? {}
  }

  const d: CssSchema | undefined = schema?.(schemaOpts)
  let de: Partial<CssSchema> = d ?? {}
  de.defaults = preprocessCssInJs(pick(de.defaults, getPickedProps(mode)))
  if (override) {
    const overrideDefaults = {
      selector,
      defaults: preprocessCssInJs(mergeAllOptions(override as ModeMergeOptions[], schemaOpts))
    }
    de = defuOverrideApplyCss(overrideDefaults, de)
  }
  const extendDefaults = {
    selector,
    defaults: preprocessCssInJs(mergeAllOptions(extend as ModeMergeOptions[], schemaOpts))
  }
  const res = defu(extendDefaults, de)
  return res
}
