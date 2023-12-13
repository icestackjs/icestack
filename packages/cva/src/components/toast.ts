import { cva } from 'class-variance-authority'

import { addPrefix, expands } from '@/shared'
import { InternalOptions } from '@/types'

export default function (opts: InternalOptions) {
  const { prefix } = opts
  const className = 'toast'
  const baseClass = prefix + className
  const basePrefix = baseClass + '-'

  const positions = addPrefix(basePrefix, ['start', 'center', 'end', 'top', 'middle', 'bottom'])

  return {
    cva: cva([baseClass], {
      variants: {
        position: expands(positions)
      },
      defaultVariants: {}
    }),
    prefix,
    className,
    baseClass,
    positions
  }
}
