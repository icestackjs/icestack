import type { StoryObj, Meta } from '@storybook/html'
import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'
import { expands, formatHtml, addPrefix, sizePrefix, typePrefix } from '../share'

type Props = VariantProps<typeof c> & { color?: string }

// const types = typePrefix('text')
const sizes = sizePrefix('loading')
const shapes = addPrefix('loading', ['spinner', 'dots', 'ring', 'ball', 'bars', 'infinity'])
const c = cva(['loading'], {
  variants: {
    // type: expands(types),
    size: expands(sizes),
    shape: expands(shapes)
  },
  defaultVariants: {}
})

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
