import { ComponentsValue } from '@/types'

const options: Partial<ComponentsValue> = {
  extra: ({ selector }) => {
    return {
      [`${selector}::after`]: {
        css: {
          border: 'none'
        }
      },
      [selector]: {
        css: {
          'border-style': 'solid'
        }
      }
    }
  }
}

export default options
