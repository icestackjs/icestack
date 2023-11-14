// const autoImport = require('unplugin-auto-import/webpack')

const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.jsx'
})
const nextTranslate = require('next-translate-plugin')
// const { i18n } = require('./next-i18next.config')
// const i18n = require('./i18n')
/**
 * @type {import('next').NextConfig}
 **/
const opt = {
  // i18n,
  webpack: (config) => {
    // config.resolve.fallback = { fs: false, path: false, module: false, v8: false, perf_hooks: false }
    // config.plugins.push(
    //   autoImport({
    //     imports: ['react'],
    //     eslintrc: {
    //       enabled: true
    //     }
    //     // dirs: ['./components']
    //   })
    // )
    // console.log(config)
    return config
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true
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
module.exports = withNextra(nextTranslate(opt))
