import type { Declaration, PluginCreator } from 'postcss'
import { defu } from 'defu'
import type { InternalOptions, UserDefinedOptions } from './types'
import { PropResolvedMarkSymbol, ValueResolvedMarkSymbol } from './symbols'
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
    propPrefix: _propPrefix,
  } = defu<InternalOptions, Partial<UserDefinedOptions>[]>(options, {
    ignoreProp: () => false,
    ignoreValue: () => false,
    ignoreValueCustomProperty: () => false,
    ignoreDecl: () => false,
    transformProp: true,
    transformValue: true,
  })
  const prefix = makePrefixFunction(_prefix)
  const propPrefix = _propPrefix === undefined ? prefix : makePrefixFunction(_propPrefix)
  const PropResolvedWeakmap = new WeakMap()
  const ValueResolvedWeakmap = new WeakMap()

  function getPropResolvedMark(decl: Declaration) {
    return PropResolvedWeakmap.get(decl) === PropResolvedMarkSymbol
  }

  function addPropResolvedMark(decl: Declaration) {
    PropResolvedWeakmap.set(decl, PropResolvedMarkSymbol)
  }

  function getValueResolvedMark(decl: Declaration) {
    return ValueResolvedWeakmap.get(decl) === ValueResolvedMarkSymbol
  }

  function addValueResolvedMark(decl: Declaration) {
    ValueResolvedWeakmap.set(decl, ValueResolvedMarkSymbol)
  }
  return {
    postcssPlugin,
    prepare() {
      return {
        DeclarationExit(decl) {
          if (ignoreDecl(decl)) {
            return
          }
          if (transformProp && decl.prop.startsWith('--') && !ignoreProp(decl) && !getPropResolvedMark(decl)) {
            decl.prop = makeCustomProperty(decl.prop, propPrefix(decl, 'prop'))
            addPropResolvedMark(decl)
          }
          if (transformValue && !ignoreValue(decl) && !getValueResolvedMark(decl)) {
            let value = decl.value
            matchCustomPropertyFromValue(decl.value, (arr) => {
              const customProperty = arr[1]
              if (ignoreValueCustomProperty(customProperty, decl)) {
                return
              }
              value = value.replaceAll(customProperty, makeCustomProperty(customProperty, prefix(decl, 'value')))
            })
            decl.value = value
            addValueResolvedMark(decl)
          }
        },
      }
    },
  }
}

postcssCustomPropertyPrefixer.postcss = true

export default postcssCustomPropertyPrefixer

export * from './types'
