import { IDefaults, OptionFn, expandColorsMap } from './shared'

function generateDefault(typeName: string) {
  return {
    apply: `border-${typeName}`
  }
}

function generateFocus(typeName: string) {
  return {
    apply: `shadow-${typeName}/10` // outline-${typeName}`
  }
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
      apply: 'outline-0 shadow-[0_0_0_2px] shadow-base-content/10' //  outline-base-content/20 outline outline-1 outline-offset-1'
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
    default: 'flex-shrink h-8 px-3 text-sm leading-loose'
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
