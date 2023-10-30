import { IDefaults, OptionFn, expandColorsMap } from './shared'

const defaults: IDefaults = {
  styled: {
    default: {
      apply: 'border-base-content bg-base-100 rounded-btn border border-opacity-0 pr-10',
      css: {
        'background-image': `linear-gradient(45deg, transparent 50%, currentColor 50%),
        linear-gradient(135deg, currentColor 50%, transparent 50%)`,
        'background-position': `calc(100% - 20px) calc(1px + 50%),
        calc(100% - 16.1px) calc(1px + 50%)`,
        'background-size': `4px 4px,
        4px 4px`,
        'background-repeat': 'no-repeat'
      }
    },
    bordered: 'border-opacity-20',
    focus: 'outline-base-content/20 outline outline-2 outline-offset-2',
    ghost: 'bg-opacity-5',
    ghostFocus: 'text-base-content bg-opacity-100',
    disabled: 'border-base-200 bg-base-200 placeholder-base-content cursor-not-allowed text-opacity-20 placeholder-opacity-20',
    multiple: 'bg-none pr-4'
  },
  base: {
    default: {
      apply: 'inline-flex cursor-pointer select-none appearance-none min-h-12 h-12 pl-4 pr-10 text-sm leading-loose'
    },
    multiple: {
      apply: 'h-auto'
    }
  },
  utils: {
    sizes: {
      xs: {
        default: {
          apply: 'min-h-6 h-6 pl-2 pr-8 text-xs leading-relaxed'
        },
        rtl: {
          apply: 'pl-8 pr-2'
        }
      },
      sm: {
        default: {
          apply: 'min-h-8 h-8 pl-3 pr-8 text-sm leading-8'
        },
        rtl: {
          apply: 'pl-8 pr-3'
        }
      },
      md: {
        default: {
          apply: 'min-h-12 h-12 pl-4 pr-10 text-sm leading-loose'
        },
        rtl: {
          apply: 'pl-10 pr-4'
        }
      },
      lg: {
        default: {
          apply: 'min-h-16 h-16 pl-6 pr-8 text-lg leading-loose'
        },
        rtl: {
          apply: 'pl-8 pr-6'
        }
      }
    }
  }
}

export const options: OptionFn = (opts) => {
  return {
    selector: '.select',
    colors: expandColorsMap(opts.types, (cur) => {
      return {
        default: `border-${cur}`,
        focus: `outline-${cur}`
      }
    }),
    defaults
  }
}
