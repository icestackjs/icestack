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
    }
  }
}
plugin.postcss = true
module.exports = plugin
