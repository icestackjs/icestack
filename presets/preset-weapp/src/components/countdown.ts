import { ComponentsValue } from '@/types'

const options: Partial<ComponentsValue> = {
  extend: ({ selector }) => {
    return {
      [selector]: {
        '& > *': {
          css: {
            'line-height': '1em'
          }
        }
      }
    }
  }
}

export default options
