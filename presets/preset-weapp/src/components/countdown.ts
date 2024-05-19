import type { ComponentsValue } from '@/types'

const options: Partial<ComponentsValue> = {
  extend: ({ selector }) => {
    return {
      utils: `
      ${selector}{
        & > *{
          line-height: 1em;
        }
      }
      `,
    }
  },
}

export default options
