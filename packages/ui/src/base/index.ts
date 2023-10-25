import { SassMap, Value } from 'sass'
import { OrderedMap } from 'immutable'
import { getVarsEntries, getDarkVarsEntries } from './css-vars'
import { transformBaseJs, transformJsToSass } from '@/sass/utils'
import { CodegenOptions } from '@/types'

export const inject = (options: CodegenOptions) => {
  return {
    'injectCssVars($mode:"light")': (args: Value[]) => {
      const mode = args[0].assertString().text
      const vars = mode === 'light' ? getVarsEntries(options.base.types.light, options.base.extraVars) : getDarkVarsEntries(options.base.types.dark, options.base.extraVars)
      return new SassMap(OrderedMap(transformBaseJs(vars)))
    },
    'injectModeSelectors()': () => {
      return transformJsToSass({
        light: options.base.selector.light ?? ':root',
        dark: options.base.selector.dark ?? '[data-theme="dark"]'
      })
    }
  }
}
