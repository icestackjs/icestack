import { cva } from 'class-variance-authority'

import { typePrefix, expands } from '@/shared'
import { InternalOptions } from '@/types'

export default function (opts: InternalOptions) {
  const { prefix } = opts
  const className = 'link'
  const baseClass = prefix + className
  const basePrefix = baseClass + '-'
  const types = typePrefix(basePrefix)
  return {
    cva: cva([baseClass], {
      variants: {
        type: expands(types),
        hover: {
          true: basePrefix + 'hover'
        }
      },
      defaultVariants: {}
    }),
    prefix,
    className,
    baseClass,
    types
  }
}
