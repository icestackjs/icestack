import { Types } from './shared/types'
import { transformJsVToSassMapMap } from '@/sass/utils'

function generateDefault(typeName: string) {
  return `bg-${typeName}`
}

const colorsMap = Types.reduce<
  Record<
    string,
    {
      default: string
    }
  >
>((acc, cur) => {
  acc[cur] = {
    default: generateDefault(cur)
  }
  return acc
}, {})
export const inject = {
  'injectProgressColors()': () => {
    return transformJsVToSassMapMap(Object.entries(colorsMap))
  }
}
