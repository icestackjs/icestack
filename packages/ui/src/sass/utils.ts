import { OrderedMap } from 'immutable'
import { TinyColor } from '@ctrl/tinycolor'
import * as sass from 'sass'

export function transformJsVToSassV(entries: [string, string][]): [sass.Value, sass.Value][] {
  return entries.map(([varName, value]) => {
    const color = new TinyColor(value)
    let v: sass.Value
    if (color.isValid) {
      let str = ''
      str = color.a < 1 && color.a > 0 ? `${color.r} ${color.g} ${color.b} / ${color.a}` : `${color.r} ${color.g} ${color.b}`
      v = new sass.SassString(str, {
        quotes: false
      })
    } else {
      v = new sass.SassString(value, {
        quotes: false
      })
    }
    return [
      new sass.SassString(varName, {
        quotes: false
      }),
      v
    ]
  })
}

export function transformJsVToSassMapList(entries: [string, string][]): [sass.Value, sass.Value][] {
  return entries.map(([varName, value]) => {
    const v = new sass.SassList(
      value.split(' ').map(
        (x) =>
          new sass.SassString(x, {
            quotes: false
          })
      )
    )
    return [
      new sass.SassString(varName, {
        quotes: false
      }),
      v
    ]
  })
}

export function transformJsVToSassMapMap(entries: [string, Record<string, string>][]): sass.SassMap {
  return new sass.SassMap(
    OrderedMap(
      entries.map(([varName, value]) => {
        const v = new sass.SassMap(
          OrderedMap(
            Object.entries(value).map(([key, value]) => {
              return [
                new sass.SassString(key, {
                  quotes: false
                }),
                new sass.SassString(value, {
                  quotes: false
                })
              ]
            })
          )
        )
        return [
          new sass.SassString(varName, {
            quotes: false
          }),
          v
        ]
      })
    )
  )
}

export function transformJsVToSassMap(entries: [string, string][]): sass.SassMap {
  return new sass.SassMap(
    OrderedMap(
      entries.map(([varName, value]) => {
        return [
          new sass.SassString(varName, {
            quotes: false
          }),
          new sass.SassString(value, {
            quotes: false
          })
        ]
      })
    )
  )
}
