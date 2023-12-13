import type { StoryObj, Meta } from '@storybook/html'

import type { VariantProps } from 'class-variance-authority'
import { formatHtml } from '../share'
import Cva from '../style'
import Panda from '../../assets/image/panda.jpg'
type Props = VariantProps<typeof C>

const shapes = Cva.mask.shapes

const C = Cva.mask.cva

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
