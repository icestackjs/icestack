import type { Options } from 'sass'
import { Value } from 'sass'
import { get } from 'lodash'
import type allComponents from '../allComponents'
import { transformJsToSass } from './utils'
import { applyListToString, handleOptions } from '@/components/shared'
import { componentsMap } from '@/components'
import * as base from '@/base'
import { CodegenOptions, ComponentsValue } from '@/types'
// import { getCodegenOptions } from '@/options'

export interface CreatePresetOptions {
  types: string[]
  options: CodegenOptions
}

function getComsOpts(opts: CreatePresetOptions, name: string): Partial<ComponentsValue> {
  return get(opts, `options.components.${name}`, {})
}

// @ts-ignore
export const createPreset: (opts: CreatePresetOptions) => Record<(typeof allComponents)[number], any> = (opts) => {
  return Object.entries(componentsMap).reduce<Record<string, object>>((acc, [name, lib]) => {
    const comOpt = getComsOpts(opts, name)
    acc[name] = handleOptions(
      lib?.options({
        ...opts,
        selector: comOpt.selector!
      }),
      comOpt
    )
    return acc
  }, {})
}

export const createFunctions: (options: CodegenOptions) => Options<'sync'>['functions'] = (options) => {
  const baseResult = base.calcBase(options)
  const presets = createPreset({
    types: baseResult.allTypes,
    options
  })
  return {
    ...baseResult.functions,
    'globalAtMediaHover()': () => {
      return transformJsToSass(options?.global?.atMedia?.hover)
    },
    'inject($path:null)': (args: Value[]) => {
      const p = args[0].assertString().text
      const map = get(presets, p, {})
      return transformJsToSass(applyListToString(map))
    }
  }
}
