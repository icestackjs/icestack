import { type StoryObj, type Meta } from '@storybook/html'
import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'
import Pig from '../../assets/image/pig.jpg'
import { formatHtml } from '../share'

type AvatarProps = VariantProps<typeof avatar> & { textContent?: string; wrapperClassName?: string }

// export const allTypes = typePrefix('avatar-')

const avatar = cva(['avatar'], {
  variants: {},
  defaultVariants: {}
})

const createAvatar = (props: AvatarProps) => {
  return formatHtml(`<div class="${avatar(props)}">
  <div class="${props.wrapperClassName ?? 'w-24 rounded'}">
  <img src="${Pig}"/></div>
    </div>`)
}
const meta: Meta<AvatarProps> = {
  title: 'Css/Data Display/Avatar',
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
