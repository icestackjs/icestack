import { Meta, StoryObj } from '@storybook/html'
import { VariantProps } from 'class-variance-authority'
import { formatHtml } from '../share'
import Cva from '../style'
type Props = { textContent?: string }

const create = (props: Props) => {
  return formatHtml(`<div tabindex="0" class="collapse bg-base-200"> 
  <div class="collapse-title text-xl font-medium">
    Focus me to see content
  </div>
  <div class="collapse-content"> 
    <p>tabindex="0" attribute is necessary to make the div focusable</p>
  </div>
</div>`)
}

const meta: Meta<Props> = {
  title: 'Data Display/Collapse',
  tags: ['autodocs'],
  render: (args) => {
    return create(args)
  },
  args: {
    textContent: 'Collapse'
  },
  argTypes: {
    textContent: {
      control: { type: 'text' }
    }
  }
}

type Story = StoryObj<Props>

export const Default: Story = {
  args: {},
  render() {
    return `<div tabindex="0" class="collapse bg-base-200"> 
    <div class="collapse-title text-xl font-medium">
      Focus me to see content
    </div>
    <div class="collapse-content"> 
      <p>tabindex="0" attribute is necessary to make the div focusable</p>
    </div>
  </div>`
  }
}

export const WithCheckbox: Story = {
  args: {},
  render() {
    return `<div class="collapse bg-base-200">
    <input type="checkbox" /> 
    <div class="collapse-title text-xl font-medium">
      Click me to show/hide content
    </div>
    <div class="collapse-content"> 
      <p>hello</p>
    </div>
  </div>`
  }
}

export default meta
