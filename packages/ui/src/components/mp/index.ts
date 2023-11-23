import button from './button'
import checkbox from './checkbox'
import radio from './radio'
import input from './input'
import range from './range'
import textarea from './textarea'
import toggle from './toggle'
import table from './table'
import type { ComponentsOptions, DeepPartial } from '@/types'

export const components: DeepPartial<ComponentsOptions> = {
  select: false,
  button,
  checkbox,
  radio,
  input,
  range,
  textarea,
  toggle,
  table
}
