import type { Meta, StoryObj } from '@storybook/html'
import { formatHtml } from '../share'

interface Props { textContent?: string }

function create() {
  return formatHtml(`<div class="stack">
  <div class="grid w-32 h-20 rounded bg-sky-500 place-content-center">1</div> 
  <div class="grid w-32 h-20 rounded bg-yellow-400 place-content-center">2</div> 
  <div class="grid w-32 h-20 rounded bg-red-400 place-content-center">3</div>
</div>`)
}

const meta: Meta<Props> = {
  title: 'Layout/Stack',
  tags: ['autodocs'],
  args: {
    textContent: '',
  },
  render: () => {
    return create()
  },
  argTypes: {},
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
