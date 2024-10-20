import type { Meta, StoryObj } from '@storybook/html'
import type { VariantProps } from 'class-variance-authority'
import { formatHtml } from '../share'
import Cva from '../style'

type Props = VariantProps<typeof Cva.tab.cva.parent> & VariantProps<typeof Cva.tab.cva.child> & { textContent?: string }

function create(props: Props) {
  const parent = Cva.tab.cva.parent(props)
  const child = Cva.tab.cva.child(props)
  return formatHtml(`<div role="tablist" class="${parent}">
  <a role="tab" class="${child}">Tab 1</a>
  <a role="tab" class="${child} tab-active">Tab 2</a>
  <a role="tab" class="${child}">Tab 3</a>
</div>`)
}

const meta: Meta<Props> = {
  title: 'Navigation/Tab',
  tags: ['autodocs'],
  args: {},
  render: (args) => {
    return create(args)
  },
  argTypes: {
    shape: {
      options: Cva.tab.shapes,
      control: { type: 'inline-radio' },
    },
    size: {
      options: Cva.tab.sizes,
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
    const strs: string[] = []
    for (const type of types) {
      strs.push(
        create({
          type,
          ...args,
        }),
      )
    }
    return formatHtml(`<div class="grid grid-cols-3 gap-4">${strs.join('')}</div>`)
  },
}

export default meta
