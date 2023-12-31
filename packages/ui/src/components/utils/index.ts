import { pick, reverse } from 'lodash'
import { defu, defuOverrideApplyCss, mergeRClone, defuExtendApplyCss } from '@/shared'
import { preprocessCssInJs, mapCss2JsArray } from '@/postcss'
import type { ComponentsValue, GetCssSchemaMethodOptions, CssValue, CreatePresetOptions, CssSchema, ModeMergeOptions, PickCss } from '@/types'
import { isModeMergeValue } from '@/utils'

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
      const baseArr = mapCss2JsArray(resolvedFunctionArray(x.base, opts))
      const styledArr = mapCss2JsArray(resolvedFunctionArray(x.styled, opts))
      const utilsArr = mapCss2JsArray(resolvedFunctionArray(x.utils, opts))
      return {
        base: mergeRClone(...baseArr),
        styled: mergeRClone(...styledArr),
        utils: mergeRClone(...utilsArr)
      }
    }
    const utilsArr = mapCss2JsArray(x)
    return {
      utils: mergeRClone(...utilsArr)
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

export function handleOptions({ extend, override, selector, schema, params, pick: pickCss }: Partial<ComponentsValue>, { types }: CreatePresetOptions) {
  const schemaOpts: GetCssSchemaMethodOptions = {
    types,
    selector: selector ?? '',
    params: params ?? {}
  }

  const d: CssSchema | undefined = schema?.(schemaOpts)
  let de: Partial<CssSchema> = d ?? {}
  // mode: none , no default
  de.defaults = preprocessCssInJs(pick(de.defaults, getPickedProps(pickCss)))
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
