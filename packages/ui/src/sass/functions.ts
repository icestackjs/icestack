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
import { IBuildScssOptions } from '@/types'
import { getBuildOptions } from '@/options'

// @ts-ignore
const defaultPreset: Record<(typeof allComponents)[number], any> = {
  alert: alert.options,
  avatar: avatar.options,
  // bottomNavigation: bottomNavigation.options,
  button: button.options,
  badge: badge.options,
  chat: chat.options,
  checkbox: checkbox.options,
  // fileInput: fileInput.options,
  input: input.options,
  link: link.options,
  progress: progress.options,
  textarea: textarea.options,
  toggle: toggle.options,
  select: select.options,
  radio: radio.options,
  range: range.options
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

export const createFunctions: (opts: IBuildScssOptions) => Options<'sync'>['functions'] = (opts) => {
  const options = getBuildOptions(opts?.options)
  return {
    ...base.inject(options),
    'globalAtMediaHover()': () => {
      return transformJsToSass(options.global.atMedia.hover)
    },
    'inject($path:null)': (args: Value[]) => {
      const p = args[0].assertString().text
      const map = get(defaultPreset, p, {})
      return transformJsToSass(expandInject(map))
    }
  }
}
