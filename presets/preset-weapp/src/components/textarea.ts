// import { expandTypes, getSelector } from '../shared'
import { ComponentsValue } from '@/types'

const options: Partial<ComponentsValue> = {
  extend: ({ selector }) => {
    return {
      [selector]: {
        css: {
          'border-style': 'solid'
        }
      }
    }
  }
}

export default options
