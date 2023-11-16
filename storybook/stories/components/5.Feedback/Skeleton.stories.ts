import type { StoryObj, Meta } from '@storybook/html'
import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'
import { expands, addPrefix, formatHtml } from '../share'

type SkeletonProps = VariantProps<typeof skeleton>

const shapes = addPrefix('skeleton', ['title', 'paragraph', 'avatar'])

const skeleton = cva(['skeleton'], {
  variants: {
    shape: expands(shapes)
  }
})

const createSkeleton = (props: SkeletonProps) => {
  return `<div class="${skeleton(props)}"></div>`
}

const meta: Meta<SkeletonProps> = {
  // id: 'Skeleton',
  title: 'Feedback/Skeleton',
  tags: ['autodocs'],
  render: (args) => {
    return createSkeleton(args)
  },
  args: {
    shape: 'skeleton-title'
  },
  argTypes: {
    shape: {
      options: shapes,
      control: { type: 'inline-radio' }
    }
  }
}

type Story = StoryObj<SkeletonProps>

export const Default: Story = {
  args: {},
  render() {
    const div = document.createElement('div')
    div.innerHTML = formatHtml(`<div class="flex">
    <div class="skeleton skeleton-avatar mr-2"></div>
    <div class="space-y-2 flex-1">
    <div class="skeleton skeleton-title"></div>
    <div class="skeleton skeleton-paragraph"></div>
    <div class="skeleton skeleton-paragraph"></div>
    <div class="skeleton skeleton-paragraph"></div>
    <div class="skeleton skeleton-paragraph"></div>
    </div>
    </div>`)
    return div
  }
}

export const Single: Story = {
  args: {}
}

export default meta
