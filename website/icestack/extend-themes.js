const { defu } = require('@icestack/ui/shared')

/**
 * @type {import('@icestack/ui/types').Themes}
 */
const overrideDefaultSelector = {
  light: {
    selector: 'html,:root',
  },
  dark: {
    selector: '.dark',
  },
}

/**
 * @type {import('@icestack/ui/types').Themes}
 */
const extendColorsTypes = {
  light: {
    types: {
      // auto generate colors

      info: '#2dd4bf',
      accent: '#22c55e',
      secondary: '#2f54eb',
    },
  },
  dark: {
    types: {
      // is dark: true
      info: ['#2dd4bf', true],
      accent: [
        '#22c55e',
        {
          theme: 'dark',
          backgroundColor: '#000000',
        },
      ],
      // full control
      secondary: {
        'secondary': '#2f54eb',
        'secondary-content': '#ffffff',
        'secondary-hover': '#263ea0',
        'secondary-active': '#5273e0',
      },
    },
  },
}

function extendThemes(...args) {
  return defu(...args, extendColorsTypes, overrideDefaultSelector)
}

/**
 * @returns {import('@icestack/ui/types').Themes}
 */
module.exports = {
  extendThemes,
}
