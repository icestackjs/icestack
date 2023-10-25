// import { kebabCase } from 'lodash'

export function addVarPrefix(entries: [string, string][]): [string, string][] {
  return entries.map(([key, value]) => {
    return ['--' + key, value]
  })
}

export const getVarsEntries = (colorsMap: Record<string, string>, shareVars: Record<string, string>) => {
  return addVarPrefix(
    Object.entries({
      ...colorsMap,
      ...shareVars
    })
  )
}

// export const getDarkVarsEntries = (colorsMap: Record<string, string>, shareVars: Record<string, string>) => {
//   return addVarPrefix(
//     Object.entries({
//       ...colorsMap,
//       ...shareVars
//     })
//   )
// }

// function isValidColor(str: string) {
//   const color = new TinyColor(str)
//   return color.isValid
// }

// for (const [varName, value] of Object.entries(defaultVarsMap)) {
//   sassValueMap.set(
//     new sass.SassString(varName, {
//       quotes: false
//     }),
//     new sass.SassString(value, {
//       quotes: false
//     })
//   )
// }
