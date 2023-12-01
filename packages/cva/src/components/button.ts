import { cva } from 'class-variance-authority'

import { typePrefix, expands } from '@/shared'

export default function () {
  const allTypes = typePrefix('btn')

  const allSizes = ['btn-xs', 'btn-sm', 'btn-md', 'btn-lg', 'btn-wide', 'btn-block']

  const allShapes = ['btn-square', 'btn-circle']

  const button = cva(['btn'], {
    variants: {
      type: expands(allTypes),
      outline: {
        true: 'btn-outline'
      },
      size: expands(allSizes),
      glass: {
        true: 'glass'
      },
      disabled: {
        true: 'btn-disabled'
      },
      shape: expands(allShapes)
    },
    defaultVariants: {}
  })

  return button
}
