import { createTailwindcssContent } from '@/content/index'
import { cva } from 'class-variance-authority'

describe('index', () => {
  it('createTailwindcssContent', () => {
    const raw = createTailwindcssContent().raw
    expect(raw).toMatchSnapshot()
  })

  it('should ', () => {
    const button = cva(['font-semibold', 'border', 'rounded'], {
      variants: {
        intent: {
          primary: ['bg-blue-500', 'text-white', 'border-transparent', 'hover:bg-blue-600'],
          // **or**
          // primary: "bg-blue-500 text-white border-transparent hover:bg-blue-600",
          secondary: ['bg-white', 'text-gray-800', 'border-gray-400', 'hover:bg-gray-100'],
        },
        size: {
          small: ['text-sm', 'py-1', 'px-2'],
          medium: ['text-base', 'py-2', 'px-4'],
        },
      },
      compoundVariants: [
        {
          intent: ['primary'],
          size: ['medium'],
          class: ['uppercase'],
          // **or** if you're a React.js user, `className` may feel more consistent:
          // className: "uppercase"
        },
      ],
      defaultVariants: {
        intent: 'primary',
        size: 'medium',
      },
    })

    // button()
    // => "font-semibold border rounded bg-blue-500 text-white border-transparent hover:bg-blue-600 text-base py-2 px-4 uppercase"

    // button({ intent: 'secondary', size: 'small' })
  })
})
