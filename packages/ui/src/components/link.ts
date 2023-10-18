import { Types, createInjectName, expandColorsMap } from './shared'
import { transformJsToSass } from '@/sass/utils'

function generateDefault(typeName: string) {
  return `text-${typeName} [@media(hover:hover)]:hover:text-${typeName}-focus`
}

const colorsMap = expandColorsMap(Types, (cur) => {
  return {
    default: generateDefault(cur)
  }
})

const injectName = createInjectName('link')
const sassColors = transformJsToSass(colorsMap)
// const sassDefaults = transformJsToSass(defaults)
export const inject = {
  [injectName.colors]: () => {
    return sassColors
  }
}
