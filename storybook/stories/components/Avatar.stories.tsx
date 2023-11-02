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

export default meta
