const { sharedExtraColors } = require('@icestack/ui/defaults')
const { defu } = require('@icestack/ui/shared')
/**
 * @type {import('@icestack/ui/types').Themes}
 */
const defaultThemes = {
  cupcake: {
    types: {
      primary: '#65c3c8',
      secondary: '#ef9fbc',
      accent: '#eeaf3a',
      neutral: '#291334'
    },
    extraColors: {
      ...sharedExtraColors.light,
      'base-100': '#faf7f5',
      'base-200': '#efeae6',
      'base-300': '#e7e2df',
      'base-content': '#291334'
    }
  },
  nord: {
    types: {
      primary: '#5E81AC',
      secondary: '#81A1C1',
      accent: '#88C0D0',
      neutral: '#4C566A',
      // 'neutral-content': '#D8DEE9',
      info: '#B48EAD',
      success: '#A3BE8C',
      warning: '#EBCB8B',
      error: '#BF616A'
    },
    extraColors: {
      ...sharedExtraColors.light,
      'base-100': '#ECEFF4',
      'base-200': '#E5E9F0',
      'base-300': '#D8DEE9',
      'base-content': '#2E3440'
    }
  },
  dracula: {
    types: {
      primary: '#ff79c6',
      secondary: '#bd93f9',
      accent: '#ffb86c',
      neutral: '#414558',
      info: '#8be9fd',
      success: '#50fa7b',
      warning: '#f1fa8c',
      error: '#ff5555'
    },
    extraColors: {
      ...sharedExtraColors.dark,
      'base-100': '#282a36',
      'base-content': '#f8f8f2'
    }
  },
  dim: {
    types: {
      primary: '#9FE88D',
      secondary: '#FF7D5C',
      accent: '#C792E9',
      neutral: '#1c212b',
      // 'neutral-content': '#B2CCD6',
      info: '#28ebff',
      success: '#62efbd',
      warning: '#efd057',
      error: '#ffae9b'
    },
    extraColors: {
      ...sharedExtraColors.dark,
      'base-100': '#2A303C',
      'base-200': '#242933',
      'base-300': '#20252E',
      'base-content': '#B2CCD6'
    }
  }
}

function addCustomThemes(...args) {
  return defu(...args, defaultThemes)
}
/**
 * @returns {import('@icestack/ui/types').Themes}
 */
module.exports = {
  addCustomThemes
}
