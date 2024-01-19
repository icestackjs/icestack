// import type { VariantProps } from 'class-variance-authority'
// import type { cva } from 'class-variance-authority'
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
import textarea from './textarea'
import indicator from './indicator'
import divider from './divider'
import steps from './steps'
import tab from './tab'
import kbd from './kbd'
import toast from './toast'
import tooltip from './tooltip'
import { UserDefinedOptions } from '@/types'
import { getOptions } from '@/options'

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
    skeleton: skeleton(options),
    textarea: textarea(options),
    indicator: indicator(options),
    divider: divider(options),
    steps: steps(options),
    tab: tab(options),
    kbd: kbd(options),
    toast: toast(options),
    tooltip: tooltip(options)
  }
}

// type Fn = ReturnType<typeof cva>

export function createCva(opts: UserDefinedOptions = {}) {
  const options = getOptions(opts)
  return {
    button: button(options).cva,
    loading: loading(options).cva,
    mask: mask(options).cva,
    link: link(options).cva,
    checkbox: checkbox(options).cva,
    input: input(options).cva,
    radio: radio(options).cva,
    range: range(options).cva,
    select: select(options).cva,
    toggle: toggle(options).cva,
    badge: badge(options).cva,
    progress: progress(options).cva,
    table: table(options).cva,
    alert: alert(options).cva,
    skeleton: skeleton(options).cva,
    textarea: textarea(options).cva,
    indicator: indicator(options).cva,
    divider: divider(options).cva,
    steps: steps(options).cva,
    tab: tab(options).cva,
    kbd: kbd(options).cva,
    toast: toast(options).cva,
    tooltip: tooltip(options).cva
  }
}
