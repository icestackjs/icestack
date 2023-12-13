import { cva } from 'class-variance-authority'

import { expands, sizePrefix } from '@/shared'
import { InternalOptions } from '@/types'

export default function (opts: InternalOptions) {
  const { prefix } = opts
  const className = 'table'
  const baseClass = prefix + className
  const basePrefix = baseClass + '-'

  const sizes = sizePrefix(basePrefix)

  return {
    cva: cva([basePrefix], {
      variants: {
        zebra: {
          true: basePrefix + 'zebra'
        },
        size: expands(sizes)
      },
      defaultVariants: {}
    }),
    prefix,
    className,
    baseClass,
    sizes
  }
}
