import type { VariantProps } from 'class-variance-authority'
import type { FC, PropsWithChildren } from 'react'
import { cva } from 'class-variance-authority'

const getButtonClassname = cva(['btn'], {
  variants: {
    type: {
      primary: ['btn-primary'],
      success: ['btn-success'],
      warning: ['btn-warning'],
      error: ['btn-error'],
    },
    outline: {
      true: 'btn-outline',
    },
    size: {
      xs: ['btn-xs'],
      sm: ['btn-sm'],
      md: ['btn-md'],
      lg: ['btn-lg'],
      wide: ['btn-wide'],
      block: ['btn-block'],
    },
    glass: {
      true: 'glass',
    },
    disabled: {
      true: 'btn-disabled',
    },
    shape: {
      square: ['btn-square'],
      circle: ['btn-circle'],
    },
  },
  defaultVariants: {},
})

export type ButtonProps = PropsWithChildren<VariantProps<typeof getButtonClassname>>

const MyButton: FC<ButtonProps> = (props) => {
  return <button className={getButtonClassname(props)}>{props.children}</button>
}

export default MyButton
