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
const extendColorsTypes = {
  light: {
    types: {
      // auto generate colors
      info: '#13c2c2',
      secondary: '#2f54eb'
    }
  },
  dark: {
    types: {
      // is dark: true
      info: ['#13c2c2', true],
      // full control
      secondary: {
        secondary: '#2f54eb',
        'secondary-content': '#ffffff',
        'secondary-hover': '#263ea0',
        'secondary-active': '#5273e0'
      }
    }
  }
}

function extendThemes(...args) {
  return defu(...args, extendColorsTypes, overrideDefaultSelector)
}

/**
 * @returns {import('@icestack/ui/types').Themes}
 */
module.exports = {
  extendThemes
}
