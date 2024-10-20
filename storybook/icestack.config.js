const { sharedExtraColors, sharedExtraVars } = require('@icestack/ui/defaults')

/**
 * @type {import('@icestack/ui').Config}
 */
const config = {
  outdir: './my-ui',
  base: {
    // 在 themes 添加新的 theme ,并声明选择器
    themes: {
      // default theme, you can update their selector by change the option
      // light: {
      //   selector: ':root'
      // },
      // dark: {
      //   selector: '[data-mode="dark"]'
      // },

      // your new theme can be write here
      dimmed: {
        selector: '[data-mode="dimmed"]',
      },
    },
    types: {
      primary: {
        // 新的主题声明
        dimmed: {
          'primary': '#1677ff',
          'primary-content': '#ffffff',
          'primary-hover': '#4096ff',
          'primary-active': '#0958d9',
        },
      },
      // ...
    },
    extraColors: {
      // you can set light or dark or custom
      // 新的主题声明
      dimmed: sharedExtraColors.dark,
    },
    extraVars: {
      // 新的主题声明
      dimmed: sharedExtraVars,
    },
  },
}

module.exports = config
