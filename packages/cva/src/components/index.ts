// import type { VariantProps } from 'class-variance-authority'
import type { cva } from 'class-variance-authority'
import button from './button'
import loading from './loading'
import mask from './mask'
import link from './link'
import checkbox from './checkbox'
import input from './input'
import radio from './radio'
import range from './range'
import select from './select'
import toggle from './toggle'
import badge from './badge'
import table from './table'
import alert from './alert'
import skeleton from './skeleton'
import progress from './progress'
import { UserDefinedOptions } from '@/types'
import { getOptions } from '@/options'

export type { VariantProps } from 'class-variance-authority'

export function createCvaWithAddition(opts: UserDefinedOptions = {}) {
  const options = getOptions(opts)
  return {
    button: button(options),
    loading: loading(options),
    mask: mask(options),
    link: link(options),
    checkbox: checkbox(options),
    input: input(options),
    radio: radio(options),
    range: range(options),
    select: select(options),
    toggle: toggle(options),
    badge: badge(options),
    progress: progress(options),
    table: table(options),
    alert: alert(options),
    skeleton: skeleton(options)
  }
}

export function createCva(opts: UserDefinedOptions = {}) {
  return Object.entries(createCvaWithAddition(opts)).reduce<Record<string, ReturnType<typeof cva>>>((acc, [name, lib]) => {
    acc[name] = lib.cva
    return acc
  }, {})
}
