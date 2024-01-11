import { merge, parse } from '@icestack/postcss/scss'
export * from '@icestack/scss'

export function mergeRoot(arr: string[]) {
  return merge(...arr.map((x) => parse(x)))
}
