import { Types, expandColorsMap } from './shared'
export function generateBtnInjectVars(type: string) {
  return {
    outline: `text-${type}`,
    default: `border-${type} bg-${type} text-${type}-content outline-${type}`,
    active: `border-${type}-focus bg-${type}-focus`,
    outlineActive: `border-${type}-focus bg-${type}-focus text-${type}-content`
  }
}

const colorsMap = expandColorsMap(Types, (cur) => {
  return generateBtnInjectVars(cur)
})

// const injectName = createInjectName('button')

const defaults = {
  styled: {
    default: {
      apply: 'border-base-200 bg-base-200 text-base-content outline-base-200 no-underline',
      css: {
        'border-width': 'var(--border-btn, 1px)'
      }
    },
    focus: 'outline outline-2 outline-offset-2',
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
      active: 'border-primary-focus bg-primary-focus',
      focus: 'outline-primary'
    }
  },
  unstyled: {}
}
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

export const options = {
  colors: colorsMap,
  defaults
}
