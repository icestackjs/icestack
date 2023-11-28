import { ComponentsValue } from '@/types'

const options: Partial<ComponentsValue> = {
  extra: {
    '.btn::after': {
      css: {
        border: 'none'
      }
    },
    '.btn': {
      css: {
        'border-style': 'solid'
      }
    }
  }
}

export default options
