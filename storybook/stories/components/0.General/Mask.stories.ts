import type { StoryObj, Meta } from '@storybook/html'
import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'
import { expands, formatHtml, addPrefix } from '../share'
import Panda from '../../assets/image/panda.jpg'
type Props = VariantProps<typeof C>

const shapes = addPrefix('mask', [
  'squircle',
  'heart',
  'hexagon',
  'hexagon-2',
  'decagon',
  'pentagon',
  'diamond',
  'square',
  'circle',
  'parallelogram',
  'parallelogram-2',
  'parallelogram-3',
  'parallelogram-4',
  'star',
  'star-2',
  'triangle',
  'triangle-2',
  'triangle-3',
  'triangle-4'
])

const C = cva(['mask'], {
  variants: {
    shape: expands(shapes)
  },
  defaultVariants: {}
})

const create = (props: Props) => {
  return formatHtml(`<img class="${C(props)} w-20" src="${Panda}" />`)
}

const meta: Meta<Props> = {
  title: 'General/Mask',
  tags: ['autodocs'],
  render: (props) => {
    return create(props)
  },
  argTypes: {}
}

type Story = StoryObj<Props>

export const Default: Story = {
  args: {},
  render: () => {
    const strs: string[] = []
    for (const shape of shapes) {
      strs.push(
        create({
          shape
        })
      )
    }
    return formatHtml(`<div class="grid grid-cols-6 gap-4">${strs.join('')}</div>`)
  }
}

export default meta
