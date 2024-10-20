/**
 * @type {import('postcss').PluginCreator}
 */
function plugin(options = {}) {
  const ctx = options.ctx
  console.log(ctx)
  return {
    postcssPlugin: 'custom-postcss-plugin',
    Root(root, helper) {
      console.log(root, helper)
    },
    RuleExit(rule) {
      if (rule.selector.includes('a,summary,button,input,[tabindex]:not([tabindex="-1"])')) {
        rule.remove()
      }
      if (rule.selector.includes('focus-visible')) {
        rule.remove()
      }
      if (rule.selector.includes(':disabled')) {
        rule.remove()
      }
    },
  }
}
plugin.postcss = true
module.exports = plugin
