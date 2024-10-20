import type { StorybookConfig } from '@storybook/html-vite'
// import remarkGfm from 'remark-gfm'
import { dirname, join } from 'node:path'
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
    },
    // 'storybook-react-i18next'
  ],
  framework: {
    name: getAbsolutePath('@storybook/html-vite'),
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },

  managerHead: head => `
    ${head}
    ${`<!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-JN32H8ZXRF"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
    
      gtag('config', 'G-JN32H8ZXRF');
    </script>`}
    ${`<script>
    var _hmt = _hmt || [];
    (function() {
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?05397e75aea8e6211394440e776de61f";
      var s = document.getElementsByTagName("script")[0]; 
      s.parentNode.insertBefore(hm, s);
    })();
    </script>
    `}
  `,

}
export default config
