import type { StoryObj, Meta } from '@storybook/html'
import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'
import { expands, formatHtml, sizePrefix, typePrefix } from '../share'

type Props = VariantProps<typeof com> & { disabled?: boolean }

const prefix = 'select'

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
  return formatHtml(`<select class="${com(props)} w-full max-w-xs" ${props.disabled ? 'disabled' : ''}>
  <option disabled selected>Pick your favorite Simpson</option>
  <option>Homer</option>
  <option>Marge</option>
  <option>Bart</option>
  <option>Lisa</option>
  <option>Maggie</option>
</select>`)
}

const meta: Meta<Props> = {
  title: 'Data Entry/Select',
  tags: ['autodocs'],
  render: (args) => {
    return create(args)
  },
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
