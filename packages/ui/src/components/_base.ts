import { expandColorsMap, IDefaults, OptionFn } from './shared'
const defaults: IDefaults = {
  styled: {
    default: {
      apply: ''
    }
  },
  base: {
    default: {
      apply: ''
    }
  }
}

export const options: OptionFn = (opts) => {
  const d = {
    selector: '',
    colors: expandColorsMap(opts.types, (typeName) => {
      return {}
    }),
    defaults
  }
  return d
}
