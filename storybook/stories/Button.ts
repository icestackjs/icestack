import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'
import { expands, typePrefix } from './share'
export type ButtonProps = VariantProps<typeof button> & { textContent?: string }

// ['primary', 'neutral', 'success', 'warning', 'error']

export const allTypes = typePrefix('btn')

export const allSizes = ['btn-xs', 'btn-sm', 'btn-md', 'btn-lg', 'btn-wide', 'btn-block']

export const allShapes = ['btn-square', 'btn-circle']

const button = cva(['btn'], {
  variants: {
    type: expands(allTypes),
    outline: {
      true: 'btn-outline',
      false: ''
    },
    size: expands(allSizes),
    glass: {
      true: 'glass',
      false: ''
    },
    disabled: {
      true: 'btn-disabled',
      false: ''
    },
    shape: expands(allShapes)
    // block: {
    //   true: 'btn-block',
    //   false: ''
    // }
  },
  defaultVariants: {
    // size: 'btn-md'
  }
})

export const createButton = (props: ButtonProps) => {
  const btn = document.createElement('button')
  btn.textContent = props.textContent ?? 'Button'
  btn.className = button(props)
  return btn
}
