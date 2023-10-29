import { expandColorsMap, IDefaults, IOptionReturnType } from './shared'
import { CreatePresetOptions } from '@/sass/functions'
function generateDefault(typeName: string) {
  return `border-${typeName} bg-${typeName} text-${typeName}-content`
}

function generateOutline(typeName: string) {
  return `text-${typeName}`
}

const defaults: IDefaults = {
  styled: {
    default: {
      apply: 'rounded-badge border border-base-200 bg-base-100 text-base-content'.split(' ')
    },
    outline: {
      apply: 'border-current border-opacity-50 bg-transparent text-current'.split(' ')
    },
    ghost: {
      apply: 'border-base-200 bg-base-200 text-base-content'.split(' ')
    }
  },
  base: {
    default: {
      apply: 'inline-flex items-center justify-center transition duration-200 ease-out h-5 text-sm leading-5 w-[fit-content] pl-[0.563rem] pr-[0.563rem]'.split(' ')
    }
  }
}

export const options: (opts: CreatePresetOptions) => IOptionReturnType = (opts) => {
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
