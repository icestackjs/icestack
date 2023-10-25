import { IDefaults, Types, expandColorsMap } from './shared'

const colorsMap = expandColorsMap(Types, (cur) => {
  return {
    default: {
      css: {
        '--range-shdw': `var(--${cur})`
      }
    }
  }
})

const defaults: IDefaults = {
  styled: {}
}

export const options = {
  colors: colorsMap,
  defaults
}
