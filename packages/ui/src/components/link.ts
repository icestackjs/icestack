import { transformJsVToSassMapMap } from '@/sass/utils'

const colorsMap = {
  primary: {
    default: ''
  },
  neutral: {
    default: ''
  },
  info: {
    default: ''
  },
  success: {
    default: ''
  },
  warning: {
    default: ''
  },
  error: {
    default: ''
  }
}
export const inject = {
  'injectLinkColors()': () => {
    return transformJsVToSassMapMap(Object.entries(colorsMap))
  }
}
