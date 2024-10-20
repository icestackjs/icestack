import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

const index = cva(['com'], {
  variants: {
    type: {
      p: ['com-p'],
      z: ['com-z'],
    },
    size: {
      md: ['com-md'],
      xs: ['com-xs'],
    },
  },
  compoundVariants: [{
    class: ['com-pointer'],
    type: ['p'],
    size: ['xs'],
  }, {
    class: ['com-disabled'],
    type: ['p'],
    size: ['md'],
  }],
  defaultVariants: {
    type: 'p',
    size: 'xs',
  },
})
export type Props = VariantProps<typeof index>
export default index
