import type { StoryObj, Meta } from '@storybook/html'
import { AvatarProps, createAvatar } from './Avatar'

const meta: Meta<AvatarProps> = {
  title: 'Css/Avatar',
  tags: ['autodocs'],
  render: (args) => {
    return createAvatar(args)
  },
  argTypes: {}
}

type Story = StoryObj<AvatarProps>

export const Default: Story = {
  args: {}
}

export const Sizes: Story = {
  args: {},
  render: (args) => {
    const div = document.createElement('div')

    div.append(
      createAvatar({
        wrapperClassName: 'w-32 rounded'
      }),
      createAvatar({
        wrapperClassName: 'w-16 rounded'
      }),
      createAvatar({
        wrapperClassName: 'w-8 rounded'
      })
    )
    div.className = 'space-x-2'
    return div
  }
}

export default meta
