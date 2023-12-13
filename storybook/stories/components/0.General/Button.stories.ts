import type { StoryObj, Meta } from '@storybook/html'
import type { VariantProps } from '@icestack/cva'
import Cva from '../style'
type ButtonProps = VariantProps<typeof button> & { textContent?: string }

// ['primary', 'neutral', 'success', 'warning', 'error']

const allTypes = Cva.button.types

const allSizes = Cva.button.sizes

const allShapes = Cva.button.shapes

const button = Cva.button.cva

const createButton = (props: ButtonProps) => {
  const btn = document.createElement('button')
  btn.textContent = props.textContent ?? 'Button'
  btn.className = button(props)
  return btn
}

const meta: Meta<ButtonProps> = {
  title: 'General/Button',
  tags: ['autodocs'],
  render: (args) => {
    return createButton(args)
  },
  args: {
    textContent: 'Button'
  },
  argTypes: {
    type: {
      options: allTypes,
      control: { type: 'inline-radio' }
    },
    outline: {
      description: 'btn-outline',
      // options: ['btn-outline', 'default'],
      control: { type: 'boolean' }
    },
    textContent: {
      control: { type: 'text' }
    },
    size: {
      description: 'default: btn-md',
      options: allSizes,
      control: { type: 'inline-radio' },
      type: 'string'
    },
    glass: {
      description: 'glass',
      // options: ['btn-outline', 'default'],
      control: { type: 'boolean' }
    },
    disabled: {
      description: 'btn-disabled',
      control: { type: 'boolean' }
    },
    shape: {
      options: allShapes,
      control: { type: 'inline-radio' }
    }
    // block: {
    //   description: 'btn-block',
    //   control: { type: 'boolean' }
    // }
  }
}

export default meta
type Story = StoryObj<ButtonProps>

export const Default: Story = {
  args: {}
}

export const Type: Story = {
  render(args) {
    const div = document.createElement('div')
    div.className = 'space-x-2'
    for (const btn of allTypes.map((type) =>
      createButton({
        ...args,
        type,
        textContent: type
      })
    )) {
      div.append(btn)
    }

    return div
  },
  args: {}
}

export const Size: Story = {
  render(args) {
    const div = document.createElement('div')
    div.className = 'space-x-2 space-y-1'
    for (const btn of allSizes.map((size) =>
      createButton({
        ...args,
        size,
        textContent: size
      })
    )) {
      div.append(btn)
    }

    return div
  },
  args: {}
}
