import { IDefaults, OptionFn, expandColorsMap } from './shared'

const defaults: IDefaults = {
  styled: {
    default: 'border-base-content h-6 w-6 cursor-pointer appearance-none rounded-full border border-opacity-20',
    focusVisible: 'outline-base-content outline outline-2 outline-offset-2',
    checked: {
      apply: 'bg-base-content',
      css: {
        animation: 'radiomark var(--animation-input, 0.2s) ease-out',
        'box-shadow': `0 0 0 4px hsl(var(--b1)) inset,
        0 0 0 4px hsl(var(--b1)) inset`
      }
    },
    disabled: 'cursor-not-allowed opacity-20'
  }
}

export const options: OptionFn = (opts) => {
  const d = {
    colors: expandColorsMap(opts.types, (cur) => {
      // global hover
      return {
        default: `border-${cur} [@media(hover:hover)]:hover:border-${cur}`,
        checked: `border-${cur} bg-${cur} text-${cur}-content`,
        focusVisible: `outline-${cur}`
      }
    }),
    defaults
  }
  return d
}
