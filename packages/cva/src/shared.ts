export const TypesEnum = ['primary', 'neutral', 'success', 'warning', 'error']

export const SizesEnum = ['xs', 'sm', 'md', 'lg']

export function addPrefix(prefix: string | undefined, arr: string[]) {
  const p = prefix ?? ''
  return arr.map((x) => {
    return p + x
  })
}

export function typePrefix(prefix: string, arr: string[] = TypesEnum) {
  return addPrefix(prefix, arr)
}

export function sizePrefix(prefix: string, arr: string[] = SizesEnum) {
  return addPrefix(prefix, arr)
}

export const expands = (args: string[]) => {
  return args.reduce<Record<string, string>>((acc, cur) => {
    acc[cur] = cur
    return acc
  }, {})
}
