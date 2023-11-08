import { OptionFn, transformCss2Js } from './shared'

export const options: OptionFn = (opts) => {
  const { selector } = opts
  return {
    selector,
    defaults: {
      styled: transformCss2Js(``),
      base: transformCss2Js(``),
      utils: transformCss2Js(``)
    }
  }
}
