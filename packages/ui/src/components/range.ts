import { IDefaults, OptionFn, expandColorsMap } from './shared'

const defaults: IDefaults = {
  styled: {}
}

export const options: OptionFn = (opts) => {
  return {
    selector: '.range',
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
}
