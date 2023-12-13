import type { StoryObj, Meta } from '@storybook/html'
import type { VariantProps } from 'class-variance-authority'
import { formatHtml } from '../share'
import Cva from '../style'

type Props = VariantProps<typeof link> & { textContent?: string }

const types = Cva.link.types

const link = Cva.link.cva

const create = (props: Props) => {
  return formatHtml(`<a class="${link(props)}">${props.textContent}</a>`)
}

const meta: Meta<Props> = {
  title: 'Navigation/Link',
  tags: ['autodocs'],
  args: {
    textContent: 'GitHub Actions – Enforcing'
  },
  render: (args) => {
    return create(args)
  },
  argTypes: {}
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

export const Hover: Story = {
  args: {
    hover: true
  }
}

export default meta
