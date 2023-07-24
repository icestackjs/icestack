import base from '../assets/js/base/index.js'

export const colors = {
  transparent: 'transparent',
  current: 'currentColor',
  ...Object.keys(base[':root']).reduce<Record<string, string>>((acc, cur) => {
    // remove -- var prefix
    const varName = cur.slice(2)
    acc[varName] = `rgb(var(${cur}) / <alpha-value>)`
    return acc
  }, {})
}

// console.log(colors)
