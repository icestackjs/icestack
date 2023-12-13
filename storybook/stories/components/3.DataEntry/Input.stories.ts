import type { StoryObj, Meta } from '@storybook/html'
import type { VariantProps } from 'class-variance-authority'
import { formatHtml } from '../share'
import Cva from '../style'
type Props = VariantProps<typeof com> & { placeholder?: string }

// const allTypes = typePrefix('alert')

const types = Cva.input.types

const com = Cva.input.cva

const create = (props: Props) => {
  return formatHtml(`<input type="text" placeholder="${props.placeholder ?? ''}" class="${com(props)} w-full max-w-xs" />`)
}

const meta: Meta<Props> = {
  title: 'Data Entry/Input',
  tags: ['autodocs'],
  render: (args) => {
    return create(args)
  },
  args: {
    placeholder: 'Type here'
  },
  argTypes: {
    placeholder: {
      control: { type: 'text' }
    },
    bordered: { control: 'boolean' },
    ghost: { control: 'boolean' },
    // checked: { control: 'boolean' },
    // disabled: { control: 'boolean' },
    // size: { control: 'inline-radio', options: sizes },
    type: { control: 'inline-radio', options: types }
  }
}

type Story = StoryObj<Props>

export const Default: Story = {
  args: {}
}

export const Types: Story = {
  args: {
    placeholder: 'Type here'
  },
  render: (args) => {
    return `<div class="flex flex-col space-y-3">${types
      .map((x) => {
        return create({
          ...args,
          type: x
        })
      })
      .join('')}</div>`
  }
}

export const Borderd: Story = {
  args: {
    placeholder: 'Type here',
    bordered: true
  }
}

export default meta
