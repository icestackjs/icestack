import type { PluginCreator, AcceptedPlugin } from 'postcss'
import parser from 'postcss-selector-parser'
import type { UserDefinedOptions } from '@/types'

const creator: PluginCreator<UserDefinedOptions> = (options) => {
  const universal = options?.global.selector.universal

  const universalFn = typeof universal === 'string' ? () => universal : universal
  const ruleTransformer = parser((selectors) => {
    selectors.walk((selector) => {
      if (selector.type === 'universal' && selector.value === '*') {
        selector.value = universalFn?.()
        // selector.remove()
        // selector.replaceWith(
        //   parser.selector({
        //     value: universalFn?.() ?? '*'
        //   })
        // )
      }
    })
  })
  return {
    postcssPlugin: 'postcss-global-option-handler-plugin',
    plugins: [
      {
        postcssPlugin: 'deep',
        AtRule(atRule, helper) {
          if (atRule.name === 'media' && /\(\s*hover\s*:\s*hover\s*\)/.test(atRule.params)) {
            atRule.before(atRule.nodes)
            atRule.remove()
          }
        },
        Rule(rule, helper) {
          ruleTransformer.transformSync(rule, { lossless: false, updateSelector: true })
        }
      }
    ] as AcceptedPlugin[]
  }
}

creator.postcss = true

export default creator
