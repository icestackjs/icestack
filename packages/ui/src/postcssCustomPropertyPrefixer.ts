import { PluginCreator } from 'postcss'

export const ResolveMarkSymbol = Symbol('postcssCustomPropertyPrefixer')

export const postcssCustomPropertyPrefixer: PluginCreator<{
  prefix: string
  ignore?: (prop: string) => boolean | undefined
}> = (options) => {
  const prefix = options?.prefix ?? ''
  const ignoreFn = options?.ignore
  return {
    postcssPlugin: 'postcssCustomPropertyPrefixer',
    prepare() {
      return {
        DeclarationExit(decl) {
          // a declaration starts with -- or $
          // @ts-ignore
          if (decl.prop.startsWith('--') && !ignoreFn?.(decl.prop) && !decl[ResolveMarkSymbol]) {
            decl.prop = `--${prefix}${decl.prop.slice(2)}`
            Object.defineProperty(decl, ResolveMarkSymbol, {
              enumerable: false,
              value: true,
              configurable: true,
              writable: true
            })
          }
        }
      }
    }
  }
}

postcssCustomPropertyPrefixer.postcss = true
