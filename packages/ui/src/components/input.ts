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
    default: {
      apply: 'flex-shrink h-8 px-3 text-sm leading-loose'
    }
  },
  utils: {
    sizes: {
      xs: {
        apply: 'h-6 px-2 text-xs leading-relaxed'
      },
      sm: {
        apply: 'h-8 px-3 text-sm leading-8'
      },
      md: {
        apply: 'h-12 px-4 text-sm leading-loose'
      },
      lg: {
        apply: 'h-16 px-6 text-lg leading-loose'
      }
    }
  }
}
export const options: OptionFn = (opts) => {
  return {
    selector: '.input',
    colors: expandColorsMap(opts.types, (cur) => {
      return {
        default: generateDefault(cur),
        focus: generateFocus(cur)
      }
    }),
    defaults
  }
}
