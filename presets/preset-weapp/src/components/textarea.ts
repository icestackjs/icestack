// import { expandTypes, getSelector } from '../shared'
import { ComponentsValue } from '@/types'

const options: Partial<ComponentsValue> = {
  extend: ({ selector }) => {
    return {
      utils: `
        ${selector}{
          border-style: solid;
        }
      `
    }
  }
}

export default options
