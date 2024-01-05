import { TinyColor } from '@ctrl/tinycolor'
import { AtRule, Declaration, Root, Rule } from 'postcss'
import { makeRgbaValue, sharedExtraColors, sharedExtraVars } from './colors'
import { CodegenOptions, VarPrefixerOptions } from '@/types'
import { mergeR, mergeRClone } from '@/shared'
import { mapCss2JsArray, merge, parse } from '@/postcss'
import { mergeRoot } from '@/sass'
import { makeArray } from '@/utils'

export const composeVarsObject = (colorsMap: Record<string, string>, shareVars: Record<string, string>, slash: boolean = true) => {
  return Object.entries({
    ...colorsMap,
    ...shareVars
  }).reduce<Record<string, string>>((acc, [key, value]) => {
    const k = '--' + key
    const color = new TinyColor(value)
    let str = value
    if (color.isValid) {
      if (slash) {
        str = color.a < 1 && color.a > 0 ? `${color.r} ${color.g} ${color.b} / ${color.a}` : `${color.r} ${color.g} ${color.b}`
      } else {
        str = color.a < 1 && color.a > 0 ? `${color.r},${color.g},${color.b},${color.a}` : `${color.r},${color.g},${color.b}`
      }
    }
    acc[k] = str
    return acc
  }, {})
}

export const calcBase = (options: CodegenOptions, { slash }: { slash: boolean } = { slash: true }) => {
  const { base, postcss } = options
  const { varPrefix: varPrefixOptions } = postcss!
  const { varPrefix } = varPrefixOptions as Partial<VarPrefixerOptions>
  const colors: Record<string, string> = {
    transparent: 'transparent',
    current: 'currentColor'
  }
  const { themes, extraCss: globalExtraCss, themeSelectorTemplate, mediaDarkTheme, generateColors } = base ?? {}

  const typesSet = new Set<string>()
  function addColors(obj: Record<string, string>) {
    for (const x of Object.keys(obj)) {
      const key = varPrefix + x
      colors[x] = makeRgbaValue(key, slash)
    }
  }

  const presets = Object.entries(themes!).reduce<Record<string, any>>((acc, [theme, opts]) => {
    // @ts-ignore
    if (opts === false) {
      return acc
    }
    let { selector } = opts
    const { extraColors, extraVars, extraCss, types } = opts
    if (selector === undefined) {
      selector = themeSelectorTemplate?.(theme) // `[data-mode="${theme}"]`
    }
    if (typeof selector === 'string' && selector) {
      const entries = Object.entries(types ?? {})
      const typesColors = entries.reduce<Record<string, string>>((acc, [type, value]) => {
        typesSet.add(type)
        let obj = value
        if (generateColors) {
          switch (true) {
            case typeof value === 'string': {
              obj = generateColors(type, value)
              break
            }
            case Array.isArray(value): {
              obj = generateColors(type, ...value)
              break
            }
          }
        }

        addColors(obj as Record<string, string>)
        return {
          ...acc,
          ...(obj as Record<string, string>)
        }
      }, {})
      const css = mergeRClone(composeVarsObject(typesColors, { ...(extraColors ?? sharedExtraColors.light), ...(extraVars ?? sharedExtraVars) }, slash), extraCss)
      acc[selector] = css
      if (mediaDarkTheme === theme) {
        // default selector
        const defaultSelector = themes?.light.selector
        if (defaultSelector) {
          acc['@media (prefers-color-scheme: dark)'] = {
            [defaultSelector]: css
          }
        }
      }
    }

    if (extraColors) {
      for (const x of Object.keys(extraColors)) {
        const key = varPrefix + x
        colors[x] = makeRgbaValue(key, slash)
      }
    }

    return acc
  }, {})

  const root = new Root()

  for (const [selector, obj] of Object.entries(presets)) {
    if (selector.startsWith('@media')) {
      root.append(
        new AtRule({
          name: 'media',
          params: '(prefers-color-scheme: dark)',
          nodes: Object.entries(obj).map(([s, o]) => {
            return new Rule({
              selector: s,
              nodes:
                typeof o === 'object'
                  ? Object.entries(o).map(([p, v]) => {
                      return new Declaration({
                        prop: p,
                        value: v
                      })
                    })
                  : []
            })
          })
        })
      )
    } else {
      root.append(
        new Rule({
          selector,
          nodes:
            typeof obj === 'object'
              ? Object.entries(obj).map(([p, v]) => {
                  return new Declaration({
                    prop: p,
                    value: v
                  })
                })
              : []
        })
      )
    }
  }

  if (globalExtraCss) {
    merge(root, ...makeArray(globalExtraCss).map((x) => parse(x)))
  }

  return {
    presets,
    types: [...typesSet],
    colors,
    root
  }
}
