import { IDefaults, IOptionReturnType } from './shared'
import { CreatePresetOptions } from '@/sass/functions'
const defaults: IDefaults = {
  styled: {
    group: {
      apply: 'flex overflow-hidden'.split(' ')
    },
    default: {
      apply: 'border-base-100 overflow-hidden rounded-full border-4'.split(' ')
    }
  },
  base: {
    default: {
      apply: 'relative inline-flex'.split(' ')
    },
    childDiv: {
      apply: 'block aspect-square overflow-hidden'.split(' ')
    },
    img: {
      apply: 'h-full w-full object-cover'.split(' ')
    },
    placeholderChildDiv: {
      apply: 'flex items-center justify-center'.split(' ')
    }
  }
}

export const options: (opts: CreatePresetOptions) => IOptionReturnType = (opts) => {
  return {
    selector: '.avatar',
    defaults
  }
}
