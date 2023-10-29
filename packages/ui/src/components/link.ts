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
  },
  base: {
    default: {
      apply: 'cursor-pointer underline'
    },
    hover: {
      apply: 'no-underline hover:underline'
    }
  }
}
export const options: OptionFn = (opts) => {
  return {
    selector: '.link',
    colors: expandColorsMap(opts.types, (cur) => {
      return {
        default: generateDefault(cur)
      }
    }),
    defaults
  }
}
