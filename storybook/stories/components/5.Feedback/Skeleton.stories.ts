import type { StoryObj, Meta } from '@storybook/html'
import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'
import { expands, typePrefix } from '../share'

type SkeletonProps = VariantProps<typeof Skeleton> & { textContent?: string }

const allTypes = typePrefix('Skeleton')

const skeleton = cva(['skeleton'], {
  // variants: {
  //   type: expands(allTypes)
  // },
  // defaultVariants: {},
  shape: {
    type: []
  }
})

const createSkeleton = (props: SkeletonProps) => {
  const div = document.createElement('div')
  div.innerHTML = `<div class="${skeleton(props)}"></div>`
  return div
}

const meta: Meta<SkeletonProps> = {
  // id: 'Skeleton',
  title: 'Feedback/Skeleton',
  tags: ['autodocs'],
  render: (args) => {
    return createSkeleton(args)
  },
  argTypes: {
    // type: {
    //   options: allTypes,
    //   control: { type: 'inline-radio' }
    // }
  }
}

type Story = StoryObj<SkeletonProps>

export const Default: Story = {
  args: {}
}

export default meta
