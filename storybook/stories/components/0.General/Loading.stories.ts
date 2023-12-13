import type { StoryObj, Meta } from '@storybook/html'
import type { VariantProps } from '@icestack/cva'
import { formatHtml } from '../share'
import Cva from '../style'
type Props = VariantProps<typeof c> & { color?: string }

const sizes = Cva.loading.sizes
const shapes = Cva.loading.shapes
const c = Cva.loading.cva

const create = (props: Props) => {
  let co = ''
  if (props.color) {
    co = `style="color:${props.color}"`
  }
  return formatHtml(`<span class="${c(props)}" ${co}></span>`)
}

const meta: Meta<Props> = {
  title: 'General/Loading',
  tags: ['autodocs'],
  render: (args) => {
    return create(args)
  },
  argTypes: {
    color: { control: { type: 'color' } }
  }
}

type Story = StoryObj<Props>

export const Default: Story = {
  args: {},
  render: ({ color }) => {
    const strs: string[] = []
    for (const shape of shapes) {
      for (const size of sizes) {
        strs.push(
          create({
            shape,
            size,
            color
          })
        )
      }
    }
    const xx = formatHtml(`<div class="grid grid-cols-8 gap-4 items-center">${strs.join('')}</div>`)

    return xx
  }
}

export default meta
