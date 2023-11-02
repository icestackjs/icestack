import { SassMap, Value } from 'sass'
import { OrderedMap } from 'immutable'
import { transformBaseJs, transformJsToSass } from '@/sass/utils'
import { CodegenOptions } from '@/types'

export const composeVarsEntries = (colorsMap: Record<string, string>, shareVars: Record<string, string>, shareVars1: Record<string, string>): [string, string][] => {
  return Object.entries({
    ...colorsMap,
    ...shareVars,
    ...shareVars1
  }).map(([key, value]) => {
    return ['--' + key, value]
  })
}

export const calcBase = (options: CodegenOptions) => {
  const types = options?.base?.types
  const themes = options?.base?.themes
  // const extraColors = options?.base?.extraColors
  const allTypes = types === undefined ? [] : Object.keys(types)
  const values = types === undefined ? [] : Object.values(types)
  const themesMap = themes === undefined ? {} : themes
  return {
    functions: {
      'injectCssVars($mode:null)': (args: Value[]) => {
        const mode = args[0].assertString().text
        const vars = composeVarsEntries(
          values
            .map((x) => x[mode])
            .reduce<Record<string, string>>((acc, cur) => {
              return {
                ...acc,
                ...cur
              }
            }, {}),
          options?.base?.extraColors?.[mode] ?? {},
          options?.base?.extraVars?.[mode] ?? {}
        )

        return new SassMap(OrderedMap(transformBaseJs(vars)))
      },
      'injectModeSelectors()': () => {
        return transformJsToSass(themesMap)
      }
    },
    allTypes
  }
}
