import { Types } from './shared/types'
import { transformJsVToSassMapMap } from '@/sass/utils'

function generateDefault(typeName: string) {
  return `border-${typeName}`
}

function generateFocus(typeName: string) {
  return `outline-${typeName}`
}

const colorsMap = Types.reduce<
  Record<
    string,
    {
      default: string
      focus: string
    }
  >
>((acc, cur) => {
  acc[cur] = {
    default: generateDefault(cur),
    focus: generateFocus(cur)
  }
  return acc
}, {})

export const inject = {
  'injectInputColors()': () => {
    return transformJsVToSassMapMap(Object.entries(colorsMap))
  }
}
