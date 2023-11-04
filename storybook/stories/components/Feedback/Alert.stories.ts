import type { StoryObj, Meta } from '@storybook/html'
import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'
import { expands, typePrefix } from '../share'

type AlertProps = VariantProps<typeof alert> & { textContent?: string }

const allTypes = typePrefix('alert')

const alert = cva(['alert'], {
  variants: {
    type: expands(allTypes)
  },
  defaultVariants: {}
})

const createAlert = (props: AlertProps) => {
  const div = document.createElement('div')
  div.className = alert(props)
  const icon = document.createElement('i')
  icon.className = 'i-mdi-information-outline w-6 h-6'
  div.append(icon)
  const span = document.createElement('span')
  span.textContent = 'Hello world!'
  div.append(span)
  return div
}

const meta: Meta<AlertProps> = {
  // id: 'css/alert',
  title: 'Css/Feedback/Alert',
  tags: ['autodocs'],
  render: (args) => {
    return createAlert(args)
  },
  argTypes: {
    type: {
      options: allTypes,
      control: { type: 'inline-radio' }
    }
  }
}

type Story = StoryObj<AlertProps>

export const Default: Story = {
  args: {}
}

export default meta
