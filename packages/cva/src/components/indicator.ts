import { cva, VariantProps } from 'class-variance-authority'

import { addPrefix, expands } from '@/shared'
import { InternalOptions } from '@/types'

export default function (opts: InternalOptions) {
  const { prefix } = opts
  const className = 'indicator'
  const baseClass = prefix + className
  const basePrefix = baseClass + '-'

  const positions = addPrefix(basePrefix, ['start', 'center', 'end', 'top', 'middle', 'bottom'])
  const parent = cva([baseClass])

  const child = cva([basePrefix + 'item'], {
    variants: {
      position: expands(positions)
    },
    defaultVariants: {}
  })

  return {
    cva: {
      parent,
      child
    },
    prefix,
    className,
    baseClass,
    positions
  }
}
