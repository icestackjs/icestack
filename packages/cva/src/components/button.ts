import { cva } from 'class-variance-authority'

import { typePrefix, expands, addPrefix } from '@/shared'
import { InternalOptions } from '@/types'

export default function (opts: InternalOptions) {
  const { prefix } = opts
  const baseClass = prefix + 'btn'
  const basePrefix = baseClass + '-'

  const allTypes = typePrefix(basePrefix)

  const allSizes = addPrefix(basePrefix, ['xs', 'sm', 'md', 'lg', 'wide', 'block'])

  const allShapes = addPrefix(basePrefix, ['square', 'circle'])

  return {
    cva: cva([baseClass], {
      variants: {
        type: expands(allTypes),
        outline: {
          true: basePrefix + 'outline'
        },
        size: expands(allSizes),
        glass: {
          true: 'glass'
        },
        disabled: {
          true: basePrefix + 'disabled'
        },
        shape: expands(allShapes)
      },
      defaultVariants: {}
    }),
    baseClass,
    types: allTypes,
    sizes: allSizes,
    shapes: allShapes
  }
}
