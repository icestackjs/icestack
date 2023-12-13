import { cva } from 'class-variance-authority'

import { addPrefix, expands, typePrefix } from '@/shared'
import { InternalOptions } from '@/types'

export default function (opts: InternalOptions) {
  const { prefix } = opts
  const className = 'tooltip'
  const baseClass = prefix + className
  const basePrefix = baseClass + '-'
  const types = typePrefix(basePrefix)
  const positions = addPrefix(basePrefix, ['top', 'left', 'right', 'bottom'])

  return {
    cva: cva([baseClass], {
      variants: {
        type: expands(types),
        position: expands(positions),
        open: {
          true: basePrefix + 'open'
        }
      },
      defaultVariants: {}
    }),
    prefix,
    className,
    baseClass,
    types,
    positions
  }
}
