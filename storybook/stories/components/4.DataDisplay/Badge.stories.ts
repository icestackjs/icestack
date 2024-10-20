import type { Meta, StoryObj } from '@storybook/html'
import type { VariantProps } from 'class-variance-authority'
import { formatHtml } from '../share'
import Cva from '../style'

type BadgeProps = VariantProps<typeof badge> & { textContent?: string }

const allTypes = Cva.badge.types
const allSizes = Cva.badge.sizes

const badge = Cva.badge.cva

function create(props: BadgeProps) {
  return formatHtml(`<div class="${badge(props)}">
  ${props.textContent ?? 'Badge'}
    </div>`)
}

const meta: Meta<BadgeProps> = {
  title: 'Data Display/Badge',
  tags: ['autodocs'],
  render: (args) => {
    return create(args)
  },
  args: {
    textContent: 'Badge',
  },
  argTypes: {
    type: {
      options: allTypes,
      control: { type: 'inline-radio' },
    },
    outline: {
      description: 'badge-outline',
      control: { type: 'boolean' },
    },
    size: {
      description: '',
      options: allSizes,
      control: { type: 'inline-radio' },
      type: 'string',
    },
    textContent: {
      control: { type: 'text' },
    },
  },
}

type Story = StoryObj<BadgeProps>

export const Default: Story = {
  args: {},
}

export default meta
