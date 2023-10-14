import { transformJsVToSassMapMap } from '@/sass/utils'

const colorsMap = {
  // '': {
  //   default: ''
  // },
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
  'injectCheckboxColors()': () => {
    return transformJsVToSassMapMap(Object.entries(colorsMap))
  }
}
