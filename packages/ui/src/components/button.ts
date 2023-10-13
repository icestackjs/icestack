import { transformJsVToSassMapMap } from '@/sass/utils'

export function generateBtnInjectVars(type: string) {
  return {
    'primary-color': type,
    default: `border-${type} bg-${type} text-${type}-content outline-${type}`,
    active: `border-${type}-focus bg-${type}-focus`,
    'outline-active': `border-${type}-focus bg-${type}-focus text-${type}-content`
  }
}

const colorsMap = {
  '': {
    'primary-color': 'base-200',
    default: 'border-base-200 bg-base-200 text-base-content outline-base-200',
    active: 'border-base-300 bg-base-300',
    'outline-active': 'border-base-content bg-base-content text-base-100'
  },
  primary: generateBtnInjectVars('primary'),
  neutral: generateBtnInjectVars('neutral'),
  info: generateBtnInjectVars('info'),
  success: generateBtnInjectVars('success'),
  warning: generateBtnInjectVars('warning'),
  error: generateBtnInjectVars('error')
}

export const inject = {
  'injectButtonColors()': () => {
    return transformJsVToSassMapMap(Object.entries(colorsMap))
  }
}
