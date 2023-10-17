import { Types, createInjectName, expandColorsMap } from './shared'
import { transformJsVToSassMap, transformJsVToSassMapMap } from '@/sass/utils'

function generateDefault(typeName: string) {
  return `border-${typeName} bg-${typeName} text-${typeName}-content`
}

function generateOutline(typeName: string) {
  return `text-${typeName}`
}

const colorsMap = expandColorsMap(Types, (cur) => {
  return {
    default: generateDefault(cur),
    outline: generateOutline(cur)
  }
})

const defaults = {
  default: 'border-base-200 bg-base-100 text-base-content',
  outline: 'border-current border-opacity-50 bg-transparent text-current'
}

const injectName = createInjectName('badge')
export const inject = {
  [injectName.colors]: () => {
    return transformJsVToSassMapMap(Object.entries(colorsMap))
  },
  [injectName.defaults]: () => {
    return transformJsVToSassMap(Object.entries(defaults))
  }
}
