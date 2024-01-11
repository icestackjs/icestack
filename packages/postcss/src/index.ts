import type { PluginCreator, AcceptedPlugin } from 'postcss'

const creator: PluginCreator<{ a: 1 }> = () => {
  const plugins: AcceptedPlugin[] = [
    // async (root, res) => {
    //   console.log(root)
    // }
    {
      postcssPlugin: 'xxx',
      AtRule(atRule, helper) {
        if (atRule.name === 'icestack') {
          // atRule.params
          // console.log(atRule)
          atRule.params.split('.')
          // path
        }
      }
    }
  ]
  return {
    postcssPlugin: 'postcss-icestack-plugin',
    plugins
  }
}

creator.postcss = true

export default creator
