import { TinyColor } from '@ctrl/tinycolor'
import merge from 'merge'
import { generateColorVars, makeRgbaValue } from './colors'
import { CodegenOptions } from '@/types'
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

  const presets = Object.entries(themes).reduce<Record<string, any>>((acc, [theme, { selector, extraColors, extraVars, extraCss, types }]) => {
    if (selector) {
      acc[selector] = {
        css: merge.recursive(
          true,
          composeVarsObject(
            Object.entries(types ?? {}).reduce<Record<string, string>>((acc, [key, hit]) => {
              switch (true) {
                case typeof hit === 'string': {
                  return {
                    ...acc,
                    ...generateColorVars(key, hit, theme === 'dark')
                  }
                }
                case Array.isArray(hit): {
                  return {
                    ...acc,
                    ...generateColorVars(key, hit[0], hit[1])
                  }
                }
                default: {
                  return {
                    ...acc,
                    ...hit
                  }
                }
              }
            }, {}),
            extraColors,
            extraVars
          ),
          ...makeArray(extraCss)
        )
      }
    }
    if (types) {
      for (const [type, value] of Object.entries(types)) {
        typesSet.add(type)

        if (typeof value === 'object') {
          for (const x of Object.keys(value)) {
            const key = varPrefix + x
            colors[x] = makeRgbaValue(key)
          }
        }
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
