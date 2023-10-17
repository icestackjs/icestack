import { Types } from './shared/types'
import { transformJsVToSassMapMap } from '@/sass/utils'
function generateDefault(typeName: string) {
  return `border-${typeName} [@media(hover:hover)]:hover:border-${typeName}`
}

function generateFocus(typeName: string) {
  return `outline-${typeName}`
}

function generateChecked(typeName: string) {
  return `border-${typeName} bg-${typeName} text-${typeName}-content`
}

const colorsMap = Types.reduce<
  Record<
    string,
    {
      default: string
      focus: string
      checked: string
    }
  >
>((acc, cur) => {
  acc[cur] = {
    default: generateDefault(cur),
    focus: generateFocus(cur),
    checked: generateChecked(cur)
  }
  return acc
}, {})

export const inject = {
  'injectCheckboxColors()': () => {
    return transformJsVToSassMapMap(Object.entries(colorsMap))
  }
}
