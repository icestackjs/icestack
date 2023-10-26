import { SassMap, Value } from 'sass'
import { OrderedMap } from 'immutable'
import { getVarsEntries } from './css-vars'
import { transformBaseJs, transformJsToSass } from '@/sass/utils'
import { CodegenOptions } from '@/types'

export const calcBase = (options: CodegenOptions) => {
  const types = options?.base?.types
  const themes = options?.base?.themes
  const allTypes = types === undefined ? [] : Object.keys(types)
  const values = types === undefined ? [] : Object.values(types)
  const themesMap = themes === undefined ? {} : themes
  return {
    functions: {
      'injectCssVars($mode:null)': (args: Value[]) => {
        const mode = args[0].assertString().text
        const vars = getVarsEntries(
          values
            .map((x) => x[mode])
            .reduce<Record<string, string>>((acc, cur) => {
              return {
                ...acc,
                ...cur
              }
            }, {}),
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
