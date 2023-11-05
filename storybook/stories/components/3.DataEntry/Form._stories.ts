import type { StoryObj, Meta } from '@storybook/html'
import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'
import { expands, formatHtml, typePrefix } from '../share'

// type AlertProps = VariantProps<typeof alert> & { textContent?: string }

// const allTypes = typePrefix('alert')

// const alert = cva(['alert'], {
//   variants: {
//     type: expands(allTypes)
//   },
//   defaultVariants: {}
// })

const create = () => {
  return formatHtml(`<div class="form-control w-64">
  <label class="cursor-pointer label">
    <span class="label-text">Remember me</span>
    <span class="label-text">Remember me</span>
  </label>
</div>`)
}

const meta: Meta<object> = {
  title: 'Data Entry/Form',
  tags: ['autodocs'],
  render: () => {
    return create()
  },
  argTypes: {},
  parameters: {}
}

type Story = StoryObj<object>

export const Default: Story = {
  args: {},
  render: () => {
    return formatHtml(`<input type="checkbox" checked="checked" class="checkbox" />`)
  }
}

export default meta
