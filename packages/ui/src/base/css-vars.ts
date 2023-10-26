export const getVarsEntries = (colorsMap: Record<string, string>, shareVars: Record<string, string>): [string, string][] => {
  return Object.entries({
    ...colorsMap,
    ...shareVars
  }).map(([key, value]) => {
    return ['--' + key, value]
  })
}
