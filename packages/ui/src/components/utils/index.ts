import { pick } from 'lodash'
import { preprocessCssInJs, defu, defuOverrideApplyCss, mergeRClone } from '@/shared'
import type { CodegenMode, ComponentsValue, ModeMergeValue, SchemaFnOptions, CssValue, CreatePresetOptions, ISchema, CssInJs } from '@/types'
import { makeExtraCssArray } from '@/utils'

export function makeDefaults(obj: ModeMergeValue, allUtils: boolean): Record<string, CssValue> {
  if (allUtils) {
    return {
      base: {},
      styled: {},
      utils: obj ?? {}
    }
  }
  return {
    base: obj?.base ?? {},
    styled: obj?.styled ?? {},
    utils: obj?.utils ?? {}
  }
}

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

export function handleFn<T extends ModeMergeValue | CssValue | ((opts: SchemaFnOptions) => ModeMergeValue | CssValue)>(input: T, opts: SchemaFnOptions): CssInJs[] {
  if (typeof input === 'function') {
    input = input(opts)
  }
  return mergeRClone(...makeExtraCssArray(input))
}

export function handleOptions({ extend, override, selector, mode, schema, params }: ComponentsValue, { types }: CreatePresetOptions) {
  const isExtendUtils = typeof extend === 'string' || Array.isArray(extend)
  const isOverrideUtils = typeof override === 'string' || Array.isArray(override)
  const opts: SchemaFnOptions = {
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
        defaults: makeDefaults(preprocessCssInJs(handleFn(override, opts)), isOverrideUtils)
      },
      de
    )
  }

  const res = defu(
    {
      selector,
      defaults: makeDefaults(preprocessCssInJs(handleFn(extend, opts)), isExtendUtils)
    },
    de
  )
  return res
}
