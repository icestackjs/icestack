import { Types, createInjectName, expandColorsMap } from './shared'
import { transformJsToSass } from '@/sass/utils'
function generateDefault(typeName: string) {
  return `border-${typeName}`
}

function generateFocus(typeName: string) {
  return `outline-${typeName}`
}

function generateFileSelectorButton(typeName: string) {
  return `border-${typeName} bg-${typeName} text-${typeName}-content`
}

const colorsMap = expandColorsMap(Types, (cur) => {
  return {
    default: generateDefault(cur),
    focus: generateFocus(cur),
    fileSelectorButton: generateFileSelectorButton(cur)
  }
})
const injectName = createInjectName('file-input')
const sassColors = transformJsToSass(colorsMap)
// const sassDefaults = transformJsToSass(defaults)
export const inject = {
  [injectName.colors]: () => {
    return sassColors
  }
}
