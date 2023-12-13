import { VariantProps, cva } from 'class-variance-authority'

import { addPrefix, expands, sizePrefix } from '@/shared'
import { InternalOptions } from '@/types'

export default function (opts: InternalOptions) {
  const { prefix } = opts
  const className = 'tab'
  const baseClass = prefix + className
  const basePrefix = baseClass + '-'

  const parentClass = baseClass + 's'
  const parentPrefix = parentClass + '-'
  const shapes = addPrefix(parentPrefix, ['boxed', 'bordered', 'lifted'])
  const sizes = sizePrefix(parentPrefix)
  const parent = cva([parentClass], {
    variants: {
      shape: expands(shapes),
      size: expands(sizes)
    }
  })

  const child = cva([baseClass], {
    variants: {
      active: {
        true: basePrefix + 'active'
      },
      disabled: {
        true: basePrefix + 'disabled'
      },
      content: {
        true: basePrefix + 'content'
      }
    }
  })

  return {
    cva: {
      parent,
      child
    },
    prefix,
    className,
    baseClass,
    sizes,
    shapes
  }
}
