import { IDefaults, OptionFn, expandColorsMap } from './shared'

const defaults: IDefaults = {
  styled: {}
}

export const options: OptionFn = (opts) => {
  const d = {
    colors: expandColorsMap(opts.types, (cur) => {
      return {
        default: {
          css: {
            '--range-shdw': `var(--${cur})`
          }
        }
      }
    }),
    defaults
  }
  return d
}
