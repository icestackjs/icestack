import { type StoryObj, type Meta, HtmlRenderer } from '@storybook/html'
import { AvatarProps, createAvatar } from './Avatar'
import { formatHtml } from './share'
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
    return formatHtml(`<div class="space-x-2">
    ${[
      createAvatar({
        wrapperClassName: 'w-32 rounded'
      }),
      createAvatar({
        wrapperClassName: 'w-16 rounded'
      }),
      createAvatar({
        wrapperClassName: 'w-8 rounded'
      })
    ].join('\n')}
    </div>`)
  }
}

export default meta
