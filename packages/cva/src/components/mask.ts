import { cva } from 'class-variance-authority'

import { expands, addPrefix } from '@/shared'
import { InternalOptions } from '@/types'

export default function (opts: InternalOptions) {
  const { prefix } = opts
  const baseClass = prefix + 'mask'
  const basePrefix = baseClass + '-'
  const shapes = addPrefix(basePrefix, [
    'squircle',
    'heart',
    'hexagon',
    'hexagon-2',
    'decagon',
    'pentagon',
    'diamond',
    'square',
    'circle',
    'parallelogram',
    'parallelogram-2',
    'parallelogram-3',
    'parallelogram-4',
    'star',
    'star-2',
    'triangle',
    'triangle-2',
    'triangle-3',
    'triangle-4'
  ])

  return {
    cva: cva([baseClass], {
      variants: {
        shape: expands(shapes)
      },
      defaultVariants: {}
    }),
    baseClass,
    shapes
  }
}
