import { cva } from 'class-variance-authority'

import { expands, addPrefix, sizePrefix } from '@/shared'

export default function () {
  const sizes = sizePrefix('loading')
  const shapes = addPrefix('loading', ['audio', 'ball-triangle', 'bars', 'circles', 'grid', 'hearts', 'oval', 'puff', 'rings', 'spinning-circles', 'tail-spin', 'three-dots'])
  return cva(['loading'], {
    variants: {
      size: expands(sizes),
      shape: expands(shapes)
    },
    defaultVariants: {}
  })
}
