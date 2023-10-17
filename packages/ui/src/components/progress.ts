import { Types, createInjectName, expandColorsMap } from './shared'
import { transformJsVToSassMapMap } from '@/sass/utils'

function generateDefault(typeName: string) {
  return `bg-${typeName}`
}

const colorsMap = expandColorsMap(Types, (cur) => {
  return {
    default: generateDefault(cur)
  }
})
const injectName = createInjectName('progress')
export const inject = {
  [injectName.colors]: () => {
    return transformJsVToSassMapMap(Object.entries(colorsMap))
  }
}
