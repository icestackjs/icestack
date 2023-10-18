import { Types, createInjectName, expandColorsMap } from './shared'
import { transformJsVToSassMapMap } from '@/sass/utils'

const colorsMap = expandColorsMap(Types, (cur) => {
  return {
    default: `border-${cur}`,
    focus: `outline-${cur}`
  }
})
const injectName = createInjectName('textarea')
export const inject = {
  [injectName.colors]: () => {
    return transformJsVToSassMapMap(Object.entries(colorsMap))
  }
}
