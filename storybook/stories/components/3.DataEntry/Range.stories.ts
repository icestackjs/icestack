import type { StoryObj, Meta } from '@storybook/html'
import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'
import { expands, formatHtml, sizePrefix, typePrefix } from '../share'

type Props = VariantProps<typeof com>

const prefix = 'range'

const types = typePrefix(prefix)

const sizes = sizePrefix(prefix)

const com = cva([prefix], {
  variants: {
    type: expands(types),
    size: expands(sizes)
  },
  defaultVariants: {}
})

const create = (props: Props) => {
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
    type: { control: 'inline-radio', options: types }
  }
}

type Story = StoryObj<Props>

export const Default: Story = {
  args: {}
}

export default meta
