import { Types, expandColorsMap } from './shared'

const colorsMap = expandColorsMap(Types, (cur) => {
  return {
    default: `border-${cur}`,
    focus: `outline-${cur}`
  }
})
// const injectName = createInjectName('textarea')
// const sassColors = transformJsToSass(colorsMap)
// // const sassDefaults = transformJsToSass(defaults)
// export const inject = {
//   [injectName.colors]: () => {
//     return sassColors
//   }
// }

export const options = {
  colors: colorsMap
  // defaults
}
