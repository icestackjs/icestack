import { cva, type VariantProps } from 'class-variance-authority'

export const base = ['font-semibold', 'border', 'rounded']

export const variants = {
  intent: {
    primary: ['bg-blue-500', 'text-white', 'border-transparent', 'hover:bg-blue-600'],
    secondary: ['bg-white', 'text-gray-800', 'border-gray-400', 'hover:bg-gray-100']
  },
  size: {
    small: ['text-sm', 'py-1', 'px-2'],
    medium: ['text-base', 'py-2', 'px-4']
  }
}

export const compoundVariants = [
  {
    intent: ['primary'],
    size: ['medium'],
    class: ['uppercase']
  }
]

export const defaultVariants = {
  intent: 'primary',
  size: 'small'
}

const index = cva(base, {
  variants,
  // @ts-ignore
  compoundVariants,
  // @ts-ignore
  defaultVariants
})

export type Props = VariantProps<typeof index>
export default index
