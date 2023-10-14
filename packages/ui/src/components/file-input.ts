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
  'injectFileInputColors()': () => {
    return transformJsVToSassMapMap(Object.entries(colorsMap))
  }
}
