import type { PluginCreator, AcceptedPlugin } from 'postcss'
import parser from 'postcss-selector-parser'
import type { CodegenOptions } from '@/types'

const creator: PluginCreator<CodegenOptions> = (options) => {
  const universal = options?.global?.selector?.universal

  const universalFn = typeof universal === 'string' ? () => universal : universal
  const ruleTransformer = parser((selectors) => {
    selectors.walk((selector) => {
      // universal
      if (selector.type === 'universal' && selector.value === '*') {
        const s = universalFn?.()
        if (s) {
          selector.value = s
        }
      }
    })
  })
  return {
    postcssPlugin: 'postcss-global-option-handler-plugin',
    plugins: [
      {
        postcssPlugin: 'deep-dark-fantastic',
        AtRule(atRule) {
          // hover
          if (atRule.name === 'media' && /\(\s*hover\s*:\s*hover\s*\)/.test(atRule.params)) {
            atRule.before(atRule.nodes)
            atRule.remove()
          }
        },
        Rule(rule) {
          ruleTransformer.transformSync(rule, { lossless: false, updateSelector: true })
        }
      }
    ] as AcceptedPlugin[]
  }
}

creator.postcss = true

export default creator
