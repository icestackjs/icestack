import type { PluginCreator, AcceptedPlugin, Result, Root, Document } from 'postcss'
import { createContext } from '@icestack/core'
import { loadSync } from '@icestack/config'
import { logger } from '@icestack/logger'
import get from 'lodash/get'
import { preflightRoot } from './preflight'

const postcssPlugin = 'postcss-icestack-plugin'

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
  const registerDependencySet = new Set<string>()

  function registerDependency(result: Result<Document | Root>, filepath?: string) {
    if (filepath && !registerDependencySet.has(filepath)) {
      result.messages.push({
        type: 'dependency',
        plugin: postcssPlugin,
        file: filepath,
        parent: result.opts.from
      })
      registerDependencySet.add(filepath)
    }
  }

  const plugins: AcceptedPlugin[] = [
    {
      postcssPlugin: 'postcss-icestack-pre-atRule-plugin',
      Once(root, { result }) {
        registerDependency(result, filepath)
      },
      async AtRule(atRule, { result }) {
        if (atRule.name === 'icestack') {
          registerDependency(result, atRule.source?.input.file)
          const [type, ...query] = atRule.params.split('.')
          let valuePath = query.join('.')
          switch (type) {
            case 'base': {
              await ctx.buildBase()

              if (valuePath === '') {
                valuePath = 'index'
              }
              if (preflight) {
                atRule.before(preflightRoot.clone())
              }
              const root = get(ctx.base, valuePath)
              if (root) {
                // @ts-ignore
                atRule.before(root.resolvedCssRoot.clone())
              } else {
                logger.warn(`The \`@icestack ${atRule.params}\` directive is not found.`)
              }
              break
            }
            case 'components': {
              await ctx.buildComponents({ progressBar: false })

              switch (query.length) {
                case 0: {
                  // @ts-ignore
                  for (const arr of Object.values(ctx.components).map((x) => {
                    // @ts-ignore
                    return [x.base.resolvedCssRoot, x.styled.resolvedCssRoot, x.utils.resolvedCssRoot]
                  })) {
                    atRule.before(arr.map((x) => x.clone()))
                  }

                  break
                }
                case 1: {
                  const component = get(ctx.components, valuePath)
                  if (component) {
                    // @ts-ignore
                    atRule.before([component.base.resolvedCssRoot, component.styled.resolvedCssRoot, component.utils.resolvedCssRoot].map((x) => x.clone()))
                  } else {
                    logger.warn(`The \`@icestack ${atRule.params}\` directive is not found.`)
                  }

                  break
                }
                case 2: {
                  const component = get(ctx.components, valuePath)
                  if (component) {
                    // @ts-ignore
                    atRule.before(component.resolvedCssRoot.clone())
                  } else {
                    logger.warn(`The \`@icestack ${atRule.params}\` directive is not found.`)
                  }

                  break
                }
                // No default
              }
              break
            }
            case 'utilities': {
              await ctx.buildUtilities()

              if (valuePath === '') {
                valuePath = 'index.resolvedCssRoot'
              }
              const root = get(ctx.utilities, valuePath)
              if (root) {
                // @ts-ignore
                atRule.after(root.clone())
              } else {
                logger.warn(`The \`@icestack ${atRule.params}\` directive is not found.`)
              }
              break
            }
          }
        }
      }
    }
  ]
  return {
    postcssPlugin,
    plugins
  }
}

creator.postcss = true

export default creator
