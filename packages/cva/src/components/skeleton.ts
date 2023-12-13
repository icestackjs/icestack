import { cva } from 'class-variance-authority'

import { expands, addPrefix } from '@/shared'
import { InternalOptions } from '@/types'

export default function (opts: InternalOptions) {
  const { prefix } = opts
  const className = 'skeleton'
  const baseClass = prefix + className
  const basePrefix = baseClass + '-'

  const shapes = addPrefix(basePrefix, ['title', 'paragraph', 'avatar'])
  return {
    cva: cva([baseClass], {
      variants: {
        shape: expands(shapes)
      },
      defaultVariants: {}
    }),
    prefix,
    className,
    baseClass,
    shapes
  }
}
