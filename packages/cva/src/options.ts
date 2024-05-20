import defu from 'defu'
import type { InternalOptions, UserDefinedOptions } from './types'

export function getOptions(opts: UserDefinedOptions = {}) {
  const options: InternalOptions = defu<InternalOptions, InternalOptions[]>(opts, {
    prefix: '',
  })
  return options
}
