import { transformJsVToSassMapMap } from '@/sass/utils'

const colorsMap = {
  '': {
    default: 'text-base-content border-base-200'
  },
  info: {
    default: 'text-info-content border-info/20 bg-info'
  },
  success: {
    default: 'text-success-content border-success/20 bg-success'
  },
  warning: {
    default: 'text-warning-content border-warning/20 bg-warning'
  },
  error: {
    default: 'text-error-content border-error/20 bg-error'
  }
}
export const inject = {
  'injectAlertColors()': () => {
    return transformJsVToSassMapMap(Object.entries(colorsMap))
  }
}
