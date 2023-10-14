import { transformJsVToSassMapMap } from '@/sass/utils'

const colorsMap = {
  primary: {
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
  'injectInputColors()': () => {
    return transformJsVToSassMapMap(Object.entries(colorsMap))
  }
}
