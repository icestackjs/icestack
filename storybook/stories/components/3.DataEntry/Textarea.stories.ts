import type { StoryObj, Meta } from '@storybook/html'
import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'
import { expands, formatHtml, sizePrefix, typePrefix } from '../share'

type Props = VariantProps<typeof com> & { disabled?: boolean; placeholder?: string }

const prefix = 'textarea'

const types = typePrefix(prefix)

const sizes = sizePrefix(prefix)

const com = cva([prefix], {
  variants: {
    type: expands(types),
    size: expands(sizes),
    bordered: {
      true: prefix + '-bordered'
    },
    ghost: {
      true: prefix + '-ghost'
    }
  },
  defaultVariants: {}
})

const create = (props: Props) => {
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
    disabled: { control: 'boolean' }
  }
}

type Story = StoryObj<Props>

export const Default: Story = {
  args: {}
}

export default meta
