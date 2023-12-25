import { pick } from 'lodash'
import { preprocessCssInJs, defu, defuOverrideApplyCss, mergeRClone } from '@/shared'
import type { CodegenMode, ComponentsValue, SchemaFnOptions, CssValue, CreatePresetOptions, ISchema, ModeMergeOptions } from '@/types'
import { makeExtraCssArray, isModeMergeValue } from '@/utils'

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

function invoke(arr: ModeMergeOptions[], opts: Partial<SchemaFnOptions>) {
  return arr.map((x) => {
    x = typeof x === 'function' ? x(opts) : x

    return isModeMergeValue(x)
      ? {
          base: mergeRClone(...makeExtraCssArray(x.base)),
          styled: mergeRClone(...makeExtraCssArray(x.styled)),
          utils: mergeRClone(...makeExtraCssArray(x.utils))
        }
      : {
          utils: mergeRClone(...makeExtraCssArray(x))
        }
  })
}

export function mergeAllOptions(input: ModeMergeOptions[], opts: Partial<SchemaFnOptions>): Record<string, CssValue> {
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

export function handleOptions({ extend, override, selector, mode, schema, params }: Partial<ComponentsValue>, { types }: CreatePresetOptions) {
  const opts: Partial<SchemaFnOptions> = {
    types,
    selector,
    params
  }

  const d: ISchema | undefined = schema?.(opts)
  let de: Partial<ISchema> = d ?? {}
  de.defaults = preprocessCssInJs(pick(de.defaults, getPickedProps(mode)))
  if (override) {
    de = defuOverrideApplyCss(
      {
        selector,
        defaults: preprocessCssInJs(mergeAllOptions(override as ModeMergeOptions[], opts))
      },
      de
    )
  }

  const res = defu(
    {
      selector,
      defaults: preprocessCssInJs(mergeAllOptions(extend as ModeMergeOptions[], opts))
    },
    de
  )
  return res
}
