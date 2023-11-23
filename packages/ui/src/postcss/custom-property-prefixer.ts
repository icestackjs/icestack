// import postcss from 'postcss'
import creator from 'postcss-custom-property-prefixer'
// , { type PrefixFunction }
// import { defaultVarPrefix } from '@/constants'
import { arrMatch } from '@/utils'

export type VarPrefixerOptions = {
  varPrefix?: string // | PrefixFunction
  ignoreProp?: (RegExp | string)[]
  ignoreValueCustomProperty?: (RegExp | string)[]
}

export function getPlugin(options: VarPrefixerOptions) {
  const { varPrefix, ignoreProp: ignorePropArr, ignoreValueCustomProperty: ignoreValueCustomPropertyArr } = options
  if (varPrefix) {
    return creator({
      prefix: typeof varPrefix === 'string' ? varPrefix.slice(2) : varPrefix,
      ignoreProp: (decl) => {
        if (arrMatch(ignorePropArr, decl.prop)) {
          return true
        }
        return decl.prop.startsWith('--tw-')
      },
      ignoreValueCustomProperty(customProperty) {
        if (arrMatch(ignoreValueCustomPropertyArr, customProperty)) {
          return true
        }
        return customProperty.startsWith('--tw-')
      }
    })
  }
}
