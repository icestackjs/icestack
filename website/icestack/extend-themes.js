const { defu } = require('@icestack/ui')

/**
 * @type {import('@icestack/ui/types').Themes}
 */
const overrideDefaultSelector = {
  light: {
    selector: 'html,:root'
  },
  dark: {
    selector: '.dark'
  }
}

/**
 * @type {import('@icestack/ui/types').Themes}
 */
const extendSecondaryTypes = {
  light: {
    types: {
      secondary: '#faad14'
    }
  },
  dark: {
    types: {
      secondary: {
        secondary: '#d89614',
        'secondary-content': '#ffffff',
        'secondary-hover': '#aa7714',
        'secondary-active': '#e8b339'
      }
    }
  }
}

function extendThemes(...args) {
  return defu(...args, extendSecondaryTypes, overrideDefaultSelector)
}

/**
 * @returns {import('@icestack/ui/types').Themes}
 */
module.exports = {
  extendThemes
}
