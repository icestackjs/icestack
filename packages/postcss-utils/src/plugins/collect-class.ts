import type { PluginCreator } from 'postcss'
import parser from 'postcss-selector-parser'
import { defu } from '@icestack/shared'
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
    }
  }
}

creator.postcss = true

export default creator
