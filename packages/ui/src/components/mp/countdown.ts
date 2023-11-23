import { ComponentsValue } from '@/types'

const options: Partial<ComponentsValue> = {
  extra: {
    '.countdown': {
      '& > *': {
        css: {
          'line-height': '1em'
        }
      }
    }
  }
}

export default options
