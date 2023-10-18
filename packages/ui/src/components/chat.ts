import { createInjectName, Types, expandColorsMap } from './shared'
import { transformJsVToSassMapMap, transformJsVToSassMap } from '@/sass/utils'
const colorsMap = expandColorsMap(Types, (t) => {
  return {
    default: `bg-${t} text-${t}-content`
  }
})

const injectName = createInjectName('chat')

const defaults = {
  default: 'bg-neutral text-neutral-content'
}

export const inject = {
  [injectName.colors]: () => {
    return transformJsVToSassMapMap(Object.entries(colorsMap))
  },
  [injectName.defaults]: () => {
    return transformJsVToSassMap(Object.entries(defaults))
  }
}

export const options = {
  colors: colorsMap,
  defaults
}
