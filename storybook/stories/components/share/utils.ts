export const expands = (args: string[]) => {
  return args.reduce<Record<string, string>>((acc, cur) => {
    acc[cur] = cur
    return acc
  }, {})
}
