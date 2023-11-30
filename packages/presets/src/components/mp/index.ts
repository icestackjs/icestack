import button from './button'
import checkbox from './checkbox'
import radio from './radio'
import input from './input'
import range from './range'
import textarea from './textarea'
import toggle from './toggle'
import table from './table'
import countdown from './countdown'
import collapse from './collapse'
import join from './join'
import type { ComponentsOptions, DeepPartial } from '@/types'

export const components: DeepPartial<ComponentsOptions> = {
  select: false,
  diff: false,
  tooltip: false,
  button,
  checkbox,
  radio,
  input,
  range,
  textarea,
  toggle,
  table,
  countdown,
  collapse,
  join
}
