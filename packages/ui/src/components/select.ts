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
