import { OptionFn } from './shared'

export const options: OptionFn = (opts) => {
  return {
    selector: '',
    defaults: {
      styled: {},
      base: {},
      utils: {}
    }
  }
}
