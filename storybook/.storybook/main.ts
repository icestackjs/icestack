import type { StorybookConfig } from '@storybook/html-vite'
// import remarkGfm from 'remark-gfm'
import { join, dirname } from 'path'
import rehypeHighlight from 'rehype-highlight'
// import '@storybook/addon-docs'
/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, 'package.json')))
}

const lang = process.env.LANG
console.log(`lang: ${lang}`)
const config: StorybookConfig = {
  stories: [`../stories/docs/${lang ?? ''}/**/*.mdx`, '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@storybook/addon-interactions'),
    // '@storybook/addon-styling-webpack',
    '@storybook/addon-themes',
    // '@storybook/addon-storysource',
    '@storybook/addon-a11y',
    '@storybook/addon-toolbars',
    'storybook-dark-mode',
    'storybook-i18n',
    '@storybook/addon-highlight',
    // '@a110/storybook-expand-all'
    {
      name: '@storybook/addon-docs',
      options: {
        mdxPluginOptions: {

          mdxCompileOptions: {
            rehypePlugins: [rehypeHighlight],
            // remarkPlugins: [rehypeHighlight],
          },
        },
      },
    }
    // 'storybook-react-i18next'
  ],
  framework: {
    name: getAbsolutePath('@storybook/html-vite'),
    options: {}
  },
  docs: {
    autodocs: 'tag'
  },

}
export default config
