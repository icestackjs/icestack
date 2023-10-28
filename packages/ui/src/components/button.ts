import { IDefaults, expandColorsMap } from './shared'
import { CreatePresetOptions } from '@/sass/functions'
// const sassColors = transformJsToSass(colorsMap)
// const sassDefaults = transformJsToSass(defaults)
// export const inject = {
//   [injectName.colors]: () => {
//     return sassColors
//   },
//   [injectName.defaults]: () => {
//     return sassDefaults
//   }
// }
export function generateBtnInjectVars(type: string) {
  return {
    outline: `text-${type}`,
    default: `border-${type} bg-${type} text-${type}-content outline-${type}`,
    hover: `border-${type}-hover bg-${type}-hover`,
    active: `border-${type}-active bg-${type}-active`,
    outlineActive: `border-${type}-active bg-${type}-active text-${type}-content`
  }
}

const defaults: IDefaults = {
  styled: {
    default: {
      apply: 'border-base-200 bg-base-200 text-base-content outline-base-200 no-underline',
      css: {
        'border-width': 'var(--border-btn, 1px)'
      }
    },
    focusVisible: 'outline outline-2 outline-offset-2',
    hover: 'border-base-100 bg-base-100',
    active: 'border-base-300 bg-base-300',
    outline: 'border-current bg-transparent shadow-none text-base-content',
    outlineActive: 'border-base-content bg-base-content text-base-100',
    ghost: 'border border-transparent bg-transparent text-current shadow-none outline-current',
    ghostActive: 'border-opacity-0 bg-base-content bg-opacity-20',
    link: 'text-primary border-transparent bg-transparent underline shadow-none outline-current',
    linkActive: 'border-transparent bg-transparent underline',
    disabled: 'bg-neutral text-base-content border-opacity-0 bg-opacity-20 text-opacity-20',
    glass: 'shadow-none outline-current',
    glassActive: {
      // apply:'',
      css: {
        '--glass-opacity': '25%',
        '--glass-border-opacity': '15%'
      }
    },
    inputType: {
      default: 'border-primary bg-primary text-primary-content',
      active: 'border-primary-active bg-primary-active',
      focusVisible: 'outline-primary'
    }
  },
  unstyled: {}
}
export const options = (opts: CreatePresetOptions) => {
  const d = {
    colors: expandColorsMap(opts.types, (cur) => {
      return generateBtnInjectVars(cur)
    }),
    defaults
  }
  return d
}
