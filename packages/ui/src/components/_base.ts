import { OptionFn } from './shared'
import { transformCss2Js } from '@/utils'
export const options: OptionFn = (opts) => {
  const { selector, types } = opts
  return {
    selector,
    defaults: {
      styled: transformCss2Js(``),
      base: transformCss2Js(``),
      utils: transformCss2Js(``)
    }
  }
}
