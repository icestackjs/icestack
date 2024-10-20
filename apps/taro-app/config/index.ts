import path from 'node:path'
import { defineConfig } from '@tarojs/cli'
import { UnifiedWebpackPluginV5 } from 'weapp-tailwindcss/webpack'

const config = defineConfig({
  projectName: 'taro-app',
  date: '2023-7-13',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
  },
  sourceRoot: 'src',
  outputRoot: 'dist',

  plugins: [
    '@tarojs/plugin-http',
    // [
    //   '@tarojs/plugin-inject',
    //   {
    //     components: {
    //       View: {
    //         'data-content': "'dataContent'"
    //       }
    //       // ScrollView: {
    //       //   'data-observe': "'dataObserve'",
    //       // }
    //     }
    //   }
    // ]
  ],
  defineConstants: {},
  copy: {
    patterns: [],
    options: {},
  },
  framework: 'react',
  compiler: {
    type: 'webpack5',
    prebundle: {
      enable: false,
    },
  },
  cache: {
    enable: false, // Webpack 持久化缓存配置，建议开启。默认配置请参考：https://docs.taro.zone/docs/config-detail#cache
  },
  alias: {
    '@styled-system': path.resolve(__dirname, '..', 'src/styled-system'),
    '@/components': path.resolve(__dirname, '..', 'src/components'),
    '@/store': path.resolve(__dirname, '..', 'src/store'),
    '#docs': path.resolve(__dirname, '../../../website/pages/docs'),
    '#': path.resolve(__dirname, '../../../website'),
    '~': path.resolve(__dirname, '../../../packages/ui'),
  },
  terser: {
    enable: false,
  },
  mini: {
    debugReact: true,
    postcss: {
      pxtransform: {
        enable: true,
        config: {},
      },
      url: {
        enable: true,
        config: {
          limit: 1024, // 设定转换尺寸上限
        },
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
      },
    },
    webpackChain(chain, webpack) {
      // linaria/loader 选项详见 https://github.com/callstack/linaria/blob/master/docs/BUNDLERS_INTEGRATION.md#webpack
      // chain.module
      //   .rule('script')
      //   .use('linariaLoader')
      //   .loader('@linaria/webpack-loader')
      //   .options({
      //     sourceMap: process.env.NODE_ENV !== 'production',
      //   })
      // @ts-ignore
      chain.module.rule('mdx').test(/.mdx/).type('asset/source')
      // chain.resolve.extensions.add('zh-CN.mdx')
      // chain.resolve.extensions.add('.mdx')
      chain.merge({
        // module: {
        //   rules: [
        //     {
        //       test: /.mdx?/,
        //       type: 'asset/source'
        //     }
        //   ]
        // },
        plugin: {
          install: {
            plugin: UnifiedWebpackPluginV5,
            args: [
              {
                appType: 'taro',
              },
            ],
          },
        },
      })
    },
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    postcss: {
      autoprefixer: {
        enable: true,
        config: {},
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
      },
    },
    webpackChain(chain, webpack) {
      // chain.module
      //   .rule('script')
      //   .use('linariaLoader')
      //   .loader('@linaria/webpack-loader')
      //   .options({
      //     sourceMap: process.env.NODE_ENV !== 'production',
      //   })
    },
  },
  rn: {
    appName: 'taroDemo',
    postcss: {
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
      },
    },
  },
})

export default function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
