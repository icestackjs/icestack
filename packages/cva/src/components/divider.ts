import { cva } from 'class-variance-authority'

import { addPrefix, expands, typePrefix } from '@/shared'
import { InternalOptions } from '@/types'

export default function (opts: InternalOptions) {
  const { prefix } = opts
  const className = 'divider'
  const baseClass = prefix + className
  const basePrefix = baseClass + '-'
  const types = typePrefix(basePrefix)
  const positions = addPrefix(basePrefix, ['vertical', 'horizontal', 'end', 'start'])

  return {
    cva: cva([baseClass], {
      variants: {
        type: expands(types),
        position: expands(positions)
      },
      defaultVariants: {}
    }),
    prefix,
    className,
    baseClass,
    positions,
    types
  }
}
