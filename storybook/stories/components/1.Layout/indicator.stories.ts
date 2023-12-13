import type { StoryObj, Meta } from '@storybook/html'
import type { VariantProps } from 'class-variance-authority'
import { formatHtml } from '../share'
import Cva from '../style'
type Props = VariantProps<typeof Cva.indicator.cva.child> & VariantProps<typeof Cva.indicator.cva.parent> & { textContent?: string }

const create = (props: Props) => {
  const child = Cva.indicator.cva.child(props)
  const parent = Cva.indicator.cva.parent()

  return formatHtml(`<div class="${parent}">
  <span class="${child} badge badge-primary">${props.textContent}</span> 
  <div class="grid w-32 h-32 bg-sky-300 place-items-center">content</div>
</div>`)
}

const meta: Meta<Props> = {
  title: 'Layout/Indicator',
  tags: ['autodocs'],
  args: {
    textContent: ''
  },
  render: (args) => {
    return create(args)
  },
  argTypes: {
    position: {
      options: Cva.indicator.positions,
      control: { type: 'inline-radio' }
    }
  }
}

type Story = StoryObj<Props>

export const Default: Story = {
  args: {}
}

export const Types: Story = {
  args: {},
  render: (args) => {
    return formatHtml(create(args))
  }
}

export default meta
