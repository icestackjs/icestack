import type { PluginCreator, AcceptedPlugin } from 'postcss'
import parser from 'postcss-selector-parser'
import type { TailwindcssPluginOptions } from '@/types'

const creator: PluginCreator<TailwindcssPluginOptions> = (options) => {
  const entries = options?.base?.selector?.entries.map((x) => {
    return {
      find: typeof x.find === 'string' ? new RegExp(x.find, 'g') : x.find,
      replacement: x.replacement
    }
  })

  const ruleTransformer = parser((selectors) => {
    selectors.walk((selector) => {
      if (entries && selector.type === 'selector') {
        for (const { find, replacement } of entries) {
          if (find.test(selector.toString())) {
            selector.value = replacement
          }
        }
      }
    })
  })
  return {
    postcssPlugin: 'postcss-base-plugin',
    plugins: [
      {
        postcssPlugin: 'deep-dark-fantastic',
        Rule(rule) {
          ruleTransformer.transformSync(rule, { lossless: false, updateSelector: true })
        }
      }
    ] as AcceptedPlugin[]
  }
}

creator.postcss = true

export default creator
