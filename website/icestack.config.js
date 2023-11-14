const { sharedExtraColors, sharedExtraVars } = require('@icestack/ui/defaults')

/**
 * @type {import('@icestack/ui').Config}
 */
const config = {
  outdir: './my-ui',
  base: {
    themes: {
      // default theme, you can update their selector by change the option
      // light: {
      //   selector: ':root'
      // },
      // dark: {
      //   selector: '[data-mode="dark"]'
      // },
      light: {
        selector: ':root'
      },
      dark: {
        selector: '.dark'
      },
      // your new theme can be write here
      dimmed: {
        selector: '[data-mode="dimmed"]'
      }
    },
    types: {
      primary: {
        dimmed: {
          primary: '#1677ff',
          'primary-hover': '#4096ff',
          'primary-active': '#0958d9',
          'primary-content': '#ffffff'
        },
        light: {
          primary: '#1677ff',
          'primary-hover': '#4096ff',
          'primary-active': '#0958d9',
          'primary-content': '#ffffff'
        }
      },
      pure: {
        light: {
          pure: '#1677ff',
          'pure-hover': '#4096ff',
          'pure-active': '#0958d9',
          'pure-content': '#ffffff'
        },
        dark: {
          pure: '#1677ff',
          'pure-hover': '#4096ff',
          'pure-active': '#0958d9',
          'pure-content': '#ffffff'
        }
      }
      // ...
    },
    extraColors: {
      // you can set light or dark or custom
      dimmed: sharedExtraColors.dark
    },
    extraVars: {
      dimmed: sharedExtraVars
    }
  },
  components: {
    button: {
      extend: {},
      extra: {},
      mode: 'styled',
      override: {},
      selector: undefined
    }
  }
}
module.exports = config
