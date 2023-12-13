import type { StoryObj, Meta } from '@storybook/html'
import type { VariantProps } from 'class-variance-authority'
import { formatHtml } from '../share'
import Cva from '../style'
type Props = VariantProps<typeof com> & { disabled?: boolean }

const types = Cva.select.types

const sizes = Cva.select.sizes

const com = Cva.select.cva

const create = (props: Props) => {
  return formatHtml(`<select class="${com(props)} w-full max-w-xs" ${props.disabled ? 'disabled' : ''}>
  <option disabled selected>Pick your favorite Simpson</option>
  <option>Homer</option>
  <option>Marge</option>
  <option>Bart</option>
  <option>Lisa</option>
  <option>Maggie</option>
</select>`)
}

const meta: Meta<Props> = {
  title: 'Data Entry/Select',
  tags: ['autodocs'],
  render: (args) => {
    return create(args)
  },
  argTypes: {
    size: { control: 'inline-radio', options: sizes },
    type: { control: 'inline-radio', options: types },
    bordered: { control: 'boolean' },
    ghost: { control: 'boolean' },
    disabled: { control: 'boolean' }
  }
}

type Story = StoryObj<Props>

export const Default: Story = {
  args: {}
}

export default meta
