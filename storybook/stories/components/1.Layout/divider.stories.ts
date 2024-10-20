import type { Meta, StoryObj } from '@storybook/html'
import type { VariantProps } from 'class-variance-authority'
import { formatHtml } from '../share'
import Cva from '../style'

type Props = VariantProps<typeof Cva.divider.cva> & { textContent?: string }

function create(props: Props) {
  const className = Cva.divider.cva(props)
  const f = props.position?.includes('horizontal')
  return formatHtml(`<div class="flex ${f ? '' : 'flex-col'} w-full border-opacity-50">
  <div class="grid h-32 flex-grow card bg-base-300 rounded-box place-items-center">content</div>
  <div class="${className}">OR</div>
  <div class="grid h-32 flex-grow card bg-base-300 rounded-box place-items-center">content</div>
</div>`)
}

const meta: Meta<Props> = {
  title: 'Layout/Divider',
  tags: ['autodocs'],
  args: {
    textContent: '',
  },
  render: (args) => {
    return create(args)
  },
  argTypes: {
    position: {
      options: Cva.divider.positions,
      control: { type: 'inline-radio' },
    },
    type: {
      options: Cva.divider.types,
      control: { type: 'inline-radio' },
    },
  },
}

type Story = StoryObj<Props>

export const Default: Story = {
  args: {},
}

export const Types: Story = {
  args: {},
  render: (args) => {
    return formatHtml(create(args))
  },
}

export default meta
