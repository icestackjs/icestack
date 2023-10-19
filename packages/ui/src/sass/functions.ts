import type { Options } from 'sass'
import { Value, SassMap } from 'sass'
import { get } from 'lodash'
import { OrderedMap } from 'immutable'
import type allComponents from '../allComponents'
import { transformBaseJs, transformJsToSass } from './utils'
import * as avatar from '@/components/avatar'
import * as bottomNavigation from '@/components/bottom-navigation'
import * as button from '@/components/button'
import * as alert from '@/components/alert'
import * as badge from '@/components/badge'
import * as chat from '@/components/chat'
import * as checkbox from '@/components/checkbox'
import * as fileInput from '@/components/file-input'
import * as input from '@/components/input'
import * as link from '@/components/link'
import * as progress from '@/components/progress'
import * as textarea from '@/components/textarea'
import { defaultVarsEntries } from '@/base/css-vars'

// @ts-ignore
const defaultPreset: Record<(typeof allComponents)[number], any> = {
  alert: alert.options,
  avatar: avatar.options,
  bottomNavigation: bottomNavigation.options,
  button: button.options,
  badge: badge.options,
  chat: chat.options,
  checkbox: checkbox.options,
  fileInput: fileInput.options,
  input: input.options,
  link: link.options,
  progress: progress.options,
  textarea: textarea.options
}

export const functions: Options<'sync'>['functions'] = {
  'injectCssVars()': () => {
    return new SassMap(OrderedMap(transformBaseJs(defaultVarsEntries)))
  },
  'globalAtMediaHover()': () => {
    return transformJsToSass(false)
  },
  'inject($path:null)': (args: Value[]) => {
    const p = args[0].assertString().text
    const map = get(defaultPreset, p, {})
    return transformJsToSass(map)
  }
}
