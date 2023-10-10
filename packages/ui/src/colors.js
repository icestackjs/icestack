const base = require('../assets/js/base/index.js')
const { defaultVarPrefix } = require('./constants.js')

function isRgba(colorString) {
  return typeof colorString === 'string' && colorString.includes('/')
}

const colors = {
  transparent: 'transparent',
  current: 'currentColor',
  ...Object.entries(base[':root']).reduce((acc, [key, value]) => {
    // remove -- var prefix
    // "ice-"
    const varName = key.slice(defaultVarPrefix.length)
    acc[varName] = isRgba(value) ? `rgba(var(${key}))` : `rgba(var(${key}) / <alpha-value>)`

    return acc
  }, {})
}

module.exports = {
  colors
}
