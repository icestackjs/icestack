import type { Meta, StoryObj } from '@storybook/html'
import type { VariantProps } from 'class-variance-authority'
import { formatHtml } from '../share'
import Cva from '../style'

type Props = VariantProps<typeof com> & { disabled?: boolean, checked?: boolean }

const types = Cva.checkbox.types

const sizes = Cva.checkbox.sizes

const com = Cva.checkbox.cva

function create(props: Props) {
  return formatHtml(`<input type="checkbox" class="${com(props)}" ${props.disabled ? 'disabled' : ''} ${props.checked ? 'checked' : ''}  />`)
}

const meta: Meta<Props> = {
  title: 'Data Entry/Checkbox',
  tags: ['autodocs'],
  render: (args) => {
    return create(args)
  },
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    size: { control: 'inline-radio', options: sizes },
    type: { control: 'inline-radio', options: types },
  },
}

type Story = StoryObj<Props>

export const Default: Story = {
  args: {},
}

export const Form: Story = {
  args: {},
  render: (args) => {
    return `<div class="form-control w-64">
    <label class="cursor-pointer label">
      <span class="label-text">Remember me</span>
      ${create(args)}
    </label>
  </div>`
  },
}

export default meta
