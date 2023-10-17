import { Types, createInjectName, expandColorsMap } from './shared'
import { transformJsVToSassMapMap } from '@/sass/utils'

function generateDefault(typeName: string) {
  return `text-${typeName} [@media(hover:hover)]:hover:text-${typeName}-focus`
}

const colorsMap = expandColorsMap(Types, (cur) => {
  return {
    default: generateDefault(cur)
  }
})

const injectName = createInjectName('link')

export const inject = {
  [injectName.colors]: () => {
    return transformJsVToSassMapMap(Object.entries(colorsMap))
  }
}
