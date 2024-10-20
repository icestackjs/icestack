import type { Meta, StoryObj } from '@storybook/html'
import type { VariantProps } from 'class-variance-authority'
import { formatHtml } from '../share'
import Cva from '../style'

type Props = VariantProps<typeof com>

const types = Cva.range.types

const sizes = Cva.range.sizes

const com = Cva.range.cva

function create(props: Props) {
  return formatHtml(`<input type="range" min="0" max="100" value="40" class="${com(props)}" />`)
}

const meta: Meta<Props> = {
  title: 'Data Entry/Range',
  tags: ['autodocs'],
  render: (args) => {
    return create(args)
  },
  argTypes: {
    size: { control: 'inline-radio', options: sizes },
    type: { control: 'inline-radio', options: types },
  },
}

type Story = StoryObj<Props>

export const Default: Story = {
  args: {},
}

export default meta
