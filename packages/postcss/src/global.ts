import type { PluginCreator, AcceptedPlugin, AtRule } from 'postcss'
import parser from 'postcss-selector-parser'
import type { CodegenOptions } from '@icestack/types'

function isAtMediaHover(atRule: AtRule) {
  return /media\(\s*hover\s*:\s*hover\s*\)/.test(atRule.name) || (atRule.name === 'media' && /\(\s*hover\s*:\s*hover\s*\)/.test(atRule.params))
}
const creator: PluginCreator<CodegenOptions> = (options) => {
  const globalOptions = options?.postcss
  const { selector: selectorOptions, atMedia } = globalOptions ?? {}
  const { universal, root } = selectorOptions ?? {}
  const removeAtMediaHover = !atMedia?.hover

  const ruleTransformer = parser((selectors) => {
    selectors.walk((selector) => {
      // universal
      if (selector.type === 'universal' && selector.value === '*' && universal) {
        selector.value = universal
      }
      if (selector.type === 'pseudo' && selector.value === ':root' && root) {
        selector.value = root
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
