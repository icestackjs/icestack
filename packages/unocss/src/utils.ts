import path from 'node:path'

export function requireLib(id: string, basedir: string) {
  return require(path.resolve(basedir, id))
}

export function groupBy<T, R = T>(arr: T[], cb: (arg: T) => string, mapper?: (arg: T) => R): Record<string, R[]> {
  if (!Array.isArray(arr)) {
    throw new TypeError('expected an array for first argument')
  }

  if (typeof cb !== 'function') {
    throw new TypeError('expected a function for second argument')
  }

  const result: Record<string, R[]> = {}
  for (const item of arr) {
    const bucketCategory = cb(item)
    const bucket = result[bucketCategory]
    const x = mapper ? mapper(item) : (item as unknown as R)
    if (Array.isArray(bucket)) {
      result[bucketCategory].push(x)
    } else {
      result[bucketCategory] = [x]
    }
  }

  return result
}
