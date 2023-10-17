export const TypesEnum = ['primary', 'neutral', 'info', 'success', 'warning', 'error']

export function addPrefix(prefix: string, arr: string[]) {
  return arr.map((x) => {
    return prefix + x
  })
}

export function typePrefix(prefix: string) {
  return addPrefix(prefix, TypesEnum)
}
