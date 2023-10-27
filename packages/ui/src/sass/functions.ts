import type { Options } from 'sass'
import { Value } from 'sass'
import { get } from 'lodash'
import type allComponents from '../allComponents'
import { transformJsToSass } from './utils'
import { applyListToString, handleOptions } from '@/components/shared'
import * as avatar from '@/components/avatar'
// import * as bottomNavigation from '@/components/bottom-navigation'
import * as button from '@/components/button'
import * as alert from '@/components/alert'
import * as badge from '@/components/badge'
import * as chat from '@/components/chat'
import * as checkbox from '@/components/checkbox'
// import * as fileInput from '@/components/_file-input'
import * as input from '@/components/input'
import * as link from '@/components/link'
import * as progress from '@/components/progress'
import * as textarea from '@/components/textarea'
import * as toggle from '@/components/toggle'
import * as select from '@/components/select'
import * as radio from '@/components/radio'
import * as range from '@/components/range'
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

export const componentsMap = {
  alert,
  avatar,
  button,
  badge,
  chat,
  checkbox,
  input,
  link,
  progress,
  textarea,
  toggle,
  select,
  radio,
  range
}

// @ts-ignore
export const createPreset: (opts: CreatePresetOptions) => Record<(typeof allComponents)[number], any> = (opts) => {
  return Object.entries(componentsMap).reduce<Record<string, object>>((acc, [name, lib]) => {
    acc[name] = handleOptions(lib?.options(opts), getComsOpts(opts, name))
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
