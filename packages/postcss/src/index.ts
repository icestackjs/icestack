import type { PluginCreator, AcceptedPlugin } from 'postcss'
import { createContext } from '@icestack/core'
import { loadSync } from '@icestack/config'
import get from 'lodash/get'
import { preflightRoot } from './preflight'

const creator: PluginCreator<Partial<{ cwd: string; configFile: string; preflight: boolean }>> = ({ cwd, configFile, preflight = true } = {}) => {
  const o = loadSync({
    configFile,
    cwd
  })
  if (!o) {
    throw new Error('fail to load config')
  }
  const { filepath } = o
  const ctx = createContext(filepath)
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
              if (preflight) {
                atRule.after(preflightRoot)
              }
              const root = get(ctx.base, valuePath)
              if (root) {
                // @ts-ignore
                atRule.after(root.resolvedCssRoot)
              }
              break
            }
            case 'components': {
              switch (query.length) {
                case 0: {
                  // @ts-ignore
                  for (const arr of Object.values(ctx.components).map((x) => {
                    // @ts-ignore
                    return [x.base.resolvedCssRoot, x.styled.resolvedCssRoot, x.utils.resolvedCssRoot]
                  })) {
                    atRule.after(arr)
                  }

                  break
                }
                case 1: {
                  const component = get(ctx.components, valuePath)
                  if (component) {
                    // @ts-ignore
                    atRule.after([component.base.resolvedCssRoot, component.styled.resolvedCssRoot, component.utils.resolvedCssRoot])
                  }

                  break
                }
                case 2: {
                  const component = get(ctx.components, valuePath)
                  if (component) {
                    // @ts-ignore
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
