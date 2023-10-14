import { transformJsVToSassMapMap } from '@/sass/utils'

const colorsMap = {
  // '': {
  //   default: ''
  // },
  primary: {
    default: ''
  },
  // neutral: {
  //   default: ''
  // },
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
  'injectProgressColors()': () => {
    return transformJsVToSassMapMap(Object.entries(colorsMap))
  }
}
