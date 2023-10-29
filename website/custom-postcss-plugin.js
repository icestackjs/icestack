/**
 * @type {import('postcss').PluginCreator}
 */
const plugin = () => {
  return {
    postcssPlugin: 'custom-postcss-plugin',
    RuleExit(rule) {
      if (rule.selector.includes('a,summary,button,input,[tabindex]:not([tabindex="-1"])')) {
        rule.remove()
      }
      if (rule.selector.includes(':focus-visible')) {
        rule.remove()
      }
    }
  }
}
plugin.postcss = true
module.exports = plugin
