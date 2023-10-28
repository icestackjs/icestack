// import postcss from 'postcss'
import creator, { type UserDefinedOptions } from 'postcss-custom-property-prefixer'
import { defaultVarPrefix } from '@/constants'

export function getPlugin(varPrefix: UserDefinedOptions['prefix'] = defaultVarPrefix) {
  return creator({
    prefix: typeof varPrefix === 'string' ? varPrefix.slice(2) : varPrefix,
    ignoreProp: (decl) => {
      return decl.prop.startsWith('--tw-')
    },
    ignoreValueCustomProperty(customProperty) {
      return customProperty.startsWith('--tw-')
    }
  })
}

// export function addVarPrefix(rawCss: string, varPrefix: string = defaultVarPrefix) {
//   return (
//     postcss([getPlugin(varPrefix)])
//       // @ts-ignore
//       .process(rawCss, {
//         from: undefined
//       })
//   )
// }
