import { transformJsVToSassMapMap } from '@/sass/utils'

const colorsMap = {
  '': {
    default: 'border-base-200 bg-base-100 text-base-content',
    outline: 'border-current border-opacity-50 bg-transparent text-current'
  },
  neutral: {
    default: 'border-neutral bg-neutral text-neutral-content',
    outline: 'text-neutral'
  },
  primary: {
    default: 'border-primary bg-primary text-primary-content',
    outline: 'text-primary'
  },
  info: {
    default: 'bg-info text-info-content border-transparent',
    outline: 'text-info'
  },
  success: {
    default: 'bg-success text-success-content border-transparent',
    outline: 'text-success'
  },
  warning: {
    default: 'bg-warning text-warning-content border-transparent',
    outline: 'text-warning'
  },
  error: {
    default: 'bg-error text-error-content border-transparent',
    outline: 'text-error'
  }
  // ghost: {
  //   default: 'border-base-200 bg-base-200 text-base-content'
  // }
}
export const inject = {
  'injectBadgeColors()': () => {
    return transformJsVToSassMapMap(Object.entries(colorsMap))
  }
}
