import { cva } from 'class-variance-authority'

import { typePrefix, expands, sizePrefix } from '@/shared'
import { InternalOptions } from '@/types'

export default function (opts: InternalOptions) {
  const { prefix } = opts
  const className = 'textarea'
  const baseClass = prefix + className
  const basePrefix = baseClass + '-'
  const types = typePrefix(basePrefix)

  const sizes = sizePrefix(basePrefix)

  return {
    cva: cva([basePrefix], {
      variants: {
        type: expands(types),
        size: expands(sizes),
        bordered: {
          true: basePrefix + 'bordered'
        },
        ghost: {
          true: basePrefix + 'ghost'
        }
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
