import { Types, expandColorsMap } from './shared'
import { transformJsVToSassMapMap } from '@/sass/utils'

function generateDefault(typeName: string) {
  return `border-${typeName}`
}

function generateFocus(typeName: string) {
  return `outline-${typeName}`
}

const colorsMap = expandColorsMap(Types, (cur) => {
  return {
    default: generateDefault(cur),
    focus: generateFocus(cur)
  }
})

export const inject = {
  'injectInputColors()': () => {
    return transformJsVToSassMapMap(Object.entries(colorsMap))
  }
}
