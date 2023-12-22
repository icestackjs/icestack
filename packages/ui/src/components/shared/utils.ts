import { pick } from 'lodash'
import { preprocessCssInJs, defu, defuOverrideApplyCss, transformCss2Js } from '@icestack/shared'
import type { CreatePresetOptions, ISchema } from '@icestack/shared'

import type { CodegenMode, ComponentsValue, CssInJs, ModeMergeValue, SchemaFnOptions } from '@/types'
export { expandTypes, compressCssSelector, preprocessCssInJs, getSelector, recursiveNodes, transformCss2Js } from '@icestack/shared'

export function makeDefaults(obj?: ModeMergeValue, selector?: string) {
  const res: Record<string, Record<string, CssInJs | string>> = {
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

export function handleFn<T extends string | Record<string, any> | ((...args: any[]) => Record<string, any>)>(input: T, opts: SchemaFnOptions): Record<string, any> {
  if (typeof input === 'function') {
    const x = input(opts)
    if (typeof x === 'string') {
      return transformCss2Js(x)
    }
    return x
  }
  if (typeof input === 'string') {
    return transformCss2Js(input)
  }
  return input
}

export function handleOptions({ extend, override, selector, extra, mode, schema, params }: ComponentsValue, { types }: CreatePresetOptions) {
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
