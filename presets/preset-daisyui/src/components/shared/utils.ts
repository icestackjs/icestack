import { pick } from 'lodash'
import { preprocessCssInJs, defu, defuOverrideApplyCss } from '@icestack/shared'
import type { CreatePresetOptions, CssSchema } from '@icestack/shared'

import type { CodegenMode, ComponentsValue, CssInJs, ModeMergeValue, GetCssSchemaMethodOptions } from '@icestack/types'
export { expandTypes, compressCssSelector, preprocessCssInJs, getSelector, recursiveNodes, transformCss2Js } from '@icestack/shared'

export function makeDefaults(obj?: ModeMergeValue, selector?: string) {
  const res: Record<string, Record<string, CssInJs>> = {
    base: {},
    styled: {},
    utils: {}
  }
  if (selector) {
    if (obj?.base) {
      res.base[selector] = obj.base
    }
    if (obj?.styled) {
      res.styled[selector] = obj.styled
    }
    if (obj?.utils) {
      res.utils[selector] = obj.utils
    }
  }
  return res
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

export function handleFn<T extends Record<string, any> | ((...args: any[]) => Record<string, any>)>(input: T, opts: GetCssSchemaMethodOptions): Record<string, any> {
  if (typeof input === 'function') {
    return input(opts)
  }
  return input
}

export function handleOptions({ extend, override, selector, extra, mode, schema, params }: ComponentsValue, { types }: CreatePresetOptions) {
  const opts: GetCssSchemaMethodOptions = {
    types,
    selector,
    params
  }
  const d: CssSchema | undefined = schema?.(opts)
  let de: Partial<CssSchema> = d ?? {}
  de.defaults = preprocessCssInJs(pick(de.defaults, getPickedProps(mode)))
  if (override) {
    de = defuOverrideApplyCss(
      {
        selector,
        defaults: makeDefaults(preprocessCssInJs(handleFn(override, opts)), selector)
      },
      de
    )
  }
  const res = defu(
    {
      selector,
      defaults: defu(
        {
          utils: {
            ...preprocessCssInJs(handleFn(extra, opts))
          }
        },
        makeDefaults(preprocessCssInJs(handleFn(extend, opts)), selector)
      )
    },
    de
  )
  return res
}
