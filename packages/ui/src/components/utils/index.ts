import { pick } from 'lodash'
import { preprocessCssInJs, defu, defuOverrideApplyCss, mergeRClone } from '@/shared'
import type { CodegenMode, ComponentsValue, SchemaFnOptions, CssValue, CreatePresetOptions, ISchema } from '@/types'
import { makeExtraCssArray, preHandleString, isModeMergeValue } from '@/utils'

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

function invoke(arr: any | any[], opts: any) {
  if (!Array.isArray(arr)) {
    arr = [arr]
  }
  return arr.map((x: unknown) => {
    if (typeof x === 'function') {
      const r = x(opts)
      if (typeof r === 'string') {
        return {
          utils: preHandleString(x)
        }
      }
      return r
    } else if (typeof x === 'string') {
      return {
        utils: preHandleString(x)
      }
    } else if (isModeMergeValue(x)) {
      return {
        base: mergeRClone(...makeExtraCssArray(x.base)),
        styled: mergeRClone(...makeExtraCssArray(x.styled)),
        utils: mergeRClone(...makeExtraCssArray(x.utils))
      }
    }
    return x
  })
}

export function handleFn<T extends any[]>(input: T, opts: SchemaFnOptions): Record<string, CssValue> {
  if (!input) {
    return input
  }
  const obj = invoke(input, opts)
  return mergeRClone(
    {
      base: {},
      styled: {},
      utils: {}
    },
    ...obj
  )
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
        defaults: preprocessCssInJs(handleFn(override as any[], opts)) // makeDefaults(, isOverrideUtils)
      },
      de
    )
  }

  const res = defu(
    {
      selector,
      defaults: preprocessCssInJs(handleFn(extend as any[], opts)) // makeDefaults(, isExtendUtils)
    },
    de
  )
  return res
}
