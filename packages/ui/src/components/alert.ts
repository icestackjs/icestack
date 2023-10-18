import { Types, createInjectName, expandColorsMap } from './shared'
import { transformJsVToSassMapMap } from '@/sass/utils'

const colorsMap = expandColorsMap(Types, (typeName) => {
  return {
    default: `text-${typeName}-content border-${typeName}/20 bg-${typeName}`
  }
})

const defaults = {
  styled: {
    default: 'rounded-box border p-4 text-base-content border-base-200'
  },
  unstyled: {
    default:
      'grid w-full grid-flow-row content-start items-center justify-items-center gap-4 text-center sm:grid-flow-col sm:grid-cols-[auto_minmax(auto,1fr)] sm:justify-items-start sm:text-left'
  }
}
const injectName = createInjectName('alert')
export const inject = {
  [injectName.colors]: () => {
    return transformJsVToSassMapMap(Object.entries(colorsMap))
  },
  [injectName.defaults]: () => {
    return transformJsVToSassMapMap(Object.entries(defaults))
  }
}

export const options = {
  colors: colorsMap,
  defaults
}
