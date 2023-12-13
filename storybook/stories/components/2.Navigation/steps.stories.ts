import type { StoryObj, Meta } from '@storybook/html'
import type { VariantProps } from 'class-variance-authority'
import { formatHtml } from '../share'
import Cva from '../style'

type Props = VariantProps<typeof Cva.steps.cva.parent> & VariantProps<typeof Cva.steps.cva.child> & { textContent?: string }

// const types = Cva.steps.types

// const positions = Cva.steps.positions

const create = (props: Props) => {
  const parent = Cva.steps.cva.parent(props)
  const child = Cva.steps.cva.child(props)
  return formatHtml(`<ul class="${parent}">
  <li class="${child} step-primary">Register</li>
  <li class="${child} step-primary">Choose plan</li>
  <li class="${child}">Purchase</li>
  <li class="${child}">Receive Product</li>
</ul>`)
}

const meta: Meta<Props> = {
  title: 'Navigation/Steps',
  tags: ['autodocs'],
  args: {},
  render: (args) => {
    return create(args)
  },
  argTypes: {
    position: {
      options: Cva.steps.positions,
      control: { type: 'inline-radio' }
    },
    type: {
      options: Cva.steps.types,
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
    const strs: string[] = []
    for (const type of types) {
      strs.push(
        create({
          type,
          ...args
        })
      )
    }
    return formatHtml(`<div class="grid grid-cols-3 gap-4">${strs.join('')}</div>`)
  }
}

export default meta
