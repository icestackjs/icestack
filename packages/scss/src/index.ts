import { OrderedMap } from 'immutable'
import * as sass from 'sass'
import { defu } from '@icestack/shared'

export interface TransformJsToSassOptions {
  quotes?: boolean
  denominatorUnits?: string[]
  numeratorUnits?: string[]
  radix?: number
}
// : sass.Value | sass.Value[] | sass.SassList | sass.SassMap
export function transformJsToSass(raw: any, options?: TransformJsToSassOptions): sass.Value {
  const { denominatorUnits, numeratorUnits, quotes, radix } = defu<Required<TransformJsToSassOptions>, TransformJsToSassOptions[]>(options, {
    quotes: false
  })
  if (raw === undefined || raw === null) {
    return sass.sassNull
  } else if (typeof raw === 'string') {
    // default quotes false
    return new sass.SassString(raw, {
      quotes
    })
  } else if (typeof raw === 'boolean') {
    return raw ? sass.sassTrue : sass.sassFalse
  } else if (typeof raw === 'number') {
    return new sass.SassNumber(raw, {
      denominatorUnits,
      numeratorUnits
    })
  } else if (typeof raw === 'bigint') {
    return new sass.SassString(raw.toString(radix), {
      quotes
    })
  } else if (Array.isArray(raw)) {
    return new sass.SassList(
      raw.map((x) => {
        return transformJsToSass(x)
      })
    )
  } else if (typeof raw === 'object') {
    return new sass.SassMap(
      OrderedMap(
        Object.entries(raw).map(([key, value]) => {
          return [transformJsToSass(key), transformJsToSass(value)]
        })
      )
    )
  } else if (typeof raw === 'function') {
    return typeof raw.signature === 'string' ? new sass.SassFunction(raw.signature, raw) : sass.sassNull
  } else {
    return sass.sassNull
  }
}

export function compileScssString(str: string, sassOptions?: sass.StringOptions<'sync'>) {
  return sass.compileString(str, sassOptions)
}
