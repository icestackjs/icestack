import { TinyColor } from '@ctrl/tinycolor'
import { CodegenOptions } from '@/types'

export const composeVarsObject = (colorsMap: Record<string, string>, shareVars: Record<string, string>, shareVars1: Record<string, string>) => {
  return Object.entries({
    ...colorsMap,
    ...shareVars,
    ...shareVars1
  }).reduce<Record<string, string>>((acc, [key, value]) => {
    const k = '--' + key
    const color = new TinyColor(value)
    let str = value
    if (color.isValid) {
      str = color.a < 1 && color.a > 0 ? `${color.r} ${color.g} ${color.b} / ${color.a}` : `${color.r} ${color.g} ${color.b}`
    }
    acc[k] = str
    return acc
  }, {})
}

export const calcBase = (options: CodegenOptions) => {
  const types = options?.base?.types
  const themes = options?.base?.themes
  const allTypes = types === undefined ? [] : Object.keys(types)
  const values = types === undefined ? [] : Object.values(types)
  const themesMap = themes === undefined ? {} : themes

  const presets = Object.entries(themesMap).reduce<Record<string, any>>((acc, [theme, { selector }]) => {
    if (selector) {
      acc[selector] = {
        css: composeVarsObject(
          values
            .map((x) => x[theme])
            .reduce<Record<string, string>>((acc, cur) => {
              return {
                ...acc,
                ...cur
              }
            }, {}),
          options?.base?.extraColors?.[theme] ?? {},
          options?.base?.extraVars?.[theme] ?? {}
        )
      }
    }
    return acc
  }, {})
  return {
    presets,
    allTypes
  }
}
