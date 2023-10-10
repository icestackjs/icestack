const base = require('../assets/js/base/index.js')

function isRgba(colorString) {
  return typeof colorString === 'string' && colorString.includes('/')
}

const colors = {
  transparent: 'transparent',
  current: 'currentColor',
  ...Object.entries(base[':root']).reduce((acc, [key, value]) => {
    // remove -- var prefix
    // "ice-"
    const varName = key.slice('--ice-'.length)
    acc[varName] = isRgba(value) ? `rgba(var(${key}))` : `rgba(var(${key}) / <alpha-value>)`

    return acc
  }, {})
}

module.exports = {
  colors
}
