import type { DeepPartial, CodegenOptions } from '@icestack/types'
// @ts-ignore
// import baseCss from 'daisyui/dist/base'
// @ts-ignore
import colorObject from 'daisyui/src/theming/index'
// @ts-ignore
import utilityClasses from 'daisyui/src/lib/utility-classes'
import { transformCss2Js } from '@icestack/shared'
import { trimStart } from 'lodash'
import themes from './themes'
import colorFunctions from './functions'
import type { Config } from './types'
import { schemaMap } from './components'
import { colors, general } from './base'
const daisyui: (config?: Config) => DeepPartial<CodegenOptions> = (config = {}) => {
  const components = schemaMap
  const extraCss = []
  if (config.base !== false) {
    extraCss.push(transformCss2Js([colors, general].join('\n')))
  }
  const themeInjector = colorFunctions.injectThemes(config, themes)
  console.log(themeInjector.includedThemesObj)
  return {
    prefix: {
      prefix: config.prefix,
      ignore: []
    },
    base: {
      extraCss,
      themes: {
        ...Object.entries(themeInjector.includedThemesObj).reduce((acc, [themeName, varsObj]) => {
          acc[themeName] = {
            extraVars: Object.entries(varsObj).reduce((acc, [name, value]) => {
              acc[trimStart(name, '-')] = value
              return acc
            }, {})
          }
          return acc
        }, {})
      }
    },
    components,
    tailwindcssConfig: {
      theme: {
        extend: {
          colors: {
            ...colorObject,
            // adding all Tailwind `neutral` shades here so they don't get overridden by daisyUI `neutral` color
            'neutral-50': '#fafafa',
            'neutral-100': '#f5f5f5',
            'neutral-200': '#e5e5e5',
            'neutral-300': '#d4d4d4',
            'neutral-400': '#a3a3a3',
            'neutral-500': '#737373',
            'neutral-600': '#525252',
            'neutral-700': '#404040',
            'neutral-800': '#262626',
            'neutral-900': '#171717',
            'neutral-950': '#0a0a0a'
          },
          ...utilityClasses
        }
      }
    }
  }
}

export default daisyui
