import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'

export type ButtonProps = VariantProps<typeof button> & { textContent?: string }

export const allTypes = ['btn-primary', 'btn-neutral', 'btn-info', 'btn-success', 'btn-warning', 'btn-error']

export const allSizes = ['btn-xs', 'btn-sm', 'btn-md', 'btn-lg', 'btn-wide', 'btn-block']

export const allShapes = ['btn-square', 'btn-circle']

const button = cva(['btn'], {
  variants: {
    type: allTypes.reduce<Record<string, string>>((acc, cur) => {
      acc[cur] = cur
      return acc
    }, {}),
    outline: {
      true: 'btn-outline',
      false: ''
    },
    size: allSizes.reduce<Record<string, string>>((acc, cur) => {
      acc[cur] = cur
      return acc
    }, {}),
    glass: {
      true: 'glass',
      false: ''
    },
    disabled: {
      true: 'btn-disabled',
      false: ''
    },
    shape: allShapes.reduce<Record<string, string>>((acc, cur) => {
      acc[cur] = cur
      return acc
    }, {})
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
