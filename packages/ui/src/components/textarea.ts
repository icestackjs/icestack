import { IDefaults, OptionFn, expandColorsMap } from './shared'

const defaults: IDefaults = {
  styled: {
    default: 'border-base-content bg-base-100 rounded-btn border border-opacity-0',
    bordered: 'border-opacity-20',
    focus: 'outline-base-content/20 outline outline-2 outline-offset-2',
    ghost: 'bg-opacity-5',
    ghostFocus: {
      apply: 'text-base-content bg-opacity-100',
      css: {
        'box-shadow': 'none'
      }
    },
    disabled: 'border-base-200 bg-base-200 placeholder-base-content cursor-not-allowed text-opacity-20 placeholder-opacity-20'
  },
  base: {
    default: 'min-h-12 flex-shrink px-4 py-2 text-sm leading-loose'
  },
  utils: {
    sizes: {
      xs: {
        default: {
          apply: 'px-2 py-1 text-xs leading-relaxed'
        }
      },
      sm: {
        default: {
          apply: 'px-3 py-1 text-sm leading-8'
        }
      },
      md: {
        default: {
          apply: 'px-4 py-3 text-sm leading-loose'
        }
      },
      lg: {
        default: {
          apply: 'px-6 py-4 text-lg leading-loose'
        }
      }
    }
  }
}

export const options: OptionFn = (opts) => {
  return {
    selector: '.textarea',
    colors: expandColorsMap(opts.types, (cur) => {
      return {
        default: `border-${cur}`,
        focus: `outline-${cur}`
      }
    }),
    defaults
  }
}
