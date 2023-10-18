import { Types, createInjectName, expandColorsMap } from './shared'
import { transformJsVToSassMap, transformJsVToSassMapMap } from '@/sass/utils'
function generateDefault(typeName: string) {
  return `text-${typeName}-content border-${typeName}/20 bg-${typeName}`
}

const colorsMap = expandColorsMap(Types, (cur) => {
  return {
    default: generateDefault(cur)
  }
})

const defaults = {
  default: 'rounded-box border p-4 text-base-content border-base-200'
}
const injectName = createInjectName('alert')
export const inject = {
  [injectName.colors]: () => {
    return transformJsVToSassMapMap(Object.entries(colorsMap))
  },
  [injectName.defaults]: () => {
    return transformJsVToSassMap(Object.entries(defaults))
  }
}
