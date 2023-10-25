import postcss from 'postcss'
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

export async function addVarPrefix(rawCss: string, varPrefix: string = defaultVarPrefix) {
  const { css } = await postcss([getPlugin(varPrefix)])
    // @ts-ignore
    .process(rawCss, {
      from: undefined
    })
    .async()
  return css
}
