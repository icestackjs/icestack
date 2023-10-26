import type { Options } from 'sass'
import { Value } from 'sass'
import { get, isObject } from 'lodash'
import type allComponents from '../allComponents'
import { transformJsToSass } from './utils'
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
import { CodegenOptions } from '@/types'
// import { getCodegenOptions } from '@/options'

export interface CreatePresetOptions {
  types: string[]
}
// @ts-ignore
export const createPreset: (opts: CreatePresetOptions) => Record<(typeof allComponents)[number], any> = (opts) => {
  return {
    alert: alert.options(opts),
    avatar: avatar.options(opts),
    button: button.options(opts),
    badge: badge.options(opts),
    chat: chat.options(opts),
    checkbox: checkbox.options(opts),
    input: input.options(opts),
    link: link.options(opts),
    progress: progress.options(opts),
    textarea: textarea.options(opts),
    toggle: toggle.options(opts),
    select: select.options(opts),
    radio: radio.options(opts),
    range: range.options(opts)
  }
}

export function expandInject<T extends Record<string, T>>(obj: T) {
  if (isObject(obj)) {
    const keys = Object.keys(obj)
    for (const key of keys) {
      const value = obj[key]
      if (key === 'css' || key === 'sort' || key === 'apply') {
        // do nothing
      } else if (typeof value === 'string') {
        // @ts-ignore
        obj[key] = {
          apply: value
        } as Record<string, string>
      } else if (isObject(obj[key])) {
        expandInject(obj[key])
      }
    }
  }
  return obj
}

export const createFunctions: (options: CodegenOptions) => Options<'sync'>['functions'] = (options) => {
  const baseResult = base.calcBase(options)
  const presets = createPreset({
    types: baseResult.allTypes
  })
  return {
    ...baseResult.functions,
    'globalAtMediaHover()': () => {
      return transformJsToSass(options?.global?.atMedia?.hover)
    },
    'inject($path:null)': (args: Value[]) => {
      const p = args[0].assertString().text
      const map = get(presets, p, {})
      return transformJsToSass(expandInject(map))
    }
  }
}
