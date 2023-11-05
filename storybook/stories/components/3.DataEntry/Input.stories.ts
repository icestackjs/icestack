import type { StoryObj, Meta } from '@storybook/html'
import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'
import { expands, formatHtml, sizePrefix, typePrefix } from '../share'

type Props = VariantProps<typeof com> & { placeholder?: string }

// const allTypes = typePrefix('alert')
const className = 'input'

const types = typePrefix(className)

const sizes = sizePrefix(className)

const com = cva([className, 'w-full', 'max-w-xs'], {
  variants: {
    type: expands(types),
    size: expands(sizes),
    bordered: {
      true: 'input-bordered'
    },
    ghost: {
      true: 'input-ghost'
    }
  },
  defaultVariants: {}
})

const create = (props: Props) => {
  return formatHtml(`<input type="text" placeholder="${props.placeholder ?? ''}" class="${com(props)}" />`)
}

const meta: Meta<Props> = {
  title: 'Data Entry/Input',
  tags: ['autodocs'],
  render: (args) => {
    return create(args)
  },
  args: {
    placeholder: 'Type here'
  },
  argTypes: {}
}

type Story = StoryObj<Props>

export const Default: Story = {
  args: {}
}

export const Types: Story = {
  args: {
    placeholder: 'Type here'
  },
  render: (args) => {
    return `<div class="flex flex-col space-y-3">${types
      .map((x) => {
        return create({
          ...args,
          type: x
        })
      })
      .join('')}</div>`
  }
}

export const Borderd: Story = {
  args: {
    placeholder: 'Type here',
    bordered: true
  }
}

export default meta
