import { IDefaults, expandColorsMap } from './shared'
import { CreatePresetOptions } from '@/sass/functions'

// const injectName = createInjectName('chat')

const defaults: IDefaults = {
  styled: {
    default: {
      apply: 'bg-neutral text-neutral-content rounded-box',
      css: {
        'min-height': '2.75rem',
        'min-width': '2.75rem'
      }
    }
  }
}
// const sassColors = transformJsToSass(colorsMap)
// const sassDefaults = transformJsToSass(defaults)
// export const inject = {
//   [injectName.colors]: () => {
//     return sassColors
//   },
//   [injectName.defaults]: () => {
//     return sassDefaults
//   }
// }

export const options = (opts: CreatePresetOptions) => {
  return {
    colors: expandColorsMap(opts.types, (t) => {
      return {
        default: `bg-${t} text-${t}-content`
      }
    }),
    defaults
  }
}
