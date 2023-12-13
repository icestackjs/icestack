import { VariantProps, cva } from 'class-variance-authority'

import { addPrefix, expands, typePrefix } from '@/shared'
import { InternalOptions } from '@/types'

export default function (opts: InternalOptions) {
  const { prefix } = opts
  const className = 'step'
  const baseClass = prefix + className
  const basePrefix = baseClass + '-'
  const types = typePrefix(basePrefix)

  const parentClass = baseClass + 's'
  const positions = addPrefix(parentClass + '-', ['vertical', 'horizontal'])
  const parent = cva([parentClass], {
    variants: {
      position: expands(positions)
    }
  })

  const child = cva([baseClass], {
    variants: {
      type: expands(types)
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
    positions,
    types
  }
}
