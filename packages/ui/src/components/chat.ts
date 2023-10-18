import { createInjectName, Types, expandColorsMap } from './shared'
import { transformJsToSass } from '@/sass/utils'
const colorsMap = expandColorsMap(Types, (t) => {
  return {
    default: `bg-${t} text-${t}-content`
  }
})

const injectName = createInjectName('chat')

const defaults = {
  default: 'bg-neutral text-neutral-content'
}
const sassColors = transformJsToSass(colorsMap)
const sassDefaults = transformJsToSass(defaults)
export const inject = {
  [injectName.colors]: () => {
    return sassColors
  },
  [injectName.defaults]: () => {
    return sassDefaults
  }
}

export const options = {
  colors: colorsMap,
  defaults
}
