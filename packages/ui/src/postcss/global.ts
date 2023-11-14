import type { PluginCreator, AcceptedPlugin, AtRule } from 'postcss'
import parser from 'postcss-selector-parser'
import type { CodegenOptions } from '@/types'
// media(hover:hover)

function isAtMediaHover(atRule: AtRule) {
  return /media\(\s*hover\s*:\s*hover\s*\)/.test(atRule.name) || (atRule.name === 'media' && /\(\s*hover\s*:\s*hover\s*\)/.test(atRule.params))
}
const creator: PluginCreator<CodegenOptions> = (options) => {
  const universal = options?.global?.selector?.universal
  const removeAtMediaHover = !options?.global?.atMedia?.hover
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

          if (removeAtMediaHover && isAtMediaHover(atRule)) {
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
