import type { Options } from 'sass'

import * as base from '@/base'
import * as button from '@/components/button'
import * as alert from '@/components/alert'
import * as badge from '@/components/badge'
export const functions: Options<'sync'>['functions'] = {
  ...base.inject,
  ...button.inject,
  ...alert.inject,
  ...badge.inject
}
