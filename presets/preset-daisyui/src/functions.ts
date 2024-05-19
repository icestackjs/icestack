import pc from 'picocolors'
import type { Oklch } from 'culori'
import { interpolate, oklch, wcagContrast } from 'culori'
import colorNames from './colorNames'
import themeDefaults from './themeDefaults'
import type { Config } from '@/types'

function colorIsInvalid(input: string) {
  console.error(`├─ ${pc.red('⚠︎')} ${pc.bgRed(' Error ')} Invalid color ${pc.red(input)} in ${pc.green('tailwind.config.js')}`)
}
function cutNumber(number?: number) {
  try {
    return number ? +number.toFixed(6) : 0
  }
  catch {
    // colorIsInvalid(number)
    return false
  }
}
export default {
  isDark: (color: string) => {
    try {
      if (wcagContrast(color, 'black') < wcagContrast(color, 'white')) {
        return true
      }
      return false
    }
    catch {
      // colorIsInvalid(color)
      return false
    }
  },

  colorObjToString(input: Oklch) {
    const { l, c, h } = input
    return `${cutNumber(l)} ${cutNumber(c)} ${cutNumber(h)}`
  },

  generateForegroundColorFrom(input: string, percentage = 0.8) {
    try {
      const result = interpolate([input, this.isDark(input) ? 'white' : 'black'], 'oklch')(percentage)
      return this.colorObjToString(result)
    }
    catch {
      // colorIsInvalid(input)
      return false
    }
  },

  generateDarkenColorFrom(input: string, percentage = 0.07) {
    try {
      const result = interpolate([input, 'black'], 'oklch')(percentage)
      return this.colorObjToString(result)
    }
    catch {
      // colorIsInvalid(input)
      return false
    }
  },

  convertColorFormat(input: Record<string, string>) {
    if (typeof input !== 'object' || input === null) {
      return input
    }

    const resultObj: Record<string, any> = {}

    for (const [rule, value] of Object.entries(input)) {
      if (Object.hasOwn(colorNames, rule)) {
        try {
          const colorObj = oklch(value)
          resultObj[colorNames[rule]] = this.colorObjToString(colorObj!)
        }
        catch {
          colorIsInvalid(value)
          continue
        }
      }
      else {
        resultObj[rule] = value
      }

      // auto generate base colors
      if (!Object.hasOwn(input, 'base-100')) {
        resultObj['--b1'] = '100 0 0'
      }
      if (!Object.hasOwn(input, 'base-200')) {
        resultObj['--b2'] = this.generateDarkenColorFrom(input['base-100'], 0.07)
      }
      if (!Object.hasOwn(input, 'base-300')) {
        resultObj['--b3'] = Object.hasOwn(input, 'base-200') ? this.generateDarkenColorFrom(input['base-200'], 0.07) : this.generateDarkenColorFrom(input['base-100'], 0.14)
      }

      // auto generate state colors

      if (!Object.hasOwn(input, 'info')) {
        resultObj['--in'] = '0.7206 0.191 231.6'
      }
      if (!Object.hasOwn(input, 'success')) {
        resultObj['--su'] = '64.8% 0.150 160'
      }
      if (!Object.hasOwn(input, 'warning')) {
        resultObj['--wa'] = '0.8471 0.199 83.87'
      }
      if (!Object.hasOwn(input, 'error')) {
        resultObj['--er'] = '0.7176 0.221 22.18'
      }

      // auto generate content colors
      if (!Object.hasOwn(input, 'base-content')) {
        resultObj['--bc'] = this.generateForegroundColorFrom(input['base-100'], 0.8)
      }
      if (!Object.hasOwn(input, 'primary-content')) {
        resultObj['--pc'] = this.generateForegroundColorFrom(input.primary, 0.8)
      }
      if (!Object.hasOwn(input, 'secondary-content')) {
        resultObj['--sc'] = this.generateForegroundColorFrom(input.secondary, 0.8)
      }
      if (!Object.hasOwn(input, 'accent-content')) {
        resultObj['--ac'] = this.generateForegroundColorFrom(input.accent, 0.8)
      }
      if (!Object.hasOwn(input, 'neutral-content')) {
        resultObj['--nc'] = this.generateForegroundColorFrom(input.neutral, 0.8)
      }
      if (!Object.hasOwn(input, 'info-content')) {
        resultObj['--inc'] = Object.hasOwn(input, 'info') ? this.generateForegroundColorFrom(input.info, 0.8) : '0 0 0'
      }
      if (!Object.hasOwn(input, 'success-content')) {
        resultObj['--suc'] = Object.hasOwn(input, 'success') ? this.generateForegroundColorFrom(input.success, 0.8) : '0 0 0'
      }
      if (!Object.hasOwn(input, 'warning-content')) {
        resultObj['--wac'] = Object.hasOwn(input, 'warning') ? this.generateForegroundColorFrom(input.warning, 0.8) : '0 0 0'
      }
      if (!Object.hasOwn(input, 'error-content')) {
        resultObj['--erc'] = Object.hasOwn(input, 'error') ? this.generateForegroundColorFrom(input.error, 0.8) : '0 0 0'
      }

      // add css variables if not exist
      for (const item of Object.entries(themeDefaults.variables)) {
        const [variable, value] = item
        if (!Object.hasOwn(input, variable)) {
          resultObj[variable] = value
        }
      }

      // add other custom styles
      if (!Object.hasOwn(colorNames, rule)) {
        resultObj[rule] = value
      }
    }

    return resultObj
  },

  injectThemes(config: Config, themes: Record<string, Record<string, string>>) {
    const includedThemesObj: Record<string, any> = {}
    // add default themes
    const themeRoot = config.themeRoot ?? ':root'
    for (const [theme, value] of Object.entries(themes)) {
      includedThemesObj[theme] = this.convertColorFormat(value)
    }

    // add custom themes
    if (Array.isArray(config.themes)) {
      for (const item of config.themes) {
        if (typeof item === 'object' && item !== null) {
          for (const [customThemeName, customThemevalue] of Object.entries(item)) {
            includedThemesObj[customThemeName] = this.convertColorFormat(customThemevalue)
          }
        }
      }
    }

    let themeOrder = []
    if (Array.isArray(config.themes)) {
      for (const theme of config.themes) {
        if (typeof theme === 'object' && theme !== null) {
          for (const customThemeName of Object.keys(theme)) {
            themeOrder.push(customThemeName)
          }
        }
        else if (Object.hasOwn(includedThemesObj, theme)) {
          themeOrder.push(theme)
        }
      }
    }
    else if (config.themes === true) {
      themeOrder = themeDefaults.themeOrder
    }
    else {
      themeOrder = ['light', 'dark']
    }

    // inject themes in order
    const themesToInject: Record<string, any> = {}
    for (const [index, themeName] of themeOrder.entries()) {
      if (index === 0) {
        // first theme as root
        themesToInject[themeRoot] = includedThemesObj[themeName]
      }
      else if (index === 1) {
        // auto dark
        if (config.darkTheme) {
          // @ts-ignore
          if (themeOrder[0] !== config.darkTheme && themeOrder.includes(config.darkTheme)) {
            themesToInject['@media (prefers-color-scheme: dark)'] = {
              [themeRoot]: includedThemesObj[`${config.darkTheme}`],
            }
          }
        }
        else if (config.darkTheme === false) {
          // disables prefers-color-scheme: dark
        }
        else if (themeOrder[0] !== 'dark' && themeOrder.includes('dark')) {
          themesToInject['@media (prefers-color-scheme: dark)'] = {
            [themeRoot]: includedThemesObj.dark,
          }
        }
        // theme 0 with name
        themesToInject[`[data-theme=${themeOrder[0]}]`] = includedThemesObj[themeOrder[0]]
        themesToInject[`${themeRoot}:has(input.theme-controller[value=${themeOrder[0]}]:checked)`] = includedThemesObj[themeOrder[0]]
        // theme 1 with name
        themesToInject[`[data-theme=${themeOrder[1]}]`] = includedThemesObj[themeOrder[1]]
        themesToInject[`${themeRoot}:has(input.theme-controller[value=${themeOrder[1]}]:checked)`] = includedThemesObj[themeOrder[1]]
      }
      else {
        themesToInject[`[data-theme=${themeName}]`] = includedThemesObj[themeName]
        themesToInject[`${themeRoot}:has(input.theme-controller[value=${themeName}]:checked)`] = includedThemesObj[themeName]
      }
    }

    return {
      themesToInject,
      includedThemesObj,
      themeOrder,
    }
  },
}
