import type { PluginCreator, AcceptedPlugin } from 'postcss'
import { createContext } from '@icestack/core'
import { loadSync } from '@icestack/config'
import get from 'lodash/get'

const creator: PluginCreator<Partial<{ cwd: string; configFile: string }>> = ({ cwd, configFile } = {}) => {
  const { config } = loadSync({
    configFile,
    cwd
  })
  const ctx = createContext(config)
  const plugins: AcceptedPlugin[] = [
    async () => {
      await ctx.build()
    },
    {
      postcssPlugin: 'xxx',
      AtRule(atRule) {
        if (atRule.name === 'icestack') {
          // atRule.params
          // console.log(atRule)
          const [type, ...query] = atRule.params.split('.')
          let valuePath = query.join('.')
          switch (type) {
            case 'base': {
              if (valuePath === '') {
                valuePath = 'index'
              }
              const root = get(ctx.base, valuePath)
              if (root) {
                atRule.after(root.resolvedCssRoot)
              }
              break
            }
            case 'components': {
              switch (query.length) {
                case 0: {
                  for (const arr of Object.values(ctx.components).map((x) => {
                    return [x.base.resolvedCssRoot, x.styled.resolvedCssRoot, x.utils.resolvedCssRoot]
                  })) {
                    atRule.after(arr)
                  }

                  break
                }
                case 1: {
                  const component = get(ctx.components, valuePath)
                  if (component) {
                    atRule.after([component.base.resolvedCssRoot, component.styled.resolvedCssRoot, component.utils.resolvedCssRoot])
                  }

                  break
                }
                case 2: {
                  const component = get(ctx.components, valuePath)
                  if (component) {
                    atRule.after(component.resolvedCssRoot)
                  }

                  break
                }
                // No default
              }

              break
            }
            case 'utilities': {
              if (valuePath === '') {
                valuePath = 'index.resolvedCssRoot'
              }
              const root = get(ctx.utilities, valuePath)
              if (root) {
                atRule.after(root)
              }

              break
            }
          }
          atRule.remove()
          // path
        }
      }
    }
  ]
  return {
    postcssPlugin: 'postcss-icestack-plugin',
    plugins
  }
}

creator.postcss = true

export default creator
