import type { Options } from 'sass'
import { sassTrue, sassFalse } from 'sass'
import * as base from '@/base'
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

export const functions: Options<'sync'>['functions'] = {
  ...base.inject,
  ...avatar.inject,
  ...bottomNavigation.inject,
  ...button.inject,
  ...alert.inject,
  ...badge.inject,
  ...chat.inject,
  ...checkbox.inject,
  ...fileInput.inject,
  ...input.inject,
  ...link.inject,
  ...progress.inject,
  ...textarea.inject,
  'globalAtMediaHover()': () => {
    return sassTrue
  }
}
