import { SassMap, Value } from 'sass'
import { OrderedMap } from 'immutable'
import { getVarsEntries } from './css-vars'
import { transformBaseJs, transformJsToSass } from '@/sass/utils'
import { CodegenOptions } from '@/types'

export const calcBase = (options: CodegenOptions) => {
  const types = options?.base?.types
  const allTypes = types === undefined ? [] : Object.keys(types)
  const values = types === undefined ? [] : Object.values(types)
  return {
    functions: {
      'injectCssVars($mode:"light")': (args: Value[]) => {
        const mode = args[0].assertString().text as 'light' | 'dark'
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
        return transformJsToSass({
          light: options?.base?.selector?.light ?? ':root',
          dark: options?.base?.selector?.dark ?? '[data-theme="dark"]'
        })
      }
    },
    allTypes
  }
}
