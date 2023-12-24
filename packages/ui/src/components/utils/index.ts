import { pick } from 'lodash'
import { preprocessCssInJs, defu, defuOverrideApplyCss, mergeRClone } from '@/shared'
import type { CodegenMode, ComponentsValue, ModeMergeValue, SchemaFnOptions, CssValue, CreatePresetOptions, ISchema } from '@/types'
import { makeExtraCssArray } from '@/utils'

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

function isModeMergeValue(input: any): input is ModeMergeValue {
  return typeof input === 'object' && (Reflect.has(input, 'base') || Reflect.has(input, 'styled') || Reflect.has(input, 'utils'))
}

function invoke(arr: any[], opts: any) {
  return arr.map((x) => {
    if (typeof x === 'function') {
      return x(opts)
    }
    return x
  })
}

export function handleFn<T extends ModeMergeValue | CssValue>(input: T, opts: SchemaFnOptions): Record<string, CssValue> {
  const res = {
    base: {},
    styled: {},
    utils: {}
  }
  if (Array.isArray(input)) {
    input = mergeRClone(...invoke(input, opts))
  }
  if (isModeMergeValue(input)) {
    res.base = Array.isArray(input.base) ? mergeRClone(...invoke(input.base, opts)) : input.base ?? {}
    res.styled = Array.isArray(input.styled) ? mergeRClone(...invoke(input.styled, opts)) : input.styled ?? {}
    res.utils = Array.isArray(input.utils) ? mergeRClone(...invoke(input.utils, opts)) : input.utils ?? {}
    return res
  } else {
    res.utils = mergeRClone(...makeExtraCssArray(input))
  }
  return res
}

export function handleOptions({ extend, override, selector, mode, schema, params }: ComponentsValue, { types }: CreatePresetOptions) {
  const opts: SchemaFnOptions = {
    types,
    selector,
    params
  }

  // const isExtendUtils = typeof extend === 'string' || Array.isArray(extend)
  // const isOverrideUtils = typeof override === 'string' || Array.isArray(override)
  const d: ISchema | undefined = schema?.(opts)
  let de: Partial<ISchema> = d ?? {}
  de.defaults = preprocessCssInJs(pick(de.defaults, getPickedProps(mode)))
  if (override) {
    de = defuOverrideApplyCss(
      {
        selector,
        defaults: preprocessCssInJs(handleFn(override, opts)) // makeDefaults(, isOverrideUtils)
      },
      de
    )
  }

  const res = defu(
    {
      selector,
      defaults: preprocessCssInJs(handleFn(extend, opts)) // makeDefaults(, isExtendUtils)
    },
    de
  )
  return res
}
