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
  return formatHtml(`<div class="chat chat-start">
  <div class="chat-bubble">It's over Anakin, <br/>I have the high ground.</div>
</div>
<div class="chat chat-end">
  <div class="chat-bubble">You underestimate my power!</div>
</div>`)
}

const meta: Meta<object> = {
  title: 'Data Entry/Toggle',
  tags: ['autodocs'],
  render: () => {
    return create()
  },
  argTypes: {}
}

type Story = StoryObj<object>

export const Default: Story = {
  args: {},
  render: () => {
    return formatHtml(`<input type="checkbox" checked="checked" class="checkbox" />`)
  }
}

export default meta
