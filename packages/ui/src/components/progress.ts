import { Types, expandColorsMap } from './shared'
import { transformJsVToSassMapMap } from '@/sass/utils'

function generateDefault(typeName: string) {
  return `bg-${typeName}`
}

const colorsMap = expandColorsMap(Types, (cur) => {
  return {
    default: generateDefault(cur)
  }
})
export const inject = {
  'injectProgressColors()': () => {
    return transformJsVToSassMapMap(Object.entries(colorsMap))
  }
}
