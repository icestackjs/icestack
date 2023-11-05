export const TypesEnum = ['primary', 'neutral', 'success', 'warning', 'error']
export const SizesEnum = ['xs', 'sm', 'md', 'lg']
export function addPrefix(prefix: string, arr: string[]) {
  return arr.map((x) => {
    return prefix + '-' + x
  })
}

export function typePrefix(prefix: string, arr: string[] = TypesEnum) {
  return addPrefix(prefix, arr)
}

export function sizePrefix(prefix: string, arr: string[] = SizesEnum) {
  return addPrefix(prefix, arr)
}
