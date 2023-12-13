import type { StoryObj, Meta } from '@storybook/html'
import type { VariantProps } from 'class-variance-authority'
import { formatHtml } from '../share'
import Cva from '../style'
type Props = VariantProps<typeof com> & { value: number; indeterminate?: boolean }

const types = Cva.progress.types

// const sizes = sizePrefix(prefix)

const com = Cva.progress.cva

const create = (props: Props) => {
  const s = props.indeterminate ? '' : `value="${props.value ?? 40}" max="100"`
  return formatHtml(`<progress class="${com(props)} w-56" ${s}></progress>`)
}

const meta: Meta<Props> = {
  title: 'Data Display/Progress',
  tags: ['autodocs'],
  render: (args) => {
    return create(args)
  },
  args: {
    value: 40
  },
  argTypes: {
    type: { control: 'inline-radio', options: types },
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } }
    // indeterminate: { control: 'boolean' }
  }
}

type Story = StoryObj<Props>

export const Default: Story = {
  args: {}
}

export default meta
