import type { Meta, StoryObj } from '@storybook/html'
import type { VariantProps } from 'class-variance-authority'
import { formatHtml } from '../share'
import Cva from '../style'

type Props = VariantProps<typeof com> & { disabled?: boolean, placeholder?: string }

const types = Cva.textarea.types

const sizes = Cva.textarea.sizes

const com = Cva.textarea.cva

function create(props: Props) {
  return formatHtml(`<textarea class="${com(props)}" placeholder="Bio" ${props.disabled ? 'disabled' : ''}></textarea>`)
}

const meta: Meta<Props> = {
  title: 'Data Entry/Textarea',
  tags: ['autodocs'],
  render: (props) => {
    return create(props)
  },
  args: {},
  argTypes: {
    size: { control: 'inline-radio', options: sizes },
    type: { control: 'inline-radio', options: types },
    bordered: { control: 'boolean' },
    ghost: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
}

type Story = StoryObj<Props>

export const Default: Story = {
  args: {},
}

export default meta
