import type { StoryObj, Meta } from '@storybook/html'
import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'
import { expands, formatHtml, typePrefix, sizePrefix } from '../share'

type Props = VariantProps<typeof com> & { checked?: boolean; disabled?: boolean }

const prefix = 'radio'

const types = typePrefix(prefix)

const sizes = sizePrefix(prefix)

const com = cva([prefix], {
  variants: {
    type: expands(types),
    size: expands(sizes)
  },
  defaultVariants: {}
})

const create = (props: Props) => {
  return formatHtml(`<input type="radio" name="radio-0" class="${com(props)}" ${props.checked ? 'checked' : ''} ${props.disabled ? 'disabled' : ''} />`)
}

const meta: Meta<Props> = {
  title: 'Data Entry/Radio',
  tags: ['autodocs'],
  render: (args) => {
    return [
      create({
        ...args,
        checked: true
      }),
      create(args),
      create(args)
    ].join('')
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
  render: () => {
    return `<div class="form-control">
    <label class="label cursor-pointer">
      <span class="label-text">Red pill</span> 
      <input type="radio" name="radio-10" class="radio checked:bg-red-500" checked />
    </label>
  </div>
  <div class="form-control">
    <label class="label cursor-pointer">
      <span class="label-text">Blue pill</span> 
      <input type="radio" name="radio-10" class="radio checked:bg-blue-500" checked />
    </label>
  </div>`
  }
}

export default meta
