import type { StoryObj, Meta } from '@storybook/html'
import { AlertProps, createAlert, allTypes } from './Alert'

const meta: Meta<AlertProps> = {
  title: 'Css/Alert',
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
