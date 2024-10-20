import type { InternalOptions, UserDefinedOptions } from './types'
import defu from 'defu'

export function getOptions(opts: UserDefinedOptions = {}) {
  const options: InternalOptions = defu<InternalOptions, InternalOptions[]>(opts, {
    prefix: '',
  })
  return options
}
