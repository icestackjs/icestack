import { sharedExtraColors, sharedExtraVars } from '@icestack/preset-default/base'
import { makeRgbaValue, composeVarsObject } from './colors'
import { CodegenOptions, CssInJs, VarPrefixerOptions } from '@/types'
import { mergeRClone, makeArray } from '@/shared'
import { merge, parse, parseJs } from '@/postcss'

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
  const prependNodes: CssInJs[] = []
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
      if (mediaDarkTheme === theme) {
        // default selector
        const defaultSelector = themes?.light.selector
        if (defaultSelector) {
          prependNodes.push({
            '@media (prefers-color-scheme: dark)': {
              [defaultSelector]: css
            }
          })
          // acc['@media (prefers-color-scheme: dark)'] = {
          //   [defaultSelector]: css
          // }
        }
      }
      acc[selector] = css
    }

    if (extraColors) {
      for (const x of Object.keys(extraColors)) {
        const key = varPrefix + x
        colors[x] = makeRgbaValue(key, slash)
      }
    }

    return acc
  }, {})

  const root = parseJs(presets)
  for (const node of prependNodes) {
    root.insertAfter(0, parseJs(node))
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
