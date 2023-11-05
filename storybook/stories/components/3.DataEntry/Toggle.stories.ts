import type { StoryObj, Meta } from '@storybook/html'
import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'
import { expands, formatHtml, sizePrefix, typePrefix } from '../share'

type Props = VariantProps<typeof com> & { disabled?: boolean; placeholder?: string; checked?: boolean }

const prefix = 'toggle'

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
  return formatHtml(`<input type="checkbox" class="${com(props)}" ${props.disabled ? 'disabled' : ''} ${props.checked ? 'checked' : ''} />`)
}

const meta: Meta<Props> = {
  title: 'Data Entry/Toggle',
  tags: ['autodocs'],
  render: (args) => {
    return create(args)
  },
  argTypes: {
    size: { control: 'inline-radio', options: sizes },
    type: { control: 'inline-radio', options: types },
    disabled: { control: 'boolean' },
    checked: { control: 'boolean' }
  }
}

type Story = StoryObj<Props>

export const Default: Story = {
  args: {}
}

export default meta
