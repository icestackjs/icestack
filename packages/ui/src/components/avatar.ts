import { IDefaults, IOptionReturnType } from './shared'
import { CreatePresetOptions } from '@/sass/functions'
const defaults: IDefaults = {
  styled: {
    group: {
      apply: 'flex overflow-hidden'
    },
    default: {
      apply: 'border-base-100 overflow-hidden rounded-full border-4'
    }
  },
  base: {
    default: {
      apply: 'relative inline-flex'
    },
    childDiv: {
      apply: 'block aspect-square overflow-hidden'
    },
    img: {
      apply: 'h-full w-full object-cover'
    },
    placeholderChildDiv: {
      apply: 'flex items-center justify-center'
    }
  }
}

export const options: (opts: CreatePresetOptions) => IOptionReturnType = () => {
  return {
    selector: '.avatar',
    defaults
  }
}
