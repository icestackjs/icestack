import { pick } from 'lodash'
import type { ComponentsValue, CreatePresetOptions, CssSchema, CssSchemaDefaults, GetCssSchemaMethodOptions, ModeMergeOptions, PickCss } from '@icestack/types'
import { defuArrayRight, isModeMergeValue, makeArray } from '@icestack/shared'

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
  return arr
    .map((x) => {
      return typeof x === 'function' ? x(opts) : x
    })
    .filter(Boolean)
}

export function mergeAllOptions(input: ModeMergeOptions[], opts: Partial<GetCssSchemaMethodOptions>): Record<string, string[]> {
  if (!input) {
    return input
  }
  return defuArrayRight(
    // @ts-ignore
    ...resolvedFunctionArray(input, opts).map((x) => {
      if (isModeMergeValue(x)) {
        return {
          base: resolvedFunctionArray(x.base, opts),
          styled: resolvedFunctionArray(x.styled, opts),
          utils: resolvedFunctionArray(x.utils, opts),
        }
      }

      return {
        utils: makeArray(x),
        base: [],
        styled: [],
      }
    }),
  )
}

export function preprocessDefaults(de?: Partial<CssSchemaDefaults>) {
  if (de === undefined) {
    de = {}
  }
  if (typeof de.base === 'string') {
    de.base = [de.base]
  }
  else if (de.base === undefined) {
    de.base = []
  }

  if (typeof de.styled === 'string') {
    de.styled = [de.styled]
  }
  else if (de.styled === undefined) {
    de.styled = []
  }
  if (typeof de.utils === 'string') {
    de.utils = [de.utils]
  }
  else if (de.utils === undefined) {
    de.utils = []
  }

  return de
}

export function handleOptions({ extend, selector, schema, params, pick: pickCss }: Partial<ComponentsValue>, { types }: CreatePresetOptions) {
  const schemaOpts: GetCssSchemaMethodOptions = {
    types,
    selector: selector ?? '',
    params: params ?? {},
  }

  const de: Partial<CssSchema> = schema?.(schemaOpts) ?? {}

  // mode: none , no default
  de.defaults = pick(preprocessDefaults(de.defaults), getPickedProps(pickCss))

  return defuArrayRight(
    {
      selector: de.selector ?? selector,
      defaults: mergeAllOptions(extend as ModeMergeOptions[], schemaOpts),
    },
    de,
  )
}
