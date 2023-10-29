import { IDefaults, OptionFn, expandColorsMap } from './shared'

function generateDefault(typeName: string) {
  return `text-${typeName} [@media(hover:hover)]:hover:text-${typeName}-active`
}

const defaults: IDefaults = {
  styled: {
    focus: {
      apply: 'outline-none'
    },
    focusVisible: {
      css: {
        outline: '2px solid currentColor',
        'outline-offset': '2px'
      }
    }
  }
}
export const options: OptionFn = (opts) => {
  return {
    colors: expandColorsMap(opts.types, (cur) => {
      return {
        default: generateDefault(cur)
      }
    }),
    defaults
  }
}
