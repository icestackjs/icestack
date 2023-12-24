import { ComponentsValue } from '@/types'

const options: Partial<ComponentsValue> = {
  extend: ({ selector }) => {
    return {
      utils: {
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
}

export default options
