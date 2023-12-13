import { Meta, StoryObj } from '@storybook/html'
import { VariantProps } from 'class-variance-authority'
import { faker } from '@faker-js/faker'
import { formatHtml } from '../share'
import Cva from '../style'
type TableProps = VariantProps<typeof table> & { rowsCount: number }
const allSizes = Cva.table.sizes

const table = Cva.table.cva

const fakerData: [string, string, Date][] = []
for (let i = 0; i < 40; i++) {
  const type = faker.animal.type()
  const species = faker.animal[type]?.()
  const birthdate = faker.date.birthdate()
  fakerData.push([species, type, birthdate])
}

function makeRows(num: number) {
  const res = []
  for (let i = 0; i < num; i++) {
    const hit = fakerData[i]
    res.push(`<tr>
    <th>${i + 1}</th>
    <td>${hit[0]}</td>
    <td>${hit[1]}</td>
    <td>${hit[2]}</td>
  </tr>`)
  }
  return res
}

const create = (props: TableProps) => {
  const body = makeRows(props.rowsCount)
  return formatHtml(`<div class="overflow-x-auto">
  <table class="${table(props)}">
    <thead>
      <tr>
        <th></th>
        <th>Species</th>
        <th>Type</th>
        <th>Birthdate</th>
      </tr>
    </thead>
    <tbody>
      ${body.join('\n')}
    </tbody>
  </table>
</div>`)
}

const meta: Meta<TableProps> = {
  title: 'Data Display/Table',
  tags: ['autodocs'],
  render: (args) => {
    return create(args)
  },
  args: {
    rowsCount: 5
  },
  argTypes: {
    zebra: {
      description: 'table-zebra',
      control: { type: 'boolean' }
    },
    size: {
      description: '',
      options: allSizes,
      control: { type: 'inline-radio' },
      type: 'string'
    },
    rowsCount: {
      control: { type: 'number', min: 1, max: 30, step: 1 }
    }
  }
}

type Story = StoryObj<TableProps>

export const Default: Story = {
  args: {}
}

export default meta
