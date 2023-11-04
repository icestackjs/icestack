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

const create = (props: AlertProps) => {
  return formatHtml(`<div class="chat chat-start">
  <div class="chat-bubble">It's over Anakin, <br/>I have the high ground.</div>
</div>
<div class="chat chat-end">
  <div class="chat-bubble">You underestimate my power!</div>
</div>`)
}

const meta: Meta<object> = {
  // id: 'alert',
  title: 'Data Display/Chat',
  tags: ['autodocs'],
  render: (args) => {
    return create(args)
  },
  argTypes: {
    // type: {
    //   options: allTypes,
    //   control: { type: 'inline-radio' }
    // }
  }
}

type Story = StoryObj<object>

export const Default: Story = {
  args: {}
}

export default meta
