import { TinyColor } from '@ctrl/tinycolor'
import merge from 'merge'
import { generateColorVars, makeRgbaValue, sharedExtraColors, sharedExtraVars } from './colors'
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

function makeArray(value: any | any[]) {
  return Array.isArray(value) ? value : [value]
}

export const calcBase = (options: CodegenOptions) => {
  const { base, varPrefix: varPrefixOptions } = options
  const { varPrefix } = varPrefixOptions
  const colors: Record<string, string> = {
    transparent: 'transparent',
    current: 'currentColor'
  }
  const themes = base?.themes
  const globalExtraCss = base?.extraCss
  const typesSet = new Set<string>()
  function addColors(obj: Record<string, string>) {
    for (const x of Object.keys(obj)) {
      const key = varPrefix + x
      colors[x] = makeRgbaValue(key)
    }
  }
  const presets = Object.entries(themes).reduce<Record<string, any>>((acc, [theme, { selector, extraColors, extraVars, extraCss, types }]) => {
    if (selector) {
      const entries = Object.entries(types ?? {})
      const typesColors = entries.reduce<Record<string, string>>((acc, [type, value]) => {
        typesSet.add(type)
        let obj = value
        switch (true) {
          case typeof value === 'string': {
            obj = generateColorVars(type, value, theme === 'dark')
            break
          }
          case Array.isArray(value): {
            obj = generateColorVars(type, value[0], value[1])
            break
          }
        }
        addColors(obj as Record<string, string>)
        return {
          ...acc,
          ...(obj as Record<string, string>)
        }
      }, {})
      acc[selector] = {
        css: merge.recursive(true, composeVarsObject(typesColors, extraColors ?? sharedExtraColors.light, extraVars ?? sharedExtraVars), ...makeArray(extraCss))
      }
    }

    if (extraColors) {
      for (const x of Object.keys(extraColors)) {
        const key = varPrefix + x
        colors[x] = makeRgbaValue(key)
      }
    }

    return acc
  }, {})
  merge.recursive(presets, globalExtraCss)
  return {
    presets,
    types: [...typesSet],
    colors
  }
}
