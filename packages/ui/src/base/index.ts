import { SassMap, Value } from 'sass'
import { OrderedMap } from 'immutable'
import { defaultVarsEntries } from './css-vars'
import { transformBaseJs } from '@/sass/utils'

const cssVars = new SassMap(OrderedMap(transformBaseJs(defaultVarsEntries)))

export const inject = {
  'injectCssVars()': () => {
    return cssVars
  }
}
