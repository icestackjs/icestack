import { ComponentsValue } from '@/types'

const options: Partial<ComponentsValue> = {
  extend: ({ selector }) => {
    return {
      utils: {
        [selector]: {
          css: {
            'border-style': 'solid'
          }
        }
      }
    }
  }
}

export default options
