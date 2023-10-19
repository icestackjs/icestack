import { SassMap, Value } from 'sass'
import { OrderedMap } from 'immutable'
import { defaultVarsEntries, defaultDarkVarsEntries } from './css-vars'
import { transformBaseJs, transformJsToSass } from '@/sass/utils'

export const inject = {
  'injectCssVars($mode:"light")': (args: Value[]) => {
    const mode = args[0].assertString().text
    const vars = mode === 'light' ? defaultVarsEntries : defaultDarkVarsEntries
    return new SassMap(OrderedMap(transformBaseJs(vars)))
  },
  'injectModeSelectors()': () => {
    return transformJsToSass({
      light: ':root',
      dark: '[data-theme="dark"]'
    })
  }
}
