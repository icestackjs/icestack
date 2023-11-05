import type { StoryObj, Meta } from '@storybook/html'
import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'
import { expands, formatHtml, typePrefix } from '../share'

type Props = VariantProps<typeof com> & { value: number; indeterminate?: boolean }

const prefix = 'progress'

const types = typePrefix(prefix)

// const sizes = sizePrefix(prefix)

const com = cva([prefix], {
  variants: {
    type: expands(types)
  },
  defaultVariants: {}
})

const create = (props: Props) => {
  const s = props.indeterminate ? '' : `value="${props.value ?? 40}" max="100"`
  return formatHtml(`<progress class="${com(props)} w-56" ${s}></progress>`)
}
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const s = ['progress-primary', 'progress-neutral', 'progress-success', 'progress-warning', 'progress-error']

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
