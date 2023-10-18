import { Types, createInjectName, expandColorsMap } from './shared'
import { transformJsToSass } from '@/sass/utils'

function generateDefault(typeName: string) {
  return `bg-${typeName}`
}

const colorsMap = expandColorsMap(Types, (cur) => {
  return {
    default: generateDefault(cur)
  }
})
const injectName = createInjectName('progress')
const sassColors = transformJsToSass(colorsMap)
// const sassDefaults = transformJsToSass(defaults)
export const inject = {
  [injectName.colors]: () => {
    return sassColors
  }
}
