import type { UserDefinedOptions } from './types'

export function getDefaults(): Partial<UserDefinedOptions> {
  return {
    log: true,
    rtl: false,
    styled: true,
    global: {
      atMedia: {
        hover: false
      },
      selector: {
        universal: '*',
        globalKeyword: 'global'
      },
      pseudo: {
        where: true
      }
    },
    base: {
      selector: {
        light: ':root',
        dark: '[data-theme="dark"]'
      }
    }
  }
}
