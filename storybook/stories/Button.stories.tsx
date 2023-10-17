import type { StoryObj, Meta } from '@storybook/html'
import type { ButtonProps } from './Button'
import { createButton, allTypes, allSizes, allShapes } from './Button'

const meta: Meta<ButtonProps> = {
  title: 'Css/Button',
  tags: ['autodocs'],
  render: (args) => {
    return createButton(args)
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
      // defaultValue: {}
    },
    textContent: {
      control: { type: 'text' }
      // defaultValue: 'Button'
    },
    size: {
      description: 'default: btn-md',
      options: allSizes,
      control: { type: 'inline-radio' },
      type: 'string'
      // defaultValue: 'btn-md'
    },
    glass: {
      description: 'glass',
      // options: ['btn-outline', 'default'],
      control: { type: 'boolean' }
      // defaultValue: 'default'
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
    div.className = 'space-x-2'
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
