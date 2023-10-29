import { expandColorsMap, IDefaults, OptionFn } from './shared'
function generateDefault(typeName: string) {
  return `border-${typeName} bg-${typeName} text-${typeName}-content`
}

function generateOutline(typeName: string) {
  return `text-${typeName}`
}

const defaults: IDefaults = {
  styled: {
    default: {
      apply: 'rounded-badge border border-base-400 bg-base-100 text-base-content'
    },
    outline: {
      apply: 'border-current border-opacity-50 bg-transparent text-current'
    },
    ghost: {
      apply: 'border-base-400 bg-base-400 text-base-content'
    }
  },
  base: {
    default: {
      apply: 'inline-flex items-center justify-center transition duration-200 ease-out h-5 text-sm leading-5 w-[fit-content] pl-[0.563rem] pr-[0.563rem]'
    }
  },
  utils: {
    sizes: {
      xs: {
        apply: 'h-3 text-xs leading-3',
        css: {
          'padding-left': '0.313rem',
          'padding-right': '0.313rem'
        }
      },
      sm: {
        apply: 'h-4 text-xs leading-4',
        css: {
          'padding-left': '0.438rem',
          'padding-right': '0.438rem'
        }
      },
      md: {
        apply: 'h-5 text-sm leading-5',
        css: {
          'padding-left': '0.563rem',
          'padding-right': '0.563rem'
        }
      },
      lg: {
        apply: 'h-6 text-base leading-6',
        css: {
          'padding-left': '0.688rem',
          'padding-right': '0.688rem'
        }
      }
    }
  }
}

export const options: OptionFn = (opts) => {
  return {
    selector: '.badge',
    colors: expandColorsMap(opts.types, (cur) => {
      return {
        default: generateDefault(cur),
        outline: generateOutline(cur)
      }
    }),
    defaults
  }
}
