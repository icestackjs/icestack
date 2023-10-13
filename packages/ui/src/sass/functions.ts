import type { Options } from 'sass'

import * as base from '@/base'
import * as button from '@/components/button'
import * as alert from '@/components/alert'

export const functions: Options<'sync'>['functions'] = {
  ...base.inject,
  ...button.inject,
  ...alert.inject
}
