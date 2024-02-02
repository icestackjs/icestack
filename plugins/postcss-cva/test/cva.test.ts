import fs from 'node:fs/promises'
import path from 'node:path'
import { generateCva } from '@/generator'
describe('cva', () => {
  it('base', async () => {
    const opt: Parameters<typeof generateCva>[0] = {
      base: ['font-semibold', 'border', 'rounded'],
      variants: {
        intent: {
          primary: ['bg-blue-500', 'text-white', 'border-transparent', 'hover:bg-blue-600'],
          // **or**
          // primary: "bg-blue-500 text-white border-transparent hover:bg-blue-600",
          secondary: ['bg-white', 'text-gray-800', 'border-gray-400', 'hover:bg-gray-100']
        },
        size: {
          small: ['text-sm', 'py-1', 'px-2'],
          medium: ['text-base', 'py-2', 'px-4']
        }
      },
      compoundVariants: [
        {
          intent: ['primary'],
          size: ['medium'],
          class: ['uppercase']
          // **or** if you're a React.js user, `className` may feel more consistent:
          // className: "uppercase"
        }
      ],
      defaultVariants: {
        intent: 'primary',
        size: 'medium'
      }
    }
    opt.exports = {
      base: false,
      compoundVariants: false,
      defaultVariants: false,
      variants: false
    }
    let code = generateCva(opt).code
    expect(code).toMatchSnapshot()
    opt.importFrom = '@icestack/cva'
    await fs.writeFile(path.resolve(__dirname, './fixtures/cva.base.ts'), code)
    opt.format = 'js'
    code = generateCva(opt).code
    expect(code).toMatchSnapshot()
    await fs.writeFile(path.resolve(__dirname, './fixtures/cva.base.js'), code)
    opt.importFrom = 'class-variance-authority'
    opt.format = 'ts'
    code = generateCva(opt).code
    expect(code).toMatchSnapshot()
    await fs.writeFile(path.resolve(__dirname, './fixtures/cva.base.import.ts'), code)
  })
})
