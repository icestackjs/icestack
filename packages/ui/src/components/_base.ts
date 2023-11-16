import { OptionFn, transformCss2Js } from './shared'

export const options: OptionFn = (opts) => {
  const { selector } = opts
  return {
    selector,
    defaults: {
      base: transformCss2Js(``),
      styled: transformCss2Js(``),
      utils: transformCss2Js(``)
    }
  }
}
