import { TinyColor } from '@ctrl/tinycolor'
import merge from 'merge'
import { CodegenOptions } from '@/types'
import { generateColorVars } from '@/colors'
// import { preHandleString } from '@/utils'

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
  const entries = types === undefined ? [] : Object.entries(types)

  const themesMap = themes === undefined ? {} : themes

  const presets = Object.entries(themesMap).reduce<Record<string, any>>((acc, [theme, { selector }]) => {
    if (selector) {
      acc[selector] = {
        css: composeVarsObject(
          entries.reduce<Record<string, string>>((acc, [key, cur]) => {
            const hit = cur[theme]
            return typeof hit === 'string'
              ? {
                  ...acc,
                  ...generateColorVars(key, hit, theme === 'dark')
                }
              : {
                  ...acc,
                  ...hit
                }
          }, {}),
          options?.base?.extraColors?.[theme] ?? {},
          options?.base?.extraVars?.[theme] ?? {}
        )
      }
    }
    return acc
  }, {})
  merge.recursive(presets, options?.base?.extraCss)
  return {
    presets,
    entries,
    types: entries.map((x) => x[0])
  }
}
