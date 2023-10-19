import { Types, createInjectName, expandColorsMap } from './shared'
import { transformJsToSass } from '@/sass/utils'
function generateDefault(typeName: string) {
  return `border-${typeName} [@media(hover:hover)]:hover:border-${typeName}`
}

function generateFocus(typeName: string) {
  return `outline-${typeName}`
}

function generateChecked(typeName: string) {
  return `border-${typeName} bg-${typeName} text-${typeName}-content`
}

const colorsMap = expandColorsMap(Types, (cur) => {
  return {
    default: generateDefault(cur),
    focus: generateFocus(cur),
    checked: generateChecked(cur)
  }
})
const defaults = {
  default: 'border-base-content rounded-btn h-6 w-6 cursor-pointer appearance-none border border-opacity-20'
}
const injectName = createInjectName('checkbox')
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

// export const options = {
//   colors: colorsMap,
//   defaults
// }
