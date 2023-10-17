import { Types } from './shared/types'
import { transformJsVToSassMapMap } from '@/sass/utils'
function generateDefault(typeName: string) {
  return `border-${typeName}`
}

function generateFocus(typeName: string) {
  return `outline-${typeName}`
}

function generateFileSelectorButton(typeName: string) {
  return `border-${typeName} bg-${typeName} text-${typeName}-content`
}

const colorsMap = Types.reduce<
  Record<
    string,
    {
      default: string
      focus: string
      fileSelectorButton: string
    }
  >
>((acc, cur) => {
  acc[cur] = {
    default: generateDefault(cur),
    focus: generateFocus(cur),
    fileSelectorButton: generateFileSelectorButton(cur)
  }
  return acc
}, {})

export const inject = {
  'injectFileInputColors()': () => {
    return transformJsVToSassMapMap(Object.entries(colorsMap))
  }
}
