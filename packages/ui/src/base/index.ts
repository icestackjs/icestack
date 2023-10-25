import { SassMap, Value } from 'sass'
import { OrderedMap } from 'immutable'
import { getVarsEntries, getDarkVarsEntries } from './css-vars'
import { transformBaseJs, transformJsToSass } from '@/sass/utils'
import { CodegenOptions } from '@/types'

export const calcBase = (options: CodegenOptions) => {
  const allTypes = Object.keys(options.base.types)

  return {
    functions: {
      'injectCssVars($mode:"light")': (args: Value[]) => {
        const mode = args[0].assertString().text
        const vars =
          mode === 'light'
            ? getVarsEntries(
                Object.values(options.base.types)
                  .map((x) => x.light)
                  .reduce<Record<string, string>>((acc, cur) => {
                    return {
                      ...acc,
                      ...cur
                    }
                  }, {}),
                options.base.extraVars.light
              )
            : getDarkVarsEntries(
                Object.values(options.base.types)
                  .map((x) => x.dark)
                  .reduce<Record<string, string>>((acc, cur) => {
                    return {
                      ...acc,
                      ...cur
                    }
                  }, {}),
                options.base.extraVars.dark
              )
        return new SassMap(OrderedMap(transformBaseJs(vars)))
      },
      'injectModeSelectors()': () => {
        return transformJsToSass({
          light: options.base.selector.light ?? ':root',
          dark: options.base.selector.dark ?? '[data-theme="dark"]'
        })
      }
    },
    allTypes
  }
}
