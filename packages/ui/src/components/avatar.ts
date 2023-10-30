import { OptionFn, DefaultsFn } from './shared'

export const selector = '.avatar'
const getDefaults: DefaultsFn = () => {
  return {
    styled: {
      [selector + '-group']: {
        apply: 'flex overflow-hidden',
        [`:where(${selector})`]: {
          apply: 'border-base-100 overflow-hidden rounded-full border-4'
        }
      }
    },
    base: {
      [selector]: {
        apply: 'relative inline-flex',
        '> div': {
          apply: 'block aspect-square overflow-hidden'
        },
        img: {
          apply: 'h-full w-full object-cover'
        },
        '&.placeholder': {
          '> div': {
            apply: 'flex items-center justify-center'
          }
        }
      }
    }
  }
}

export const options: OptionFn = (opt) => {
  return {
    selector,
    defaults: getDefaults(opt)
  }
}
