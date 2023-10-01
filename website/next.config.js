// @ts-check

const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.jsx'
})
/**
 * @type {import('next').NextConfig}
 **/
const opt = {
  i18n: {
    locales: ['en-US', 'zh-CN'],
    defaultLocale: 'zh-CN',
    localeDetection: false
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false, module: false, v8: false, perf_hooks: false }

    return config
  }
  //  redirects() {
  //     return [
  //       {
  //         source: '/',
  //         destination: '/index',
  //         permanent: true,
  //       },
  //     ];
  //   },
}
module.exports = withNextra(opt)
