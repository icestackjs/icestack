import { cva } from 'class-variance-authority'

import { expands, addPrefix } from '@/shared'

export default function () {
  const shapes = addPrefix('mask', [
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

  return cva(['mask'], {
    variants: {
      shape: expands(shapes)
    },
    defaultVariants: {}
  })
}
