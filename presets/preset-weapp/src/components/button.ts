import { ComponentsValue } from '@/types'

const options: Partial<ComponentsValue> = {
  extend: ({ selector }) => {
    return {
      utils: `
      ${selector}::after{
        border: none;
      }
      ${selector}{
        border-style: solid;
      }
      `
    }
  }
}

export default options
