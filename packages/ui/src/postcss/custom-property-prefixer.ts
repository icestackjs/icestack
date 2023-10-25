import postcss from 'postcss'
import creator from 'postcss-custom-property-prefixer'
import { defaultVarPrefix } from '@/constants'

export async function addVarPrefix(rawCss: string, varPrefix: string = defaultVarPrefix) {
  const { css } = await postcss([
    creator({
      prefix: varPrefix.slice(2),
      ignoreProp: (decl) => {
        return decl.prop.startsWith('--tw-')
      },
      ignoreValueCustomProperty(customProperty) {
        return customProperty.startsWith('--tw-')
      }
    })
  ])
    // @ts-ignore
    .process(rawCss, {
      from: undefined
    })
    .async()
  return css
}
