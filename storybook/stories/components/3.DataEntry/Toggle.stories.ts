import type { StoryObj, Meta } from '@storybook/html'
import type { VariantProps } from 'class-variance-authority'
import { formatHtml } from '../share'
import Cva from '../style'
type Props = VariantProps<typeof com> & { disabled?: boolean; placeholder?: string; checked?: boolean }

const types = Cva.toggle.types

const sizes = Cva.toggle.sizes

const com = Cva.toggle.cva

const create = (props: Props) => {
  return formatHtml(`<input type="checkbox" class="${com(props)}" ${props.disabled ? 'disabled' : ''} ${props.checked ? 'checked' : ''} />`)
}

const meta: Meta<Props> = {
  title: 'Data Entry/Toggle',
  tags: ['autodocs'],
  render: (args) => {
    return create(args)
  },
  args: {
    checked: true
  },
  argTypes: {
    size: { control: 'inline-radio', options: sizes },
    type: { control: 'inline-radio', options: types },
    disabled: { control: 'boolean' },
    checked: { control: 'boolean' }
  }
}

type Story = StoryObj<Props>

export const Default: Story = {
  args: {}
}

export default meta
