import { SassMap, Value } from 'sass'
import { OrderedMap } from 'immutable'
import { defaultVarsEntries } from './css-vars'
import { transformJsVToSassV } from '@/sass/utils'
const sassValueVarsMap = OrderedMap<Value, Value>(transformJsVToSassV(defaultVarsEntries))

export const inject = {
  'injectCssVars()': () => {
    return new SassMap(sassValueVarsMap)
  }
}
