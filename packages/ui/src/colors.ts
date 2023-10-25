import base from '../assets/js/base/index.js'
import { defaultVarPrefix } from './constants'

function isRgba(colorString: string) {
  return typeof colorString === 'string' && colorString.includes('/')
}

export const colors = {
  transparent: 'transparent',
  current: 'currentColor',
  ...Object.entries(base[':root']).reduce<Record<string, string>>((acc, [key, value]) => {
    // remove -- var prefix
    // "ice-"
    const varName = key.slice(defaultVarPrefix.length)
    acc[varName] = isRgba(value) ? `rgba(var(${key}))` : `rgba(var(${key}) / <alpha-value>)`

    return acc
  }, {})
}
