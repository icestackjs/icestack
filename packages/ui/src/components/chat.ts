import { IDefaults, OptionFn, expandColorsMap } from './shared'

const defaults: IDefaults = {
  styled: {
    default: {
      apply: 'bg-neutral text-neutral-content rounded-box',
      css: {
        'min-height': '2.75rem',
        'min-width': '2.75rem'
      }
    }
  },
  base: {
    default: {
      apply: 'grid grid-cols-2 gap-x-3 py-1'
    },
    image: {
      apply: 'row-span-2 self-end'
    },
    header: {
      apply: 'row-start-1 text-sm'
    },
    footer: {
      apply: 'row-start-3 text-sm'
    },
    bubble: {}
  }
}
export const options: OptionFn = (opts) => {
  return {
    selector: '.chat',
    colors: expandColorsMap(opts.types, (t) => {
      return {
        default: `bg-${t} text-${t}-content`
      }
    }),
    defaults
  }
}
