import { transformJsVToSassMapMap } from '@/sass/utils'

const colorsMap = {
  '': {
    default: 'bg-neutral text-neutral-content'
  },
  primary: {
    default: 'bg-primary text-primary-content'
  },
  info: {
    default: 'bg-info text-info-content'
  },
  success: {
    default: 'bg-success text-success-content'
  },
  warning: {
    default: 'bg-warning text-warning-content'
  },
  error: {
    default: 'bg-error text-error-content'
  }
}
export const inject = {
  'injectChatColors()': () => {
    return transformJsVToSassMapMap(Object.entries(colorsMap))
  }
}
