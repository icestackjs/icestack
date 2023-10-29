import { IDefaults, OptionFn, expandColorsMap } from './shared'

function generateDefault(typeName: string) {
  return `border-${typeName}`
}

function generateFocus(typeName: string) {
  return `outline-${typeName}`
}

const defaults: IDefaults = {
  styled: {
    default: {
      apply: 'border-base-content bg-base-100 rounded-btn border border-opacity-0 text-base'
    },
    bordered: {
      apply: 'border-opacity-20'
    },
    focus: {
      apply: 'outline-base-content/20 outline outline-2 outline-offset-2'
    },
    ghost: {
      apply: 'bg-opacity-5'
    },
    ghostFocus: {
      apply: 'text-base-content bg-opacity-100',
      css: {
        'box-shadow': 'none'
      }
    },
    disabled: {
      apply: 'border-base-200 bg-base-200 placeholder-base-content cursor-not-allowed text-opacity-20 placeholder-opacity-20'
    }
  },
  base: {
    default: 'flex-shrink h-12 px-4 text-sm leading-loose'
  }
}
export const options: OptionFn = (opts) => {
  const d = {
    colors: expandColorsMap(opts.types, (cur) => {
      return {
        default: generateDefault(cur),
        focus: generateFocus(cur)
      }
    }),
    defaults
  }
  return d
}
