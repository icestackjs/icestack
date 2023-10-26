export const getVarsEntries = (colorsMap: Record<string, string>, shareVars: Record<string, string>, shareVars1: Record<string, string>): [string, string][] => {
  return Object.entries({
    ...colorsMap,
    ...shareVars,
    ...shareVars1
  }).map(([key, value]) => {
    return ['--' + key, value]
  })
}
