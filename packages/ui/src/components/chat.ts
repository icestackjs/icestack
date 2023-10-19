import { Types, expandColorsMap } from './shared'
const colorsMap = expandColorsMap(Types, (t) => {
  return {
    default: `bg-${t} text-${t}-content`
  }
})

// const injectName = createInjectName('chat')

const defaults = {
  styled: {
    default: {
      apply: 'bg-neutral text-neutral-content rounded-box',
      css: {
        'min-height': '2.75rem',
        'min-width': '2.75rem'
      }
    }
  }
}
// const sassColors = transformJsToSass(colorsMap)
// const sassDefaults = transformJsToSass(defaults)
// export const inject = {
//   [injectName.colors]: () => {
//     return sassColors
//   },
//   [injectName.defaults]: () => {
//     return sassDefaults
//   }
// }

export const options = {
  colors: colorsMap,
  defaults
}
