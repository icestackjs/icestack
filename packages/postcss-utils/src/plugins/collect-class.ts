import type { PluginCreator } from 'postcss'
import { defu } from '@icestack/shared'
import parser from 'postcss-selector-parser'

const defaultParser = parser()

const creator: PluginCreator<{
  process?: (classNames: string[]) => void
}> = (opts) => {
  const { process } = defu(opts)
  const result = new Set<string>()
  return {
    postcssPlugin: 'postcss-collect-class',
    Rule(rule) {
      defaultParser.astSync(rule.selector).walkClasses((node) => {
        result.add(node.value)
      })
    },
    RootExit() {
      process?.([...result])
    },
  }
}

creator.postcss = true

export default creator
