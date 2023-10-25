import { PluginCreator } from 'postcss'
import { defu } from 'defu'
import { InternalOptions, UserDefinedOptions } from './types'
import { PropResolvedMarkSymbol, ValueResolvedMarkSymbol, addMark, getMark } from './symbol'
import { makeCustomProperty, makePrefixFunction, matchCustomPropertyFromValue, postcssPlugin } from './utils'

const postcssCustomPropertyPrefixer: PluginCreator<UserDefinedOptions> = (options) => {
  const {
    ignoreProp,
    ignoreValue,
    prefix: _prefix,
    transformProp,
    transformValue,
    ignoreDecl,
    ignoreValueCustomProperty,
    propPrefix: _propPrefix
  } = defu<InternalOptions, Partial<UserDefinedOptions>[]>(options, {
    ignoreProp: () => false,
    ignoreValue: () => false,
    ignoreValueCustomProperty: () => false,
    ignoreDecl: () => false,
    transformProp: true,
    transformValue: true
  })
  const prefix = makePrefixFunction(_prefix)
  const propPrefix = _propPrefix === undefined ? prefix : makePrefixFunction(_propPrefix)

  return {
    postcssPlugin,
    prepare() {
      return {
        DeclarationExit(decl) {
          if (ignoreDecl(decl)) {
            return
          }
          if (transformProp && decl.prop.startsWith('--') && !ignoreProp(decl) && !getMark(decl, PropResolvedMarkSymbol)) {
            decl.prop = makeCustomProperty(decl.prop, propPrefix(decl, 'prop'))
            addMark(decl, PropResolvedMarkSymbol)
          }
          if (transformValue && !ignoreValue(decl) && !getMark(decl, ValueResolvedMarkSymbol)) {
            let value = decl.value
            matchCustomPropertyFromValue(decl.value, (arr) => {
              const customProperty = arr[1]
              if (ignoreValueCustomProperty(customProperty, decl)) {
                return
              }
              value = value.replaceAll(customProperty, makeCustomProperty(customProperty, prefix(decl, 'value')))
            })
            decl.value = value
            addMark(decl, ValueResolvedMarkSymbol)
          }
        }
      }
    }
  }
}

// module.exports = postcssCustomPropertyPrefixer

postcssCustomPropertyPrefixer.postcss = true

export default postcssCustomPropertyPrefixer

export { type UserDefinedOptions } from './types'
