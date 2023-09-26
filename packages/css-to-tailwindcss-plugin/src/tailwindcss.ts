import plugin from 'tailwindcss/plugin'
import { createContext } from './core'
// https://tailwindcss.com/docs/plugins

export const tailwindcssPlugin = plugin.withOptions(
  () => {
    return function () {}
  },
  () => {
    return {}
  }
)
