import { Types } from './shared/types'
import { transformJsVToSassMapMap } from '@/sass/utils'

function generateDefault(typeName: string) {
  return `text-${typeName} [@media(hover:hover)]:hover:text-${typeName}-focus`
}

const colorsMap = Types.reduce<
  Record<
    string,
    {
      default: string
      // focus: string
    }
  >
>((acc, cur) => {
  acc[cur] = {
    default: generateDefault(cur)
    // focus: generateFocus(cur)
  }
  return acc
}, {})

export const inject = {
  'injectLinkColors()': () => {
    return transformJsVToSassMapMap(Object.entries(colorsMap))
  }
}
