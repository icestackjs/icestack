import type { StoryObj, Meta } from '@storybook/html'
import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'
import { expands, formatHtml, typePrefix, sizePrefix } from '../share'

type Props = VariantProps<typeof com> & { disabled?: boolean; checked?: boolean }

const className = 'checkbox'

const types = typePrefix(className)

const sizes = sizePrefix(className)

const com = cva([className], {
  variants: {
    type: expands(types),
    size: expands(sizes)
  },
  defaultVariants: {}
})

const create = (props: Props) => {
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
    type: { control: 'inline-radio', options: types }
  }
}

type Story = StoryObj<Props>

export const Default: Story = {
  args: {}
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
  }
}

export default meta
