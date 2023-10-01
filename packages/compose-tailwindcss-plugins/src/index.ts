import type { PluginsConfig, Config } from 'tailwindcss/types/config'
import plugin from 'tailwindcss/plugin'
import merge from 'merge'

export interface UserDefinedOptions {}
// https://github.com/tailwindlabs/tailwindcss/blob/master/src/lib/setupContextUtils.js#L736

// https://github.com/tailwindlabs/tailwindcss/blob/master/src/util/resolveConfig.js#L237

// type PluginItem = PluginsConfig[number]

// type GetPluginItemType<T> = T extends PluginCreator ? PluginCreator : Exclude<PluginItem, PluginCreator>

export function composePlugins(...plugins: PluginsConfig | PluginsConfig[]): ReturnType<typeof plugin.withOptions> {
  const _plugins = plugins.flat()
  const allConfigs: Partial<Config>[] = []
  const userPlugins = _plugins.map((plugin) => {
    // @ts-ignore
    if (plugin.__isOptionsFunction) {
      // @ts-ignore
      plugin = plugin()
    }
    // @ts-ignore
    allConfigs.push(plugin.config)
    return typeof plugin === 'function' ? plugin : plugin.handler
  })

  return plugin.withOptions(
    () => {
      return (api) => {
        for (const p of userPlugins) {
          p(api)
        }
      }
    },
    () => {
      return merge.recursive(allConfigs)
    }
  )
}
