import { pick } from 'lodash'
import { preprocessCssInJs } from '@icestack/shared'
import type { CreatePresetOptions, ISchema } from '@icestack/shared'
import { defu, defuOverrideArray } from '@/utils'
import type { CodegenMode, ComponentsValue, CssInJs, ModeMergeValue } from '@/types'
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

export function handleOptions({ extend, override, selector, extra, mode, schema, params }: ComponentsValue, opts: CreatePresetOptions) {
  const d: ISchema | undefined = schema?.({
    ...opts,
    selector,
    params
  })
  let de: Partial<ISchema> = d ?? {}
  de.defaults = preprocessCssInJs(pick(de.defaults, getPickedProps(mode)))
  if (override) {
    de = defuOverrideArray(de, {
      selector,
      defaults: makeDefaults(preprocessCssInJs(override), selector)
    })
  }
  const res = defu(
    {
      selector,
      defaults: defu(
        {
          utils: {
            ...preprocessCssInJs(extra)
          }
        },
        makeDefaults(preprocessCssInJs(extend), selector)
      )
    },
    de
  )
  return res
}
