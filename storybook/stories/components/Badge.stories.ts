import { Meta, StoryObj } from '@storybook/html'
import { VariantProps, cva } from 'class-variance-authority'
import { expands, formatHtml, typePrefix, sizePrefix } from './share'

type BadgeProps = VariantProps<typeof badge> & { textContent?: string }

const allTypes = typePrefix('badge')
const allSizes = sizePrefix('badge')

const badge = cva(['badge'], {
  variants: {
    type: expands(allTypes),
    outline: {
      true: 'badge-outline',
      false: ''
    },
    size: expands(allSizes)
  },
  defaultVariants: {}
})

const create = (props: BadgeProps) => {
  return formatHtml(`<div class="${badge(props)}">
  ${props.textContent ?? 'Badge'}
    </div>`)
}

const meta: Meta<BadgeProps> = {
  title: 'Css/Badge',
  tags: ['autodocs'],
  render: (args) => {
    return create(args)
  },
  argTypes: {
    type: {
      options: allTypes,
      control: { type: 'inline-radio' }
    },
    outline: {
      description: 'badge-outline',
      control: { type: 'boolean' }
    },
    size: {
      description: '',
      options: allSizes,
      control: { type: 'inline-radio' },
      type: 'string'
      // defaultValue: 'btn-md'
    },
    textContent: {
      control: { type: 'text' },
      defaultValue: 'Button'
    }
  }
}

type Story = StoryObj<BadgeProps>

export const Default: Story = {
  args: {}
}

export default meta
