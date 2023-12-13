import { cva } from 'class-variance-authority'

import { typePrefix, expands, sizePrefix } from '@/shared'
import { InternalOptions } from '@/types'

export default function (opts: InternalOptions) {
  const { prefix } = opts
  const className = 'checkbox'
  const baseClass = prefix + className
  const basePrefix = baseClass + '-'
  const types = typePrefix(basePrefix)
  const sizes = sizePrefix(basePrefix)

  return {
    cva: cva([baseClass], {
      variants: {
        type: expands(types),
        size: expands(sizes)
      },
      defaultVariants: {}
    }),
    prefix,
    className,
    baseClass,
    types,
    sizes
  }
}
